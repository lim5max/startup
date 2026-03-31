import { NavLink } from 'react-router-dom';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/strategies', label: 'Strategies' },
  { to: '/support', label: 'Support' },
  { to: '/profile', label: 'Profile' },
];

export function TopNav() {
  return (
    <div className="sticky top-0 z-50 w-full max-w-[712px] mx-auto px-4">
      <nav className="bg-card/80 backdrop-blur-xl border-x border-b border-card-border rounded-b-[16px]">
        <div className="flex items-center justify-between px-6 h-14">
          <span className="text-sm font-semibold tracking-tight">NEXUS</span>
          <div className="flex gap-6">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? 'text-text-primary font-medium' : 'text-text-muted hover:text-text-secondary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
