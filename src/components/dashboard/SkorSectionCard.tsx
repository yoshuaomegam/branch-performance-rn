import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {SkorSection} from '../../types';

interface SkorSectionCardProps {
  title: string;
  data: SkorSection;
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
  const badSegW = (THRESHOLD_BAD / MAX_SKOR) * 100;
  const midSegW = ((THRESHOLD_EXCELLENT - THRESHOLD_BAD) / MAX_SKOR) * 100;
  const goodSegW = 100 - badSegW - midSegW;

  return (
    <View style={gaugeStyles.row}>
      {/* Left badge */}
      <View style={gaugeStyles.badgeBad}>
        <Text style={gaugeStyles.badgeBadText}>{'< 30 Bad'}</Text>
      </View>

      {/* Bar + marker */}
      <View style={gaugeStyles.barWrap}>
        <View style={gaugeStyles.track}>
          <View style={[gaugeStyles.seg, {width: `${badSegW}%`, backgroundColor: Colors.danger, borderTopLeftRadius: 3, borderBottomLeftRadius: 3}]} />
          <View style={[gaugeStyles.seg, {width: `${midSegW}%`, backgroundColor: Colors.warning}]} />
          <View style={[gaugeStyles.seg, {width: `${goodSegW}%`, backgroundColor: Colors.success, borderTopRightRadius: 3, borderBottomRightRadius: 3}]} />
        </View>
        {/* Marker */}
        <View style={[gaugeStyles.markerWrap, {left: `${markerPct}%`}]}>
          <View style={[gaugeStyles.markerPin, {backgroundColor: getSkorColor(skor)}]} />
          <Text style={[gaugeStyles.markerNum, {color: getSkorColor(skor)}]}>{skor}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  badgeBad: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  badgeBadText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.dangerDark,
  },
  badgeGood: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  badgeGoodText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.successDark,
  },
  barWrap: {
    flex: 1,
    position: 'relative',
    height: 24,
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  seg: {
    height: 6,
  },
  markerWrap: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -5}],
    top: 0,
  },
  markerPin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.surfaceLight,
  },
  markerNum: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 1,
  },
});

export function SkorSectionCard({title, data}: SkorSectionCardProps) {
  const skor = data.skor;
  const skorColor = getSkorColor(skor);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.skorNum, {color: skorColor}]}>{skor}</Text>
        </View>
        <Text style={styles.periode}>{data.periode}</Text>
      </View>

      {/* Gauge */}
      <GaugeBar skor={skor} />

      {/* Sub-metric scores */}
      <View style={styles.divider} />
      <View style={styles.itemsRow}>
        {data.items.map((item, idx) => (
          <React.Fragment key={item.id}>
            {idx > 0 && <View style={styles.itemSep} />}
            <View style={styles.subItem}>
              <Text style={styles.subLabel} numberOfLines={2}>{item.nama}</Text>
              <Text style={[styles.subSkor, {color: getSkorColor(item.skor)}]}>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  skorNum: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: '800',
    lineHeight: 30,
  },
  periode: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  itemsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  subItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  subLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 3,
  },
  subSkor: {
    fontSize: Typography.fontSize.base,
    fontWeight: '800',
  },
  itemSep: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});
