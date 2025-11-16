// Team-level aggregate calculations

interface Player {
  kpi: number;
  fitPercentage: number;
  confidence: number;
  scholarshipSuggestion: number;
  nilSuggestion: number;
  position: string;
  [key: string]: any;
}

interface TeamMetrics {
  teamKPI: number;
  systemFit: number;
  scholarshipUsed: number;
  nilUsed: number;
  avgConfidence: number;
  playerCount: number;
  positionBreakdown: Record<string, number>;
}

/**
 * Calculate aggregate team metrics from roster
 */
export function calculateTeamMetrics(
  players: Player[],
  scholarshipCap: number,
  nilPool: number
): TeamMetrics {
  if (players.length === 0) {
    return {
      teamKPI: 0,
      systemFit: 0,
      scholarshipUsed: 0,
      nilUsed: 0,
      avgConfidence: 0,
      playerCount: 0,
      positionBreakdown: {},
    };
  }

  // Calculate averages
  const totalKPI = players.reduce((sum, p) => sum + p.kpi, 0);
  const totalFit = players.reduce((sum, p) => sum + p.fitPercentage, 0);
  const totalConfidence = players.reduce((sum, p) => sum + p.confidence, 0);
  const totalScholarship = players.reduce((sum, p) => sum + (p.scholarshipSuggestion || 0), 0);
  const totalNIL = players.reduce((sum, p) => sum + (p.nilSuggestion || 0), 0);

  // Position breakdown
  const positionBreakdown: Record<string, number> = {};
  players.forEach((p) => {
    positionBreakdown[p.position] = (positionBreakdown[p.position] || 0) + 1;
  });

  return {
    teamKPI: totalKPI / players.length,
    systemFit: totalFit / players.length,
    scholarshipUsed: totalScholarship,
    nilUsed: totalNIL,
    avgConfidence: totalConfidence / players.length,
    playerCount: players.length,
    positionBreakdown,
  };
}

/**
 * Calculate weighted team KPI (considers positional importance and depth)
 */
export function calculateWeightedTeamKPI(
  players: Player[],
  positionalWeights: Record<string, number>
): number {
  if (players.length === 0) return 0;

  // Group players by position
  const positionGroups: Record<string, Player[]> = {};
  players.forEach((player) => {
    if (!positionGroups[player.position]) {
      positionGroups[player.position] = [];
    }
    positionGroups[player.position].push(player);
  });

  // Calculate position-weighted KPI
  let weightedSum = 0;
  let totalWeight = 0;

  Object.entries(positionGroups).forEach(([position, posPlayers]) => {
    // Sort players by KPI (best first)
    const sorted = posPlayers.sort((a, b) => b.kpi - a.kpi);
    
    // Weight by position importance
    const positionWeight = (positionalWeights[position] || 20) / 100;
    
    // Top 2 players at each position get full weight
    // Additional depth players get diminishing weight
    sorted.forEach((player, index) => {
      const depthMultiplier = index === 0 ? 1.0 : index === 1 ? 0.7 : 0.4;
      const playerWeight = positionWeight * depthMultiplier;
      
      weightedSum += player.kpi * playerWeight;
      totalWeight += playerWeight;
    });
  });

  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

/**
 * Analyze roster balance and identify gaps
 */
export function analyzeRosterBalance(players: Player[]): {
  balanced: boolean;
  gaps: string[];
  strengths: string[];
  warnings: string[];
} {
  const positionCounts: Record<string, number> = {};
  const positionKPIs: Record<string, number[]> = {};

  players.forEach((player) => {
    positionCounts[player.position] = (positionCounts[player.position] || 0) + 1;
    if (!positionKPIs[player.position]) {
      positionKPIs[player.position] = [];
    }
    positionKPIs[player.position].push(player.kpi);
  });

  const gaps: string[] = [];
  const strengths: string[] = [];
  const warnings: string[] = [];

  // Check for position gaps (less than 2 players)
  ["PG", "CG", "Wing", "Forward", "Big"].forEach((pos) => {
    const count = positionCounts[pos] || 0;
    if (count === 0) {
      gaps.push(`No ${pos} on roster`);
    } else if (count === 1) {
      warnings.push(`Only 1 ${pos} (need depth)`);
    }
  });

  // Check for position strengths (3+ quality players)
  Object.entries(positionKPIs).forEach(([position, kpis]) => {
    const avgKPI = kpis.reduce((a, b) => a + b, 0) / kpis.length;
    if (kpis.length >= 3 && avgKPI >= 70) {
      strengths.push(`Strong ${position} depth (${kpis.length} players, avg ${avgKPI.toFixed(1)})`);
    }
  });

  const balanced = gaps.length === 0 && warnings.length <= 1;

  return { balanced, gaps, strengths, warnings };
}

/**
 * Calculate budget health metrics
 */
export function calculateBudgetHealth(
  scholarshipUsed: number,
  scholarshipCap: number,
  nilUsed: number,
  nilPool: number
): {
  scholarshipPercentage: number;
  nilPercentage: number;
  scholarshipRemaining: number;
  nilRemaining: number;
  overbudget: boolean;
  warnings: string[];
} {
  const scholarshipPercentage = (scholarshipUsed / scholarshipCap) * 100;
  const nilPercentage = (nilUsed / nilPool) * 100;
  const scholarshipRemaining = scholarshipCap - scholarshipUsed;
  const nilRemaining = nilPool - nilUsed;

  const warnings: string[] = [];
  let overbudget = false;

  if (scholarshipPercentage > 100) {
    warnings.push("Scholarship budget exceeded");
    overbudget = true;
  } else if (scholarshipPercentage > 90) {
    warnings.push("Scholarship budget nearly exhausted");
  }

  if (nilPercentage > 100) {
    warnings.push("NIL budget exceeded");
    overbudget = true;
  } else if (nilPercentage > 90) {
    warnings.push("NIL budget nearly exhausted");
  }

  return {
    scholarshipPercentage,
    nilPercentage,
    scholarshipRemaining,
    nilRemaining,
    overbudget,
    warnings,
  };
}
