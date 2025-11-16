import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoachKAssistantProps {
  isVisible: boolean;
  onToggle: () => void;
}

const CoachKAssistant = ({ isVisible, onToggle }: CoachKAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-black shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-glow-pulse"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-black shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-glow-pulse"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 w-96 max-h-[600px] bg-card border-gold shadow-2xl flex flex-col animate-slide-up"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gold/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Coach K™</h3>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="h-8 w-8"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-surface-secondary rounded-lg p-3 animate-slide-up">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-bold text-gold">Welcome to KaNeXT IQ™!</span>
            <br />
            <br />
            I'm Coach K, your AI assistant. I'll guide you through setting up your program and building your roster.
          </p>
        </div>

        <div className="bg-surface-secondary rounded-lg p-3 animate-slide-up delay-100">
          <p className="text-sm text-foreground leading-relaxed">
            Great! I see you've completed your <span className="text-gold font-semibold">Coaching IQ™</span> setup. Now let's start building your roster by evaluating players.
          </p>
        </div>

        <div className="flex gap-2 animate-slide-up delay-200">
          <Button variant="gold" size="sm" className="flex-1" asChild>
            <a href="/player-iq-workspace">Go to Player IQ</a>
          </Button>
        </div>

        <div className="bg-surface-tertiary rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Setup Progress
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Coaching IQ</span>
              <span className="text-success">Complete</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Verified Players</span>
              <span className="text-muted-foreground">0/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Powered by AI • Always learning with you
        </p>
      </div>
    </Card>
  );
};

export default CoachKAssistant;
