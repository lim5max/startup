import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { ArrowLeft01Icon } from 'hugeicons-react';

export function Settings() {
  const navigate = useNavigate();
  const { userEmail } = useAuth();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
        >
          <ArrowLeft01Icon size={18} />
        </button>
        <h1 className="text-lg font-bold tracking-[-0.03em]">Settings</h1>
      </div>

      <Card className="space-y-4">
        <div>
          <label className="text-xs text-text-muted">Display Name</label>
          <input
            defaultValue="Alex Morgan"
            className="w-full bg-input-bg border border-input-border rounded-input px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent transition-colors mt-1"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted">Email</label>
          <input
            value={userEmail || 'demo@nexus.io'}
            readOnly
            className="w-full bg-input-bg border border-input-border rounded-input px-4 py-2.5 text-sm text-text-muted mt-1 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted">Language</label>
          <select className="w-full bg-input-bg border border-input-border rounded-input px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent transition-colors mt-1 cursor-pointer">
            <option>English</option>
            <option>Russian</option>
          </select>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-primary">Push Notifications</p>
            <p className="text-xs text-text-muted">Receive alerts about your investments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-10 h-5 bg-card-border rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-text-primary after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
          </label>
        </div>
      </Card>
    </div>
  );
}
