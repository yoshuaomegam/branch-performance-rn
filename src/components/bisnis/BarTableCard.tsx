import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {DPKBarTable, MetricStatus} from '../../types';

interface Props {
  data: DPKBarTable;
}

function getStatusColor(status: MetricStatus): string {
  if (status === 'good') return Colors.successDark;
  if (status === 'warning') return Colors.warningDark;
  return Colors.dangerDark;
}

function getStatusBg(status: MetricStatus): string {
  if (status === 'good') return Colors.successLight;
  if (status === 'warning') return Colors.warningLight;
  return Colors.dangerLight;
}

export function BarTableCard({data}: Props) {
  const [activePeriod, setActivePeriod] = useState(data.periodList[1]); // MoM default

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.judul}</Text>

      {/* Period chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}>
        {data.periodList.map(p => {
          const isActive = activePeriod === p;
          return (
            <TouchableOpacity
              key={p}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActivePeriod(p)}
              activeOpacity={0.8}>
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Stacked bar */}
      <View style={styles.stackedBar}>
        {data.breakdown.map((seg, idx) => (
          <View
            key={idx}
            style={[
              styles.barSeg,
              {
                flex: seg.pct,
                backgroundColor: seg.warna,
                borderTopLeftRadius: idx === 0 ? 4 : 0,
                borderBottomLeftRadius: idx === 0 ? 4 : 0,
                borderTopRightRadius: idx === data.breakdown.length - 1 ? 4 : 0,
                borderBottomRightRadius: idx === data.breakdown.length - 1 ? 4 : 0,
              },
            ]}>
            <Text style={[
              styles.barLabel,
              {color: seg.pct < 20 ? Colors.textPrimary : Colors.textWhite},
            ]}>
              {seg.pct}%
            </Text>
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        {data.breakdown.map((seg, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: seg.warna}]} />
            <Text style={styles.legendText}>{seg.label}</Text>
          </View>
        ))}
      </View>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colHeader, styles.colProduk]}>Produk</Text>
          <Text style={[styles.colHeader, styles.colCIF]}>CIF</Text>
          <Text style={[styles.colHeader, styles.colBalance]}>Balance</Text>
          <Text style={[styles.colHeader, styles.colTarget]}>Target</Text>
          <Text style={[styles.colHeader, styles.colCapaian]}>Capaian</Text>
          <Text style={[styles.colHeader, styles.colGrowth]}>Growth</Text>
        </View>

        {/* Rows */}
        {data.rows.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.cell, styles.colProduk]}>{row.produk}</Text>
            <Text style={[styles.cell, styles.colCIF]}>{row.cif}</Text>
            <Text style={[styles.cell, styles.colBalance, {color: getStatusColor(row.balanceStatus)}]}>
              {row.balance}
            </Text>
            <Text style={[styles.cell, styles.colTarget]}>{row.target}</Text>
            <View style={[styles.colCapaian, {alignItems: 'center'}]}>
              <View style={[styles.badge, {backgroundColor: getStatusBg(row.capaianStatus)}]}>
                <Text style={[styles.badgeText, {color: getStatusColor(row.capaianStatus)}]}>
                  {row.capaian}
                </Text>
              </View>
            </View>
            <View style={[styles.colGrowth, styles.growthCell]}>
              <View style={[styles.arrow, row.growthUp ? styles.arrowUp : styles.arrowDown]} />
              <Text style={[
                styles.growthText,
                {color: row.growthUp ? Colors.successDark : Colors.warningDark},
              ]}>
                {row.growth}
              </Text>
            </View>
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
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  chipText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  stackedBar: {
    flexDirection: 'row',
    height: 26,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  barSeg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 10,
    color: Colors.textPrimary,
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
    alignItems: 'center',
    paddingVertical: Spacing.xs + 1,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  cell: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  growthCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'flex-end',
  },
  colProduk: {flex: 1.6, paddingRight: 2},
  colCIF:     {flex: 1.0, textAlign: 'right', paddingHorizontal: 2},
  colBalance: {flex: 1.4, textAlign: 'right', paddingHorizontal: 2},
  colTarget:  {flex: 1.3, textAlign: 'right', paddingHorizontal: 2},
  colCapaian: {flex: 1.3, paddingHorizontal: 2},
  colGrowth:  {flex: 1.1, paddingLeft: 2},
  badge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowUp: {
    borderBottomWidth: 5,
    borderBottomColor: Colors.successDark,
  },
  arrowDown: {
    borderTopWidth: 5,
    borderTopColor: Colors.warningDark,
  },
  growthText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
});
