import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Svg, {Path, Polyline, Line, Circle, Text as SvgText} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';
import type {TrenSkor} from '../../types';

interface TrenSkorBulananProps {
  data: TrenSkor;
}

// ── Chart constants ──────────────────────────────────────────
const CHART_H  = 140;
const LEFT_PAD = 32;
const RIGHT_PAD = 10;
const TOP_PAD   = 18;   // room for value labels above dots
const BOTTOM_PAD = 42;  // room for x-axis labels
const DATA_PAD = 13;    // gap between y-axis and first/last data point
const Y_MIN = 70;
const Y_MAX = 100;
const Y_LINES = [60, 70, 80, 90, 100];

function yPos(val: number, innerH: number): number {
  return TOP_PAD + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * innerH;
}

function xPos(idx: number, count: number, innerW: number): number {
  return LEFT_PAD + DATA_PAD + (idx / (count - 1)) * (innerW - DATA_PAD * 2);
}

/** SVG path for the filled area under the line */
function areaPath(nilai: number[], innerW: number, innerH: number): string {
  const n = nilai.length;
  const bottomY = TOP_PAD + innerH;
  const pts = nilai.map((v, i) => ({x: xPos(i, n, innerW), y: yPos(v, innerH)}));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  return `${line} L${pts[n - 1].x},${bottomY} L${pts[0].x},${bottomY} Z`;
}

// ── Chart component ──────────────────────────────────────────
interface ChartProps {
  width: number;
  data: TrenSkor;
  activeIds: string[];
}

function AreaLineChart({width, data, activeIds}: ChartProps) {
  const innerW = width - LEFT_PAD - RIGHT_PAD;
  const innerH = CHART_H - TOP_PAD - BOTTOM_PAD;

  const series = data.data.filter(d => activeIds.includes(d.id));
  const single = series.length === 1; // show fill + labels only for single series

  return (
    <Svg width={width} height={CHART_H}>

      {/* ── Grid lines ──────────────────────────────────── */}
      {Y_LINES.map(yv => {
        const y = yPos(yv, innerH);
        return (
          <Line
            key={yv}
            x1={LEFT_PAD} y1={y}
            x2={LEFT_PAD + innerW} y2={y}
            stroke={Colors.border}
            strokeWidth={0.8}
            strokeDasharray={yv === 80 ? '4,3' : undefined}
          />
        );
      })}

      {/* ── Y-axis labels ───────────────────────────────── */}
      {Y_LINES.map(yv => (
        <SvgText
          key={`y-${yv}`}
          x={LEFT_PAD - 4}
          y={yPos(yv, innerH) + 3.5}
          fontSize={8}
          fill={Colors.textSecondary}
          textAnchor="end">
          {yv}
        </SvgText>
      ))}

      {/* ── X-axis labels ───────────────────────────────── */}
      {data.bulan.map((b, i) => (
        <SvgText
          key={`x-${b}`}
          x={xPos(i, data.bulan.length, innerW)}
          y={CHART_H - 5}
          fontSize={8}
          fill={Colors.textSecondary}
          textAnchor="middle">
          {b}
        </SvgText>
      ))}

      {/* ── Area fill (single series only) ──────────────── */}
      {single && series.map(s => (
        <Path
          key={`fill-${s.id}`}
          d={areaPath(s.nilai, innerW, innerH)}
          fill={s.warna}
          fillOpacity={0.12}
        />
      ))}

      {/* ── Lines ───────────────────────────────────────── */}
      {series.map(s => {
        const pts = s.nilai
          .map((v, i) => `${xPos(i, data.bulan.length, innerW)},${yPos(v, innerH)}`)
          .join(' ');
        return (
          <Polyline
            key={s.id}
            points={pts}
            fill="none"
            stroke={s.warna}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* ── Dots ────────────────────────────────────────── */}
      {series.map(s =>
        s.nilai.map((v, i) => {
          const cx = xPos(i, data.bulan.length, innerW);
          const cy = yPos(v, innerH);
          return (
            <Circle
              key={`dot-${s.id}-${i}`}
              cx={cx} cy={cy}
              r={3.5}
              fill={s.warna}
              stroke={Colors.surfaceLight}
              strokeWidth={1.5}
            />
          );
        }),
      )}

      {/* ── Value labels above dots (single series only) ── */}
      {single && series.map(s =>
        s.nilai.map((v, i) => {
          const cx = xPos(i, data.bulan.length, innerW);
          const cy = yPos(v, innerH);
          return (
            <SvgText
              key={`lbl-${s.id}-${i}`}
              x={cx}
              y={cy - 7}
              fontSize={9}
              fontWeight="700"
              fill={s.warna}
              textAnchor="middle">
              {v}
            </SvgText>
          );
        }),
      )}
    </Svg>
  );
}

// ── Main component (no outer card — wrapped by screen) ───────
export function TrenSkorBulanan({data}: TrenSkorBulananProps) {
  const [activeTab, setActiveTab]   = useState('semua');
  const [chartWidth, setChartWidth] = useState(300);

  // "Semua" → show the aggregate line only (not all 5 lines)
  const activeIds = activeTab === 'semua' ? ['semua'] : [activeTab];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tren Skor Bulanan</Text>
        <Text style={styles.subtitle}>4 Bulan Terakhir</Text>
      </View>

      {/* Tab pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}>
        {data.data.map(d => {
          const isActive = activeTab === d.id;
          return (
            <TouchableOpacity
              key={d.id}
              onPress={() => setActiveTab(d.id)}
              style={[styles.pill, isActive && styles.pillActive]}
              activeOpacity={0.8}>
              {isActive && d.id !== 'semua' && (
                <View style={[styles.pillDot, {backgroundColor: d.warna}]} />
              )}
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {d.nama}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Chart */}
      <View
        style={styles.chartWrap}
        onLayout={e => setChartWidth(e.nativeEvent.layout.width)}>
        {chartWidth > 0 && (
          <AreaLineChart
            width={chartWidth}
            data={data}
            activeIds={activeIds}
          />
        )}
      </View>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  tabsRow: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
    gap: 4,
  },
  pillActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  pillTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  chartWrap: {
    marginHorizontal: Spacing.base,
    paddingBottom: Spacing.xs,
  },
});
