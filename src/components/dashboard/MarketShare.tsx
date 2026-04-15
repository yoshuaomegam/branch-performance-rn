import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {MarketShare as MarketShareType} from '../../types';

interface MarketShareProps {
  data: MarketShareType;
}

export function MarketShare({data}: MarketShareProps) {
  const totalPct = data.banks.reduce((s, b) => s + b.pct, 0) || 1;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Market Share - {data.area}</Text>
      </View>

      {/* Single proportional stacked bar */}
      <View style={styles.stackedBar}>
        {data.banks.map((bank, idx) => {
          const segFlex = bank.pct / totalPct;
          const isFirst = idx === 0;
          const isLast = idx === data.banks.length - 1;
          return (
            <View
              key={bank.id}
              style={[
                styles.stackSeg,
                {
                  flex: segFlex,
                  backgroundColor: bank.warna,
                  borderTopLeftRadius: isFirst ? 8 : 0,
                  borderBottomLeftRadius: isFirst ? 8 : 0,
                  borderTopRightRadius: isLast ? 8 : 0,
                  borderBottomRightRadius: isLast ? 8 : 0,
                },
              ]}>
              <Text style={styles.segLabel} numberOfLines={1}>{bank.nama}</Text>
            </View>
          );
        })}
      </View>

      {/* Legend below bar */}
      <View style={styles.legendRow}>
        {data.banks.map(bank => (
          <View key={bank.id} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: bank.warna}]} />
            <Text style={styles.legendText}>{bank.nama} {bank.pct}%</Text>
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
    overflow: 'hidden',
    padding: Spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  areaLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    flex: 1,
  },
  stackedBar: {
    flexDirection: 'row',
    height: 28,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  stackSeg: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  legendRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 8,
    color: Colors.textSecondary,
  },
});
