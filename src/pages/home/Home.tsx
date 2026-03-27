import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useKYC } from '../../context/KYCContext';
import { walletBalance, walletChange, chartData, activeStrategies, type TimePeriod } from '../../data/portfolio';
import { transactions, transactionMeta, type Transaction } from '../../data/transactions';
import { Chart } from '../../components/ui/Chart';
import { TimePeriodSelector } from '../../components/ui/TimePeriodSelector';
import { Card } from '../../components/ui/Card';
import {
  Add01Icon,
  ArrowUpRight01Icon,
  AnalyticsUpIcon,
  Cancel01Icon,
  SecurityCheckIcon,
  Notification03Icon,
  ArrowMoveDownLeftIcon,
  ArrowMoveUpRightIcon,
  PercentIcon,
  UserAdd01Icon,
  ChartLineData03Icon,
  Clock01Icon,
  ZapIcon,
  Target02Icon,
} from 'hugeicons-react';

const strategyIcons: Record<string, typeof Add01Icon> = {
  ZapIcon,
  Target02Icon,
  ChartLineData03Icon,
  SecurityCheckIcon,
};

const txIcons: Record<string, typeof Add01Icon> = {
  profit: PercentIcon,
  deposit: ArrowMoveDownLeftIcon,
  withdrawal: ArrowMoveUpRightIcon,
  referral: UserAdd01Icon,
};

