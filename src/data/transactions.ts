export type TransactionType = 'profit' | 'deposit' | 'withdrawal' | 'referral';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
}

export const transactions: Transaction[] = [
  { id: '1', type: 'profit', title: 'RED Strategy Profit', subtitle: 'Weekly distribution', amount: 234.50, date: 'Mar 26' },
  { id: '2', type: 'deposit', title: 'Deposit', subtitle: 'USDT TRC-20', amount: 5000.00, date: 'Mar 24' },
  { id: '3', type: 'referral', title: 'Referral Bonus', subtitle: 'User invited', amount: 50.00, date: 'Mar 22' },
  { id: '4', type: 'profit', title: 'BLUE Strategy Profit', subtitle: 'Weekly distribution', amount: 187.30, date: 'Mar 19' },
  { id: '5', type: 'withdrawal', title: 'Withdrawal', subtitle: 'To wallet', amount: -1200.00, date: 'Mar 17' },
  { id: '6', type: 'profit', title: 'HALAL Strategy Profit', subtitle: 'Weekly distribution', amount: 92.15, date: 'Mar 12' },
  { id: '7', type: 'deposit', title: 'Deposit', subtitle: 'USDT BEP-20', amount: 10000.00, date: 'Mar 10' },
  { id: '8', type: 'referral', title: 'Referral Bonus', subtitle: 'User invited', amount: 50.00, date: 'Mar 8' },
  { id: '9', type: 'profit', title: 'RED Strategy Profit', subtitle: 'Weekly distribution', amount: 312.80, date: 'Mar 5' },
  { id: '10', type: 'withdrawal', title: 'Withdrawal', subtitle: 'To wallet', amount: -800.00, date: 'Mar 3' },
];

export const transactionMeta: Record<TransactionType, { color: string; bgColor: string }> = {
  profit: { color: '#22C55E', bgColor: '#22C55E15' },
  deposit: { color: '#3B82F6', bgColor: '#3B82F615' },
  withdrawal: { color: '#F97316', bgColor: '#F9731615' },
  referral: { color: '#A78BFA', bgColor: '#A78BFA15' },
};
