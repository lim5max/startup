import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const variants = {
  primary: 'bg-accent text-bg hover:bg-accent-hover font-semibold',
  secondary: 'bg-transparent border border-card-border text-text-primary hover:border-text-secondary',
  danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-button transition-colors duration-150 cursor-pointer inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
