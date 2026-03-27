import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ViewIcon, ViewOffIcon } from 'hugeicons-react';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email || 'demo@nexus.io', password || 'demo');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[390px] relative">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-text-primary mb-1">Create Account</h1>
          <p className="text-sm text-text-muted">Start investing with NEXUS</p>
        </div>

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

          <div className="space-y-1.5">
            <label className="text-xs text-text-secondary pl-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3 pr-11 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
              >
                {showPass ? <ViewOffIcon size={18} /> : <ViewIcon size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-text-secondary pl-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat password"
              className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover transition-colors">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
