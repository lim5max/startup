import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useKYC } from '../../context/KYCContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Settings01Icon,
  HelpCircleIcon,
  SecurityCheckIcon,
  Notification01Icon,
  ArrowRight01Icon,
  Logout01Icon,
  Delete01Icon,
} from 'hugeicons-react';

export function Profile() {
  const { userEmail, logout } = useAuth();
  const { kycCompleted, resetKYC } = useKYC();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetAll = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const initials = (userEmail || 'DU').slice(0, 2).toUpperCase();

  const menuItems = [
    { icon: Settings01Icon, label: 'Settings', to: '/profile/settings' },
    { icon: Notification01Icon, label: 'Notifications', to: '/profile/settings' },
    { icon: SecurityCheckIcon, label: 'Security', to: '/profile/settings' },
    { icon: HelpCircleIcon, label: 'Support & Help', to: '/support' },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-[-0.03em]">Profile</h1>

      {/* User Info */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-card-border flex items-center justify-center text-sm font-bold text-text-primary">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{userEmail || 'demo@nexus.io'}</p>
            <p className="text-xs text-text-muted">Member since January 2025</p>
          </div>
        </div>
      </Card>

      {/* KYC Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-card flex items-center justify-center ${kycCompleted ? 'bg-accent/10 border border-accent/20' : 'bg-warning/10 border border-warning/20'}`}>
              <SecurityCheckIcon size={18} className={kycCompleted ? 'text-accent' : 'text-warning'} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">KYC Verification</p>
              <Badge variant={kycCompleted ? 'success' : 'warning'} className="mt-1">
                {kycCompleted ? 'Verified' : 'Not Verified'}
              </Badge>
            </div>
          </div>
          {!kycCompleted ? (
            <button
              onClick={() => navigate('/kyc')}
              className="text-xs font-medium text-accent hover:text-accent-hover transition-colors cursor-pointer"
            >
              Complete
            </button>
          ) : (
            <button
              onClick={resetKYC}
              className="text-[10px] text-text-muted hover:text-danger transition-colors cursor-pointer px-2 py-1 border border-card-border rounded-card"
            >
              Reset KYC
            </button>
          )}
        </div>
      </Card>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map(({ icon: Icon, label, to }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="w-full flex items-center justify-between p-3 rounded-card hover:bg-card transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-text-muted" />
              <span className="text-sm text-text-primary">{label}</span>
            </div>
            <ArrowRight01Icon size={16} className="text-text-muted" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-3 rounded-card hover:bg-danger/5 transition-colors cursor-pointer"
      >
        <Logout01Icon size={20} className="text-danger" />
        <span className="text-sm text-danger">Log Out</span>
      </button>

      {/* Dev: Reset All */}
      <button
        onClick={handleResetAll}
        className="w-full flex items-center gap-3 p-3 rounded-card hover:bg-danger/5 transition-colors cursor-pointer border border-dashed border-card-border"
      >
        <Delete01Icon size={20} className="text-text-muted" />
        <div className="text-left">
          <span className="text-sm text-text-muted">Reset All Data</span>
          <p className="text-[10px] text-text-muted">Dev: clear localStorage & restart</p>
        </div>
      </button>
    </div>
  );
}
