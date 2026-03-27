import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-card border border-card-border rounded-card p-4 ${hover ? 'hover:border-text-muted transition-colors cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
