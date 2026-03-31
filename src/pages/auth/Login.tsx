import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[390px] relative">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-[-0.03em] text-text-primary mb-1">NEXUS</h1>
          <p className="text-sm text-text-muted">Investment Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary pl-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-input-bg border border-input-border rounded-input px-4 py-3.5 pr-12 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent transition-colors min-h-11"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon
                onClick={() => setShowPass(!showPass)}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                {showPass ? <ViewOffIcon size={18} /> : <ViewIcon size={18} />}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-card-border" />
          <span className="text-sm text-text-muted">or</span>
          <div className="flex-1 h-px bg-card-border" />
        </div>

        <Link to="/register">
          <Button variant="secondary" className="w-full">
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
