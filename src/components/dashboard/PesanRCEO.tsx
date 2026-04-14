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
    marginBottom: 0,
    backgroundColor: '#FFFBF0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0D080',
    padding: Spacing.base,
  },
  labelRow: {
    marginBottom: Spacing.sm,
  },
  labelPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF9500',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  labelText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  teks: {
    fontSize: Typography.fontSize.sm,
    color: '#3D2800',
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  penulis: {
    fontSize: Typography.fontSize.xs,
    color: '#7A5200',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
