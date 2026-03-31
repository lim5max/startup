import { useNavigate } from 'react-router-dom';
import { strategies } from '../../data/strategies';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  ArrowRight01Icon,
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

export function Strategies() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-xl font-bold tracking-[-0.03em] mb-1">Strategies</h1>
      <p className="text-sm text-text-muted mb-5">Choose a strategy that fits your risk profile</p>

      <div className="space-y-3">
        {strategies.map((s) => {
          const Icon = strategyIcons[s.icon] || ZapIcon;
          return (
            <Card key={s.id} hover onClick={() => navigate(`/strategies/${s.id}`)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: s.color + '15', border: `1px solid ${s.color}25` }}
                  >
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-text-primary">{s.name}</p>
                      <Badge variant={s.riskLevel === 'High' ? 'danger' : s.riskLevel === 'Low' ? 'success' : 'warning'}>
                        {s.riskLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-muted mb-2">{s.pair} · {s.term}</p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-text-tertiary">Return</p>
                        <p className="text-sm font-semibold text-positive">{s.returnRange}/mo</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-tertiary">Min deposit</p>
                        <p className="text-sm font-medium text-text-primary">
                          ${s.minDeposit.toLocaleString()}
                          {s.maxDeposit ? `–$${s.maxDeposit.toLocaleString()}` : '+'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-tertiary">Leverage</p>
                        <p className="text-sm font-medium text-text-primary">{s.leverage}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <ArrowRight01Icon size={18} className="text-text-muted shrink-0 mt-3" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
