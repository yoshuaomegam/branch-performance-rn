import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Polyline, Line, Text as SvgText, Circle} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';
import type {TrendEndbal} from '../../types';

interface Props {
  data: TrendEndbal;
}

const CHART_H   = 120;
const LEFT_PAD  = 26;  // room for year labels ('24)
const RIGHT_PAD = 36;  // room for end-value labels (395)
const TOP_PAD   = 10;
const BOT_PAD   = 16;  // month labels

// Sub-points per month — creates the sawtooth spike pattern
const PTS = 5;

/**
 * Expand monthly end-values into intra-month sub-points:
 * [drop, slight-rise, mid-dip, pre-spike, spike-to-end]
 * This mimics "pattern uplift akhir bulan".
 */
function expandSeries(monthlyVals: (number | null)[]): (number | null)[] {
  const out: (number | null)[] = [];
  let prevEnd: number | null = null;

  for (const endVal of monthlyVals) {
    if (endVal === null) {
      for (let i = 0; i < PTS; i++) out.push(null);
    } else {
      const base = prevEnd !== null ? prevEnd : endVal * 0.945;
      const drop   = base * 0.952;                       // sharp drop at month start
      const rise   = drop + (endVal - drop) * 0.30;     // gradual rise
      const dip    = drop + (endVal - drop) * 0.12;     // dip mid-month
      const preSpk = drop + (endVal - drop) * 0.20;     // builds before spike
      out.push(drop, rise, dip, preSpk, endVal);        // spike to month-end
      prevEnd = endVal;
    }
  }
  return out;
}

function yPos(val: number, minV: number, maxV: number): number {
  const innerH = CHART_H - TOP_PAD - BOT_PAD;
  return TOP_PAD + innerH - ((val - minV) / (maxV - minV || 1)) * innerH;
}

function buildPts(
  vals: (number | null)[],
  chartW: number,
  minV: number,
  maxV: number,
): {x: number; y: number}[] {
  const innerW = chartW - LEFT_PAD - RIGHT_PAD;
  const total  = vals.length;
  return vals
    .map((v, i) =>
      v !== null
        ? {x: LEFT_PAD + (i / (total - 1)) * innerW, y: yPos(v, minV, maxV)}
        : null,
    )
    .filter((p): p is {x: number; y: number} => p !== null);
}

