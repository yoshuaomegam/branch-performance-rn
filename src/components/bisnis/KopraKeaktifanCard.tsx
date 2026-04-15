import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {KopraKeaktifanData} from '../../types';

interface Props {
  data: KopraKeaktifanData;
}

export function KopraKeaktifanCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Keaktifan Kopra</Text>

      {data.segmen.map((segmen, si) => (
        <View key={si} style={styles.segmenWrap}>
          {/* Section title */}
          <Text style={styles.segmenTitle}>{segmen.nama}</Text>

          {/* Header */}
          <View style={styles.row}>
            <Text style={[styles.colMetrik, styles.headerText]}>Metrik</Text>
            <View style={styles.colBar} />
            <Text style={[styles.colNasabah, styles.headerText]}>Nasabah</Text>
            <Text style={[styles.colPct, styles.headerText]}>% Total</Text>
          </View>

          {/* Data rows */}
          {segmen.items.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={[styles.colMetrik, styles.rowLabel]}>{item.label}</Text>
              <View style={styles.colBar}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, {width: `${item.pct}%`}]} />
                </View>
              </View>
              <Text style={[styles.colNasabah, styles.rowValue]}>{item.jumlah}</Text>
              <Text style={[styles.colPct, styles.rowPct]}>{item.pct}%</Text>
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
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  segmenWrap: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.sm,
    gap: Spacing.xs + 2,
  },
  segmenTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  colMetrik: {
    width: 90,
  },
  colBar: {
    flex: 1,
    paddingHorizontal: Spacing.xs,
  },
  colNasabah: {
    width: 52,
    textAlign: 'right',
  },
  colPct: {
    width: 44,
    textAlign: 'right',
  },
  headerText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rowLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  rowValue: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  rowPct: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'right',
  },
  barTrack: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
  },
});
