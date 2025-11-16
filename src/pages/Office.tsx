import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, TrendingUp, Activity, Settings, MessageSquare } from "lucide-react";
import CoachKAssistant from "@/components/coach-k/CoachKAssistant";
import CoachingIQDrawer from "@/components/coaching-iq/CoachingIQDrawer";

const Office = () => {
  const [showCoachK, setShowCoachK] = useState(true);
  const [showCoachingIQ, setShowCoachingIQ] = useState(false);
  const [coachingProfile, setCoachingProfile] = useState({
    programName: "Demo University",
    offensiveSystem: "Five-Out",
    defensiveSystem: "Pack Line",
    rosterCount: 0,
  });

  const modules = [
    {
      title: "Player IQ™",
      description: "AI-enhanced player evaluation and scouting engine",
      icon: Target,
      path: "/player-iq-workspace",
      color: "gold",
    },
    {
      title: "Team IQ™",
      description: "Roster management and depth chart visualization",
      icon: Users,
      path: "/team-iq-workspace",
      color: "gold",
    },
    {
      title: "Recruiting IQ™",
      description: "National database and recruiting pipeline CRM",
      icon: TrendingUp,
      path: "/recruit-iq-workspace",
      color: "gold",
    },
    {
      title: "PrediXt™",
      description: "Game and season simulation forecasting",
      icon: Activity,
      path: "/predixt-workspace",
      color: "gold",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Dual Layer */}
      <header className="border-b border-border bg-surface-secondary">
        {/* Layer 1: Primary Navigation */}
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gold">
            KaNeXT IQ™
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link
              to="/player-iq-workspace"
              className="text-sm font-semibold text-muted-foreground hover:text-gold transition-colors"
            >
              Player IQ
            </Link>
            <Link
              to="/team-iq-workspace"
              className="text-sm font-semibold text-muted-foreground hover:text-gold transition-colors"
            >
              Team IQ
            </Link>
            <Link
              to="/recruit-iq-workspace"
              className="text-sm font-semibold text-muted-foreground hover:text-gold transition-colors"
            >
              Recruiting IQ
            </Link>
            <Link
              to="/predixt-workspace"
              className="text-sm font-semibold text-muted-foreground hover:text-gold transition-colors"
            >
              PrediXt
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowCoachK(!showCoachK)}
              className="text-gold hover:bg-gold/10"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
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

        {/* Layer 2: Context Strip */}
        <div className="px-6 py-3 bg-surface-tertiary border-t border-border">
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => setShowCoachingIQ(true)}
              className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="text-muted-foreground">Team:</span>
              <span className="text-foreground font-semibold">{coachingProfile.programName}</span>
            </button>
            <button
              onClick={() => setShowCoachingIQ(true)}
              className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="text-muted-foreground">Offense:</span>
              <span className="text-foreground">{coachingProfile.offensiveSystem}</span>
            </button>
            <button
              onClick={() => setShowCoachingIQ(true)}
              className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="text-muted-foreground">Defense:</span>
              <span className="text-foreground">{coachingProfile.defensiveSystem}</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Roster:</span>
              <span className="text-foreground">{coachingProfile.rosterCount}/12</span>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setShowCoachingIQ(true)}
                className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold hover:bg-success/30 transition-colors cursor-pointer"
              >
                Coaching IQ Active
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Command Center
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all analytical modules powered by Coach K™ AI Assistant
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {modules.map((module, index) => (
            <Link key={module.title} to={module.path}>
              <Card className="bg-card border-border hover:border-gold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(43_74%_53%/0.2)] cursor-pointer group h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                      <module.icon className="h-6 w-6 text-gold" />
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      Module {index + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-gold transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start text-gold group-hover:bg-gold/10">
                    Enter Workspace →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Coach K Assistant */}
      <CoachKAssistant isVisible={showCoachK} onToggle={() => setShowCoachK(!showCoachK)} />

      {/* Coaching IQ Drawer */}
      <CoachingIQDrawer
        isOpen={showCoachingIQ}
        onOpenChange={setShowCoachingIQ}
        onSave={(data) => {
          setCoachingProfile({
            programName: data.programName,
            offensiveSystem: data.offensiveSystem.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            defensiveSystem: data.defensiveSystem.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            rosterCount: 0,
          });
        }}
      />
    </div>
  );
};

export default Office;
