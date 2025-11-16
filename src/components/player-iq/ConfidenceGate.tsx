import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface ConfidenceGateProps {
  confidence: number;
}

export const ConfidenceGate = ({ confidence }: ConfidenceGateProps) => {
  const getConfidenceLevel = () => {
    if (confidence >= 80) return { label: "High Confidence", variant: "default" as const, icon: CheckCircle };
    if (confidence >= 60) return { label: "Medium Confidence", variant: "secondary" as const, icon: Shield };
    return { label: "Low Confidence", variant: "destructive" as const, icon: AlertTriangle };
  };

  const confidenceLevel = getConfidenceLevel();
  const Icon = confidenceLevel.icon;

  const getGateMessage = () => {
    if (confidence >= 80) {
      return "High confidence score. All evaluation features available, including Pro-level analysis.";
    }
    if (confidence >= 70) {
      return "Good confidence score. College-level evaluation available. Pro-level analysis requires 80%+ confidence.";
    }
    if (confidence >= 60) {
      return "Acceptable confidence score. Basic evaluation and sync features available. Some projections may have limited accuracy.";
    }
    return "Low confidence score. Please verify player data or add additional sources before proceeding.";
  };

  const getAvailableFeatures = () => {
    if (confidence >= 80) {
      return ["Full KPI Analysis", "System Fit Calculation", "Financial Projections", "Pro Market Analysis", "Sync to Modules"];
    }
    if (confidence >= 70) {
      return ["Full KPI Analysis", "System Fit Calculation", "Financial Projections", "Sync to Modules"];
    }
    if (confidence >= 60) {
      return ["Basic KPI Analysis", "System Fit Calculation", "Sync to Modules (Limited)"];
    }
    return ["Review Data Sources", "Re-run Lifeline Scope"];
  };

  return (
    <Card className="bg-card border-border mb-8">
      <CardContent className="pt-6 space-y-6">
        {/* Main Confidence Display */}
        <div className="flex items-center justify-between p-6 bg-surface-secondary rounded-lg border border-border">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              confidence >= 80 ? "bg-success/20" : confidence >= 60 ? "bg-gold/20" : "bg-error/20"
            }`}>
              <Icon className={`h-6 w-6 ${
                confidence >= 80 ? "text-success" : confidence >= 60 ? "text-gold" : "text-error"
              }`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Data Confidence Score</p>
              <div className="flex items-center gap-3">
                <p className="text-4xl font-bold text-foreground">{confidence}%</p>
                <Badge variant={confidenceLevel.variant} className="text-sm">
                  {confidenceLevel.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="w-48">
            <Progress value={confidence} className="h-3" />
          </div>
        </div>

        {/* Gate Message */}
        <div className={`p-4 rounded-lg border ${
          confidence >= 80 
            ? "bg-success/10 border-success/30" 
            : confidence >= 60 
            ? "bg-gold/10 border-gold/30" 
            : "bg-error/10 border-error/30"
        }`}>
          <p className={`text-sm ${
            confidence >= 80 ? "text-success" : confidence >= 60 ? "text-gold" : "text-error"
          }`}>
            {getGateMessage()}
          </p>
        </div>

        {/* Available Features */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Available Features:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getAvailableFeatures().map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-surface-secondary rounded">
                <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Identity Verified</p>
            <p className="text-lg font-bold text-gold">{confidence >= 60 ? "Yes" : "No"}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Data Sources</p>
            <p className="text-lg font-bold text-gold">{Math.floor(confidence / 25) + 1}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Pro Analysis</p>
            <p className="text-lg font-bold text-gold">{confidence >= 80 ? "Available" : "Locked"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
