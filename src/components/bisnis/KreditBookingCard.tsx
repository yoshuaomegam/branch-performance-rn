import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {KreditBookingData} from '../../types';

interface Props {
  data: KreditBookingData;
}

function getStatusColor(status: string): string {
  if (status === 'good') return Colors.successDark;
  if (status === 'warning') return Colors.warningDark;
  if (status === 'bad') return Colors.dangerDark;
  return Colors.textSecondary;
}

function getStatusBg(status: string): string {
  if (status === 'good') return Colors.successLight;
  if (status === 'warning') return Colors.warningLight;
  if (status === 'bad') return Colors.dangerLight;
  return Colors.background;
}

export function KreditBookingCard({data}: Props) {
  const [activeChip, setActiveChip] = useState(data.chips[0]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Booking Kredit</Text>

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

      {/* Stat cards */}
      <View style={styles.statsRow}>
        {data.stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statNilai}>{stat.nilai}</Text>
            {stat.target ? (
              <View style={[styles.targetBadge, {backgroundColor: getStatusBg(stat.keteranganStatus)}]}>
                <Text style={[styles.targetText, {color: getStatusColor(stat.keteranganStatus)}]}>
                  {stat.target}
                </Text>
              </View>
            ) : null}
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
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statNilai: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  targetBadge: {
    borderRadius: 4,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  targetText: {
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
  },
});
