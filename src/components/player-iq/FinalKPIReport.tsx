import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Target, Award } from "lucide-react";

interface FinalKPIReportProps {
  kpi: number;
  fitPercentage: number;
  roleProjection: string;
  nilReadiness: string;
  scholarshipSuggestion: number;
  nilSuggestion: number;
  confidence: number;
  playerClass: string;
  proMarketValue?: number;
  showProReport: boolean;
}

export const FinalKPIReport = ({
  kpi,
  fitPercentage,
  roleProjection,
  nilReadiness,
  scholarshipSuggestion,
  nilSuggestion,
  confidence,
  playerClass,
  proMarketValue,
  showProReport,
}: FinalKPIReportProps) => {
  const getKPIColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 65) return "text-gold";
    return "text-foreground";
  };

  const getFitColor = (value: number) => {
    if (value >= 80) return "text-success";
    if (value >= 60) return "text-gold";
    return "text-error";
  };

  return (
    <Card className="bg-card border-border mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-gold" />
          Final KPI Report {showProReport && "(Pro Level)"}
        </CardTitle>
        <CardDescription>
          {showProReport 
            ? "Professional market projection and scouting analysis"
            : "Weighted evaluation based on your coaching bias and system requirements"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Confidence Warning */}
        {confidence < 70 && (
          <div className="p-4 bg-gold/10 border border-gold/30 rounded-lg">
            <p className="text-sm text-gold">
              <strong>Note:</strong> Confidence score below 70%. Some projections may have limited accuracy.
              {!showProReport && " Pro-level analysis is unavailable."}
            </p>
          </div>
        )}

        {/* Main KPI Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold" />
                <span className="text-sm text-muted-foreground">Final KPI</span>
              </div>
              <Badge variant={kpi >= 80 ? "default" : kpi >= 65 ? "secondary" : "outline"}>
                {kpi >= 80 ? "Elite" : kpi >= 65 ? "High" : "Average"}
              </Badge>
            </div>
            <p className={`text-5xl font-bold ${getKPIColor(kpi)}`}>{kpi.toFixed(1)}</p>
            <Progress value={kpi} className="mt-4 h-2" />
          </div>

          <div className="p-6 bg-surface-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-gold" />
                <span className="text-sm text-muted-foreground">System Fit</span>
              </div>
              <Badge variant={fitPercentage >= 80 ? "default" : fitPercentage >= 60 ? "secondary" : "destructive"}>
                {fitPercentage >= 80 ? "Excellent" : fitPercentage >= 60 ? "Good" : "Poor"}
              </Badge>
            </div>
            <p className={`text-5xl font-bold ${getFitColor(fitPercentage)}`}>{fitPercentage}%</p>
            <Progress value={fitPercentage} className="mt-4 h-2" />
          </div>
        </div>

        {/* Role Projection */}
        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-sm text-muted-foreground">Projected Role</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{roleProjection}</p>
        </div>

        {/* Financial Projections */}
        {!showProReport ? (
          <>
            {/* College Financial */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Financial Recommendations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-secondary rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-gold" />
                    <span className="text-sm text-muted-foreground">Scholarship Suggestion</span>
                  </div>
                  <p className="text-2xl font-bold text-gold">
                    ${scholarshipSuggestion.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on KPI and program level
                  </p>
                </div>

                <div className="p-4 bg-surface-secondary rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-gold" />
                    <span className="text-sm text-muted-foreground">NIL Value Suggestion</span>
                  </div>
                  <p className="text-2xl font-bold text-gold">
                    ${nilSuggestion.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    NIL Readiness: {nilReadiness}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Pro Market Value */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Professional Market Analysis</h3>
              
              <div className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border border-gold/30">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-gold" />
                  <span className="text-sm text-gold font-semibold">Market Value Projection</span>
                </div>
                <p className="text-4xl font-bold text-gold">
                  ${proMarketValue?.toLocaleString() || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Estimated professional contract value (G-League / International)
                </p>
              </div>

              <div className="p-4 bg-surface-secondary rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-gold">Pro Outlook:</strong> This projection is based on current KPI, 
                  athleticism, shooting, and defensive metrics. Actual value may vary based on team needs, 
                  league dynamics, and player development.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Evaluation Summary */}
        <div className="p-4 bg-gold/5 border border-gold/30 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-sm">K</span>
            </div>
            <div>
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold text-gold">Coach K™ Analysis:</span> This evaluation applies 
                your coaching bias ({fitPercentage}% system fit) to generate personalized projections. 
                {showProReport 
                  ? " Pro-level metrics focus on translatable skills and market readiness."
                  : " Financial recommendations are optimized for your program's budget and recruiting strategy."
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
