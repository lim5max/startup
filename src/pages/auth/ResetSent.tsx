import { Link } from 'react-router-dom';
import { MailOpen02Icon } from 'hugeicons-react';

export function ResetSent() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-[390px] text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
          <MailOpen02Icon size={28} className="text-accent" />
        </div>
        <h1 className="text-xl font-bold tracking-[-0.03em] text-text-primary mb-2">Check Your Email</h1>
        <p className="text-sm text-text-muted mb-8">
          We've sent a password reset link to your email address. Follow the instructions to reset your password.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
