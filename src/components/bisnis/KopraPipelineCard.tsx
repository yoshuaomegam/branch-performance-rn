import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {KopraPipelineData} from '../../types';

interface Props {
  data: KopraPipelineData;
}

export function KopraPipelineCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pipeline Badan Usaha Kawasan Terdekat</Text>

      {data.areas.map((area, idx) => (
        <View key={idx} style={styles.areaCard}>
          <Text style={styles.areaName}>{area.nama}</Text>
          <Text style={styles.areaDesc}>
            {area.jarak} • {area.perusahaan} • {area.estimasiSV}
          </Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeTarget}>
              <Text style={styles.badgeTargetText}>{area.target} Target</Text>
            </View>
            <View style={styles.badgeOnboard}>
              <Text style={styles.badgeOnboardText}>{area.onboard} Sudah Onboard</Text>
            </View>
          </View>
        </View>
      ))}

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
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  areaCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    gap: 4,
  },
  areaName: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  areaDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  badgeTarget: {
    backgroundColor: Colors.warningLight,
    borderRadius: 16,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
  },
  badgeTargetText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.warningDark,
    fontWeight: '500',
  },
  badgeOnboard: {
    backgroundColor: Colors.successLight,
    borderRadius: 16,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
  },
  badgeOnboardText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.successDark,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#EAF4FF',
    borderRadius: 4,
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
    paddingLeft: Spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryLight,
  },
  infoText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primaryLight,
    lineHeight: 18,
  },
});
