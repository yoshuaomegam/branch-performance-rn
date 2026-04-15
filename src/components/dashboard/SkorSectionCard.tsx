import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {SkorSection} from '../../types';

interface SkorSectionCardProps {
  title: string;
  data: SkorSection;
}

const MAX_SKOR = 100;
const THRESHOLD_BAD = 30;
const THRESHOLD_EXCELLENT = 80;

function getSkorColor(skor: number): string {
  if (skor >= THRESHOLD_EXCELLENT) return Colors.success;
  if (skor >= 60) return Colors.warning;
  return Colors.danger;
}

function getSkorBgColor(skor: number): string {
  if (skor >= THRESHOLD_EXCELLENT) return Colors.successLight;
  if (skor >= 60) return Colors.warningLight;
  return Colors.dangerLight;
}

function GaugeBar({skor}: {skor: number}) {
  const [barWidth, setBarWidth] = useState(0);

  const scorePct = Math.min(skor / MAX_SKOR, 1);
  const badPct   = THRESHOLD_BAD / MAX_SKOR;
  const goodPct  = THRESHOLD_EXCELLENT / MAX_SKOR;

  const scoreX = barWidth * scorePct;
  const badX   = barWidth * badPct;
  const goodX  = barWidth * goodPct;

  const color = getSkorColor(skor);

  return (
    <View
      style={gaugeStyles.container}
      onLayout={e => setBarWidth(e.nativeEvent.layout.width)}>

      {/* ── Badge row ─────────────────────────────────── */}
      <View style={gaugeStyles.badgeRow}>
        {barWidth > 0 && (
          <>
            <View
              style={[
                gaugeStyles.badgeAbsolute,
                {left: badX, transform: [{translateX: -26}]},
              ]}>
              <View style={gaugeStyles.badBadge}>
                <Text style={gaugeStyles.badText}>≤ 30 Bad</Text>
              </View>
            </View>

            <View
              style={[
                gaugeStyles.badgeAbsolute,
                {left: goodX, transform: [{translateX: -42}]},
              ]}>
              <View style={gaugeStyles.goodBadge}>
                <Text style={gaugeStyles.goodText}>≥ 80 Excellent</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* ── Bar area ──────────────────────────────────── */}
      <View style={gaugeStyles.barArea}>
        <View style={gaugeStyles.track} />

        {barWidth > 0 && (
          <View
            style={[gaugeStyles.fill, {width: scoreX, backgroundColor: color}]}
          />
        )}

        {barWidth > 0 && (
          <View style={[gaugeStyles.thresholdLineBad, {left: badX - 1}]} />
        )}

        {barWidth > 0 && (
          <View style={[gaugeStyles.thresholdLineGood, {left: goodX - 1}]} />
        )}

        {barWidth > 0 && (
          <View
            style={[gaugeStyles.scoreDot, {left: scoreX - 6, borderColor: color}]}
          />
        )}
      </View>
    </View>
  );
}

const gaugeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgeRow: {
    height: 24,
    position: 'relative',
    marginBottom: 6,
  },
  badgeAbsolute: {
    position: 'absolute',
    top: 0,
  },
  badBadge: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.dangerDark,
  },
  goodBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  goodText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.successDark,
  },
  barArea: {
    height: 20,
    position: 'relative',
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: 5,
  },
  fill: {
    position: 'absolute',
    left: 0,
    height: 10,
    borderRadius: 5,
  },
  thresholdLineBad: {
    position: 'absolute',
    width: 2,
    height: 18,
    backgroundColor: Colors.danger,
    borderRadius: 1,
    top: 1,
  },
  thresholdLineGood: {
    position: 'absolute',
    width: 2,
    height: 18,
    backgroundColor: Colors.success,
    borderRadius: 1,
    top: 1,
  },
  scoreDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 3,
    top: 4,
  },
});

export function SkorSectionCard({title, data}: SkorSectionCardProps) {
  const color = getSkorColor(data.skor);

  return (
    <View style={styles.card}>
      {/* ── Header ───────────────────────────────────── */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.periode}>{data.periode}</Text>
      </View>

      {/* ── Score box + Gauge ─────────────────────────── */}
      <View style={styles.scoreGaugeRow}>
        <View style={[styles.scoreBox, {backgroundColor: getSkorBgColor(data.skor)}]}>
          <Text style={[styles.scoreBoxNum, {color}]}>{data.skor}</Text>
        </View>

        <GaugeBar skor={data.skor} />
      </View>

      {/* ── Sub-scores row ───────────────────────────── */}
      <View style={styles.scoresRow}>
        {data.items.map(item => (
          <View key={item.id} style={styles.scoreItem}>
            <Text style={styles.scoreLabel} numberOfLines={2}>{item.nama}</Text>
            <Text style={[styles.scoreNum, {color: getSkorColor(item.skor)}]}>
              {item.skor}
            </Text>
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
    paddingTop: Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  scoreGaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    marginBottom: Spacing.base,
  },
  scoreBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  scoreBoxNum: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
  },
  scoresRow: {
    flexDirection: 'row',
    gap: 4,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: Colors.background,
    borderRadius: 6,
  },
  scoreLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 3,
    textAlign: 'center',
  },
  scoreNum: {
    fontSize: Typography.fontSize.base,
    fontWeight: '800',
    textAlign: 'center',
  },
});
