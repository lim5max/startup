import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChartLineData02Icon, Shield01Icon, Wallet01Icon, RocketIcon } from 'hugeicons-react';

const slides = [
  {
    icon: RocketIcon,
    title: 'Welcome to NEXUS',
    desc: 'AI-powered crypto investment platform. Let algorithms work for your capital 24/7.',
  },
  {
    icon: ChartLineData02Icon,
    title: 'Choose Your Strategy',
    desc: '4 unique trading strategies with different risk profiles. From conservative HALAL to aggressive RED.',
  },
  {
    icon: Wallet01Icon,
    title: 'Deposit & Earn',
    desc: 'Deposit USDT via TRC-20 or BEP-20 network. Receive weekly profit distributions automatically.',
  },
  {
    icon: Shield01Icon,
    title: 'Track & Control',
    desc: 'Monitor your portfolio in real-time. Reinvest profits or withdraw — you\'re in full control.',
  },
];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const finish = () => {
    completeOnboarding();
    navigate('/home');
  };

  const isLast = step === slides.length - 1;
  const slide = slides[step];
  const Icon = slide.icon;

  return (
    <div className="min-h-dvh flex flex-col bg-bg px-4 relative overflow-hidden">
      {/* Skip */}
      <div className="flex justify-end pt-4 max-w-[390px] mx-auto w-full">
        <button onClick={finish} className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer py-2 px-3">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-[390px] mx-auto w-full -mt-10">
        {/* Icon */}
        <div className="w-20 h-20 rounded-card bg-card border border-card-border flex items-center justify-center mb-8">
          <Icon size={36} className="text-accent" strokeWidth={1.5} />
        </div>

        <h2 className="text-xl font-bold tracking-[-0.03em] text-text-primary text-center mb-3">
          {slide.title}
        </h2>
        <p className="text-sm text-text-secondary text-center leading-relaxed max-w-[300px]">
          {slide.desc}
        </p>
      </div>

      {/* Bottom */}
      <div className="pb-10 max-w-[390px] mx-auto w-full">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-accent' : 'w-1.5 bg-card-border'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => isLast ? finish() : setStep(step + 1)}
          className="w-full bg-accent hover:bg-accent-hover text-bg font-semibold py-3.5 rounded-button text-sm transition-colors cursor-pointer"
        >
          {isLast ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
