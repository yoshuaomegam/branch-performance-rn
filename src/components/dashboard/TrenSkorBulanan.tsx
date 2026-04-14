import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Svg, {Polyline, Line, Circle, Text as SvgText} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';
import type {TrenSkor} from '../../types';

interface TrenSkorBulananProps {
  data: TrenSkor;
}

const CHART_HEIGHT = 120;
const LEFT_PAD = 32;
const RIGHT_PAD = 8;
const TOP_PAD = 10;
const BOTTOM_PAD = 28;
const Y_MIN = 65;
const Y_MAX = 100;
const Y_LINES = [70, 75, 80, 85, 90, 95, 100];

function mapY(val: number, h: number): number {
  return TOP_PAD + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * h;
}

function mapX(idx: number, count: number, w: number): number {
  return LEFT_PAD + (idx / (count - 1)) * w;
}

interface LineChartProps {
  width: number;
  data: TrenSkor;
  activeIds: string[];
}

function LineChart({width, data, activeIds}: LineChartProps) {
  const innerW = width - LEFT_PAD - RIGHT_PAD;
  const innerH = CHART_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const totalH = CHART_HEIGHT;

  const activeLines = data.data.filter(d => activeIds.includes(d.id));

  return (
    <Svg width={width} height={totalH}>
      {/* Horizontal grid lines */}
      {Y_LINES.map(yVal => {
        const yPx = mapY(yVal, innerH);
        return (
          <Line
            key={yVal}
            x1={LEFT_PAD}
            y1={yPx}
            x2={LEFT_PAD + innerW}
            y2={yPx}
            stroke={Colors.border}
            strokeWidth={0.8}
            strokeDasharray={yVal === 80 ? '4,3' : undefined}
          />
        );
      })}

      {/* Y-axis labels */}
      {Y_LINES.map(yVal => {
        const yPx = mapY(yVal, innerH);
        return (
          <SvgText
            key={`l-${yVal}`}
            x={LEFT_PAD - 4}
            y={yPx + 4}
            fontSize={8}
            fill={Colors.textSecondary}
            textAnchor="end">
            {yVal}
          </SvgText>
        );
      })}

      {/* X-axis labels */}
      {data.bulan.map((bulan, i) => {
        const xPx = mapX(i, data.bulan.length, innerW);
        return (
          <SvgText
            key={`x-${bulan}`}
            x={xPx}
            y={totalH - 4}
            fontSize={8}
            fill={Colors.textSecondary}
            textAnchor="middle">
            {bulan}
          </SvgText>
        );
      })}

      {/* Data lines */}
      {activeLines.map(series => {
        const points = series.nilai
          .map((val, i) => {
            const x = mapX(i, data.bulan.length, innerW);
            const y = mapY(val, innerH);
            return `${x},${y}`;
          })
          .join(' ');
        return (
          <Polyline
            key={series.id}
            points={points}
            fill="none"
            stroke={series.warna}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Data points */}
      {activeLines.map(series =>
        series.nilai.map((val, i) => {
          const x = mapX(i, data.bulan.length, innerW);
          const y = mapY(val, innerH);
          return (
            <Circle
              key={`${series.id}-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill={series.warna}
              stroke={Colors.surfaceLight}
              strokeWidth={1.5}
            />
          );
        }),
      )}
    </Svg>
  );
}

export function TrenSkorBulanan({data}: TrenSkorBulananProps) {
  const [activeTab, setActiveTab] = useState('semua');
  const [chartWidth, setChartWidth] = useState(300);

  const activeTabData = data.data.find(d => d.id === activeTab);
  const activeIds = activeTab === 'semua' ? data.data.map(d => d.id) : [activeTab];

  return (
    <View style={styles.card}>
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
              style={[styles.tabPill, isActive && styles.tabPillActive]}
              activeOpacity={0.8}>
              {isActive && d.id !== 'semua' && (
                <View style={[styles.tabDot, {backgroundColor: d.warna}]} />
              )}
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {d.nama}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Chart */}
      <View
        onLayout={e => setChartWidth(e.nativeEvent.layout.width)}
        style={styles.chartContainer}>
        {chartWidth > 0 && (
          <LineChart
            width={chartWidth}
            data={data}
            activeIds={activeIds}
          />
        )}
      </View>

      {/* Legend */}
      {activeTab === 'semua' && (
        <View style={styles.legend}>
          {data.data.filter(d => d.id !== 'semua').map(d => (
            <View key={d.id} style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: d.warna}]} />
              <Text style={styles.legendText}>{d.nama}</Text>
            </View>
          ))}
        </View>
      )}
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
    paddingTop: Spacing.base,
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
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
    gap: 4,
  },
  tabPillActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  tabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tabText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  chartContainer: {
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
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
    borderRadius: 4,
  },
  legendText: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
});
