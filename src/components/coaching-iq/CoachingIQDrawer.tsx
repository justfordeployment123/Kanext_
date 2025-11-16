import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Check, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoachingIQDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: CoachingProfile) => void;
}

interface CoachingProfile {
  programName: string;
  programLevel: string;
  division: string;
  seasonYear: string;
  offensiveSystem: string;
  defensiveSystem: string;
  positionalWeights: {
    pg: number;
    cg: number;
    wing: number;
    forward: number;
    big: number;
  };
  clusterWeights: {
    creation: number;
    shooting: number;
    finishing: number;
    defense: number;
    rebounding: number;
  };
  scholarshipCap: number;
  nilPool: number;
}

const defaultProfile: CoachingProfile = {
  programName: "Demo University",
  programLevel: "d1",
  division: "Big Conference",
  seasonYear: "2024-25",
  offensiveSystem: "five-out",
  defensiveSystem: "pack-line",
  positionalWeights: { pg: 20, cg: 20, wing: 20, forward: 20, big: 20 },
  clusterWeights: { creation: 20, shooting: 20, finishing: 20, defense: 20, rebounding: 20 },
  scholarshipCap: 12,
  nilPool: 500000,
};

const CoachingIQDrawer = ({ isOpen, onOpenChange, onSave }: CoachingIQDrawerProps) => {
  const [currentLayer, setCurrentLayer] = useState(1);
  const [profile, setProfile] = useState<CoachingProfile>(defaultProfile);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Auto-save effect
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [profile, hasChanges]);

  const handleAutoSave = () => {
    console.log("Auto-saving profile:", profile);
    onSave?.(profile);
    setHasChanges(false);
    toast({
      title: "Changes Saved",
      description: "Your Coaching IQ profile has been updated.",
      duration: 2000,
    });
  };

  const updateProfile = (updates: Partial<CoachingProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updatePositionalWeight = (position: keyof CoachingProfile["positionalWeights"], value: number) => {
    setProfile((prev) => ({
      ...prev,
      positionalWeights: { ...prev.positionalWeights, [position]: value },
    }));
    setHasChanges(true);
  };

  const updateClusterWeight = (cluster: keyof CoachingProfile["clusterWeights"], value: number) => {
    setProfile((prev) => ({
      ...prev,
      clusterWeights: { ...prev.clusterWeights, [cluster]: value },
    }));
    setHasChanges(true);
  };

  const getLevelDefaults = (level: string) => {
    const defaults: Record<string, { scholarshipCap: number; nilPool: number }> = {
      d1: { scholarshipCap: 13, nilPool: 1000000 },
      d2: { scholarshipCap: 10, nilPool: 250000 },
      d3: { scholarshipCap: 0, nilPool: 0 },
      juco: { scholarshipCap: 15, nilPool: 100000 },
      naia: { scholarshipCap: 11, nilPool: 150000 },
    };
    return defaults[level] || defaults.d1;
  };

  const handleLevelChange = (level: string) => {
    const defaults = getLevelDefaults(level);
    updateProfile({
      programLevel: level,
      scholarshipCap: defaults.scholarshipCap,
      nilPool: defaults.nilPool,
    });
  };

  const layerComplete = (layer: number): boolean => {
    switch (layer) {
      case 1:
        return !!(profile.programName && profile.programLevel && profile.division && profile.seasonYear);
      case 2:
        return !!(profile.offensiveSystem && profile.defensiveSystem);
      case 3:
        return true; // Weights always have default values
      case 4:
        return true; // Financials always have default values
      default:
        return false;
    }
  };

  const canProceed = (layer: number): boolean => layerComplete(layer);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[540px] bg-card border-border overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl text-foreground flex items-center gap-2">
            Coaching IQ™
            {hasChanges && (
              <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                <Save className="h-3 w-3 animate-pulse" />
                Saving...
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Configure your program identity and coaching preferences
          </SheetDescription>
        </SheetHeader>

        {/* Progress Indicators */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((layer) => (
            <div key={layer} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentLayer(layer)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentLayer === layer
                    ? "bg-gold text-black scale-110 shadow-[0_0_20px_hsl(43_74%_53%/0.4)]"
                    : layerComplete(layer)
                    ? "bg-gold/30 text-gold"
                    : "bg-surface-tertiary text-muted-foreground"
                }`}
              >
                {layerComplete(layer) ? <Check className="h-5 w-5" /> : layer}
              </button>
              {layer < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    layerComplete(layer) ? "bg-gold/30" : "bg-surface-tertiary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Layer 1: Program Context */}
        {currentLayer === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Program Context</h3>
              <p className="text-sm text-muted-foreground">Define your program's basic information</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="program-name">Program Name</Label>
                <Input
                  id="program-name"
                  value={profile.programName}
                  onChange={(e) => updateProfile({ programName: e.target.value })}
                  placeholder="e.g., State University"
                  className="bg-surface-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="program-level">Program Level</Label>
                <Select value={profile.programLevel} onValueChange={handleLevelChange}>
                  <SelectTrigger className="bg-surface-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d1">Division I</SelectItem>
                    <SelectItem value="d2">Division II</SelectItem>
                    <SelectItem value="d3">Division III</SelectItem>
                    <SelectItem value="juco">JUCO</SelectItem>
                    <SelectItem value="naia">NAIA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="division">Conference / Division</Label>
                <Input
                  id="division"
                  value={profile.division}
                  onChange={(e) => updateProfile({ division: e.target.value })}
                  placeholder="e.g., Big Ten, Conference USA"
                  className="bg-surface-secondary border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="season-year">Season Year</Label>
                <Input
                  id="season-year"
                  value={profile.seasonYear}
                  onChange={(e) => updateProfile({ seasonYear: e.target.value })}
                  placeholder="e.g., 2024-25"
                  className="bg-surface-secondary border-border"
                />
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full"
              onClick={() => setCurrentLayer(2)}
              disabled={!canProceed(1)}
            >
              Continue to Systems
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Layer 2: System Selection */}
        {currentLayer === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">System Selection</h3>
              <p className="text-sm text-muted-foreground">Choose your offensive and defensive systems</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="offense">Offensive System</Label>
                <Select
                  value={profile.offensiveSystem}
                  onValueChange={(value) => updateProfile({ offensiveSystem: value })}
                >
                  <SelectTrigger className="bg-surface-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="five-out">Five-Out</SelectItem>
                    <SelectItem value="motion">Motion Offense</SelectItem>
                    <SelectItem value="princeton">Princeton</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                    <SelectItem value="dribble-drive">Dribble Drive</SelectItem>
                    <SelectItem value="flex">Flex Offense</SelectItem>
                    <SelectItem value="pick-and-roll">Pick & Roll Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defense">Defensive System</Label>
                <Select
                  value={profile.defensiveSystem}
                  onValueChange={(value) => updateProfile({ defensiveSystem: value })}
                >
                  <SelectTrigger className="bg-surface-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pack-line">Pack Line</SelectItem>
                    <SelectItem value="man-to-man">Man-to-Man</SelectItem>
                    <SelectItem value="zone">Zone Defense</SelectItem>
                    <SelectItem value="press">Full Court Press</SelectItem>
                    <SelectItem value="matchup">Matchup Zone</SelectItem>
                    <SelectItem value="help-side">Help-Side Defense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-gold/5 border-gold/30">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-bold text-gold">System Impact:</span> Your system choices will
                  influence player fit calculations and archetype preferences in evaluations.
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setCurrentLayer(1)}>
                Back
              </Button>
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => setCurrentLayer(3)}
                disabled={!canProceed(2)}
              >
                Continue to Weights
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Layer 3: Trait Weighting */}
        {currentLayer === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Trait Weighting</h3>
              <p className="text-sm text-muted-foreground">
                Adjust importance of positions and skill clusters
              </p>
            </div>

            {/* Positional Importance */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Positional Importance</h4>
              <Separator className="bg-border" />
              
              {Object.entries(profile.positionalWeights).map(([position, weight]) => (
                <div key={position} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="capitalize">{position.toUpperCase()}</Label>
                    <span className="text-sm font-bold text-gold">{weight}%</span>
                  </div>
                  <Slider
                    value={[weight]}
                    onValueChange={(value) =>
                      updatePositionalWeight(position as keyof CoachingProfile["positionalWeights"], value[0])
                    }
                    min={0}
                    max={40}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Cluster Weighting */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Cluster Weighting</h4>
              <Separator className="bg-border" />
              
              {Object.entries(profile.clusterWeights).map(([cluster, weight]) => (
                <div key={cluster} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="capitalize">{cluster}</Label>
                    <span className="text-sm font-bold text-gold">{weight}%</span>
                  </div>
                  <Slider
                    value={[weight]}
                    onValueChange={(value) =>
                      updateClusterWeight(cluster as keyof CoachingProfile["clusterWeights"], value[0])
                    }
                    min={0}
                    max={40}
                    step={1}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setCurrentLayer(2)}>
                Back
              </Button>
              <Button variant="gold" className="flex-1" onClick={() => setCurrentLayer(4)}>
                Continue to Financials
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Layer 4: Financial Setup */}
        {currentLayer === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Program Financial Setup</h3>
              <p className="text-sm text-muted-foreground">Configure scholarship and NIL budgets</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scholarship-cap">Scholarship Cap</Label>
                <Input
                  id="scholarship-cap"
                  type="number"
                  value={profile.scholarshipCap}
                  onChange={(e) => updateProfile({ scholarshipCap: Number(e.target.value) })}
                  min={0}
                  max={15}
                  className="bg-surface-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Total scholarship slots available for your program
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nil-pool">NIL Pool ($)</Label>
                <Input
                  id="nil-pool"
                  type="number"
                  value={profile.nilPool}
                  onChange={(e) => updateProfile({ nilPool: Number(e.target.value) })}
                  min={0}
                  step={10000}
                  className="bg-surface-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Total NIL budget available for recruiting and roster
                </p>
              </div>
            </div>

            <Card className="bg-surface-secondary border-border">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Budget Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="text-foreground font-semibold">{profile.programLevel.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scholarships:</span>
                    <span className="text-gold font-bold">{profile.scholarshipCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NIL Pool:</span>
                    <span className="text-gold font-bold">
                      ${(profile.nilPool / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setCurrentLayer(3)}>
                Back
              </Button>
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => {
                  handleAutoSave();
                  onOpenChange(false);
                }}
              >
                <Check className="h-4 w-4 mr-2" />
                Complete Setup
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CoachingIQDrawer;
