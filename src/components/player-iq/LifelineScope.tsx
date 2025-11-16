import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LifelineScopeProps {
  onEvaluationComplete: (playerData: any) => void;
}

export const LifelineScope = ({ onEvaluationComplete }: LifelineScopeProps) => {
  const [playerName, setPlayerName] = useState("");
  const [program, setProgram] = useState("");
  const [playerClass, setPlayerClass] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const handleRunScope = async () => {
    setIsSearching(true);
    setSearchProgress(0);

    // Simulate AI scraping process
    const progressSteps = [20, 40, 60, 80, 100];
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setSearchProgress(step);
    }

    // Mock player data with realistic attributes
    const mockPlayerData = {
      name: playerName || "Marcus Johnson",
      program: program || "Lincoln College",
      class: playerClass || "Sophomore",
      position: "CG",
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
      
      // Raw trait scores (0-100)
      traits: {
        creation: Math.floor(Math.random() * 30) + 60,
        shooting: Math.floor(Math.random() * 30) + 55,
        finishing: Math.floor(Math.random() * 30) + 65,
        playmaking: Math.floor(Math.random() * 30) + 50,
        defense: Math.floor(Math.random() * 30) + 55,
        rebounding: Math.floor(Math.random() * 30) + 45,
        athleticism: Math.floor(Math.random() * 30) + 70,
        bbiq: Math.floor(Math.random() * 30) + 60,
      },

      // Physical attributes
      height: "6'3\"",
      weight: "185 lbs",
      wingspan: "6'6\"",
      
      // Stats
      stats: {
        ppg: (Math.random() * 15 + 10).toFixed(1),
        apg: (Math.random() * 4 + 2).toFixed(1),
        rpg: (Math.random() * 4 + 2).toFixed(1),
        fg_pct: (Math.random() * 10 + 42).toFixed(1),
        three_pct: (Math.random() * 8 + 32).toFixed(1),
      },

      nilReadiness: Math.random() > 0.5 ? "High" : "Medium",
      redFlags: Math.random() > 0.7 ? ["Previous injury history"] : [],
      
      sources: ["MaxPreps", "JUCO Database", "Hudl Film"],
    };

    setResults(mockPlayerData);
    setIsSearching(false);
  };

  const handleRunFullEvaluation = () => {
    if (results) {
      onEvaluationComplete(results);
    }
  };

  if (results) {
    return (
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            Lifeline Scope™ Results
          </CardTitle>
          <CardDescription>
            Player identity verified and data aggregated
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Confidence Badge */}
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-border">
            <div>
              <p className="text-sm text-muted-foreground">Confidence Score</p>
              <p className="text-3xl font-bold text-foreground">{results.confidence}%</p>
            </div>
            <Badge 
              variant={results.confidence >= 80 ? "default" : results.confidence >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {results.confidence >= 80 ? "High" : results.confidence >= 60 ? "Medium" : "Low"}
            </Badge>
          </div>

          {/* Identity Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Identity Card</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{results.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program:</span>
                  <span className="text-foreground font-medium">{results.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class:</span>
                  <span className="text-foreground font-medium">{results.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="text-foreground font-medium">{results.position}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Physical Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span className="text-foreground font-medium">{results.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="text-foreground font-medium">{results.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wingspan:</span>
                  <span className="text-foreground font-medium">{results.wingspan}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Season Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <p className="text-2xl font-bold text-gold">{results.stats.ppg}</p>
                <p className="text-xs text-muted-foreground">PPG</p>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <p className="text-2xl font-bold text-gold">{results.stats.apg}</p>
                <p className="text-xs text-muted-foreground">APG</p>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <p className="text-2xl font-bold text-gold">{results.stats.rpg}</p>
                <p className="text-xs text-muted-foreground">RPG</p>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <p className="text-2xl font-bold text-gold">{results.stats.fg_pct}%</p>
                <p className="text-xs text-muted-foreground">FG%</p>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <p className="text-2xl font-bold text-gold">{results.stats.three_pct}%</p>
                <p className="text-xs text-muted-foreground">3P%</p>
              </div>
            </div>
          </div>

          {/* NIL Readiness & Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">NIL Readiness</p>
              <Badge variant={results.nilReadiness === "High" ? "default" : "secondary"}>
                {results.nilReadiness}
              </Badge>
            </div>
            <div className="p-4 bg-surface-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">Red Flags</p>
              {results.redFlags.length > 0 ? (
                <div className="flex items-center gap-2 text-error">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">{results.redFlags[0]}</span>
                </div>
              ) : (
                <span className="text-sm text-success">None detected</span>
              )}
            </div>
          </div>

          {/* Data Sources */}
          <div className="text-sm text-muted-foreground">
            <span>Sources: </span>
            {results.sources.join(", ")}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              variant="gold" 
              size="lg" 
              className="flex-1"
              onClick={handleRunFullEvaluation}
              disabled={results.confidence < 60}
            >
              Run Full Evaluation
            </Button>
            <Button variant="outline" size="lg">
              Save Scope Only
            </Button>
          </div>

          {results.confidence < 60 && (
            <div className="p-4 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-sm text-error">
                Confidence score too low. Please verify player information or add additional data sources.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Search className="h-6 w-6 text-gold" />
          Lifeline Scope™
        </CardTitle>
        <CardDescription>
          AI-powered player identification and data verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="player-name">Player Name</Label>
            <Input
              id="player-name"
              placeholder="Enter player name..."
              className="bg-surface-secondary border-border"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              placeholder="School or Team"
              className="bg-surface-secondary border-border"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              placeholder="e.g., Sophomore, Junior"
              className="bg-surface-secondary border-border"
              value={playerClass}
              onChange={(e) => setPlayerClass(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sources">Data Sources</Label>
            <div className="flex gap-2">
              <Input
                id="sources"
                placeholder="Auto-detect enabled"
                disabled
                className="bg-surface-tertiary border-border"
              />
            </div>
          </div>
        </div>

        {isSearching && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Scraping data sources...</span>
              <span className="text-gold font-medium">{searchProgress}%</span>
            </div>
            <Progress value={searchProgress} className="h-2" />
          </div>
        )}

        <Button 
          variant="gold" 
          size="lg" 
          className="w-full md:w-auto"
          onClick={handleRunScope}
          disabled={isSearching}
        >
          <Search className="h-4 w-4 mr-2" />
          {isSearching ? "Searching..." : "Run Lifeline Scope"}
        </Button>

        {!isSearching && !results && (
          <div className="border border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              Enter player information and run Lifeline Scope to begin evaluation
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
