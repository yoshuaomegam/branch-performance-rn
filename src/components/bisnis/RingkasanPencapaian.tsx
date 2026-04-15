import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {RingkasanPencapaian as RingkasanPencapaianType, MetricStatus} from '../../types';

interface RingkasanPencapaianProps {
  data: RingkasanPencapaianType;
}

function getCapaianColor(status: MetricStatus): string {
  if (status === 'good') return Colors.successDark;
  if (status === 'warning') return Colors.warningDark;
  return Colors.dangerDark;
}

function getCapaianBg(status: MetricStatus): string {
  if (status === 'good') return Colors.successLight;
  if (status === 'warning') return Colors.warningLight;
  return Colors.dangerLight;
}

function GrowthArrow({up}: {up: boolean}) {
  return (
    <View style={[styles.arrowShape, up ? styles.arrowUp : styles.arrowDown]} />
  );
}

export function RingkasanPencapaian({data}: RingkasanPencapaianProps) {
  const [activePeriod, setActivePeriod] = useState(data.periodList[1]); // MoM default

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ringkasan Pencapaian</Text>
      </View>

      {/* Period chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}>
        {data.periodList.map(period => {
          const isActive = activePeriod === period;
          return (
            <TouchableOpacity
              key={period}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActivePeriod(period)}
              activeOpacity={0.8}>
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {period}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.colHeader, styles.colProduk]}>Produk</Text>
        <Text style={[styles.colHeader, styles.colKategori]}>Kategori</Text>
        <Text style={[styles.colHeader, styles.colAktual]}>Aktual</Text>
        <Text style={[styles.colHeader, styles.colTarget]}>Target</Text>
        <Text style={[styles.colHeader, styles.colCapaian]}>Capaian</Text>
        <Text style={[styles.colHeader, styles.colGrowth]}>Growth</Text>
      </View>

      {/* Rows */}
      {data.rows.map((row, idx) => (
        <View
          key={`${row.produk}-${row.kategori}-${idx}`}
          style={styles.tableRow}>
          <Text style={[styles.cell, styles.colProduk]} numberOfLines={1}>
            {row.produk}
          </Text>
          <Text style={[styles.cell, styles.colKategori]} numberOfLines={2}>
            {row.kategori}
          </Text>
          <Text style={[styles.cell, styles.colAktual]}>{row.aktual}</Text>
          <Text style={[styles.cell, styles.colTarget]}>{row.target}</Text>
          <View style={[styles.colCapaian, styles.cellCenter]}>
            <View style={[styles.capaianPill, {backgroundColor: getCapaianBg(row.statusCapaian)}]}>
              <Text style={[styles.capaianText, {color: getCapaianColor(row.statusCapaian)}]}>
                {row.capaian}
              </Text>
            </View>
          </View>
          <View style={[styles.colGrowth, styles.growthCell]}>
            <GrowthArrow up={row.growthUp} />
            <Text style={[styles.growthText, {color: row.growthUp ? Colors.successDark : Colors.dangerDark}]}>
              {row.growth}
            </Text>
          </View>
        </View>
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
  headerRow: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
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
    backgroundColor: Colors.surfaceLight,
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
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xs,
    marginHorizontal: -Spacing.base,
    paddingLeft: Spacing.base,
    paddingRight: Spacing.base,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  cell: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  cellCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    justifyContent: 'flex-end',
  },
  colProduk: {
    flex: 1.4,
    paddingRight: Spacing.xs,
  },
  colKategori: {
    flex: 1.8,
    paddingRight: Spacing.xs,
  },
  colAktual: {
    flex: 1.4,
    textAlign: 'right',
    paddingHorizontal: Spacing.xs,
  },
  colTarget: {
    flex: 1.3,
    textAlign: 'right',
    paddingHorizontal: Spacing.xs,
  },
  colCapaian: {
    flex: 1.4,
    paddingHorizontal: Spacing.xs,
  },
  colGrowth: {
    flex: 1.2,
    paddingLeft: Spacing.xs,
  },
  capaianPill: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  capaianText: {
    fontSize: 9,
    fontWeight: '700',
  },
  arrowShape: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  arrowUp: {
    borderBottomWidth: 6,
    borderBottomColor: Colors.successDark,
  },
  arrowDown: {
    borderTopWidth: 6,
    borderTopColor: Colors.dangerDark,
  },
  growthText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
});
