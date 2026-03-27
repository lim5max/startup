import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { KYCProvider } from './context/KYCContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <KYCProvider>
        <App />
      </KYCProvider>
    </AuthProvider>
  </StrictMode>,
);
