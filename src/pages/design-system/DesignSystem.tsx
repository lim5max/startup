import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Chart } from '../../components/ui/Chart';
import { TimePeriodSelector } from '../../components/ui/TimePeriodSelector';
import type { TimePeriod } from '../../data/portfolio';

const chartData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  value: 1000 + Math.sin(i / 4) * 300 + i * 15,
}));

const colors = [
  { name: 'Background', var: '--color-bg', hex: '#111113' },
  { name: 'Surface', var: '--color-surface', hex: '#18181B' },
  { name: 'Card', var: '--color-card', hex: '#18181B' },
  { name: 'Card Border', var: '--color-card-border', hex: '#27272A' },
  { name: 'Accent', var: '--color-accent', hex: '#196CF0' },
  { name: 'Accent Hover', var: '--color-accent-hover', hex: '#1258CC' },
  { name: 'Positive', var: '--color-positive', hex: '#22C55E' },
  { name: 'Danger', var: '--color-danger', hex: '#EF4444' },
  { name: 'Warning', var: '--color-warning', hex: '#F59E0B' },
  { name: 'Text Primary', var: '--color-text-primary', hex: '#FAFAFA' },
  { name: 'Text Secondary', var: '--color-text-secondary', hex: '#A3A3A3' },
  { name: 'Text Tertiary', var: '--color-text-tertiary', hex: '#737373' },
  { name: 'Text Muted', var: '--color-text-muted', hex: '#525252' },
  { name: 'Input BG', var: '--color-input-bg', hex: '#1E1E21' },
  { name: 'Input Border', var: '--color-input-border', hex: '#27272A' },
];

const strategyColors = [
  { name: 'RED Strategy', hex: '#F87171' },
  { name: 'BLUE Strategy', hex: '#60A5FA' },
  { name: 'GREEN Strategy', hex: '#4ADE80' },
  { name: 'HALAL Strategy', hex: '#FBBF24' },
];

const transactionColors = [
  { name: 'Profit', hex: '#22C55E' },
  { name: 'Deposit', hex: '#3B82F6' },
  { name: 'Withdrawal', hex: '#F97316' },
  { name: 'Referral', hex: '#FBBF24' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary border-b border-card-border pb-2">{title}</h2>
      {children}
    </div>
  );
}

function ColorSwatch({ name, hex, varName }: { name: string; hex: string; varName?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-[10px] border border-card-border shrink-0"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <p className="text-sm text-text-primary font-medium">{name}</p>
        <p className="text-xs text-text-muted font-mono">{hex}{varName ? ` · ${varName}` : ''}</p>
      </div>
    </div>
  );
}

