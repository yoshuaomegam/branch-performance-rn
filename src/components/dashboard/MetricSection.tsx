import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography, StatusColors} from '../../theme';
import {MetricRow} from './MetricRow';
import type {MetricSection as MetricSectionType, MetricStatus} from '../../types';

interface MetricSectionProps {
  section: MetricSectionType;
}

function deriveSectionStatus(items: MetricSectionType['items']): MetricStatus {
  const avg = items.reduce((s, i) => s + i.pencapaian, 0) / items.length;
  if (avg >= 100) return 'good';
  if (avg >= 85) return 'warning';
  return 'bad';
}

export function MetricSection({section}: MetricSectionProps) {
  const sectionStatus = deriveSectionStatus(section.items);
  const avgPct = section.items.reduce((s, i) => s + i.pencapaian, 0) / section.items.length;

  const dotColor =
    sectionStatus === 'good'
      ? Colors.success
      : sectionStatus === 'warning'
      ? Colors.warning
      : Colors.danger;

  const badgeBg =
    sectionStatus === 'good'
      ? Colors.successLight
      : sectionStatus === 'warning'
      ? Colors.warningLight
      : Colors.dangerLight;

  const fillColor =
    sectionStatus === 'good'
      ? Colors.success
      : sectionStatus === 'warning'
      ? Colors.warning
      : Colors.danger;

  const fillPct = Math.min((Math.min(avgPct, 120) / 120) * 100, 100);
  const targetLinePct = (100 / 120) * 100; // 83.33%

  return (
    <View style={styles.card}>
      {/* Section badge header */}
      <View style={styles.headerRow}>
        <View style={[styles.badge, {backgroundColor: badgeBg}]}>
          <View style={[styles.dot, {backgroundColor: dotColor}]} />
          <Text style={[styles.badgeText, {color: dotColor}]}>
            {section.judul}
          </Text>
        </View>
        <Text style={[styles.avgText, {color: dotColor}]}>
          {avgPct % 1 === 0 ? avgPct.toFixed(0) : avgPct.toFixed(1)}%
        </Text>
      </View>

      {/* Section-level progress bar */}
      <View style={styles.progressRow}>
        <View style={styles.track}>
          <View style={[styles.fill, {width: `${fillPct}%`, backgroundColor: fillColor}]} />
          <View style={[styles.targetLine, {left: `${targetLinePct}%`}]} />
        </View>
      </View>

      {/* All metric items */}
      {section.items.map((item, idx) => (
        <MetricRow
          key={item.id}
          item={item}
          isLast={idx === section.items.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.sm + 2,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },

  /* header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: 4,
    gap: Spacing.xs + 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  avgText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
  },

  /* progress bar */
  progressRow: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
    overflow: 'visible',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 10,
    borderRadius: 5,
  },
  targetLine: {
    position: 'absolute',
    top: -3,
    width: 2,
    height: 16,
    backgroundColor: Colors.dangerDark,
    opacity: 0.5,
  },
});
