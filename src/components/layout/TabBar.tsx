import { NavLink } from 'react-router-dom';
import { Home01Icon, ChartLineData02Icon, HelpCircleIcon, UserIcon } from 'hugeicons-react';

const tabs = [
  { to: '/home', icon: Home01Icon, label: 'Home' },
  { to: '/strategies', icon: ChartLineData02Icon, label: 'Strategies' },
  { to: '/support', icon: HelpCircleIcon, label: 'Support' },
  { to: '/profile', icon: UserIcon, label: 'Profile' },
];

export function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-card-border z-50">
      <div className="flex items-center justify-around max-w-[712px] mx-auto h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 transition-colors ${
                isActive ? 'text-accent' : 'text-text-muted hover:text-text-secondary'
              }`
            }
          >
            <Icon size={22} strokeWidth={1.5} />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
