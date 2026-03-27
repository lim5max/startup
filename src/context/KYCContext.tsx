import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface KYCState {
  kycCompleted: boolean;
  completeKYC: () => void;
  resetKYC: () => void;
}

const KYCContext = createContext<KYCState | null>(null);

export function KYCProvider({ children }: { children: ReactNode }) {
  const [kycCompleted, setKycCompleted] = useState(() => {
    return localStorage.getItem('kyc') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('kyc', String(kycCompleted));
  }, [kycCompleted]);

  const completeKYC = () => setKycCompleted(true);
  const resetKYC = () => setKycCompleted(false);

  return (
    <KYCContext.Provider value={{ kycCompleted, completeKYC, resetKYC }}>
      {children}
    </KYCContext.Provider>
  );
}

export function useKYC() {
  const ctx = useContext(KYCContext);
  if (!ctx) throw new Error('useKYC must be used within KYCProvider');
  return ctx;
}
