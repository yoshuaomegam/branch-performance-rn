import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {LivinChannelData} from '../../types';

interface Props {
  data: LivinChannelData;
}

export function LivinChannelCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.title}</Text>

      {/* Stacked bar */}
      <View style={styles.stackedBar}>
        {data.segments.map((seg, idx) => (
          <View
            key={idx}
            style={[
              styles.barSegment,
              {flex: seg.pct, backgroundColor: seg.warna},
              idx === 0 && styles.barFirst,
              idx === data.segments.length - 1 && styles.barLast,
            ]}>
            <Text style={styles.barLabel}>{seg.pct}%</Text>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        {data.segments.map((seg, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: seg.warna}]} />
            <Text style={styles.legendText}>{seg.label}</Text>
          </View>
        ))}
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableCellChannel, styles.headerText]}>Channel</Text>
          <Text style={[styles.tableCell, styles.tableCellUreg, styles.headerText]}>UREG</Text>
          <Text style={[styles.tableCell, styles.tableCellGrowth, styles.headerText]}>Growth</Text>
        </View>
        {/* Rows */}
        {data.rows.map((row, idx) => (
          <View key={idx} style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
            <Text style={[styles.tableCell, styles.tableCellChannel, styles.rowText]}>{row.channel}</Text>
            <Text style={[styles.tableCell, styles.tableCellUreg, styles.rowText]}>{row.ureg}</Text>
            <Text style={[
              styles.tableCell,
              styles.tableCellGrowth,
              styles.rowText,
              {color: row.growthUp ? Colors.successDark : Colors.dangerDark},
            ]}>
              {row.growthUp ? '↑' : '↓'} {row.growth}
            </Text>
          </View>
        ))}
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
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  stackedBar: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  barSegment: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  barFirst: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  barLast: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  legendRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginBottom: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: Colors.background,
  },
  tableRowAlt: {
    backgroundColor: Colors.background,
  },
  tableCell: {
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.sm,
  },
  tableCellChannel: {
    flex: 2,
  },
  tableCellUreg: {
    flex: 1,
    textAlign: 'left',
  },
  tableCellGrowth: {
    flex: 1,
    textAlign: 'right',
  },
  headerText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rowText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
});
