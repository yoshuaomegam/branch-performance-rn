import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {AlertItem} from '../../types';

interface AlertProyeksiProps {
  items: AlertItem[];
}

interface AlertCardProps {
  item: AlertItem;
}

function AlertCard({item}: AlertCardProps) {
  const isBuruk = item.tipe === 'buruk';
  const borderColor = isBuruk ? Colors.danger : Colors.warning;
  const bgColor = isBuruk ? Colors.dangerLight : Colors.warningLight;
  const labelBg = isBuruk ? Colors.danger : Colors.warning;
  const labelColor = Colors.textWhite;

  return (
    <View style={[styles.alertCard, {borderLeftColor: borderColor, backgroundColor: bgColor}]}>
      <View style={styles.alertHeader}>
        <View style={[styles.alertLabel, {backgroundColor: labelBg}]}>
          <Text style={[styles.alertLabelText, {color: labelColor}]}>{item.label}</Text>
        </View>
      </View>
      <Text style={styles.alertJudul}>{item.judul}</Text>
      <Text style={styles.alertDeskripsi}>{item.deskripsi}</Text>
      {item.cta ? (
        <Text style={[styles.alertCta, {color: isBuruk ? Colors.dangerDark : Colors.warningDark}]}>
          {item.cta}
        </Text>
      ) : null}
    </View>
  );
}

export function AlertProyeksi({items}: AlertProyeksiProps) {
  if (!items.length) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Alert dan Proyeksi</Text>
      {items.map(item => (
        <AlertCard key={item.id} item={item} />
      ))}
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
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  alertCard: {
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.sm,
  },
  alertHeader: {
    marginBottom: Spacing.xs,
  },
  alertLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  alertLabelText: {
    fontSize: 9,
    fontWeight: '700',
  },
  alertJudul: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  alertDeskripsi: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  alertCta: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    marginTop: Spacing.xs,
    lineHeight: 16,
  },
});
