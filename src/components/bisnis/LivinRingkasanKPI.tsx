import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {LivinRingkasanKPIData} from '../../types';

interface Props {
  data: LivinRingkasanKPIData;
  columns?: 2 | 3;
}

function getBadgeColor(status?: string): {bg: string; text: string} {
  if (status === 'good')    return {bg: Colors.successLight, text: Colors.successDark};
  if (status === 'warning') return {bg: Colors.warningLight, text: Colors.warningDark};
  if (status === 'bad')     return {bg: Colors.dangerLight,  text: Colors.dangerDark};
  return {bg: Colors.background, text: Colors.textSecondary};
}

export function LivinRingkasanKPI({data, columns = 3}: Props) {
  // '30%' leaves room for 3 cols; '47%' leaves room for 2 cols (gap is 8px)
  const cellWidth = columns === 2 ? '47%' : '30%';
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ringkasan KPI</Text>
      <View style={styles.grid}>
        {data.stats.map((stat, idx) => {
          const badge = stat.keterangan ? getBadgeColor(stat.keteranganStatus) : null;
          return (
            <View key={idx} style={[styles.cell, {width: cellWidth}]}>
              <Text style={styles.cellLabel}>{stat.label}</Text>
              <Text style={styles.cellNilai}>{stat.nilai}</Text>
              {stat.keterangan && badge ? (
                <View style={[styles.badge, {backgroundColor: badge.bg}]}>
                  <Text style={[styles.badgeText, {color: badge.text}]}>
                    {stat.keterangan}
                  </Text>
                </View>
              ) : (
                <View style={styles.badgePlaceholder} />
              )}
            </View>
          );
        })}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cell: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  cellLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  cellNilai: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
  },
  badgePlaceholder: {
    height: 18,
  },
});