function ptsStr(pts: {x: number; y: number}[]): string {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

export function TrendEndbalCard({data}: Props) {
  const [chartW, setChartW] = useState(0);

  // Compute y-range from all non-null monthly values
  const allVals = data.series.flatMap(s =>
    s.nilai.filter((v): v is number => v !== null),
  );
  const rawMin = Math.min(...allVals);
  const rawMax = Math.max(...allVals);
  const pad    = (rawMax - rawMin) * 0.12;
  const minV   = rawMin - pad;
  const maxV   = rawMax + pad;

  // Expand each series into sub-monthly spike pattern
  const expanded = data.series.map(s => ({
    ...s,
    pts: expandSeries(s.nilai),
  }));

  const totalPts = data.bulan.length * PTS;
  const innerW   = chartW - LEFT_PAD - RIGHT_PAD;

  // X position of the spike (last sub-point of month m)
  const spikeX = (m: number) =>
    LEFT_PAD + ((m * PTS + PTS - 1) / (totalPts - 1)) * innerW;

  // X center of month m (for label)
  const monthLabelX = (m: number) =>
    LEFT_PAD + ((m * PTS + PTS / 2) / (totalPts - 1)) * innerW;

  return (
    <View style={styles.card}>
      {/* Header + legend */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tren Endbal Tabungan</Text>
        <View style={styles.legendRow}>
          {data.series.map((s, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: s.warna}]} />
              <Text style={styles.legendText}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.subtitle}>{data.subtitle}</Text>

      {/* Chart */}
      <View
        style={styles.chartWrap}
        onLayout={e => setChartW(e.nativeEvent.layout.width)}>
        {chartW > 0 && (
          <Svg width={chartW} height={CHART_H}>
            {/* Dashed horizontal grid lines */}
            {[minV + (maxV - minV) * 0.1, minV + (maxV - minV) * 0.5, minV + (maxV - minV) * 0.9].map(
              (val, i) => (
                <Line
                  key={i}
                  x1={LEFT_PAD}
                  y1={yPos(val, minV, maxV)}
                  x2={chartW - RIGHT_PAD}
                  y2={yPos(val, minV, maxV)}
                  stroke={Colors.border}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />
              ),
            )}

            {/* Series spike lines */}
            {expanded.map((s, si) => {
              const pts = buildPts(s.pts, chartW, minV, maxV);
              if (pts.length < 2) return null;
              return (
                <Polyline
                  key={si}
                  points={ptsStr(pts)}
                  fill="none"
                  stroke={s.warna}
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Spike dots at month-end spikes and right-side end labels */}
            {expanded.map((s, si) => {
              // Find last non-null monthly index
              let lastMonthIdx = -1;
              s.nilai.forEach((v, i) => { if (v !== null) lastMonthIdx = i; });
              if (lastMonthIdx < 0) return null;

              const lastVal = s.nilai[lastMonthIdx] as number;
              const cx = spikeX(lastMonthIdx);
              const cy = yPos(lastVal, minV, maxV);

              return (
                <React.Fragment key={si}>
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={3}
                    fill={s.warna}
                    stroke={Colors.surfaceLight}
                    strokeWidth={1.5}
                  />
                  <SvgText
                    x={chartW - RIGHT_PAD + 4}
                    y={cy + 4}
                    fontSize={9}
                    fill={s.warna}
                    fontWeight="600">
                    {lastVal.toLocaleString('id-ID')}
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* Year labels on the LEFT at each series' first point */}
            {expanded.map((s, si) => {
              const firstVal = s.nilai.find((v): v is number => v !== null);
              if (firstVal === null || firstVal === undefined) return null;
              const cy = yPos(firstVal * 0.952, minV, maxV); // approx first drop point
              return (
                <SvgText
                  key={si}
                  x={LEFT_PAD - 3}
                  y={cy + 4}
                  fontSize={9}
                  fill={s.warna}
                  fontWeight="600"
                  textAnchor="end">
                  '{s.label.slice(2)}
                </SvgText>
              );
            })}

            {/* X-axis month labels */}
            {data.bulan.map((b, i) => {
              if (i % 2 !== 0) return null;
              return (
                <SvgText
                  key={i}
                  x={monthLabelX(i)}
                  y={CHART_H - 2}
                  fontSize={7}
                  fill={Colors.textMuted}
                  textAnchor="middle">
                  {b}
                </SvgText>
              );
            })}
          </Svg>
        )}
      </View>

      {/* Metrik table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colHeader, styles.colNama]}>Metrik</Text>
          {data.series.map((s, i) => (
            <Text key={i} style={[styles.colHeader, styles.colYear, {color: s.warna}]}>
              {s.label}
            </Text>
          ))}
        </View>
        {data.metrik.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, styles.colNama]}>{row.nama}</Text>
            <Text style={[styles.cell, styles.colYear]}>{row.y2024}</Text>
            <Text style={[styles.cell, styles.colYear]}>{row.y2025}</Text>
            <Text style={[styles.cell, styles.colYear, styles.colCurrent]}>{row.y2026}</Text>
          </View>
        ))}
      </View>

      {/* Catatan */}
      <View style={styles.catatanBox}>
        <Text style={styles.catatanText}>{data.catatan}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    padding: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: Spacing.xs,
    opacity: 0.72,
  },
  chartWrap: {
    marginBottom: Spacing.sm,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  colHeader: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs + 1,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  cell: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  colNama:    {flex: 2},
  colYear:    {flex: 1.5, textAlign: 'right'},
  colCurrent: {fontWeight: '700'},
  catatanBox: {
    backgroundColor: '#EBF3FF',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    padding: Spacing.sm,
  },
  catatanText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    lineHeight: 16,
  },
});
