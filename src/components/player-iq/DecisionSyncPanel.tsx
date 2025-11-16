import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DecisionSyncPanelProps {
  playerData: any;
  confidence: number;
  kpi: number;
  fitPercentage: number;
  onSync: (destination: "team" | "recruiting") => void;
}

export const DecisionSyncPanel = ({
  playerData,
  confidence,
  kpi,
  fitPercentage,
  onSync,
}: DecisionSyncPanelProps) => {
  const { toast } = useToast();

  const handleSync = (destination: "team" | "recruiting") => {
    if (confidence < 60) {
      toast({
        title: "Sync Blocked",
        description: "Confidence score must be at least 60% to sync player data.",
        variant: "destructive",
      });
      return;
    }

    onSync(destination);
    
    const destinationName = destination === "team" ? "Team IQ™" : "Recruiting IQ™";
    toast({
      title: "Player Synced",
      description: `${playerData.name} has been added to ${destinationName}`,
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-gold" />
          Next Step: Decision & Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Evaluation complete. Add this player to your recruiting pipeline or active roster to continue tracking.
        </p>

        {/* Quick Summary */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-surface-secondary rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">KPI</p>
            <p className="text-lg font-bold text-gold">{kpi.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Fit</p>
            <p className="text-lg font-bold text-gold">{fitPercentage}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Confidence</p>
            <p className="text-lg font-bold text-gold">{confidence}%</p>
          </div>
        </div>

        {/* Sync Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => handleSync("recruiting")}
            disabled={confidence < 60}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add to Recruiting IQ™
          </Button>
          
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => handleSync("team")}
            disabled={confidence < 60}
          >
            <Users className="h-4 w-4 mr-2" />
            Add to Team IQ™
          </Button>
        </div>

        {confidence < 60 && (
          <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
            <p className="text-xs text-error">
              Sync disabled: Confidence score must be at least 60% to add player to modules.
            </p>
          </div>
        )}

        {/* Coach K Tip */}
        <div className="p-4 bg-gold/5 border border-gold/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-sm">K</span>
            </div>
            <div>
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold text-gold">Coach K™ Tip:</span> Players added to Recruiting IQ™ 
                enter your pipeline with 'Lead' status. Players added to Team IQ™ join your active roster 
                immediately. You can adjust financial allocations in either module.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