function TransactionRow({ tx }: { tx: Transaction }) {
  const meta = transactionMeta[tx.type];
  const Icon = txIcons[tx.type];
  const isPositive = tx.amount >= 0;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-card-border/40 last:border-0">
      <div
        className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
        style={{ backgroundColor: meta.bgColor, border: `1px solid ${meta.color}20` }}
      >
        <Icon size={16} style={{ color: meta.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{tx.title}</p>
        <p className="text-xs text-text-secondary">{tx.subtitle}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold tabular-nums text-text-primary">
          {isPositive ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] text-text-secondary">{tx.date}</p>
      </div>
    </div>
  );
}

function BalanceDisplay({ zero }: { zero?: boolean }) {
  if (zero) {
    return (
      <h1 className="text-[40px] font-bold tracking-[-0.04em] leading-none mb-2">
        <span className="text-text-primary">$0</span>
        <span className="text-[24px] font-semibold text-text-muted">.00</span>
      </h1>
    );
  }
  const intPart = Math.floor(walletBalance).toLocaleString('en-US');
  const centsPart = (walletBalance % 1).toFixed(2).slice(1);

  return (
    <h1 className="text-[40px] font-bold tracking-[-0.04em] leading-none mb-2">
      <span className="text-text-primary">${intPart}</span>
      <span className="text-[24px] font-semibold text-text-muted">{centsPart}</span>
    </h1>
  );
}

/* SVG illustration for empty states */
function EmptyIllustration({ icon: Icon, color = '#3B82F6' }: { icon: typeof Add01Icon; color?: string }) {
  return (
    <div className="relative w-14 h-14 mx-auto mb-3">
      <div className="absolute inset-0 rounded-full opacity-[0.08]" style={{ backgroundColor: color }} />
      <div className="absolute inset-2 rounded-full opacity-[0.06]" style={{ backgroundColor: color }} />
      <div className="relative w-14 h-14 flex items-center justify-center">
        <Icon size={24} style={{ color }} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function Home() {
  const [period, setPeriod] = useState<TimePeriod>('1M');
  const { kycCompleted } = useKYC();
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const [kycDismissed, setKycDismissed] = useState(false);

  const userName = userEmail ? userEmail.split('@')[0] : 'User';
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div className="space-y-3 -mx-4">
      {/* ═══ HERO CARD: header + balance + actions + chart + period ═══ */}
      <div className="mx-4 rounded-card bg-card border border-card-border overflow-hidden relative">
        {/* Subtle glow — only when has balance */}
        {kycCompleted && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[280px] h-[160px] bg-positive/[0.04] rounded-full blur-[60px] pointer-events-none" />
        )}

        <div className="relative">
          {/* Header bar */}
          <div className="px-4 pt-4">
            {kycCompleted ? (
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[12px] bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent tracking-tight">N</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{displayName}</span>
                </div>
                <button className="relative w-9 h-9 flex items-center justify-center rounded-[12px] bg-surface border border-card-border hover:border-text-muted transition-colors cursor-pointer">
                  <Notification03Icon size={18} className="text-text-secondary" />
                  <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-accent rounded-full" />
                </button>
              </div>
            ) : !kycDismissed ? (
              <div className="mb-4 p-3 rounded-[12px] bg-warning/[0.04] border border-warning/20 relative">
                <button
                  onClick={() => setKycDismissed(true)}
                  className="absolute top-2.5 right-2.5 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
                >
                  <Cancel01Icon size={14} />
                </button>
                <div className="flex items-start gap-3 pr-5">
                  <div className="w-8 h-8 rounded-[10px] bg-warning/10 flex items-center justify-center shrink-0">
                    <SecurityCheckIcon size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-0.5">Complete KYC</p>
                    <p className="text-xs text-text-muted mb-2.5">Required to start investing</p>
                    <button
                      onClick={() => navigate('/kyc')}
                      className="px-4 py-1.5 rounded-full bg-warning/15 border border-warning/25 text-xs font-medium text-warning hover:bg-warning/20 transition-colors cursor-pointer"
                    >
                      Verify now
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-3" />
            )}

            {/* Balance */}
            <div className="text-center mb-4">
              <p className="text-xs text-text-muted mb-1.5">Total Balance</p>
              <BalanceDisplay zero={!kycCompleted} />
              {kycCompleted ? (
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${walletChange.percent >= 0 ? 'text-positive' : 'text-danger'}`}>
                  {walletChange.percent >= 0 ? '+' : ''}{walletChange.percent}%
                  <span className="text-text-muted font-normal">
                    (${walletChange.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                  </span>
                </span>
              ) : (
                <span className="text-sm text-text-muted">Complete KYC to get started</span>
              )}
            </div>

            {/* Quick Actions — inside card */}
            <div className="flex gap-2 mb-4">
              {[
                { icon: Add01Icon, label: 'Deposit', action: () => navigate('/deposit') },
                { icon: ArrowUpRight01Icon, label: 'Withdraw', action: () => {} },
                { icon: AnalyticsUpIcon, label: 'Analytics', action: () => {} },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex-1 flex flex-col items-center gap-2 py-3 rounded-[12px] bg-surface/60 border border-card-border/60 hover:border-text-muted/40 transition-colors cursor-pointer"
                >
                  <Icon size={24} className="text-text-primary" strokeWidth={2} />
                  <span className="text-[11px] text-text-secondary font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chart — bleeds to bottom of card, no padding */}
          <div className="-mb-[1px] relative">
            {kycCompleted && (
              <div className="absolute top-1 left-3 z-10 text-[11px] text-text-muted">
                Portfolio Balance
              </div>
            )}
            {kycCompleted ? (
              <Chart data={chartData[period]} height={160} seamless showYAxis showRefLine showLabel={false} color="#3B82F6" />
            ) : (
              <div className="h-[120px] flex items-center justify-center">
                <p className="text-xs text-text-muted/60">No data yet</p>
              </div>
            )}
          </div>

          {/* Period selector — inside card at bottom */}
          <div className="flex justify-center py-3 border-t border-card-border/30">
            <TimePeriodSelector selected={period} onChange={setPeriod} />
          </div>
        </div>
      </div>

      {/* ═══ BENTO GRID ═══ */}
      <div className="px-4 grid grid-cols-2 gap-2.5">

        {/* Active Strategies — full width */}
        <div className="col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-text-primary">Active Strategies</p>
              <button
                onClick={() => navigate('/strategies')}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
              >
                View all
              </button>
            </div>
            {!kycCompleted ? (
              <div className="text-center py-5">
                <EmptyIllustration icon={ChartLineData03Icon} />
                <p className="text-sm text-text-muted mb-1">No active strategies</p>
                <p className="text-xs text-text-muted/60 mb-3">Verify your identity to start investing</p>
                <button
                  onClick={() => navigate('/kyc')}
                  className="px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent hover:bg-accent/15 transition-colors cursor-pointer"
                >
                  Complete KYC
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {activeStrategies.map((s) => {
                  const SIcon = strategyIcons[s.icon] || ZapIcon;
                  return (
                  <button
                    key={s.id}
                    onClick={() => navigate(`/strategies/${s.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-[12px] bg-surface/50 hover:bg-surface transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                        style={{ backgroundColor: s.color + '15' }}
                      >
                        <SIcon size={16} style={{ color: s.color }} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">{s.name}</p>
                        <p className="text-xs text-text-muted">${s.allocated.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-positive tabular-nums">+{s.returnPercent}%</span>
                  </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Bento small cards */}
        <Card className="flex flex-col justify-between">
          <p className="text-xs text-text-muted mb-3">This Week</p>
          {kycCompleted ? (
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-positive mb-0.5">+$513.95</p>
              <p className="text-[10px] text-text-muted">Profit from 3 strategies</p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-text-muted/40 mb-0.5">$0.00</p>
              <p className="text-[10px] text-text-muted/60">No profit yet</p>
            </div>
          )}
        </Card>

        <Card className="flex flex-col justify-between">
          <p className="text-xs text-text-muted mb-3">Next Payout</p>
          {kycCompleted ? (
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-text-primary mb-0.5">3 days</p>
              <p className="text-[10px] text-text-muted">Estimated ~$480</p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold tracking-[-0.03em] text-text-muted/40 mb-0.5">—</p>
              <p className="text-[10px] text-text-muted/60">Start investing first</p>
            </div>
          )}
        </Card>

        {/* History — full width */}
        <div className="col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-text-primary">History</p>
              {kycCompleted && (
                <button className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
                  See all
                </button>
              )}
            </div>
            {kycCompleted ? (
              transactions.slice(0, 5).map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))
            ) : (
              <div className="text-center py-6">
                <EmptyIllustration icon={Clock01Icon} color="#888" />
                <p className="text-sm text-text-muted mb-0.5">No transactions yet</p>
                <p className="text-xs text-text-muted/60">Your activity will appear here</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
