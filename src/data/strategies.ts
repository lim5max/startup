export interface Strategy {
  id: string;
  name: string;
  color: string;
  icon: string;
  pair: string;
  type: string;
  term: string;
  leverage: string;
  entryPercent: number;
  returnRange: string;
  riskLevel: string;
  riskPercent: string;
  minDeposit: number;
  maxDeposit?: number;
  maxPool?: string;
  holdPeriods: string;
  withdrawSchedule: string;
  description: string;
  monthlyReturns: { month: string; value: number }[];
}

export const strategies: Strategy[] = [
  {
    id: 'red',
    name: 'RED',
    color: '#F87171',
    icon: 'ZapIcon',
    pair: 'Altcoins / Futures',
    type: 'Trading Systems',
    term: 'Short-term scalping',
    leverage: 'x20',
    entryPercent: 20,
    returnRange: '10–30%',
    riskLevel: 'High',
    riskPercent: '100%',
    minDeposit: 100,
    maxDeposit: 1000,
    maxPool: '$2M',
    holdPeriods: '1 / 3 / 6 / 12 months',
    withdrawSchedule: 'Every 2 weeks (order Sat, receive Mon)',
    description: 'Aggressive short-term scalping strategy on altcoins and futures. Fully automated AI trading system with x20 leverage and up to 20% position entry volume. Maximum risk with maximum potential returns.',
    monthlyReturns: [
      { month: 'Apr', value: 18.2 }, { month: 'May', value: 24.5 }, { month: 'Jun', value: 12.1 },
      { month: 'Jul', value: 28.7 }, { month: 'Aug', value: 15.3 }, { month: 'Sep', value: 22.0 },
      { month: 'Oct', value: 30.0 }, { month: 'Nov', value: 11.4 }, { month: 'Dec', value: 26.8 },
      { month: 'Jan', value: 19.5 }, { month: 'Feb', value: 14.2 }, { month: 'Mar', value: 21.3 },
    ],
  },
  {
    id: 'blue',
    name: 'BLUE',
    color: '#60A5FA',
    icon: 'Target02Icon',
    pair: 'BTC / USDT Futures',
    type: 'Trading Systems',
    term: 'Intraday',
    leverage: 'x20',
    entryPercent: 20,
    returnRange: '8–15%',
    riskLevel: 'Medium',
    riskPercent: '30% forced fix',
    minDeposit: 1000,
    holdPeriods: '1 / 3 / 6 / 12 months',
    withdrawSchedule: 'Every 2 weeks',
    description: 'Balanced intraday strategy on BTC/USDT futures. Fully automated AI system with x20 leverage and 30% forced position fixation for risk management. Trusted management with pool-based liquidity.',
    monthlyReturns: [
      { month: 'Apr', value: 9.8 }, { month: 'May', value: 12.3 }, { month: 'Jun', value: 8.5 },
      { month: 'Jul', value: 14.1 }, { month: 'Aug', value: 10.7 }, { month: 'Sep', value: 11.9 },
      { month: 'Oct', value: 13.5 }, { month: 'Nov', value: 9.2 }, { month: 'Dec', value: 15.0 },
      { month: 'Jan', value: 11.4 }, { month: 'Feb', value: 8.8 }, { month: 'Mar', value: 12.6 },
    ],
  },
  {
    id: 'green',
    name: 'GREEN',
    color: '#4ADE80',
    icon: 'ChartLineData03Icon',
    pair: 'BTC / USDT Futures',
    type: 'Trading Systems',
    term: 'Mid-term',
    leverage: 'x20',
    entryPercent: 20,
    returnRange: '15–25%',
    riskLevel: 'Medium',
    riskPercent: '30% forced fix',
    minDeposit: 50000,
    holdPeriods: '1 / 3 / 6 / 12 months',
    withdrawSchedule: 'Once a month',
    description: 'Premium mid-term strategy for large deposits. BTC/USDT futures with x20 leverage and automated risk management. Higher returns with 30% forced position fixation. Minimum deposit $50,000.',
    monthlyReturns: [
      { month: 'Apr', value: 18.5 }, { month: 'May', value: 22.1 }, { month: 'Jun', value: 16.3 },
      { month: 'Jul', value: 24.8 }, { month: 'Aug', value: 19.2 }, { month: 'Sep', value: 21.0 },
      { month: 'Oct', value: 25.0 }, { month: 'Nov', value: 15.7 }, { month: 'Dec', value: 23.4 },
      { month: 'Jan', value: 20.1 }, { month: 'Feb', value: 17.6 }, { month: 'Mar', value: 22.8 },
    ],
  },
  {
    id: 'halal',
    name: 'HALAL',
    color: '#C4B5FD',
    icon: 'SecurityCheckIcon',
    pair: 'BTC / USDT Futures',
    type: 'Trading Systems',
    term: 'Mid-term',
    leverage: 'x1',
    entryPercent: 40,
    returnRange: '7–9%',
    riskLevel: 'Low',
    riskPercent: '30% forced fix',
    minDeposit: 1000,
    holdPeriods: '1 / 3 / 6 / 12 months',
    withdrawSchedule: 'Once a month',
    description: 'Conservative Shariah-compliant strategy with no leverage. BTC/USDT futures with x1 leverage and up to 40% entry volume. Lowest risk profile with steady returns and forced position fixation.',
    monthlyReturns: [
      { month: 'Apr', value: 7.8 }, { month: 'May', value: 8.5 }, { month: 'Jun', value: 7.2 },
      { month: 'Jul', value: 9.0 }, { month: 'Aug', value: 7.5 }, { month: 'Sep', value: 8.1 },
      { month: 'Oct', value: 8.8 }, { month: 'Nov', value: 7.3 }, { month: 'Dec', value: 9.0 },
      { month: 'Jan', value: 8.2 }, { month: 'Feb', value: 7.6 }, { month: 'Mar', value: 8.4 },
    ],
  },
];
