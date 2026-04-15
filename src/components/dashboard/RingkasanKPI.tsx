import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {RingkasanKPI as RingkasanKPIType, MetricStatus} from '../../types';

interface RingkasanKPIProps {
  data: RingkasanKPIType;
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

export function RingkasanKPI({data}: RingkasanKPIProps) {
  const [activeKat, setActiveKat] = useState(data.kategoriList[0]);
  const [activePeriod, setActivePeriod] = useState(data.periodList[0]); // DoD default

  const katData = data.data[activeKat];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ringkasan KPI</Text>

      {/* Kategori tabs — horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.katTabsRow}>
        {data.kategoriList.map(kat => {
          const isActive = activeKat === kat;
          return (
            <TouchableOpacity
              key={kat}
              style={[styles.katTab, isActive && styles.katTabActive]}
              onPress={() => setActiveKat(kat)}
              activeOpacity={0.8}>
              <Text style={[styles.katTabText, isActive && styles.katTabTextActive]}>
                {kat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Period sub-tabs */}
      <View style={styles.periodRow}>
        {data.periodList.map(period => {
          const isActive = activePeriod === period;
          return (
            <TouchableOpacity
              key={period}
              style={[styles.periodTab, isActive && styles.periodTabActive]}
              onPress={() => setActivePeriod(period)}
              activeOpacity={0.8}>
              <Text style={[styles.periodTabText, isActive && styles.periodTabTextActive]}>
                {period}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Seksi cards */}
      {katData && katData.seksi.map(seksi => (
        <View key={seksi.judul} style={styles.seksiCard}>
          {/* Card header */}
          <View style={styles.seksiHeader}>
            <Text style={styles.seksiTitle}>{seksi.judul}</Text>
          </View>

          {/* Column headers */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, styles.colMetrik]}>Metrik</Text>
            <Text style={[styles.colHeader, styles.colUreg]}>UREG</Text>
            <Text style={[styles.colHeader, styles.colTarget]}>Target</Text>
            <Text style={[styles.colHeader, styles.colCapaian]}>Capaian</Text>
            <Text style={[styles.colHeader, styles.colMom]}>MoM</Text>
          </View>

          {/* Rows */}
          {seksi.items.map((item, idx) => (
            <View
              key={`${item.metrik}-${idx}`}
              style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}>
              <Text style={[styles.cell, styles.colMetrik]} numberOfLines={2}>
                {item.metrik}
              </Text>
              <Text style={[styles.cell, styles.colUreg]}>{item.ureg}</Text>
              <Text style={[styles.cell, styles.colTarget]}>{item.target}</Text>
              <View style={[styles.colCapaian, styles.cellCenter]}>
                {item.capaian !== '-' ? (
                  <View style={[styles.capaianPill, {backgroundColor: getCapaianBg(item.statusCapaian)}]}>
                    <Text style={[styles.capaianText, {color: getCapaianColor(item.statusCapaian)}]}>
                      {item.capaian}
                    </Text>
                  </View>
                ) : (
                  <Text style={[styles.cell, {textAlign: 'center'}]}>-</Text>
                )}
              </View>
              <Text style={[styles.cell, styles.colMom, styles.textRight]}>{item.mom}</Text>
            </View>
          ))}
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
    padding: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  katTabsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  katTab: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
  },
  katTabActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  katTabText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  katTabTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  periodRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
  },
  periodTab: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
  },
  periodTabActive: {
    backgroundColor: Colors.surfaceDark,
    borderColor: Colors.surfaceDark,
  },
  periodTabText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  periodTabTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  seksiCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  seksiHeader: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  seksiTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
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
  tableRowAlt: {},
  cell: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
  },
  cellCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  colMetrik: {
    flex: 2.2,
    paddingRight: Spacing.xs,
  },
  colUreg: {
    flex: 1.3,
    textAlign: 'right',
    paddingHorizontal: Spacing.xs,
  },
  colTarget: {
    flex: 1.3,
    textAlign: 'right',
    paddingHorizontal: Spacing.xs,
  },
  colCapaian: {
    flex: 1.6,
    paddingHorizontal: Spacing.xs,
  },
  colMom: {
    flex: 1.0,
    textAlign: 'right',
    paddingHorizontal: Spacing.xs,
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
});
