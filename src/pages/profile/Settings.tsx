import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ArrowLeft01Icon } from 'hugeicons-react';

export function Settings() {
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" icon onClick={() => navigate(-1)}>
          <ArrowLeft01Icon size={18} />
        </Button>
        <h1 className="text-lg font-bold tracking-[-0.03em]">Settings</h1>
      </div>

      <Card className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">Display Name</label>
          <input
            defaultValue="Alex Morgan"
            className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3.5 text-sm text-text-primary min-h-11 outline-none focus:border-accent transition-colors mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text-secondary">Email</label>
          <input
            value={userEmail || 'demo@nexus.io'}
            readOnly
            className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3.5 text-sm text-text-muted min-h-11 mt-1 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text-secondary">Language</label>
          <div className="relative mt-1">
            <select className="w-full bg-input-bg border border-input-border rounded-input px-4 pr-10 py-3.5 text-sm text-text-primary min-h-11 outline-none focus:border-accent transition-colors cursor-pointer appearance-none">
              <option>English</option>
              <option>Russian</option>
            </select>
            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary">Push Notifications</p>
            <p className="text-sm text-text-muted">Receive alerts about your investments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-12 h-7 bg-card-border rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-text-primary after:rounded-full after:h-6 after:w-6 after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </div>
      </Card>
    </div>
  );
}
