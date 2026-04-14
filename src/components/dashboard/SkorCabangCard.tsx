import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {SkorCabang} from '../../types';

interface SkorCabangCardProps {
  data: SkorCabang;
}

const MAX_SKOR = 120;
const THRESHOLD_BAD = 30;
const THRESHOLD_EXCELLENT = 80;

function getSkorColor(skor: number): string {
  if (skor >= THRESHOLD_EXCELLENT) return Colors.success;
  if (skor >= 60) return Colors.warning;
  return Colors.danger;
}

function GaugeBar({skor}: {skor: number}) {
  const markerPct = Math.min((skor / MAX_SKOR) * 100, 100);
  const badSegW = (THRESHOLD_BAD / MAX_SKOR) * 100;          // 25%
  const midSegW = ((THRESHOLD_EXCELLENT - THRESHOLD_BAD) / MAX_SKOR) * 100;  // 41.67%
  const goodSegW = 100 - badSegW - midSegW;                   // 33.33%

  return (
    <View style={gaugeStyles.wrapper}>
      {/* Left badge */}
      <View style={gaugeStyles.badgeBad}>
        <Text style={gaugeStyles.badgeBadText}>{'< 30 Bad'}</Text>
      </View>

      {/* Bar + marker */}
      <View style={gaugeStyles.barWrap}>
        <View style={gaugeStyles.track}>
          {/* Three color segments */}
          <View style={[gaugeStyles.seg, {width: `${badSegW}%`, backgroundColor: Colors.danger, borderTopLeftRadius: 4, borderBottomLeftRadius: 4}]} />
          <View style={[gaugeStyles.seg, {width: `${midSegW}%`, backgroundColor: Colors.warning}]} />
          <View style={[gaugeStyles.seg, {width: `${goodSegW}%`, backgroundColor: Colors.success, borderTopRightRadius: 4, borderBottomRightRadius: 4}]} />
        </View>
        {/* Score marker */}
        <View style={[gaugeStyles.markerLine, {left: `${markerPct}%`}]}>
          <View style={gaugeStyles.markerDiamond} />
          <Text style={[gaugeStyles.markerLabel, {color: getSkorColor(skor)}]}>{skor}</Text>
        </View>
      </View>

      {/* Right badge */}
      <View style={gaugeStyles.badgeGood}>
        <Text style={gaugeStyles.badgeGoodText}>{`> 80 Excellent`}</Text>
      </View>
    </View>
  );
}

const gaugeStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  badgeBad: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeBadText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.dangerDark,
  },
  badgeGood: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeGoodText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.successDark,
  },
  barWrap: {
    flex: 1,
    position: 'relative',
    height: 28,
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  seg: {
    height: 8,
  },
  markerLine: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -8}],
    top: 0,
  },
  markerDiamond: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 2,
    borderColor: Colors.textPrimary,
    transform: [{rotate: '45deg'}],
    marginBottom: 2,
  },
  markerLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '800',
    marginTop: 2,
  },
});

export function SkorCabangCard({data}: SkorCabangCardProps) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Skor Cabang</Text>
        <Text style={styles.periode}>{data.periode}</Text>
      </View>

      {/* Large score number */}
      <Text style={[styles.bigScore, {color: getSkorColor(data.skor)}]}>{data.skor}</Text>

      {/* Gauge */}
      <GaugeBar skor={data.skor} />

      {/* Category scores row */}
      <View style={styles.divider} />
      <View style={styles.scoresRow}>
        {data.skorKategori.map((item, idx) => (
          <React.Fragment key={item.id}>
            {idx > 0 && <View style={styles.scoreSep} />}
            <View style={styles.scoreItem}>
              <Text style={styles.scoreKatLabel}>{item.nama}</Text>
              <Text style={[styles.scoreKatNum, {color: getSkorColor(item.skor)}]}>
                {item.skor}
              </Text>
            </View>
          </React.Fragment>
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
    paddingTop: Spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  periode: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  bigScore: {
    fontSize: 48,
    fontWeight: '800',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xs,
    lineHeight: 56,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  scoresRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreKatLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  scoreKatNum: {
    fontSize: Typography.fontSize.base,
    fontWeight: '800',
  },
  scoreSep: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});
