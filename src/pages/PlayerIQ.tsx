import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Settings } from "lucide-react";
import CoachingIQDrawer from "@/components/coaching-iq/CoachingIQDrawer";
import { LifelineScope } from "@/components/player-iq/LifelineScope";
import { ConfidenceGate } from "@/components/player-iq/ConfidenceGate";
import { FinalKPIReport } from "@/components/player-iq/FinalKPIReport";
import { DecisionSyncPanel } from "@/components/player-iq/DecisionSyncPanel";
import {
  calculateWeightedKPI,
  calculateFitPercentage,
  calculateScholarshipSuggestion,
  calculateNILSuggestion,
  determineRoleProjection,
  calculateProMarketValue,
  type CoachingBias,
} from "@/lib/evaluationUtils";

const PlayerIQ = () => {
  const [showCoachingIQ, setShowCoachingIQ] = useState(false);
  const [evaluationData, setEvaluationData] = useState<any>(null);
  const [kpiResults, setKpiResults] = useState<any>(null);

  // Mock coaching bias from localStorage (would come from Coaching IQ Drawer in production)
  const getCoachingBias = (): CoachingBias => {
    const storedProfile = localStorage.getItem("coach_profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      return {
        positionalImportance: profile.positionalImportance,
        clusterWeighting: profile.clusterWeighting,
        offensiveSystem: profile.offensiveSystem,
        defensiveSystem: profile.defensiveSystem,
      };
    }
    // Default bias if none set
    return {
      positionalImportance: { PG: 20, CG: 20, Wing: 20, Forward: 20, Big: 20 },
      clusterWeighting: {
        creation: 12.5,
        shooting: 12.5,
        finishing: 12.5,
        playmaking: 12.5,
        defense: 12.5,
        rebounding: 12.5,
        athleticism: 12.5,
        bbiq: 12.5,
      },
      offensiveSystem: "Five-Out",
      defensiveSystem: "Pack Line",
    };
  };

  const handleEvaluationComplete = (playerData: any) => {
    setEvaluationData(playerData);
    
    // Calculate KPI and Fit based on coaching bias
    const coachingBias = getCoachingBias();
    const kpi = calculateWeightedKPI(playerData.traits, playerData.position, coachingBias);
    const fitPercentage = calculateFitPercentage(playerData.traits, playerData.position, coachingBias);
    
    // Get program context
    const storedProfile = localStorage.getItem("coach_profile");
    const programLevel = storedProfile ? JSON.parse(storedProfile).programLevel : "D2";
    const scholarshipCap = storedProfile ? JSON.parse(storedProfile).scholarshipCap : 10000;
    const nilPool = storedProfile ? JSON.parse(storedProfile).nilPool : 50000;
    
    // Calculate financial suggestions
    const scholarshipSuggestion = calculateScholarshipSuggestion(kpi, programLevel, scholarshipCap);
    const nilSuggestion = calculateNILSuggestion(kpi, playerData.nilReadiness, nilPool);
    
    // Determine role projection
    const roleProjection = determineRoleProjection(playerData.traits, playerData.position, kpi);
    
    // Calculate Pro Market Value if applicable
    const isUpperclassman = ["Junior", "Senior", "Pro"].includes(playerData.class);
    const proMarketValue = (playerData.confidence >= 80 && isUpperclassman)
      ? calculateProMarketValue(kpi, playerData.traits, playerData.position)
      : undefined;
    
    setKpiResults({
      kpi,
      fitPercentage,
      roleProjection,
      scholarshipSuggestion,
      nilSuggestion,
      proMarketValue,
      showProReport: playerData.confidence >= 80 && isUpperclassman,
    });
  };

  const handleSync = (destination: "team" | "recruiting") => {
    if (!evaluationData || !kpiResults) return;
    
    const playerObject = {
      ...evaluationData,
      kpi: kpiResults.kpi,
      fitPercentage: kpiResults.fitPercentage,
      roleProjection: kpiResults.roleProjection,
      scholarshipSuggestion: kpiResults.scholarshipSuggestion,
      nilSuggestion: kpiResults.nilSuggestion,
      evaluatedAt: new Date().toISOString(),
    };
    
    // Store to localStorage (would be database in production)
    const storageKey = destination === "team" ? "team_roster" : "recruiting_board";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    existing.push(playerObject);
    localStorage.setItem(storageKey, JSON.stringify(existing));
    
    console.log(`Player synced to ${destination}:`, playerObject);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface-secondary">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/office">
              <Button variant="ghost" size="icon" className="text-gold hover:bg-gold/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">PLAYER IQ EVALUATOR</h1>
              <p className="text-sm text-muted-foreground">AI-Enhanced Player Evaluation Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCoachingIQ(true)}
              className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold animate-pulse cursor-pointer hover:bg-success/30 transition-colors"
            >
              Coaching IQ Active
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCoachingIQ(true)}
              className="text-gold hover:bg-gold/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-surface-tertiary border-t border-border">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Offense:</span>
              <span className="text-foreground">Five-Out</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Defense:</span>
              <span className="text-foreground">Pack Line</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Team:</span>
              <span className="text-foreground">Demo University</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Lifeline Scope Component */}
        <LifelineScope onEvaluationComplete={handleEvaluationComplete} />

        {/* Show results after evaluation */}
        {evaluationData && kpiResults && (
          <>
            {/* Confidence Gate */}
            <ConfidenceGate confidence={evaluationData.confidence} />

            {/* Final KPI Report */}
            <FinalKPIReport
              kpi={kpiResults.kpi}
              fitPercentage={kpiResults.fitPercentage}
              roleProjection={kpiResults.roleProjection}
              nilReadiness={evaluationData.nilReadiness}
              scholarshipSuggestion={kpiResults.scholarshipSuggestion}
              nilSuggestion={kpiResults.nilSuggestion}
              confidence={evaluationData.confidence}
              playerClass={evaluationData.class}
              proMarketValue={kpiResults.proMarketValue}
              showProReport={kpiResults.showProReport}
            />

            {/* Decision & Sync Panel */}
            <DecisionSyncPanel
              playerData={evaluationData}
              confidence={evaluationData.confidence}
              kpi={kpiResults.kpi}
              fitPercentage={kpiResults.fitPercentage}
              onSync={handleSync}
            />
          </>
        )}

        {/* Info Card - Only show before evaluation */}
        {!evaluationData && (
          <Card className="bg-gold/5 border-gold/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">K</span>
                </div>
                <div>
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-bold text-gold">Coach K™ Tip:</span> The Lifeline Scope engine 
                    uses AI to verify player identity across multiple data sources. Results include a 
                    Confidence % that determines what evaluation features are available.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Coaching IQ Drawer */}
      <CoachingIQDrawer isOpen={showCoachingIQ} onOpenChange={setShowCoachingIQ} />
    </div>
  );
};

export default PlayerIQ;
