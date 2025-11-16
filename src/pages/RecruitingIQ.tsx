import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Settings, TrendingUp, Filter } from "lucide-react";
import CoachingIQDrawer from "@/components/coaching-iq/CoachingIQDrawer";

const RecruitingIQ = () => {
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
              <h1 className="text-xl font-bold text-foreground">RECRUITING IQ WORKSPACE</h1>
              <p className="text-sm text-muted-foreground">National Database & Pipeline CRM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="gold" size="sm">
              My Recruiting Board
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
        
        {/* Filter Bar */}
        <div className="px-6 py-4 bg-surface-tertiary border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players by name, school, or characteristics..."
                className="pl-10 bg-surface-secondary border-border"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Summary Line */}
        <div className="px-6 py-3 bg-background border-t border-border">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Active Recruits:</span>
              <span className="text-foreground font-semibold">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Priority:</span>
              <span className="text-foreground">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Committed:</span>
              <span className="text-success">0%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Budget Used:</span>
              <span className="text-foreground">0%</span>
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
                  <TrendingUp className="h-10 w-10 text-gold" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  National Player Database
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search and filter thousands of players across JUCO, NAIA, D1, D2, and D3. 
                  Use the search bar above to find prospects that match your program needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gold">
                  <Search className="h-4 w-4 mr-2" />
                  Start Searching
                </Button>
                <Button asChild variant="outline">
                  <Link to="/player-iq-workspace">
                    Evaluate a Player
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-gold/5 border-gold/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">K</span>
                </div>
                <div>
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-bold text-gold">Quick Tip:</span> Use filters to narrow 
                    down by level (JUCO, NAIA, etc.), position, and region. Your Coaching IQ™ 
                    profile helps prioritize players that fit your system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-3">Recruiting Workflow</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">1.</span>
                  <span>Search national database and identify prospects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">2.</span>
                  <span>Evaluate players using Player IQ™</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">3.</span>
                  <span>Add to your Recruiting Board and track status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold font-bold">4.</span>
                  <span>Make offers and move committed players to Team IQ™</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Coaching IQ Drawer */}
      <CoachingIQDrawer isOpen={showCoachingIQ} onOpenChange={setShowCoachingIQ} />
    </div>
  );
};

export default RecruitingIQ;
