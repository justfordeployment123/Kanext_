import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ExpandedPlayerViewProps {
  player: any;
  onUpdate: (updates: any) => void;
  onClose: () => void;
}

export const ExpandedPlayerView = ({ player, onUpdate, onClose }: ExpandedPlayerViewProps) => {
  const { toast } = useToast();
  const [scholarship, setScholarship] = useState(player.scholarshipSuggestion);
  const [nilValue, setNilValue] = useState(player.nilSuggestion);
  const [notes, setNotes] = useState(player.notes || "");

  const handleSaveFinancials = () => {
    onUpdate({
      scholarshipSuggestion: scholarship,
      nilSuggestion: nilValue,
      notes,
    });
    
    toast({
      title: "Changes Saved",
      description: "Financial allocations updated successfully.",
    });
  };

  const getTraitColor = (value: number) => {
    if (value >= 80) return "bg-success";
    if (value >= 60) return "bg-gold";
    return "bg-muted";
  };

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{player.name}</h3>
          <p className="text-sm text-muted-foreground">{player.roleProjection}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-surface-secondary">
          <TabsTrigger value="profile">KPI Profile</TabsTrigger>
          <TabsTrigger value="financial">Financial Aid</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* KPI Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-secondary rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Overall KPI</p>
              <p className="text-3xl font-bold text-gold">{player.kpi.toFixed(1)}</p>
            </div>
            <div className="p-4 bg-surface-secondary rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">System Fit</p>
              <p className="text-3xl font-bold text-gold">{player.fitPercentage}%</p>
            </div>
            <div className="p-4 bg-surface-secondary rounded-lg border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Confidence</p>
              <p className="text-3xl font-bold text-gold">{player.confidence}%</p>
            </div>
          </div>

          {/* Trait Breakdown */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Trait Breakdown</h4>
            {Object.entries(player.traits || {}).map(([trait, value]: [string, any]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground capitalize">{trait}</span>
                  <span className="text-gold font-medium">{value}</span>
                </div>
                <Progress value={value} className={`h-2 ${getTraitColor(value)}`} />
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          {player.stats && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Season Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(player.stats).map(([stat, value]: [string, any]) => (
                  <div key={stat} className="text-center p-3 bg-surface-secondary rounded-lg">
                    <p className="text-xl font-bold text-gold">{value}</p>
                    <p className="text-xs text-muted-foreground uppercase">{stat}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Financial Aid Tab */}
        <TabsContent value="financial" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scholarship">Scholarship Allocation ($)</Label>
                <Input
                  id="scholarship"
                  type="number"
                  value={scholarship}
                  onChange={(e) => setScholarship(Number(e.target.value))}
                  className="bg-surface-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Suggested: ${player.scholarshipSuggestion.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nil">NIL Value ($)</Label>
                <Input
                  id="nil"
                  type="number"
                  value={nilValue}
                  onChange={(e) => setNilValue(Number(e.target.value))}
                  className="bg-surface-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Suggested: ${player.nilSuggestion.toLocaleString()}
                </p>
              </div>

              <Button onClick={handleSaveFinancials} className="w-full" variant="gold">
                <Save className="h-4 w-4 mr-2" />
                Save Financial Changes
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <h5 className="text-sm font-semibold text-gold mb-2">Total Investment</h5>
                <p className="text-2xl font-bold text-foreground">
                  ${(scholarship + nilValue).toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-surface-secondary rounded-lg border border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">NIL Readiness</span>
                  <Badge variant={player.nilReadiness === "High" ? "default" : "secondary"}>
                    {player.nilReadiness}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Position</span>
                  <span className="text-foreground font-medium">{player.position}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="text-foreground font-medium">{player.class}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Performance logs coming soon</p>
            <p className="text-sm text-muted-foreground mt-2">
              Track game-by-game performance and progress metrics
            </p>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6 mt-6">
          <div className="space-y-4">
            <Label htmlFor="notes">Coach Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this player..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] bg-surface-secondary border-border"
            />
            <Button onClick={handleSaveFinancials} variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Notes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
