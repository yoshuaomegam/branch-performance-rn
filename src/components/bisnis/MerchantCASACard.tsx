import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {MerchantCASAData, MetricStatus} from '../../types';

interface Props {
  data: MerchantCASAData;
}

function getCapaianColor(status: MetricStatus): {bg: string; text: string} {
  if (status === 'good')    return {bg: Colors.successLight, text: Colors.successDark};
  if (status === 'warning') return {bg: Colors.warningLight, text: Colors.warningDark};
  if (status === 'bad')     return {bg: Colors.dangerLight,  text: Colors.dangerDark};
  return {bg: Colors.background, text: Colors.textSecondary};
}

export function MerchantCASACard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>CASA Channel Digital</Text>

      {/* Stacked bar */}
      <View style={styles.stackedBar}>
        {data.segments.map((seg, idx) => (
          <View
            key={idx}
            style={[
              styles.barSegment,
              {flex: seg.pct, backgroundColor: seg.warna},
              idx === 0 && styles.barSegmentFirst,
              idx === data.segments.length - 1 && styles.barSegmentLast,
            ]}>
            {seg.pct >= 12 && (
              <Text style={styles.barSegmentLabel}>{seg.pct}%</Text>
            )}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        {data.segments.map((seg, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: seg.warna}]} />
            <Text style={styles.legendLabel}>{seg.label} {seg.pct}%</Text>
          </View>
        ))}
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.colProduk, styles.headerText]}>Produk</Text>
          <Text style={[styles.colBalance, styles.headerText]}>Balance</Text>
          <Text style={[styles.colTarget, styles.headerText]}>Target</Text>
          <Text style={[styles.colCapaian, styles.headerText]}>Capaian</Text>
          <Text style={[styles.colGrowth, styles.headerText]}>Growth</Text>
        </View>

        {data.rows.map((row, idx) => {
          const cap = getCapaianColor(row.capaianStatus);
          return (
            <View key={idx} style={[styles.row, idx < data.rows.length - 1 && styles.rowBorder]}>
              <Text style={[styles.colProduk, styles.rowLabel]}>{row.produk}</Text>
              <Text style={[styles.colBalance, styles.rowValue]}>{row.balance}</Text>
              <Text style={[styles.colTarget, styles.rowMuted]}>{row.target}</Text>
              <View style={[styles.colCapaian, styles.capaianWrap]}>
                <View style={[styles.capaianBadge, {backgroundColor: cap.bg}]}>
                  <Text style={[styles.capaianText, {color: cap.text}]}>{row.capaian}</Text>
                </View>
              </View>
              <Text style={[
                styles.colGrowth,
                styles.growthText,
                {color: row.growthUp ? Colors.successDark : Colors.warningDark},
              ]}>
                {row.growth}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Info box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{data.infoBox}</Text>
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
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stackedBar: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barSegmentFirst: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  barSegmentLast: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  barSegmentLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  legendLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  headerRow: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  colProduk: {
    width: 44,
  },
  colBalance: {
    flex: 1,
    textAlign: 'right',
  },
  colTarget: {
    width: 52,
    textAlign: 'right',
  },
  colCapaian: {
    width: 52,
    alignItems: 'flex-end',
  },
  colGrowth: {
    width: 52,
    textAlign: 'right',
  },
  headerText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rowLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  rowValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  rowMuted: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  capaianWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  capaianBadge: {
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  capaianText: {
    fontSize: 9,
    fontWeight: '700',
  },
  growthText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    textAlign: 'right',
  },
  infoBox: {
    backgroundColor: '#EAF4FF',
    borderRadius: 4,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
    paddingLeft: Spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryLight,
  },
  infoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryLight,
    lineHeight: 18,
  },
});
