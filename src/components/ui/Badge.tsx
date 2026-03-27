import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'success' | 'danger' | 'warning' | 'neutral';
  children: ReactNode;
  className?: string;
}

const variants = {
  success: 'bg-positive/10 text-positive border-positive/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  neutral: 'bg-card-border/30 text-text-secondary border-card-border',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-button ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
