import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ViewIcon, ViewOffIcon } from 'hugeicons-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'demo@nexus.io', password || 'demo');
    navigate('/home');
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[390px] relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-text-primary mb-1">
            NEXUS
          </h1>
          <p className="text-sm text-text-muted">Investment Platform</p>
        </div>

        {/* Form */}
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
                placeholder="Enter password"
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

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-card-border" />
          <span className="text-xs text-text-muted">or</span>
          <div className="flex-1 h-px bg-card-border" />
        </div>

        {/* Create Account */}
        <Link
          to="/register"
          className="block w-full text-center border border-card-border hover:border-text-muted text-text-primary font-medium py-3.5 rounded-button text-sm transition-colors"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
