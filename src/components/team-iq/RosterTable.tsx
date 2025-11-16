import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react";
import { ExpandedPlayerView } from "./ExpandedPlayerView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Player {
  name: string;
  position: string;
  kpi: number;
  fitPercentage: number;
  confidence: number;
  scholarshipSuggestion: number;
  nilSuggestion: number;
  roleProjection: string;
  traits: any;
  stats: any;
  [key: string]: any;
}

interface RosterTableProps {
  players: Player[];
  onUpdatePlayer: (index: number, updates: Partial<Player>) => void;
  onRemovePlayer: (index: number) => void;
}

type SortField = "name" | "kpi" | "fitPercentage" | "confidence" | "scholarshipSuggestion" | "nilSuggestion";
type SortDirection = "asc" | "desc";

export const RosterTable = ({ players, onUpdatePlayer, onRemovePlayer }: RosterTableProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField>("kpi");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    const aNum = Number(aValue) || 0;
    const bNum = Number(bValue) || 0;
    
    return sortDirection === "asc" 
      ? aNum - bNum 
      : bNum - aNum;
  });

  const getKPIColor = (kpi: number) => {
    if (kpi >= 80) return "text-success";
    if (kpi >= 65) return "text-gold";
    return "text-foreground";
  };

  const getFitColor = (fit: number) => {
    if (fit >= 80) return "text-success";
    if (fit >= 60) return "text-gold";
    return "text-error";
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-secondary hover:bg-surface-secondary">
              <TableHead className="w-12"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("name")}
                  className="hover:bg-surface-tertiary"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">POS</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("kpi")}
                  className="hover:bg-surface-tertiary"
                >
                  OVR (KPI)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("fitPercentage")}
                  className="hover:bg-surface-tertiary"
                >
                  FIT %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("confidence")}
                  className="hover:bg-surface-tertiary"
                >
                  CONF %
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("scholarshipSuggestion")}
                  className="hover:bg-surface-tertiary"
                >
                  SCH ALLOT
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("nilSuggestion")}
                  className="hover:bg-surface-tertiary"
                >
                  NIL VALUE
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No players in roster. Add players from Player IQ or Recruiting IQ.
                </TableCell>
              </TableRow>
            ) : (
              sortedPlayers.map((player, index) => (
                <>
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-surface-secondary/50 transition-colors"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <TableCell>
                      {expandedIndex === index ? (
                        <ChevronDown className="h-4 w-4 text-gold" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {player.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-mono">
                        {player.position}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${getKPIColor(player.kpi)}`}>
                        {player.kpi.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold ${getFitColor(player.fitPercentage)}`}>
                        {player.fitPercentage}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {player.confidence}%
                      </span>
                    </TableCell>
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="hover:bg-surface-tertiary/50"
                    >
                      <span className="text-gold font-medium cursor-pointer">
                        ${player.scholarshipSuggestion.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell
                      onClick={(e) => e.stopPropagation()}
                      className="hover:bg-surface-tertiary/50"
                    >
                      <span className="text-gold font-medium cursor-pointer">
                        ${player.nilSuggestion.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            •••
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border z-50">
                          <DropdownMenuItem
                            onClick={() => setExpandedIndex(index)}
                            className="cursor-pointer hover:bg-surface-secondary"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onRemovePlayer(index)}
                            className="cursor-pointer hover:bg-surface-secondary text-error"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedIndex === index && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-0 bg-surface-tertiary">
                        <ExpandedPlayerView
                          player={player}
                          onUpdate={(updates) => onUpdatePlayer(index, updates)}
                          onClose={() => setExpandedIndex(null)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
