import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Activity, Settings, Play } from "lucide-react";
import CoachingIQDrawer from "@/components/coaching-iq/CoachingIQDrawer";

const PrediXt = () => {
  const [showCoachingIQ, setShowCoachingIQ] = useState(false);
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
              <h1 className="text-xl font-bold text-foreground">PREDIXT™ WORKSPACE</h1>
              <p className="text-sm text-muted-foreground">Game & Season Simulation Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
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
        
        {/* Context Strip */}
        <div className="px-6 py-3 bg-surface-tertiary border-t border-border">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Team KPI:</span>
              <span className="text-gold font-bold">--</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Mode:</span>
              <span className="text-foreground">Single Game</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Opponent:</span>
              <span className="text-muted-foreground">Not Selected</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Empty State */}
        <Card className="bg-card border-border">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
                  <Activity className="h-10 w-10 text-gold" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Simulation Engine
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  PrediXt™ uses your Team IQ™ roster to forecast game outcomes and full season 
                  projections. Build your roster first to unlock simulation features.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="gold">
                  <Link to="/team-iq-workspace">
                    Build Your Roster
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gold/10">
                  <Play className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-bold text-foreground">Single Game Mode</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Select any opponent from your conference or division</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Get predicted scoreline and win probability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>See player impact highlights and archetype matchups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Receive Coach K™ strategic insights</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gold/10">
                  <Activity className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-bold text-foreground">Full Season Mode</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Project your entire season record and conference rank</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Compare "what-if" sandbox rosters to current roster</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Analyze season-wide archetype performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Get strategic recommendations for roster improvements</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Coach K Info */}
        <Card className="mt-6 bg-gold/5 border-gold/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-sm">K</span>
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-bold text-gold">Coach K™ Note:</span> PrediXt™ becomes 
                  more accurate as you add verified players to your roster. The simulation engine 
                  analyzes archetype matchups, system fit, and team chemistry to generate predictions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Coaching IQ Drawer */}
      <CoachingIQDrawer isOpen={showCoachingIQ} onOpenChange={setShowCoachingIQ} />
    </div>
  );
};

export default PrediXt;
