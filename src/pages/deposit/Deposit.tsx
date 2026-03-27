import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../../context/KYCContext';
import { walletBalance } from '../../data/portfolio';
import { Card } from '../../components/ui/Card';
import {
  ArrowLeft01Icon,
  Copy01Icon,
  Tick01Icon,
  InformationCircleIcon,
} from 'hugeicons-react';

const WALLET_ADDRESSES: Record<string, string> = {
  trc20: 'TXqZ8kR9pN2v5dYm7cWfLhJaQ4xB3nK6eA',
  bep20: '0x8a4F7cB2eD9f1A3c5E6d8bF0a2C4e6D8f0A2b4C',
};

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000];

export function Deposit() {
  const navigate = useNavigate();
  const { kycCompleted } = useKYC();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState<'trc20' | 'bep20' | ''>('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus amount input on mount
  useEffect(() => {
    if (step === 1) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [step]);

  if (!kycCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-card bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
          <InformationCircleIcon size={28} className="text-accent" />
        </div>
        <h2 className="text-lg font-bold tracking-[-0.03em] mb-2">KYC Required</h2>
        <p className="text-sm text-text-muted text-center mb-6 max-w-[280px]">Complete identity verification before making deposits</p>
        <button onClick={() => navigate('/kyc')} className="bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-button text-sm transition-colors cursor-pointer">
          Complete KYC
        </button>
      </div>
    );
  }

  const copyAddress = () => {
    if (network) {
      navigator.clipboard.writeText(WALLET_ADDRESSES[network]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAmountChange = (val: string) => {
    // Only allow digits and one dot
    const cleaned = val.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setAmount(cleaned);
  };

  const displayAmount = amount || '0';

  // Dynamic font size based on length
  const fontSize = displayAmount.length > 8 ? 'text-4xl' : displayAmount.length > 5 ? 'text-5xl' : 'text-6xl';

  return (
    <div className="min-h-[calc(100dvh-8rem)] flex flex-col">
      {/* STEP 1: Amount */}
      {step === 1 && (
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
            >
              <ArrowLeft01Icon size={18} />
            </button>
            <h1 className="text-lg font-bold tracking-[-0.03em]">Deposit</h1>
          </div>

          {/* Balance */}
          <p className="text-center text-xs text-text-muted mt-4">
            Current balance: <span className="text-text-secondary">${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </p>

          {/* Amount display — tap anywhere to type */}
          <div
            className="flex-1 flex flex-col items-center justify-center -mt-4 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="relative flex items-baseline justify-center gap-1">
              <span className={`${fontSize} font-bold tracking-[-0.04em] text-text-muted`}>$</span>
              <span className={`${fontSize} font-bold tracking-[-0.04em] text-text-primary`}>
                {displayAmount === '0' ? (
                  <span className="text-text-muted">0</span>
                ) : (
                  Number(displayAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })
                )}
              </span>
              {/* Blinking cursor */}
              <span className="w-[3px] h-[0.8em] bg-accent rounded-full animate-pulse ml-1 self-center" />
            </div>
            {/* Real input positioned behind the display */}
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="sr-only"
              autoFocus
            />
          </div>

          {/* Quick amounts */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {QUICK_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(String(a))}
                className={`px-4 py-2 rounded-button text-sm font-medium border transition-colors cursor-pointer ${
                  amount === String(a)
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-card-border bg-card text-text-secondary hover:border-text-muted'
                }`}
              >
                ${a.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Continue */}
          <button
            onClick={() => amount && Number(amount) > 0 ? setStep(2) : null}
            disabled={!amount || Number(amount) <= 0}
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2: Payment Method */}
      {step === 2 && (
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setStep(1)}
              className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
            >
              <ArrowLeft01Icon size={18} />
            </button>
            <h1 className="text-lg font-bold tracking-[-0.03em]">Payment Method</h1>
          </div>

          <p className="text-sm text-text-muted mb-4">
            Depositing <span className="text-text-primary font-semibold">${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </p>

          <div className="space-y-3 flex-1">
            {[
              { id: 'trc20' as const, name: 'USDT TRC-20', sub: 'Tron Network', fee: 'Fee: ~1 USDT', time: '~5 min' },
              { id: 'bep20' as const, name: 'USDT BEP-20', sub: 'BSC Network', fee: 'Fee: ~0.3 USDT', time: '~3 min' },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => setNetwork(n.id)}
                className={`w-full p-4 rounded-card border text-left transition-colors cursor-pointer flex items-center gap-4 ${
                  network === n.id
                    ? 'border-accent bg-accent/[0.04]'
                    : 'border-card-border bg-card hover:border-text-muted'
                }`}
              >
                {/* Radio circle */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  network === n.id ? 'border-accent' : 'border-card-border'
                }`}>
                  {network === n.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{n.name}</p>
                  <p className="text-xs text-text-muted">{n.sub}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">{n.fee}</p>
                  <p className="text-xs text-text-muted">{n.time}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => network ? setStep(3) : null}
            disabled={!network}
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed mt-6"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 3: Payment Details */}
      {step === 3 && network && (
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setStep(2)}
              className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
            >
              <ArrowLeft01Icon size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-[-0.03em]">Send Payment</h1>
              <p className="text-xs text-text-muted">${Number(amount).toLocaleString()} · {network === 'trc20' ? 'TRC-20' : 'BEP-20'}</p>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div className="flex justify-center mb-5">
            <div className="w-48 h-48 rounded-card border-2 border-card-border bg-white flex items-center justify-center">
              {/* QR placeholder grid */}
              <svg width="140" height="140" viewBox="0 0 140 140">
                <rect x="0" y="0" width="40" height="40" rx="2" fill="#0A0A0A"/>
                <rect x="5" y="5" width="30" height="30" rx="1" fill="white"/>
                <rect x="10" y="10" width="20" height="20" rx="1" fill="#0A0A0A"/>
                <rect x="100" y="0" width="40" height="40" rx="2" fill="#0A0A0A"/>
                <rect x="105" y="5" width="30" height="30" rx="1" fill="white"/>
                <rect x="110" y="10" width="20" height="20" rx="1" fill="#0A0A0A"/>
                <rect x="0" y="100" width="40" height="40" rx="2" fill="#0A0A0A"/>
                <rect x="5" y="105" width="30" height="30" rx="1" fill="white"/>
                <rect x="10" y="110" width="20" height="20" rx="1" fill="#0A0A0A"/>
                {/* Center pattern */}
                <rect x="50" y="50" width="40" height="40" rx="2" fill="#0A0A0A"/>
                <rect x="55" y="55" width="30" height="30" rx="1" fill="white"/>
                <rect x="62" y="62" width="16" height="16" rx="1" fill="#3B82F6"/>
                {/* Scattered blocks */}
                {[48,56,64,72,80,88].map((x) =>
                  [0,8,16,24,32,96,104,112,120,128].filter(() => Math.random() > 0.4).map((y) => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#0A0A0A" opacity="0.7"/>
                  ))
                )}
                {[0,8,16,24,32,96,104,112,120,128].map((y) =>
                  [48,56,64,72,80,88].filter(() => Math.random() > 0.4).map((x) => (
                    <rect key={`v${x}-${y}`} x={x} y={y} width="6" height="6" fill="#0A0A0A" opacity="0.7"/>
                  ))
                )}
              </svg>
            </div>
          </div>

          {/* Wallet Address */}
          <Card className="mb-4">
            <p className="text-xs text-text-muted mb-2">Wallet Address</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-text-primary bg-input-bg border border-input-border rounded-input px-3 py-2.5 overflow-hidden text-ellipsis whitespace-nowrap block">
                {WALLET_ADDRESSES[network]}
              </code>
              <button
                onClick={copyAddress}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
              >
                {copied ? <Tick01Icon size={16} className="text-accent" /> : <Copy01Icon size={16} />}
              </button>
            </div>
          </Card>

          {/* Warning */}
          <div className="flex items-start gap-2.5 p-3 rounded-card bg-warning/[0.04] border border-warning/20 mb-6">
            <InformationCircleIcon size={16} className="text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Send exactly <span className="font-semibold text-text-primary">${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> USDT to this address.
                Transactions may take 10–30 minutes to confirm on the network.
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={() => setStep(4)}
              className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
            >
              I've Sent the Payment
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Processing */}
      {step === 4 && (
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Animated pulse rings */}
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-2 rounded-full bg-accent/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
            <div className="relative w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-[-0.03em] mb-2">Processing Your Deposit</h2>
          <p className="text-sm text-text-muted text-center max-w-[280px] leading-relaxed mb-2">
            We're confirming your transaction on the blockchain. This usually takes a few minutes.
          </p>
          <p className="text-xs text-text-muted mb-10">
            ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} · {network === 'trc20' ? 'TRC-20' : 'BEP-20'}
          </p>

          <button
            onClick={() => navigate('/home')}
            className="text-sm text-text-muted hover:text-text-secondary transition-colors cursor-pointer border border-card-border hover:border-text-muted px-6 py-3 rounded-button"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
