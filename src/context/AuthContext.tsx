import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  userEmail: string;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });
  const [isFirstLogin, setIsFirstLogin] = useState(() => {
    return localStorage.getItem('firstLogin') === 'true';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || '';
  });

  useEffect(() => {
    localStorage.setItem('auth', String(isAuthenticated));
    localStorage.setItem('firstLogin', String(isFirstLogin));
    localStorage.setItem('userEmail', userEmail);
  }, [isAuthenticated, isFirstLogin, userEmail]);

  const login = (email: string, _password: string) => {
    setUserEmail(email);
    const hasOnboarded = localStorage.getItem('onboarded') === 'true';
    setIsFirstLogin(!hasOnboarded);
    setIsAuthenticated(true);
  };

  const register = (email: string, _password: string) => {
    setUserEmail(email);
    setIsFirstLogin(true);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsFirstLogin(false);
    setUserEmail('');
    localStorage.removeItem('auth');
    localStorage.removeItem('firstLogin');
    localStorage.removeItem('userEmail');
  };

  const completeOnboarding = () => {
    setIsFirstLogin(false);
    localStorage.setItem('onboarded', 'true');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isFirstLogin, userEmail, login, register, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
