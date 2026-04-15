import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {Colors, Spacing, Typography} from '../../theme';
import type {DPKEndingBalance} from '../../types';

interface Props {
  data: DPKEndingBalance;
}

export function EndingBalanceCard({data}: Props) {
  return (
    <View style={styles.card}>
      {/* ── Dark hero ── */}
      <View style={styles.hero}>
        <Svg style={StyleSheet.absoluteFill} height="100%" width="100%">
          <Defs>
            <LinearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#0D1E2D" stopOpacity="1" />
              <Stop offset="1" stopColor="#121518" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#heroGrad)" />
        </Svg>

        <View style={styles.heroContent}>
          <View style={styles.heroTitleRow}>
            <Text style={styles.heroLabel}>{data.label}</Text>
            <Text style={styles.heroDot}> • </Text>
            <Text style={styles.heroTanggal}>{data.tanggal}</Text>
          </View>
          <Text style={styles.heroNilai}>{data.nilai}</Text>
          <View style={styles.heroSubRow}>
            <Text style={styles.heroTargetText}>
              {'Target: '}
              <Text style={styles.heroTargetBold}>{data.target}</Text>
            </Text>
            <Text style={styles.heroDotWhite}> • </Text>
            <Text style={[
              styles.heroKeterangan,
              {color: data.keteranganUp ? '#54C981' : Colors.danger},
            ]}>
              {data.keteranganUp ? '↑ ' : '↓ '}{data.keterangan}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Comparison cards ── */}
      <View style={styles.compRow}>
        {data.perbandingan.map((item, idx) => (
          <View key={idx} style={styles.compCard}>
            <Text style={styles.compTanggal}>{item.tanggal}</Text>
            <Text style={styles.compNilai}>{item.nilai}</Text>
            <View style={styles.compGrowthRow}>
              <Text style={[
                styles.compGrowthArrow,
                {color: item.growthUp ? Colors.successDark : Colors.dangerDark},
              ]}>
                {item.growthUp ? '↑' : '↓'}
              </Text>
              <Text style={[
                styles.compGrowth,
                {color: item.growthUp ? Colors.successDark : Colors.dangerDark},
              ]}>
                {' '}{item.growth}
              </Text>
            </View>
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
  },
  hero: {
    overflow: 'hidden',
    borderRadius: 8,
    margin: Spacing.sm,
  },
  heroContent: {
    paddingHorizontal: Spacing.sm + 2,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
    gap: 4,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  heroLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  heroDot: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textWhite,
  },
  heroTanggal: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  heroNilai: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textWhite,
    marginTop: 2,
  },
  heroSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  heroTargetText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textWhite,
  },
  heroTargetBold: {
    fontWeight: '700',
    color: Colors.textWhite,
  },
  heroDotWhite: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textWhite,
  },
  heroKeterangan: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  compRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  compCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  compTanggal: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  compNilai: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  compGrowthRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compGrowthArrow: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
  },
  compGrowth: {
    fontSize: Typography.fontSize.xs,
  },
});
