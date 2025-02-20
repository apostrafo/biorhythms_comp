function calculateSingleBiorhythm(birthDate: Date, targetDate: Date, days: number): number[] {
  const birthTime = birthDate.getTime();
  const targetTime = targetDate.getTime();
  const daysDiff = (targetTime - birthTime) / (24 * 60 * 60 * 1000);
  
  return Array.from({ length: 30 }, (_, i) => {
    const day = daysDiff + (i - 15); // 15 days before and after
    return Math.sin((2 * Math.PI * day) / days);
  });
}

function calculateWaveCompatibility(value1: number[], value2: number[]): number {
  const compatibilityValues = value1.map((v1, i) => {
    const v2 = value2[i];
    return 1 - Math.abs(v1 - v2) / 2; // Convert difference to similarity (0-1 scale)
  });
  
  return compatibilityValues.reduce((sum, val) => sum + val, 0) / compatibilityValues.length;
}

function calculatePhaseCompatibility(birthDate1: Date, birthDate2: Date, cycleDays: number): number {
  const timeDiff = Math.abs(birthDate1.getTime() - birthDate2.getTime());
  const daysDiff = timeDiff / (24 * 60 * 60 * 1000);
  const phaseDiff = (daysDiff % cycleDays) / cycleDays;
  
  // Calculate compatibility based on phase difference
  // When phaseDiff is 0.5 (half cycle), compatibility is 0%
  // When phaseDiff is 0 or 1 (same phase), compatibility is 100%
  return (1 - Math.sin(Math.PI * phaseDiff)) * 0.9 + 0.05;
}

export function calculateBiorhythm(birthDate: Date) {
  const today = new Date();
  
  return {
    physical: calculateSingleBiorhythm(birthDate, today, 23),
    emotional: calculateSingleBiorhythm(birthDate, today, 28),
    intellectual: calculateSingleBiorhythm(birthDate, today, 33),
  };
}

export type CompatibilityMethod = 'wave' | 'phase';

export function calculateCompatibilityScores(
  birthDate1: Date,
  birthDate2: Date,
  biorhythm1: any,
  biorhythm2: any,
  method: CompatibilityMethod
) {
  let physical: number, emotional: number, intellectual: number;

  if (method === 'wave') {
    physical = calculateWaveCompatibility(biorhythm1.physical, biorhythm2.physical);
    emotional = calculateWaveCompatibility(biorhythm1.emotional, biorhythm2.emotional);
    intellectual = calculateWaveCompatibility(biorhythm1.intellectual, biorhythm2.intellectual);
  } else {
    physical = calculatePhaseCompatibility(birthDate1, birthDate2, 23);
    emotional = calculatePhaseCompatibility(birthDate1, birthDate2, 28);
    intellectual = calculatePhaseCompatibility(birthDate1, birthDate2, 33);
  }
  
  return {
    physical,
    emotional,
    intellectual,
    overall: (physical + emotional + intellectual) / 3
  };
}