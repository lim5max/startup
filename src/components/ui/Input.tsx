import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-text-secondary pl-1">{label}</label>}
      <input
        className={`bg-input-bg border border-input-border rounded-input px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors min-h-11 ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-danger pl-1">{error}</span>}
    </div>
  );
}
