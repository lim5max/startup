import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetSent } from './pages/auth/ResetSent';
import { Onboarding } from './pages/onboarding/Onboarding';
import { Home } from './pages/home/Home';
import { Strategies } from './pages/strategies/Strategies';
import { StrategyDetail } from './pages/strategies/StrategyDetail';
import { Deposit } from './pages/deposit/Deposit';
import { Profile } from './pages/profile/Profile';
import { Settings } from './pages/profile/Settings';
import { Support } from './pages/profile/Support';
import { KYC } from './pages/kyc/KYC';
import { DesignSystem } from './pages/design-system/DesignSystem';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isFirstLogin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isFirstLogin && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isFirstLogin } = useAuth();

  if (isAuthenticated && isFirstLogin) return <Navigate to="/onboarding" replace />;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return <>{children}</>;
}

const router = createBrowserRouter([
  { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
  { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
  { path: '/design-system', element: <DesignSystem /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-sent', element: <ResetSent /> },
  {
    path: '/onboarding',
    element: <ProtectedRoute><Onboarding /></ProtectedRoute>,
  },
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'strategies', element: <Strategies /> },
      { path: 'strategies/:id', element: <StrategyDetail /> },
      { path: 'deposit', element: <Deposit /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profile/settings', element: <Settings /> },
      { path: 'support', element: <Support /> },
      { path: 'kyc', element: <KYC /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
