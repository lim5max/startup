import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import {
  ArrowLeft01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Message01Icon,
  Tick01Icon,
  Clock01Icon,
  Add01Icon,
} from 'hugeicons-react';

const tickets = [
  { id: '1', title: 'Deposit not credited', status: 'resolved' as const, date: 'Mar 24', lastMessage: 'Your deposit has been credited. Thank you for your patience.' },
  { id: '2', title: 'KYC verification stuck', status: 'open' as const, date: 'Mar 22', lastMessage: 'We\'re reviewing your documents. Please allow 24 hours.' },
  { id: '3', title: 'Withdrawal request', status: 'resolved' as const, date: 'Mar 15', lastMessage: 'Withdrawal processed successfully.' },
];

const faqs = [
  {
    q: 'How do I deposit funds?',
    a: 'Navigate to Home and tap the Deposit button. Enter the amount, select USDT network (TRC-20 or BEP-20), and send funds to the displayed wallet address.',
  },
  {
    q: 'When do I receive profits?',
    a: 'Profits are distributed weekly (every 7 days). You can choose to reinvest profits or withdraw them to your account.',
  },
  {
    q: 'What is KYC and why is it required?',
    a: 'KYC (Know Your Customer) is identity verification required by regulations. It protects both you and the platform from fraud.',
  },
  {
    q: 'Can I withdraw at any time?',
    a: 'Withdrawal availability depends on your strategy hold period. Check the strategy details for specific withdrawal schedules.',
  },
];

export function Support() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNested = location.pathname.startsWith('/profile/');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tab, setTab] = useState<'chat' | 'faq'>('chat');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        {isNested && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-card bg-card border border-card-border hover:border-text-muted transition-colors cursor-pointer"
          >
            <ArrowLeft01Icon size={18} />
          </button>
        )}
        <h1 className="text-xl font-bold tracking-[-0.03em]">Support</h1>
      </div>

      {/* New Chat Button */}
      <button className="w-full flex items-center gap-3 p-4 rounded-card bg-accent/[0.06] border border-accent/20 hover:bg-accent/[0.1] transition-colors cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
          <Message01Icon size={20} className="text-accent" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-text-primary">Start a new conversation</p>
          <p className="text-xs text-text-muted">We usually reply within a few hours</p>
        </div>
      </button>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-card-border rounded-card p-1">
        {(['chat', 'faq'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-card transition-colors cursor-pointer ${
              tab === t ? 'bg-surface text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {t === 'chat' ? 'My Requests' : 'FAQ'}
          </button>
        ))}
      </div>

      {/* Chat/Tickets Tab */}
      {tab === 'chat' && (
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <Card key={ticket.id} hover>
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-medium text-text-primary">{ticket.title}</p>
                <div className="flex items-center gap-1 shrink-0">
                  {ticket.status === 'resolved' ? (
                    <Tick01Icon size={12} className="text-positive" />
                  ) : (
                    <Clock01Icon size={12} className="text-warning" />
                  )}
                  <span className={`text-[10px] font-medium ${ticket.status === 'resolved' ? 'text-positive' : 'text-warning'}`}>
                    {ticket.status === 'resolved' ? 'Resolved' : 'Open'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-muted line-clamp-1 mb-1.5">{ticket.lastMessage}</p>
              <p className="text-[10px] text-text-muted">{ticket.date}</p>
            </Card>
          ))}
        </div>
      )}

      {/* FAQ Tab */}
      {tab === 'faq' && (
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <Card key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <span className="text-sm text-text-primary text-left">{faq.q}</span>
                {openFaq === i ? (
                  <ArrowUp01Icon size={16} className="text-text-muted shrink-0" />
                ) : (
                  <ArrowDown01Icon size={16} className="text-text-muted shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <p className="text-xs text-text-secondary mt-3 leading-relaxed">{faq.a}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Contact */}
      <Card>
        <p className="text-xs text-text-muted mb-2">Or reach us directly</p>
        <div className="space-y-1.5">
          <a href="mailto:support@nexus.io" className="block text-sm text-accent hover:text-accent-hover transition-colors">
            support@nexus.io
          </a>
          <a href="#" className="block text-sm text-accent hover:text-accent-hover transition-colors">
            Telegram: @nexus_support
          </a>
        </div>
      </Card>
    </div>
  );
}
