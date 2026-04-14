import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {MarketShare as MarketShareType} from '../../types';

interface MarketShareProps {
  data: MarketShareType;
}

export function MarketShare({data}: MarketShareProps) {
  const maxPct = Math.max(...data.banks.map(b => b.pct));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Market Share - {data.area}</Text>

      {/* Bank logos / color indicators row */}
      <View style={styles.banksRow}>
        {data.banks.map(bank => (
          <View key={bank.id} style={styles.bankTag}>
            <View style={[styles.bankDot, {backgroundColor: bank.warna}]} />
            <Text style={styles.bankName}>{bank.nama}</Text>
          </View>
        ))}
      </View>

      {/* Bars */}
      <View style={styles.barsContainer}>
        {data.banks.map(bank => {
          const barPct = (bank.pct / maxPct) * 100;
          return (
            <View key={bank.id} style={styles.barRow}>
              <Text style={styles.barLabel}>{bank.nama}</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, {width: `${barPct}%`, backgroundColor: bank.warna}]} />
              </View>
              <Text style={styles.barValue}>{bank.pct}%</Text>
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
    overflow: 'hidden',
    padding: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  banksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  bankTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  bankDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bankName: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  barsContainer: {
    gap: Spacing.sm,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  barLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    width: 44,
  },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: 10,
    borderRadius: 5,
  },
  barValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 36,
    textAlign: 'right',
  },
});
