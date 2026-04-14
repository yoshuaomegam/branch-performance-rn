import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography, Spacing} from '../../theme';
import {StatusColors} from '../../theme';
import type {MetricStatus} from '../../types';

interface SectionHeaderProps {
  title: string;
  status?: MetricStatus;
}

export function SectionHeader({title, status = 'bad'}: SectionHeaderProps) {
  const dotColor =
    status === 'good'
      ? Colors.success
      : status === 'warning'
      ? Colors.warning
      : Colors.danger;

  const bgColor =
    status === 'good'
      ? Colors.successLight
      : status === 'warning'
      ? Colors.warningLight
      : Colors.dangerLight;

  return (
    <View style={styles.container}>
      <View style={[styles.badge, {backgroundColor: bgColor}]}>
        <View style={[styles.dot, {backgroundColor: dotColor}]} />
        <Text style={[styles.title, {color: dotColor}]}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: 4,
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
