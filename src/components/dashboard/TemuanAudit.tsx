import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {TemuanAudit as TemuanAuditType} from '../../types';

interface TemuanAuditProps {
  data: TemuanAuditType;
}

export function TemuanAudit({data}: TemuanAuditProps) {
  const totalDampakPct = data.distribusiDampak.reduce((s, d) => s + d.pct, 0) || 1;
  const maxDurasi = Math.max(...data.durasiOpen.map(d => d.jumlah));

  return (
    <View style={styles.card}>

      {/* ── Header ───────────────────────────────────── */}
      <Text style={styles.title}>Ringkasan Temuan Audit</Text>
      <Text style={styles.updated}>Updated: {data.updatedAt}</Text>

      {/* ── Stats — separated blocks ──────────────────── */}
      <View style={styles.statsList}>

        {/* Block 1: Total Temuan */}
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Total Temuan</Text>
          <View style={styles.statContent}>
            <Text style={styles.statMain}>{data.total}</Text>
            <View style={styles.openBadge}>
              <Text style={styles.openText}>{data.open} Open</Text>
            </View>
          </View>
        </View>

        {/* Block 2: Level Compliance */}
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Level Compliance</Text>
          <View style={styles.statContent}>
            <Text style={styles.statMain}>{data.levelPct}%</Text>
            <Text style={styles.statSub}>≥{data.levelAt}% Target</Text>
          </View>
        </View>

        {/* Block 3: Melebihi Batas */}
        <View style={styles.statBlock}>
          <Text style={styles.statLabel}>Melebihi Batas</Text>
          <View style={styles.statContent}>
            <Text style={[styles.statMain, data.levelOver30 > 0 && {color: Colors.danger}]}>
              {data.levelOver30}
            </Text>
            <Text style={styles.statSub}>{'>30 hari'}</Text>
          </View>
        </View>

      </View>

      {/* ── Distribusi Dampak ─────────────────────────── */}
      <Text style={styles.subTitle}>Distribusi Dampak</Text>

      {/* Proportional bar */}
      <View style={styles.dampakBar}>
        {data.distribusiDampak.map((d, idx) => {
          const isFirst = idx === 0;
          const isLast  = idx === data.distribusiDampak.length - 1;
          return (
            <View
              key={d.label}
              style={[
                styles.dampakSeg,
                {
                  flex: d.pct / totalDampakPct,
                  backgroundColor: d.warna,
                  borderTopLeftRadius: isFirst ? 6 : 0,
                  borderBottomLeftRadius: isFirst ? 6 : 0,
                  borderTopRightRadius: isLast ? 6 : 0,
                  borderBottomRightRadius: isLast ? 6 : 0,
                },
              ]}>
              <Text style={styles.dampakSegLabel} numberOfLines={1}>
                {d.label} {d.pct}%
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.dampakLegend}>
        {data.distribusiDampak.map(d => (
          <View key={d.label} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: d.warna}]} />
            <Text style={styles.legendText}>{d.label} {d.jumlah} temuan</Text>
          </View>
        ))}
      </View>

      {/* ── Divider ───────────────────────────────────── */}
      <View style={styles.divider} />

      {/* ── Durasi Temuan ─────────────────────────────── */}
      <Text style={styles.subTitle}>Durasi Temuan (Berstatus Open)</Text>

      <View style={styles.durasiList}>
        {data.durasiOpen.map(d => (
          <View key={d.label} style={styles.durasiRow}>
            <Text style={styles.durasiLabel}>{d.label}</Text>
            <View style={styles.durasiTrack}>
              <View style={[styles.durasiBarFill, {flex: d.jumlah, backgroundColor: d.warna}]}>
                <Text style={styles.durasiBarLabel}>{d.jumlah} Temuan</Text>
              </View>
              {d.jumlah < maxDurasi && <View style={{flex: maxDurasi - d.jumlah}} />}
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
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  updated: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },

  // ── Stats ─────────────────────────────────────────
  statsList: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.base,
  },
  statBlock: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  statMain: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  openBadge: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  openText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.dangerDark,
  },

  // ── Sub-section title ─────────────────────────────
  subTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  // ── Distribusi Dampak ─────────────────────────────
  dampakBar: {
    flexDirection: 'row',
    height: 28,
    marginBottom: Spacing.xs,
    overflow: 'hidden',
  },
  dampakSeg: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  dampakSegLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  dampakLegend: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 9,
    color: Colors.textSecondary,
  },

  // ── Divider ───────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.base,
  },

  // ── Durasi Temuan ─────────────────────────────────
  durasiList: {
    gap: Spacing.xs,
  },
  durasiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  durasiLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    width: 68,
  },
  durasiTrack: {
    flex: 1,
    flexDirection: 'row',
    height: 22,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: Colors.border,
  },
  durasiBarFill: {
    height: 22,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  durasiBarLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    color: Colors.textWhite,
  },
});
