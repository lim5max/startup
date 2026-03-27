export const walletBalance = 75640.74;
export const walletChange = { percent: 2.04, amount: 1543.72 };

// Seeded pseudo-random for stable chart data
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateChartData(days: number, startValue: number, endValue: number, seed: number): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = [];
  const rng = seededRandom(seed);
  const now = new Date(2026, 2, 27); // fixed date

  // Generate random walk then normalize to hit start/end values
  const raw: number[] = [];
  let v = 0;
  for (let i = 0; i <= days; i++) {
    raw.push(v);
    // More volatility: bigger swings with occasional dips
    const swing = (rng() - 0.45) * 0.035;
    const spike = rng() > 0.92 ? (rng() - 0.5) * 0.06 : 0;
    v += swing + spike;
  }

  // Normalize: map raw[0]→startValue, raw[last]→endValue, scale in between
  const rawStart = raw[0];
  const rawEnd = raw[raw.length - 1];
  const rawRange = rawEnd - rawStart || 1;

  for (let i = 0; i <= days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i));
    // Linear interpolation base + deviation from straight line
    const t = i / days;
    const linearValue = startValue + (endValue - startValue) * t;
    const rawLinear = rawStart + rawRange * t;
    const deviation = (raw[i] - rawLinear) / Math.abs(rawRange) * (endValue - startValue) * 1.8;
    const value = Math.max(startValue * 0.85, linearValue + deviation);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value * 100) / 100,
    });
  }
  return data;
}

export const chartData = {
  '1W': generateChartData(7, 74100, walletBalance, 101),
  '1M': generateChartData(30, 68000, walletBalance, 202),
  '3M': generateChartData(90, 52000, walletBalance, 303),
  '6M': generateChartData(180, 38000, walletBalance, 404),
  '1Y': generateChartData(365, 22000, walletBalance, 505),
};

export type TimePeriod = keyof typeof chartData;

export const activeStrategies = [
  { id: 'red', name: 'RED', allocated: 15000, returnPercent: 18.2, color: '#F87171', icon: 'ZapIcon' },
  { id: 'blue', name: 'BLUE', allocated: 35000, returnPercent: 12.3, color: '#60A5FA', icon: 'Target02Icon' },
  { id: 'halal', name: 'HALAL', allocated: 25640.74, returnPercent: 8.1, color: '#C4B5FD', icon: 'SecurityCheckIcon' },
];
