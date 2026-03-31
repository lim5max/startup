import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover font-semibold',
  secondary: 'bg-[#1E1E22] border border-card-border text-text-primary font-medium hover:border-text-secondary',
  danger: 'bg-danger/10 text-danger font-medium border border-danger/20 hover:bg-danger/20',
  ghost: 'bg-transparent text-text-secondary font-medium hover:text-text-primary',
};

const sizes = {
  sm: 'px-4 py-2.5 text-sm min-h-10',
  md: 'px-6 py-3.5 text-sm min-h-11',
  lg: 'px-8 py-4.5 text-base min-h-13',
};

const iconSizes = {
  sm: 'w-10 h-10',
  md: 'w-11 h-11',
  lg: 'w-13 h-13',
};

export function Button({ variant = 'primary', size = 'md', icon, iconLeft, iconRight, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full transition-colors duration-150 cursor-pointer inline-flex items-center justify-center ${icon ? iconSizes[size] : `gap-2 ${sizes[size]}`} ${variants[variant]} disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
