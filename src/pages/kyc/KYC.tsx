import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../../context/KYCContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ArrowLeft01Icon, Tick01Icon, SecurityCheckIcon, LinkSquare01Icon } from 'hugeicons-react';

export function KYC() {
  const [verifying, setVerifying] = useState(false);
  const [done, setDone] = useState(false);
  const { completeKYC, kycCompleted } = useKYC();
  const navigate = useNavigate();

  if (kycCompleted || done) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
          <Tick01Icon size={28} className="text-accent" />
        </div>
        <h2 className="text-lg font-bold tracking-[-0.03em] mb-2">KYC Verified</h2>
        <p className="text-sm text-text-muted text-center mb-6 max-w-[280px]">Your identity has been verified. You can now start investing.</p>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </div>
    );
  }

  const handleVerify = () => {
    setVerifying(true);
    // Simulate external service redirect + completion
    setTimeout(() => {
      completeKYC();
      setVerifying(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
        >
          <ArrowLeft01Icon size={18} />
        </button>
        <h1 className="text-lg font-bold tracking-[-0.03em]">KYC Verification</h1>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center pt-8">
        <div className="w-16 h-16 rounded-card bg-card border border-card-border flex items-center justify-center mb-6">
          <SecurityCheckIcon size={32} className="text-accent" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold tracking-[-0.03em] mb-2">Identity Verification</h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-[300px] mb-8">
          We use a trusted third-party service to verify your identity. You'll be redirected to complete the process.
        </p>
      </div>

      {/* Steps info */}
      <Card>
        <div className="space-y-3">
          {[
            { step: '1', text: 'You\'ll be redirected to our verification partner' },
            { step: '2', text: 'Upload a photo of your ID document' },
            { step: '3', text: 'Take a selfie for facial verification' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-accent">{step}</span>
              </div>
              <p className="text-sm text-text-secondary">{text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card-border/20">
        <div className="flex items-start gap-2.5">
          <LinkSquare01Icon size={16} className="text-text-muted shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted leading-relaxed">
            Your data is securely processed by our verification partner. We do not store your documents on our servers.
          </p>
        </div>
      </Card>

      {/* CTA */}
      <Button fullWidth onClick={handleVerify} disabled={verifying}>
        {verifying ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
            Verifying...
          </span>
        ) : (
          'Start Verification'
        )}
      </Button>
    </div>
  );
}
