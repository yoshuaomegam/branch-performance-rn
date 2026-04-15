import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {PesanRCEO as PesanRCEOType} from '../../types';

interface PesanRCEOProps {
  pesan: PesanRCEOType;
}

export function PesanRCEO({pesan}: PesanRCEOProps) {
  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <View style={styles.labelPill}>
          <View style={styles.labelDot} />
          <Text style={styles.labelText}>Pesan RCEO!</Text>
        </View>
      </View>
      <Text style={styles.teks}>{pesan.teks}</Text>
      <Text style={styles.penulis}>- {pesan.penulis}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceDark,
    borderRadius: 8,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.surfaceDark2,
  },
  labelRow: {
    marginBottom: Spacing.sm,
  },
  labelPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: 4,
    gap: Spacing.xs + 2,
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceDark,
  },
  labelText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  teks: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textWhite,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  penulis: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
