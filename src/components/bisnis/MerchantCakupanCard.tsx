import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {MerchantCakupanData} from '../../types';

interface Props {
  data: MerchantCakupanData;
}

const COL_COLORS: Record<string, string> = {
  EDC:   '#6FAEFC',
  LM:    '#A2CFFF',
  Kopra: '#074DB6',
  Belum: '#6A727D',
};

export function MerchantCakupanCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Analisa Cakupan</Text>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.colSegmen, styles.headerText]}>Segmen</Text>
          <Text style={[styles.colNum, styles.headerText, {color: COL_COLORS.EDC}]}>EDC</Text>
          <Text style={[styles.colNum, styles.headerText, {color: COL_COLORS.LM}]}>LM</Text>
          <Text style={[styles.colNum, styles.headerText, {color: COL_COLORS.Kopra}]}>Kopra</Text>
          <Text style={[styles.colNum, styles.headerText, {color: COL_COLORS.Belum}]}>Belum</Text>
        </View>

        {data.rows.map((row, idx) => (
          <View key={idx} style={[styles.row, idx < data.rows.length - 1 && styles.rowBorder]}>
            <Text style={[styles.colSegmen, styles.rowLabel]}>{row.segmen}</Text>
            <Text style={[styles.colNum, styles.rowValue]}>{row.edc}</Text>
            <Text style={[styles.colNum, styles.rowValue]}>{row.lm}</Text>
            <Text style={[styles.colNum, styles.rowValue]}>{row.kopra}</Text>
            <Text style={[styles.colNum, styles.rowValue]}>{row.belum}</Text>
          </View>
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
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  headerRow: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  colSegmen: {
    flex: 1,
  },
  colNum: {
    width: 44,
    textAlign: 'center',
  },
  headerText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rowLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  rowValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});
