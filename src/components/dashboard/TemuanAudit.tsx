import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {TemuanAudit as TemuanAuditType} from '../../types';

interface TemuanAuditProps {
  data: TemuanAuditType;
}

export function TemuanAudit({data}: TemuanAuditProps) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Ringkasan Temuan Audit</Text>
        <Text style={styles.updated}>Updated: {data.updatedAt}</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{data.total}</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{data.levelPct}%</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>at {data.levelAt}%</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{data.levelOver30}</Text>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statSublabel}>{'>30 hari'}</Text>
        </View>
      </View>

      {/* Open badge */}
      <View style={styles.openRow}>
        <View style={styles.openBadge}>
          <Text style={styles.openText}>{data.open} Open</Text>
        </View>
      </View>

      {/* Distribusi Dampak */}
      <Text style={styles.subTitle}>Distribusi Dampak:</Text>
      <View style={styles.dampakRow}>
        {data.distribusiDampak.map(d => (
          <View key={d.label} style={[styles.dampakPill, {backgroundColor: d.warna + '22', borderColor: d.warna}]}>
            <Text style={[styles.dampakText, {color: d.warna === '#FFCC00' ? '#7A6000' : d.warna === '#FF9500' ? '#7A4000' : d.warna}]}>
              {d.label} {d.label === 'High' ? `${d.jumlah} temuan` : `${d.pct}%`}
            </Text>
          </View>
        ))}
      </View>

      {/* Durasi Temuan */}
      <Text style={styles.subTitle}>Durasi Temuan (Berdasarkan Open):</Text>
      <View style={styles.durasiList}>
        {data.durasiOpen.map(d => (
          <View key={d.label} style={styles.durasiRow}>
            <Text style={styles.durasiLabel}>{d.label}</Text>
            <View style={[styles.durasiBar, {backgroundColor: d.warna}]}>
              <Text style={styles.durasiBarLabel}>{d.jumlah} Temuan</Text>
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
    padding: Spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  updated: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: Typography.fontSize.md,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statSublabel: {
    fontSize: 8,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statSep: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
  },
  openRow: {
    marginBottom: Spacing.sm,
  },
  openBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  openText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.dangerDark,
  },
  subTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    marginTop: Spacing.xs,
  },
  dampakRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
    flexWrap: 'wrap',
  },
  dampakPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  dampakText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  durasiList: {
    gap: Spacing.xs,
  },
  durasiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  durasiBar: {
    flex: 1,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  durasiBarLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  durasiLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    width: 60,
  },
});
