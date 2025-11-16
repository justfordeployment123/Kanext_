import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, UserPlus, Plus, Users } from "lucide-react";
import CoachingIQDrawer from "@/components/coaching-iq/CoachingIQDrawer";
import { RosterTable } from "@/components/team-iq/RosterTable";
import { TeamSummaryBar } from "@/components/team-iq/TeamSummaryBar";
import { calculateTeamMetrics } from "@/lib/teamCalculations";
import { useToast } from "@/components/ui/use-toast";

const TeamIQ = () => {
  const { toast } = useToast();
  const [showCoachingIQ, setShowCoachingIQ] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("roster");

  // Load roster from localStorage
  useEffect(() => {
    const storedRoster = localStorage.getItem("team_roster");
    if (storedRoster) {
      setPlayers(JSON.parse(storedRoster));
    }
  }, []);

  // Save roster to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("team_roster", JSON.stringify(players));
  }, [players]);

  // Get coaching profile for metrics
  const getCoachProfile = () => {
    const stored = localStorage.getItem("coach_profile");
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      scholarshipCap: 120000,
      nilPool: 100000,
      programLevel: "D2",
    };
  };

  const coachProfile = getCoachProfile();

  // Calculate team metrics
  const teamMetrics = calculateTeamMetrics(
    players,
    coachProfile.scholarshipCap,
    coachProfile.nilPool
  );

  const handleUpdatePlayer = (index: number, updates: any) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], ...updates };
    setPlayers(updatedPlayers);
  };

  const handleRemovePlayer = (index: number) => {
    const playerName = players[index].name;
    setPlayers(players.filter((_, i) => i !== index));
    
    toast({
      title: "Player Removed",
      description: `${playerName} has been removed from the roster.`,
    });
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
              <h1 className="text-xl font-bold text-foreground">TEAM IQ WORKSPACE</h1>
              <p className="text-sm text-muted-foreground">Roster Management & Depth Chart</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="gold" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add from Recruiting
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
        
        {/* Summary Line */}
        <div className="px-6 py-3 bg-surface-tertiary border-t border-border">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Team KPI:</span>
              <span className="text-gold font-bold">--</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">System Fit:</span>
              <span className="text-foreground">--</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Scholarships:</span>
              <span className="text-foreground">0/12</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">NIL Pool:</span>
              <span className="text-foreground">0%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Avg Confidence:</span>
              <span className="text-foreground">--</span>
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
                  <Users className="h-10 w-10 text-gold" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  No Players on Roster
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start building your team by evaluating players in Player IQ™ or adding 
                  recruits from your Recruiting Board.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="gold">
                  <Link to="/player-iq-workspace">
                    Evaluate Players
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/recruit-iq-workspace">
                    Browse Recruits
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coach K Info */}
        <Card className="mt-6 bg-gold/5 border-gold/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-sm">K</span>
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-bold text-gold">Coach K™ Progress:</span> You need to 
                  evaluate at least 10 players (with Confidence ≥ 60%) to unlock full Team IQ™ 
                  features. Start in Player IQ™ to begin building your roster.
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

export default TeamIQ;
