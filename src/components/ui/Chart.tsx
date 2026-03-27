import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ChartProps {
  data: { date: string; value: number }[];
  height?: number;
  color?: string;
  showYAxis?: boolean;
  showRefLine?: boolean;
  showLabel?: boolean;
  /** If true, gradient fills all the way to bottom (seamless with card bg) */
  seamless?: boolean;
  /** Format for Y axis values: 'dollar' (default) or 'percent' */
  yAxisFormat?: 'dollar' | 'percent';
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[10px] px-3 py-2 text-xs shadow-xl">
      <p className="text-text-muted text-[10px]">{label}</p>
      <p className="text-text-primary font-semibold">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function CustomActiveDot({ cx, cy, color }: any) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={color} opacity={0.08} />
      <circle cx={cx} cy={cy} r={5} fill={color} opacity={0.15} />
      <circle cx={cx} cy={cy} r={3} fill={color} stroke="#151515" strokeWidth={1.5} />
    </g>
  );
}

export function Chart({
  data,
  height = 200,
  color = '#22C55E',
  showYAxis = false,
  showRefLine = true,
  showLabel = true,
  seamless = false,
  yAxisFormat = 'dollar',
}: ChartProps) {
  const lastValue = data.length ? data[data.length - 1].value : 0;
  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.12;

  const formatted = lastValue >= 1000
    ? `${(lastValue / 1000).toFixed(1)}k`
    : lastValue.toLocaleString();

  // Seamless gradient: more visible, blends into card bg
  const gradId = `grad-${color.replace('#', '')}-${seamless ? 's' : 'n'}`;

  return (
    <div className="relative">
      {showLabel && data.length > 0 && (
        <div className="absolute right-3 top-1 z-10 pointer-events-none">
          <div
            className="px-2 py-0.5 rounded-[8px] text-[10px] font-bold"
            style={{ backgroundColor: color, color: '#0A0A0A' }}
          >
            {formatted}
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 16, right: showYAxis ? 2 : 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              {seamless ? (
                <>
                  <stop offset="0%" stopColor={color} stopOpacity={0.30} />
                  <stop offset="40%" stopColor={color} stopOpacity={0.12} />
                  <stop offset="80%" stopColor={color} stopOpacity={0.04} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.01} />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor={color} stopOpacity={0.18} />
                  <stop offset="50%" stopColor={color} stopOpacity={0.06} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </>
              )}
            </linearGradient>
          </defs>

          {showYAxis && (
            <YAxis
              orientation="right"
              tick={{ fill: '#555', fontSize: 10, fontFamily: 'inherit' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => yAxisFormat === 'percent' ? `${v}%` : v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
              domain={[minVal - padding, maxVal + padding]}
              width={42}
              tickCount={4}
            />
          )}

          {showRefLine && (
            <ReferenceLine
              y={lastValue}
              stroke={color}
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />
          )}

          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />

          <Area
            type="natural"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={<CustomActiveDot color={color} />}
            isAnimationActive={false}
            baseValue={seamless ? 'dataMin' : undefined}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
