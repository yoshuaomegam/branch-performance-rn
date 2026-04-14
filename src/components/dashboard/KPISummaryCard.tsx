import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Typography, Spacing} from '../../theme';
import type {KPIRingkasan, GrafikBulanan, CabangInfo} from '../../types';

interface KPISummaryCardProps {
  cabang: CabangInfo;
  kpi: KPIRingkasan;
  grafik: GrafikBulanan;
  periode: string;
}

const BAR_MAX_HEIGHT = 48;

export function KPISummaryCard({cabang, kpi, grafik, periode}: KPISummaryCardProps) {
  const [activeTab, setActiveTab] = useState(grafik.bulan.length - 1);

  /* Overall KPI progress (0–120 range → 83.3% = target 100) */
  const kpiMax = 120;
  const fillPct = Math.min((Math.min(kpi.skorKPI, kpiMax) / kpiMax) * 100, 100);
  const targetLinePct = (100 / kpiMax) * 100; // 83.33%

  /* Bar chart */
  const maxVal = Math.max(...grafik.pencapaian, ...grafik.target);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Dark KPI Banner
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.banner}>

        {/* Top: periode badge */}
        <View style={styles.periodeBadge}>
          <View style={styles.periodeDot} />
          <Text style={styles.periodeText} numberOfLines={1}>{periode}</Text>
        </View>

        {/* Branch + Score row */}
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Text style={styles.cabangNama}>{cabang.nama}</Text>
            <Text style={styles.cabangId}>ID {cabang.id} · {cabang.kota}</Text>
          </View>
          <View style={styles.scoreWrap}>
            <Text style={styles.scoreNum}>{kpi.skorKPI}</Text>
            <Text style={styles.scoreLabel}>Skor KPI</Text>
            <View style={[
              styles.kategoriPill,
              {backgroundColor: kpi.kategori === 'Baik' ? Colors.successLight : Colors.warningLight},
            ]}>
              <Text style={[
                styles.kategoriText,
                {color: kpi.kategori === 'Baik' ? Colors.successDark : Colors.warningDark},
              ]}>
                {kpi.kategori}
              </Text>
            </View>
          </View>
        </View>

        {/* Rank + Trend badges */}
        <View style={styles.metaBadges}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankBadgeText}>
              Rank #{kpi.rankCabang} dari {kpi.totalCabang} Cabang
            </Text>
          </View>
          <View style={styles.trendBadge}>
            <Text style={styles.trendBadgeText}>
              {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '—'} {kpi.persentaseNaik}%
            </Text>
          </View>
        </View>

        {/* Mini bar chart (monthly) */}
        <View style={styles.chartArea}>
          {grafik.bulan.map((bulan, i) => {
            const pct = grafik.pencapaian[i];
            const achieved = pct >= grafik.target[i];
            const barH = Math.max(4, (pct / maxVal) * BAR_MAX_HEIGHT);
            return (
              <View key={bulan} style={styles.barGroup}>
                <Text style={styles.barValue}>
                  {pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)}
                </Text>
                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barH,
                        backgroundColor: achieved ? Colors.success : Colors.warning,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{bulan}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* ═══════════════════════════════════════════════════════
          White Analytics Card
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.analyticsCard}>

        {/* Rank/Trend badges row */}
        <View style={styles.analyticsBadgeRow}>
          <View style={styles.analyticsLeft}>
            <Text style={styles.analyticsTitle}>{grafik.judul}</Text>
            <Text style={styles.analyticsSub}>Periode {periode}</Text>
          </View>
          <View style={styles.rankBadge2}>
            <Text style={styles.rankBadge2Text}>Rank #{kpi.rankCabang}</Text>
          </View>
          <View style={styles.trendBadge2}>
            <Text style={styles.trendBadge2Text}>
              {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '—'} {kpi.persentaseNaik}%
            </Text>
          </View>
        </View>

        {/* KPI progress bar */}
        <View style={styles.progressSection}>
          <Text style={styles.progressVal}>{kpi.skorKPI}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, {width: `${fillPct}%`}]} />
            <View style={[styles.targetMark, {left: `${targetLinePct}%`}]} />
          </View>
          <Text style={styles.progressMax}>{kpiMax}</Text>
        </View>

        {/* Metric boxes: one per month */}
        <View style={styles.metricBoxes}>
          {grafik.bulan.map((bulan, i) => {
            const pct = grafik.pencapaian[i];
            const achieved = pct >= grafik.target[i];
            const isActive = activeTab === i;
            return (
              <TouchableOpacity
                key={bulan}
                style={[styles.mBox, isActive && styles.mBoxActive]}
                onPress={() => setActiveTab(i)}
                activeOpacity={0.75}>
                <Text style={[
                  styles.mBoxNum,
                  {color: isActive
                    ? Colors.textWhite
                    : achieved ? Colors.success : Colors.warning},
                ]}>
                  {pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)}
                </Text>
                <Text style={[
                  styles.mBoxLabel,
                  isActive && {color: Colors.textMuted},
                ]}>
                  {bulan}
                </Text>
                <View style={[
                  styles.mBoxDot,
                  {backgroundColor: isActive
                    ? Colors.textMuted
                    : achieved ? Colors.success : Colors.warning},
                ]} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Month tab pills (horizontal scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}>
          {grafik.bulan.map((bulan, i) => (
            <TouchableOpacity
              key={bulan}
              onPress={() => setActiveTab(i)}
              style={[
                styles.tabPill,
                activeTab === i ? styles.tabActive : styles.tabInactive,
              ]}
              activeOpacity={0.8}>
              <Text style={[
                styles.tabText,
                activeTab === i ? styles.tabTextActive : styles.tabTextInactive,
              ]}>
                {bulan}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Detail row for active month */}
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pencapaian</Text>
            <Text style={styles.detailValue}>
              {grafik.pencapaian[activeTab] % 1 === 0
                ? grafik.pencapaian[activeTab].toFixed(0)
                : grafik.pencapaian[activeTab].toFixed(1)}
            </Text>
          </View>
          <View style={styles.detailSep} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Target</Text>
            <Text style={styles.detailValue}>{grafik.target[activeTab]}</Text>
          </View>
          <View style={styles.detailSep} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Bulan</Text>
            <Text style={styles.detailValue}>{grafik.bulan[activeTab]}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /* ─── Dark Banner ─────────────────────────────────────────── */
  banner: {
    marginHorizontal: Spacing.sm + 2,
    marginTop: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.surfaceDark,
    padding: Spacing.base,
  },
  periodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 4,
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
    maxWidth: 105,
  },
  periodeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.surfaceDark,
    flexShrink: 0,
  },
  periodeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.surfaceDark,
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  infoLeft: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  cabangNama: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: 3,
  },
  cabangId: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  scoreWrap: {
    alignItems: 'flex-end',
    gap: 2,
  },
  scoreNum: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.success,
    lineHeight: 32,
  },
  scoreLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  kategoriPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  kategoriText: {
    fontSize: 10,
    fontWeight: '700',
  },
  metaBadges: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  rankBadge: {
    backgroundColor: Colors.surfaceDark2,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  rankBadgeText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  trendBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
  },
  trendBadgeText: {
    fontSize: 10,
    color: Colors.successDark,
    fontWeight: '700',
  },

  /* Mini bar chart */
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_MAX_HEIGHT + 28,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barValue: {
    fontSize: 8,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  barBg: {
    width: 16,
    height: BAR_MAX_HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: Colors.surfaceDark2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 3,
  },
  barLabel: {
    fontSize: 8,
    color: Colors.textMuted,
    marginTop: 4,
  },

  /* ─── White Analytics Card ───────────────────────────────── */
  analyticsCard: {
    marginHorizontal: Spacing.sm + 2,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
    paddingTop: Spacing.base,
    overflow: 'hidden',
  },
  analyticsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  analyticsLeft: {
    flex: 1,
  },
  analyticsTitle: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  analyticsSub: {
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  rankBadge2: {
    backgroundColor: Colors.dangerLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rankBadge2Text: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dangerDark,
  },
  trendBadge2: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trendBadge2Text: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.successDark,
  },

  /* KPI progress */
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  progressVal: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    width: 32,
    textAlign: 'right',
  },
  progressTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
    overflow: 'visible',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
  },
  targetMark: {
    position: 'absolute',
    top: -3,
    width: 2,
    height: 16,
    backgroundColor: Colors.dangerDark,
    opacity: 0.6,
  },
  progressMax: {
    fontSize: 10,
    color: Colors.textSecondary,
    width: 24,
  },

  /* Metric boxes */
  metricBoxes: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  mBox: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 2,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
    gap: 3,
  },
  mBoxActive: {
    backgroundColor: Colors.surfaceDark,
  },
  mBoxNum: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '800',
  },
  mBoxLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  mBoxDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  /* Month tabs */
  tabsRow: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
    flexDirection: 'row',
  },
  tabPill: {
    height: 34,
    paddingHorizontal: Spacing.md,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.surfaceDark,
  },
  tabInactive: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.textWhite,
  },
  tabTextInactive: {
    color: Colors.textSecondary,
  },

  /* Active month detail */
  detailRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  detailSep: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
});
