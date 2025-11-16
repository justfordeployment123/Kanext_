// Evaluation utility functions for KPI and Fit calculations

export interface CoachingBias {
  positionalImportance: {
    PG: number;
    CG: number;
    Wing: number;
    Forward: number;
    Big: number;
  };
  clusterWeighting: {
    creation: number;
    shooting: number;
    finishing: number;
    playmaking: number;
    defense: number;
    rebounding: number;
    athleticism: number;
    bbiq: number;
  };
  offensiveSystem: string;
  defensiveSystem: string;
}

export interface PlayerTraits {
  creation: number;
  shooting: number;
  finishing: number;
  playmaking: number;
  defense: number;
  rebounding: number;
  athleticism: number;
  bbiq: number;
}

// Position-to-trait importance mapping
const POSITION_TRAIT_MATRIX: Record<string, Record<string, number>> = {
  PG: {
    creation: 1.2,
    playmaking: 1.3,
    shooting: 1.0,
    finishing: 0.9,
    defense: 1.0,
    rebounding: 0.6,
    athleticism: 1.0,
    bbiq: 1.3,
  },
  CG: {
    creation: 1.1,
    playmaking: 0.9,
    shooting: 1.3,
    finishing: 1.0,
    defense: 1.1,
    rebounding: 0.7,
    athleticism: 1.1,
    bbiq: 1.1,
  },
  Wing: {
    creation: 1.0,
    playmaking: 0.8,
    shooting: 1.2,
    finishing: 1.1,
    defense: 1.2,
    rebounding: 0.9,
    athleticism: 1.2,
    bbiq: 1.0,
  },
  Forward: {
    creation: 0.8,
    playmaking: 0.7,
    shooting: 1.0,
    finishing: 1.2,
    defense: 1.1,
    rebounding: 1.3,
    athleticism: 1.1,
    bbiq: 1.0,
  },
  Big: {
    creation: 0.6,
    playmaking: 0.5,
    shooting: 0.8,
    finishing: 1.3,
    defense: 1.2,
    rebounding: 1.4,
    athleticism: 1.0,
    bbiq: 1.1,
  },
};

// System-to-trait importance mapping
const SYSTEM_TRAIT_MATRIX: Record<string, Record<string, number>> = {
  "Five-Out": {
    creation: 1.2,
    shooting: 1.4,
    playmaking: 1.1,
    finishing: 0.9,
    defense: 1.0,
    rebounding: 0.8,
    athleticism: 1.0,
    bbiq: 1.1,
  },
  "Motion": {
    creation: 1.0,
    shooting: 1.2,
    playmaking: 1.2,
    finishing: 1.0,
    defense: 1.0,
    rebounding: 1.0,
    athleticism: 1.0,
    bbiq: 1.3,
  },
  "Princeton": {
    creation: 0.9,
    shooting: 1.1,
    playmaking: 1.3,
    finishing: 1.0,
    defense: 1.0,
    rebounding: 1.0,
    athleticism: 0.9,
    bbiq: 1.4,
  },
  "Pack Line": {
    creation: 1.0,
    shooting: 1.0,
    playmaking: 1.0,
    finishing: 1.0,
    defense: 1.4,
    rebounding: 1.2,
    athleticism: 1.1,
    bbiq: 1.2,
  },
  "Man-to-Man": {
    creation: 1.0,
    shooting: 1.0,
    playmaking: 1.0,
    finishing: 1.0,
    defense: 1.3,
    rebounding: 1.0,
    athleticism: 1.2,
    bbiq: 1.1,
  },
  "Zone": {
    creation: 1.0,
    shooting: 1.0,
    playmaking: 1.1,
    finishing: 1.0,
    defense: 1.2,
    rebounding: 1.3,
    athleticism: 1.0,
    bbiq: 1.2,
  },
};

/**
 * Calculate the weighted KPI based on coaching bias
 */
export function calculateWeightedKPI(
  playerTraits: PlayerTraits,
  position: string,
  coachingBias: CoachingBias
): number {
  const positionMatrix = POSITION_TRAIT_MATRIX[position] || POSITION_TRAIT_MATRIX["Wing"];
  const offensiveMatrix = SYSTEM_TRAIT_MATRIX[coachingBias.offensiveSystem] || {};
  const defensiveMatrix = SYSTEM_TRAIT_MATRIX[coachingBias.defensiveSystem] || {};
  
  let weightedSum = 0;
  let totalWeight = 0;

  // Calculate weighted traits
  Object.keys(playerTraits).forEach((trait) => {
    const traitKey = trait as keyof PlayerTraits;
    const traitValue = playerTraits[traitKey];
    
    // Get weights from different sources
    const coachWeight = coachingBias.clusterWeighting[traitKey] / 100; // Normalize to 0-1
    const positionWeight = positionMatrix[traitKey] || 1.0;
    const offensiveWeight = offensiveMatrix[traitKey] || 1.0;
    const defensiveWeight = defensiveMatrix[traitKey] || 1.0;
    
    // Combined weight (coach bias is most important)
    const combinedWeight = coachWeight * 2.0 + positionWeight + offensiveWeight + defensiveWeight;
    
    weightedSum += traitValue * combinedWeight;
    totalWeight += combinedWeight;
  });

  // Normalize to 0-100 scale
  const rawKPI = weightedSum / totalWeight;
  return Math.round(rawKPI * 10) / 10; // Round to 1 decimal
}

