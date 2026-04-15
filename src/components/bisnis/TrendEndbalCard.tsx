import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Polyline, Line, Text as SvgText, Circle} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';
import type {TrendEndbal} from '../../types';

interface Props {
  data: TrendEndbal;
}

const CHART_H = 130;
const LEFT_PAD = 36;
const RIGHT_PAD = 8;
const DATA_PAD = 10;
const TOP_PAD = 16;
const BOTTOM_PAD = 20;

function buildPoints(
  vals: (number | null)[],
  chartW: number,
  minVal: number,
  maxVal: number,
): {x: number; y: number}[] {
  const count = vals.length;
  const innerW = chartW - LEFT_PAD - RIGHT_PAD;
  const innerH = CHART_H - TOP_PAD - BOTTOM_PAD;
  const range = maxVal - minVal || 1;
  const points: {x: number; y: number}[] = [];
  vals.forEach((v, i) => {
    if (v === null) return;
    const x = LEFT_PAD + DATA_PAD + (i / (count - 1)) * (innerW - DATA_PAD * 2);
    const y = TOP_PAD + innerH - ((v - minVal) / range) * innerH;
    points.push({x, y});
  });
  return points;
}

function pointsToStr(pts: {x: number; y: number}[]): string {
  return pts.map(p => `${p.x},${p.y}`).join(' ');
}

export function TrendEndbalCard({data}: Props) {
  const [chartW, setChartW] = useState(0);

  // Compute y-axis range from all non-null values
  const allVals = data.series.flatMap(s => s.nilai.filter((v): v is number => v !== null));
  const minVal = Math.floor(Math.min(...allVals) / 50) * 50;
  const maxVal = Math.ceil(Math.max(...allVals) / 50) * 50;
  const yLines = [minVal, (minVal + maxVal) / 2, maxVal];

  const innerH = CHART_H - TOP_PAD - BOTTOM_PAD;
  const range = maxVal - minVal || 1;

  const yPos = (val: number) => TOP_PAD + innerH - ((val - minVal) / range) * innerH;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Tren Endbal Tabungan</Text>
        {/* Legend */}
        <View style={styles.legendRow}>
          {data.series.map((s, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendLine, {backgroundColor: s.warna}]} />
              <Text style={styles.legendText}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Chart */}
      <View
        style={styles.chartWrap}
        onLayout={e => setChartW(e.nativeEvent.layout.width)}>
        {chartW > 0 && (
          <Svg width={chartW} height={CHART_H}>
            {/* Y grid lines */}
            {yLines.map((val, i) => (
              <React.Fragment key={i}>
                <Line
                  x1={LEFT_PAD}
                  y1={yPos(val)}
                  x2={chartW - RIGHT_PAD}
                  y2={yPos(val)}
                  stroke={Colors.border}
                  strokeWidth={1}
                  strokeDasharray="3,3"
                />
                <SvgText
                  x={LEFT_PAD - 2}
                  y={yPos(val) + 4}
                  fontSize={8}
                  fill={Colors.textMuted}
                  textAnchor="end">
                  {val}
                </SvgText>
              </React.Fragment>
            ))}

            {/* X axis labels */}
            {data.bulan.map((b, i) => {
              const count = data.bulan.length;
              const innerW = chartW - LEFT_PAD - RIGHT_PAD;
              const x = LEFT_PAD + DATA_PAD + (i / (count - 1)) * (innerW - DATA_PAD * 2);
              if (i % 2 !== 0) return null;
              return (
                <SvgText
                  key={i}
                  x={x}
                  y={CHART_H - 4}
                  fontSize={8}
                  fill={Colors.textMuted}
                  textAnchor="middle">
                  {b}
                </SvgText>
              );
            })}

            {/* Series lines */}
            {data.series.map((s, si) => {
              const pts = buildPoints(s.nilai, chartW, minVal, maxVal);
              if (pts.length < 2) return null;
              return (
                <Polyline
                  key={si}
                  points={pointsToStr(pts)}
                  fill="none"
                  stroke={s.warna}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Last data point dot for current year */}
            {(() => {
              const current = data.series[data.series.length - 1];
              const pts = buildPoints(current.nilai, chartW, minVal, maxVal);
              const last = pts[pts.length - 1];
              if (!last) return null;
              return (
                <Circle
                  cx={last.x}
                  cy={last.y}
                  r={4}
                  fill={current.warna}
                  stroke={Colors.surfaceLight}
                  strokeWidth={2}
                />
              );
            })()}
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
          {/* Placeholder for 2025 if only 2 series */}
          {data.series.length < 3 && (
            <Text style={[styles.colHeader, styles.colYear]}>2025</Text>
          )}
        </View>

        {data.metrik.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, styles.colNama]}>{row.nama}</Text>
            <Text style={[styles.cell, styles.colYear]}>{row.y2024}</Text>
            <Text style={[styles.cell, styles.colYear]}>{row.y2025}</Text>
            <Text style={[styles.cell, styles.colYear, styles.colYearBold]}>{row.y2026}</Text>
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
    marginBottom: Spacing.xs,
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
  legendLine: {
    width: 14,
    height: 2,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
  chartWrap: {
    marginHorizontal: -Spacing.xs,
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
  colNama: {flex: 2},
  colYear: {flex: 1.5, textAlign: 'right'},
  colYearBold: {fontWeight: '700'},
  catatanBox: {
    backgroundColor: Colors.warningLight,
    borderRadius: 6,
    padding: Spacing.sm,
  },
  catatanText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.warningDark,
    lineHeight: 16,
  },
});
