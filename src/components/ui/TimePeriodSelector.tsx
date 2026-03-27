import type { TimePeriod } from '../../data/portfolio';

interface Props {
  selected: TimePeriod;
  onChange: (period: TimePeriod) => void;
}

const periods: TimePeriod[] = ['1W', '1M', '3M', '6M', '1Y'];

export function TimePeriodSelector({ selected, onChange }: Props) {
  return (
    <div className="inline-flex gap-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-[10px] transition-all cursor-pointer ${
            selected === p
              ? 'bg-accent text-white'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
