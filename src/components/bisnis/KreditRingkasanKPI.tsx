import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {KreditRingkasanKPIData} from '../../types';

interface Props {
  data: KreditRingkasanKPIData;
}

function getKetColor(status: string): string {
  if (status === 'good') return Colors.successDark;
  if (status === 'warning') return Colors.warningDark;
  if (status === 'bad') return Colors.dangerDark;
  return Colors.textSecondary;
}

export function KreditRingkasanKPI({data}: Props) {
  const rows = [data.stats.slice(0, 2), data.stats.slice(2, 4)];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ringkasan KPI Kredit</Text>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((stat, si) => (
            <View key={si} style={styles.statCard}>
              <Text style={styles.label}>{stat.label}</Text>
              <Text style={styles.nilai}>{stat.nilai}</Text>
              <Text style={[styles.keterangan, {color: getKetColor(stat.keteranganStatus)}]}>
                {stat.keterangan}
              </Text>
            </View>
          ))}
        </View>
      ))}
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
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    gap: 4,
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  nilai: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  keterangan: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
});
