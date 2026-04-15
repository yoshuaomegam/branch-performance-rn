import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {AkuisiChurn} from '../../types';

interface Props {
  data: AkuisiChurn;
}

function getKeteranganColor(status: string): string {
  if (status === 'good') return Colors.successDark;
  if (status === 'warning') return Colors.warningDark;
  if (status === 'bad') return Colors.dangerDark;
  return Colors.textSecondary;
}

export function AkuisiChurnCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Akuisisi & Churn</Text>

      {/* 2x2 stat grid */}
      <View style={styles.statsRow}>
        {data.stats.slice(0, 2).map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statNilai}>{stat.nilai}</Text>
            <Text style={[styles.statKet, {color: getKeteranganColor(stat.keteranganStatus)}]}>
              {stat.keterangan}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.statsRow}>
        {data.stats.slice(2, 4).map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statNilai}>{stat.nilai}</Text>
            <Text style={[styles.statKet, {color: getKeteranganColor(stat.keteranganStatus)}]}>
              {stat.keterangan}
            </Text>
          </View>
        ))}
      </View>

      {/* Rincian per segmen */}
      <Text style={styles.title}>Rincian per Segmen</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colHeader, styles.colSegmen]}>Segmen</Text>
          <Text style={[styles.colHeader, styles.colNum]}>Akuisisi</Text>
          <Text style={[styles.colHeader, styles.colNum]}>Churn</Text>
          <Text style={[styles.colHeader, styles.colNum]}>Nett</Text>
        </View>
        {data.rincian.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, styles.colSegmen]}>{row.segmen}</Text>
            <Text style={[styles.cell, styles.colNum]}>{row.akuisisi}</Text>
            <Text style={[styles.cell, styles.colNum]}>{row.churn}</Text>
            <Text style={[
              styles.cell, styles.colNum, styles.nettText,
              {color: row.nettUp ? Colors.successDark : Colors.dangerDark},
            ]}>
              {row.nettUp ? '+' : ''}{row.nett}
            </Text>
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
    overflow: 'hidden',
    padding: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    gap: 4,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statNilai: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  statKet: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
  rincianTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  colHeader: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs + 1,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  cell: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  colSegmen: {flex: 2},
  colNum: {flex: 1, textAlign: 'right'},
  nettText: {fontWeight: '700'},
});
