import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {LivinFrekuensiData} from '../../types';

interface Props {
  data: LivinFrekuensiData;
}

export function LivinFrekuensiCard({data}: Props) {
  const [activeChip, setActiveChip] = useState(data.chips[0]);

  const items = data.byChip[activeChip] ?? data.byChip[data.chips[0]];
  const total = items.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Frekuensi Transaksi Nasabah</Text>

      {/* Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}>
        {data.chips.map(chip => {
          const isActive = chip === activeChip;
          return (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActiveChip(chip)}
              activeOpacity={0.8}>
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Header row */}
      <View style={styles.row}>
        <Text style={[styles.colMetrik, styles.headerText]}>Metrik</Text>
        <View style={styles.colBar} />
        <Text style={[styles.colNasabah, styles.headerText]}>Nasabah</Text>
        <Text style={[styles.colPct, styles.headerText]}>% Total</Text>
      </View>

      {/* Data rows */}
      {items.map((item, idx) => (
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

      {/* Total row */}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={[styles.colMetrik, styles.totalText]}>Total</Text>
        <View style={styles.colBar} />
        <Text style={[styles.colNasabah, styles.totalText]}>{total}</Text>
        <Text style={[styles.colPct, styles.totalText]}>100%</Text>
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
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  chipText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs + 1,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.xs,
    paddingTop: Spacing.xs + 2,
  },
  colMetrik: {
    width: 72,
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
  },
  rowPct: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
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
    backgroundColor: Colors.primary,
  },
  totalText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