export function DesignSystem() {
  const [period, setPeriod] = useState<TimePeriod>('1M');
  const [inputVal, setInputVal] = useState('');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Design System</h1>
        <p className="text-sm text-text-secondary mt-1">Все компоненты и токены проекта NEXUS</p>
      </div>

      {/* Colors */}
      <Section title="Colors — Core">
        <div className="grid grid-cols-2 gap-3">
          {colors.map((c) => (
            <ColorSwatch key={c.var} name={c.name} hex={c.hex} varName={c.var} />
          ))}
        </div>
      </Section>

      <Section title="Colors — Strategies">
        <div className="grid grid-cols-2 gap-3">
          {strategyColors.map((c) => (
            <ColorSwatch key={c.hex} name={c.name} hex={c.hex} />
          ))}
        </div>
      </Section>

      <Section title="Colors — Transactions">
        <div className="grid grid-cols-2 gap-3">
          {transactionColors.map((c) => (
            <ColorSwatch key={c.name} name={c.name} hex={c.hex} />
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-text-muted mb-1">Font: Inter Variable · Letter-spacing: -0.02em</p>
          </div>
          <p className="text-4xl font-bold">Heading 1 — 36px Bold <span className="text-xs text-text-muted font-normal">-0.02em</span></p>
          <p className="text-3xl font-bold">Heading 2 — 30px Bold <span className="text-xs text-text-muted font-normal">-0.02em</span></p>
          <p className="text-2xl font-semibold">Heading 3 — 24px Semibold <span className="text-xs text-text-muted font-normal">-0.02em</span></p>
          <p className="text-xl font-semibold">Heading 4 — 20px Semibold <span className="text-xs text-text-muted font-normal">-0.02em</span></p>
          <p className="text-lg text-text-primary">Body Large — 18px Regular <span className="text-xs text-text-muted">-0.02em</span></p>
          <p className="text-lg text-text-primary font-semibold">Body Large — 18px Semibold <span className="text-xs text-text-muted font-normal">-0.02em</span></p>
          <p className="text-base text-text-primary">Body — 16px Regular <span className="text-sm text-text-muted">+0.005em</span></p>
          <p className="text-sm text-text-secondary">Body Small — 14px Regular <span className="text-sm text-text-muted">+0.01em</span></p>
          <p className="text-sm text-text-secondary font-medium">Caption — 14px Medium <span className="text-sm text-text-muted font-normal">+0.01em</span></p>
        </div>
      </Section>

      {/* Radii */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="text-center">
            <div className="w-16 h-16 bg-card border border-card-border rounded-input" />
            <p className="text-xs text-text-muted mt-1.5">Input · 12px</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-card border border-card-border rounded-card" />
            <p className="text-xs text-text-muted mt-1.5">Card · 20px</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-card border border-card-border rounded-button" />
            <p className="text-xs text-text-muted mt-1.5">Button · full</p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Button">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-text-muted mb-2">Variants</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-2">Sizes</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-2">Icon Button</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="secondary" size="sm" icon><span className="text-text-secondary text-sm">N</span></Button>
              <Button variant="secondary" size="md" icon><span className="text-text-secondary text-sm">N</span></Button>
              <Button variant="secondary" size="lg" icon><span className="text-text-secondary text-sm">N</span></Button>
              <Button variant="primary" size="md" icon><span className="text-sm">+</span></Button>
              <Button variant="ghost" size="md" icon><span className="text-text-secondary text-sm">X</span></Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-2">States</p>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button className="w-full">Stretched w-full</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Badge */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div className="space-y-3">
          <Card>
            <p className="text-sm text-text-primary font-medium">Default Card</p>
            <p className="text-xs text-text-secondary mt-1">bg-card · border-card-border · rounded-card · p-4</p>
          </Card>
          <Card hover>
            <p className="text-sm text-text-primary font-medium">Hover Card</p>
            <p className="text-xs text-text-secondary mt-1">Hover state with border transition</p>
          </Card>
        </div>
      </Section>

      {/* Input */}
      <Section title="Input">
        <div className="space-y-3">
          <Input label="Default" placeholder="Placeholder text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          <Input label="With Value" value="hello@nexus.com" readOnly />
          <Input label="Error State" error="This field is required" placeholder="Enter value" />
        </div>
      </Section>

      {/* TimePeriodSelector */}
      <Section title="Time Period Selector">
        <TimePeriodSelector selected={period} onChange={setPeriod} />
      </Section>

      {/* Chart */}
      <Section title="Chart">
        <Card>
          <Chart data={chartData} color="#3B82F6" height={180} seamless />
        </Card>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Card>
            <p className="text-xs text-text-muted mb-2">Positive</p>
            <Chart data={chartData} color="#22C55E" height={100} showLabel={false} showRefLine={false} seamless />
          </Card>
          <Card>
            <p className="text-xs text-text-muted mb-2">Strategy RED</p>
            <Chart data={chartData.map((d, i) => ({ ...d, value: d.value - i * 5 }))} color="#F87171" height={100} showLabel={false} showRefLine={false} seamless />
          </Card>
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing Scale">
        <div className="space-y-2">
          {[1, 2, 3, 4, 6, 8, 10, 12, 16].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-6 text-right">{s}</span>
              <div className="h-3 bg-accent/30 rounded-sm" style={{ width: `${s * 4}px` }} />
              <span className="text-xs text-text-muted">{s * 4}px / {s * 0.25}rem</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
