import { useParams, useNavigate } from 'react-router-dom';
import { strategies } from '../../data/strategies';
import { useKYC } from '../../context/KYCContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Chart } from '../../components/ui/Chart';
import {
  ArrowLeft01Icon,
  ZapIcon,
  Target02Icon,
  ChartLineData03Icon,
  SecurityCheckIcon,
} from 'hugeicons-react';

const strategyIcons: Record<string, typeof ZapIcon> = {
  ZapIcon,
  Target02Icon,
  ChartLineData03Icon,
  SecurityCheckIcon,
};

export function StrategyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { kycCompleted } = useKYC();
  const strategy = strategies.find((s) => s.id === id);

  if (!strategy) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Strategy not found</p>
      </div>
    );
  }

  const chartData = strategy.monthlyReturns.map((d) => ({ date: d.month, value: d.value }));
  const Icon = strategyIcons[strategy.icon] || ZapIcon;

  const params = [
    { label: 'Trading Pair', value: strategy.pair },
    { label: 'Strategy Type', value: strategy.term },
    { label: 'Leverage', value: strategy.leverage },
    { label: 'Entry Volume', value: `${strategy.entryPercent}%` },
    { label: 'Monthly Return', value: strategy.returnRange },
    { label: 'Risk Management', value: strategy.riskPercent },
    { label: 'Min Deposit', value: `$${strategy.minDeposit.toLocaleString()}` },
    { label: 'Hold Periods', value: strategy.holdPeriods },
    { label: 'Profit Withdrawal', value: strategy.withdrawSchedule },
  ];

  if (strategy.maxPool) {
    params.push({ label: 'Max Pool', value: strategy.maxPool });
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
        >
          <ArrowLeft01Icon size={18} />
        </button>
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-[12px] flex items-center justify-center"
            style={{ backgroundColor: strategy.color + '15', border: `1px solid ${strategy.color}25` }}
          >
            <Icon size={18} style={{ color: strategy.color }} />
          </div>
          <h1 className="text-lg font-bold tracking-[-0.03em]">{strategy.name}</h1>
          <Badge variant={strategy.riskLevel === 'High' ? 'danger' : strategy.riskLevel === 'Low' ? 'success' : 'warning'}>
            {strategy.riskLevel} Risk
          </Badge>
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-text-primary mb-0.5">Monthly Performance</p>
            <p className="text-xs text-text-muted">Last 12 months returns</p>
          </div>
          <span className="text-lg font-bold text-positive tabular-nums">+{strategy.monthlyReturns[strategy.monthlyReturns.length - 1].value}%</span>
        </div>
        <Chart data={chartData} showYAxis height={200} color="#3B82F6" showLabel={false} yAxisFormat="percent" />
      </Card>

      {/* Description */}
      <Card>
        <p className="text-sm text-text-secondary leading-relaxed">{strategy.description}</p>
      </Card>

      {/* Parameters */}
      <Card>
        <p className="text-sm font-medium text-text-primary mb-4">Parameters</p>
        <div className="space-y-3">
          {params.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-text-muted">{label}</span>
              <span className="text-sm font-medium text-text-primary">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <button
        onClick={() => kycCompleted ? navigate(`/deposit?strategy=${strategy.id}`) : navigate('/kyc')}
        className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
      >
        {kycCompleted ? `Invest in ${strategy.name}` : 'Complete KYC to Invest'}
      </button>
    </div>
  );
}
