import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {LivinProgresData} from '../../types';

interface Props {
  data: LivinProgresData;
}

export function LivinProgresCard({data}: Props) {
  const [activeChip, setActiveChip] = useState(data.chips[0]);

  const items = data.byChip[activeChip] ?? data.byChip[data.chips[0]];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Progres Akuisisi</Text>

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

      {/* Progress rows — Label | Bar | Nilai | Pct% */}
      <View style={styles.progressList}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.progressRow}>
            <Text style={styles.progressLabel}>{item.label}</Text>
            <View style={styles.barWrap}>
              <View style={[styles.barFill, {width: `${item.pct}%`}]} />
            </View>
            <Text style={styles.progressNilai}>{item.nilai.toLocaleString('id-ID')}</Text>
            <Text style={styles.progressPct}>{item.pct}%</Text>
          </View>
        ))}
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
  progressList: {
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressLabel: {
    width: 84,
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  barWrap: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  progressNilai: {
    width: 40,
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  progressPct: {
    width: 34,
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'right',
  },
  infoBox: {
    backgroundColor: '#EBF3FF',
    borderRadius: 6,
    padding: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  infoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    lineHeight: 18,
  },
});
