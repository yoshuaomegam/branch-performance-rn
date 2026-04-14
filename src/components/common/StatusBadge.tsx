import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, StatusColors, Typography} from '../../theme';
import type {MetricStatus} from '../../types';

interface StatusBadgeProps {
  status: MetricStatus;
  value: number;
}

export function StatusBadge({status, value}: StatusBadgeProps) {
  const colors = StatusColors[status];
  return (
    <View style={[styles.badge, {backgroundColor: colors.bg}]}>
      <Text style={[styles.text, {color: colors.text}]}>
        {value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 9,
    alignSelf: 'center',
    minWidth: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
