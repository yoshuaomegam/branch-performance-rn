import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography, Spacing, StatusColors} from '../../theme';
import {ProgressBar} from '../common/ProgressBar';
import {StatusBadge} from '../common/StatusBadge';
import {useFormatNumber} from '../../hooks/useFormatNumber';
import type {MetricItem} from '../../types';

interface MetricRowProps {
  item: MetricItem;
  isLast?: boolean;
}

export function MetricRow({item, isLast = false}: MetricRowProps) {
  const {formatValue} = useFormatNumber();
  const sc = StatusColors[item.status];

  const dotColor =
    item.status === 'good'
      ? Colors.success
      : item.status === 'warning'
      ? Colors.warning
      : Colors.danger;

  const badgeBg =
    item.status === 'good'
      ? Colors.successLight
      : item.status === 'warning'
      ? Colors.warningLight
      : Colors.dangerLight;

  return (
    <View style={[styles.itemWrap, isLast && styles.itemWrapLast]}>
      {/* ① Item badge header with dot */}
      <View style={styles.badgeRow}>
        <View style={[styles.itemBadge, {backgroundColor: badgeBg}]}>
          <View style={[styles.itemDot, {backgroundColor: dotColor}]} />
          <Text style={[styles.itemName, {color: dotColor}]} numberOfLines={1}>
            {item.nama}
          </Text>
        </View>
        {item.keterangan ? (
          <Text style={styles.keterangan} numberOfLines={1}>
            {item.keterangan}
          </Text>
        ) : null}
      </View>

      {/* ② Progress bar */}
      <View style={styles.progressWrap}>
        <ProgressBar value={item.pencapaian} status={item.status} height={8} showTarget />
      </View>

      {/* ③ Data row: target | realisasi | badge */}
      <View style={styles.dataRow}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Target</Text>
          <Text style={styles.dataValue}>
            {formatValue(item.target, item.satuan, item.formatRingkas)}
          </Text>
        </View>
        <View style={styles.dataSep} />
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Realisasi</Text>
          <Text style={[styles.dataValue, {color: sc.text}]}>
            {formatValue(item.realisasi, item.satuan, item.formatRingkas)}
          </Text>
        </View>
        <StatusBadge status={item.status} value={item.pencapaian} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrap: {
    paddingTop: Spacing.md,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemWrapLast: {
    borderBottomWidth: 0,
  },

  /* ① badge */
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  itemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
    gap: Spacing.xs + 1,
    alignSelf: 'flex-start',
  },
  itemDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    maxWidth: 180,
  },
  keterangan: {
    fontSize: 9,
    color: Colors.textSecondary,
    flex: 1,
    fontStyle: 'italic',
  },

  /* ② progress bar */
  progressWrap: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },

  /* ③ data row */
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 1,
    minHeight: 44,
    gap: Spacing.sm,
  },
  dataItem: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 1,
  },
  dataValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  dataSep: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
});