/**
 * Calculate the Fit % based on how well the player matches the system
 */
export function calculateFitPercentage(
  playerTraits: PlayerTraits,
  position: string,
  coachingBias: CoachingBias
): number {
  const positionMatrix = POSITION_TRAIT_MATRIX[position] || POSITION_TRAIT_MATRIX["Wing"];
  const offensiveMatrix = SYSTEM_TRAIT_MATRIX[coachingBias.offensiveSystem] || {};
  const defensiveMatrix = SYSTEM_TRAIT_MATRIX[coachingBias.defensiveSystem] || {};
  
  let fitSum = 0;
  let maxFit = 0;

  Object.keys(playerTraits).forEach((trait) => {
    const traitKey = trait as keyof PlayerTraits;
    const traitValue = playerTraits[traitKey];
    
    // Get importance weights
    const coachWeight = coachingBias.clusterWeighting[traitKey] / 100;
    const positionWeight = positionMatrix[traitKey] || 1.0;
    const offensiveWeight = offensiveMatrix[traitKey] || 1.0;
    const defensiveWeight = defensiveMatrix[traitKey] || 1.0;
    
    // Calculate ideal trait value based on weights
    const idealWeight = (coachWeight * 2.0 + positionWeight + offensiveWeight + defensiveWeight) / 5.5;
    const idealValue = idealWeight * 100;
    
    // Calculate how close the player is to ideal (0-100)
    const difference = Math.abs(traitValue - idealValue);
    const similarity = Math.max(0, 100 - difference);
    
    fitSum += similarity * idealWeight;
    maxFit += 100 * idealWeight;
  });

  // Normalize to percentage
  const fitPercentage = (fitSum / maxFit) * 100;
  return Math.round(fitPercentage);
}

/**
 * Calculate scholarship suggestion based on KPI and program level
 */
export function calculateScholarshipSuggestion(
  kpi: number,
  programLevel: string,
  scholarshipCap: number
): number {
  // Base scholarship as percentage of cap
  let basePercentage = 0;
  
  if (kpi >= 85) basePercentage = 1.0; // Full scholarship
  else if (kpi >= 75) basePercentage = 0.75;
  else if (kpi >= 65) basePercentage = 0.5;
  else if (kpi >= 55) basePercentage = 0.35;
  else basePercentage = 0.2;
  
  // Adjust based on program level
  const levelMultipliers: Record<string, number> = {
    "D1": 1.0,
    "D2": 0.8,
    "D3": 0.6,
    "JUCO": 0.7,
    "NAIA": 0.75,
  };
  
  const multiplier = levelMultipliers[programLevel] || 0.7;
  const suggestion = (scholarshipCap * basePercentage * multiplier);
  
  return Math.round(suggestion / 100) * 100; // Round to nearest 100
}

/**
 * Calculate NIL value suggestion based on KPI and NIL pool
 */
export function calculateNILSuggestion(
  kpi: number,
  nilReadiness: string,
  nilPool: number
): number {
  let basePercentage = 0;
  
  if (kpi >= 85) basePercentage = 0.25;
  else if (kpi >= 75) basePercentage = 0.18;
  else if (kpi >= 65) basePercentage = 0.12;
  else if (kpi >= 55) basePercentage = 0.08;
  else basePercentage = 0.05;
  
  // Adjust based on NIL readiness
  const readinessMultipliers: Record<string, number> = {
    "High": 1.3,
    "Medium": 1.0,
    "Low": 0.7,
  };
  
  const multiplier = readinessMultipliers[nilReadiness] || 1.0;
  const suggestion = (nilPool * basePercentage * multiplier);
  
  return Math.round(suggestion / 100) * 100; // Round to nearest 100
}

/**
 * Determine role projection based on traits and position
 */
export function determineRoleProjection(
  playerTraits: PlayerTraits,
  position: string,
  kpi: number
): string {
  if (kpi >= 85) return "Star / Primary Option";
  if (kpi >= 75) return "Starter / Key Contributor";
  if (kpi >= 65) return "Rotation Player";
  if (kpi >= 55) return "Depth / Situational";
  return "Developmental / Bench";
}

/**
 * Calculate Pro Market Value projection (for high-confidence upperclassmen)
 */
export function calculateProMarketValue(
  kpi: number,
  playerTraits: PlayerTraits,
  position: string
): number {
  // Base value on KPI
  let baseValue = 0;
  
  if (kpi >= 90) baseValue = 5000000; // $5M+
  else if (kpi >= 85) baseValue = 2000000; // $2M
  else if (kpi >= 80) baseValue = 1000000; // $1M
  else if (kpi >= 75) baseValue = 500000; // $500K
  else baseValue = 200000; // $200K
  
  // Adjust based on key traits for pro level
  const proTraitBonus = (
    playerTraits.athleticism * 0.02 +
    playerTraits.shooting * 0.015 +
    playerTraits.defense * 0.015
  );
  
  return Math.round(baseValue * (1 + proTraitBonus / 100));
}
