import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft01Icon } from 'hugeicons-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/reset-sent');
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-[390px]">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors mb-8">
          <ArrowLeft01Icon size={16} />
          Back
        </Link>

        <h1 className="text-xl font-bold tracking-[-0.03em] text-text-primary mb-2">Reset Password</h1>
        <p className="text-sm text-text-muted mb-8">Enter your email and we'll send you a reset link</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-text-secondary pl-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
