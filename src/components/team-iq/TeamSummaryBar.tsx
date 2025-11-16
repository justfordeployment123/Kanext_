import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, DollarSign, Shield } from "lucide-react";

interface TeamSummaryBarProps {
  teamKPI: number;
  systemFit: number;
  scholarshipUsed: number;
  scholarshipCap: number;
  nilUsed: number;
  nilPool: number;
  avgConfidence: number;
  playerCount: number;
}

export const TeamSummaryBar = ({
  teamKPI,
  systemFit,
  scholarshipUsed,
  scholarshipCap,
  nilUsed,
  nilPool,
  avgConfidence,
  playerCount,
}: TeamSummaryBarProps) => {
  const scholarshipPercentage = (scholarshipUsed / scholarshipCap) * 100;
  const nilPercentage = (nilUsed / nilPool) * 100;

  const getKPIColor = (kpi: number) => {
    if (kpi >= 75) return "text-success";
    if (kpi >= 65) return "text-gold";
    return "text-foreground";
  };

  const getFitColor = (fit: number) => {
    if (fit >= 80) return "text-success";
    if (fit >= 60) return "text-gold";
    return "text-error";
  };

  const getBudgetColor = (percentage: number) => {
    if (percentage >= 90) return "text-error";
    if (percentage >= 75) return "text-gold";
    return "text-success";
  };

  return (
    <Card className="bg-surface-secondary border-border p-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Team KPI */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">Team KPI</span>
          </div>
          <p className={`text-2xl font-bold ${getKPIColor(teamKPI)}`}>
            {teamKPI.toFixed(1)}
          </p>
        </div>

        {/* System Fit */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">System Fit</span>
          </div>
          <p className={`text-2xl font-bold ${getFitColor(systemFit)}`}>
            {systemFit.toFixed(0)}%
          </p>
        </div>

        {/* Scholarship Usage */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">Scholarships</span>
          </div>
          <div className="space-y-1">
            <p className={`text-sm font-bold ${getBudgetColor(scholarshipPercentage)}`}>
              ${scholarshipUsed.toLocaleString()} / ${scholarshipCap.toLocaleString()}
            </p>
            <Progress value={scholarshipPercentage} className="h-1.5" />
          </div>
        </div>

        {/* NIL Pool */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">NIL Pool</span>
          </div>
          <div className="space-y-1">
            <p className={`text-sm font-bold ${getBudgetColor(nilPercentage)}`}>
              ${nilUsed.toLocaleString()} / ${nilPool.toLocaleString()}
            </p>
            <Progress value={nilPercentage} className="h-1.5" />
          </div>
        </div>

        {/* Average Confidence */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gold" />
            <span className="text-xs text-muted-foreground">Avg Confidence</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {avgConfidence.toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground">{playerCount} players</p>
        </div>
      </div>
    </Card>
  );
};
