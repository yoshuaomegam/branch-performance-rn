import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import type {MetricStatus} from '../../types';

interface ProgressBarProps {
  value: number;         // 0–100+ (pencapaian %)
  status: MetricStatus;
  height?: number;
  trackWidth?: number;   // override full-width track
  showTarget?: boolean;  // show dashed target line at 100%
}

export function ProgressBar({
  value,
  status,
  height = 10,
  showTarget = true,
}: ProgressBarProps) {
  const MAX = 120;
  const fillPct = Math.min((Math.min(value, MAX) / MAX) * 100, 100);
  const targetPct = (100 / MAX) * 100; // 83.33%

  const barColor =
    status === 'good'
      ? Colors.success
      : status === 'warning'
      ? Colors.warning
      : Colors.danger;

  return (
    <View style={[styles.track, {height, borderRadius: height / 2}]}>
      <View
        style={[
          styles.fill,
          {
            width: `${fillPct}%`,
            height,
            backgroundColor: barColor,
            borderRadius: height / 2,
          },
        ]}
      />
      {showTarget && (
        <>
          {/* dashed target line at 100% mark */}
          <View
            style={[
              styles.targetLine,
              {left: `${targetPct}%`, height: height + 6, top: -3},
            ]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.border,
    overflow: 'visible',
    position: 'relative',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  targetLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: Colors.dangerDark,
    opacity: 0.6,
  },
});
