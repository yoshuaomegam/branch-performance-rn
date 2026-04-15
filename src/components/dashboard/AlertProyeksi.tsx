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
  const borderColor  = isBuruk ? Colors.danger     : Colors.warning;
  const dotColor     = isBuruk ? Colors.danger     : Colors.warning;
  const labelBg      = isBuruk ? Colors.dangerLight  : Colors.warningLight;
  const labelTextColor = isBuruk ? Colors.dangerDark : Colors.warningDark;

  return (
    <View style={[styles.alertCard, {borderLeftColor: borderColor}]}>
      <View style={styles.alertHeader}>
        <View style={[styles.alertLabel, {backgroundColor: labelBg}]}>
          <View style={[styles.labelDot, {backgroundColor: dotColor}]} />
          <Text style={[styles.alertLabelText, {color: labelTextColor}]}>{item.label}</Text>
        </View>
      </View>
      <Text style={[styles.alertJudul, {color: isBuruk ? Colors.dangerDark : Colors.warningDark}]}>{item.judul}</Text>
      <Text style={styles.alertDeskripsi}>{item.deskripsi}</Text>
      {item.cta ? (
        <View style={styles.ctaBox}>
          <Text style={styles.alertCta}>{item.cta}</Text>
        </View>
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
    marginBottom: Spacing.base,
  },
  alertCard: {
    borderLeftWidth: 3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.sm,
  },
  alertHeader: {
    marginBottom: Spacing.xs,
  },
  alertLabel: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
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
  ctaBox: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    backgroundColor: Colors.background,
  },
  alertCta: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
