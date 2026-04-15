import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {KreditProdukData} from '../../types';

interface Props {
  data: KreditProdukData;
}

const CELL_STAY      = {bg: Colors.warning,     text: '#FFFFFF'};
const CELL_UPGRADE   = {bg: Colors.successDark, text: '#FFFFFF'};
const CELL_DOWNGRADE = {bg: '#D93535',          text: '#FFFFFF'};
const CELL_EMPTY     = {bg: Colors.background,  text: Colors.textMuted};

function getCellStyle(fromIdx: number, toIdx: number, val: number | null) {
  if (val === null)    return CELL_EMPTY;
  if (fromIdx > toIdx) return CELL_UPGRADE;
  if (fromIdx < toIdx) return CELL_DOWNGRADE;
  return CELL_STAY;
}

function stayColor(label: string, warna: string): string {
  if (label === 'Stay')    return Colors.warning;
  if (label === 'Upgrade') return Colors.successDark;
  return warna;
}

export function KreditProdukCard({data}: Props) {
  const [activeChip,    setActiveChip]    = useState(data.chips[1]); // MoM default
  const [selectedProduk, setSelectedProduk] = useState(data.produkList[0].label);

  const shifting = data.shiftingByProduk[selectedProduk] ?? data.shiftingByProduk[data.produkList[0].label];

  return (
    <View style={styles.card}>

      {/* ── Produk section ── */}
      <View style={[styles.section, styles.sectionDivider]}>
        {/* Title */}
        <Text style={styles.title}>Produk</Text>

        {/* Period chips — below title */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}>
          {data.chips.map(chip => {
            const isActive = chip === activeChip;
            return (
              <TouchableOpacity
                key={chip}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setActiveChip(chip)}
                activeOpacity={0.8}>
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {chip}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.produkList}>
          {data.produkList.map((prod, idx) => {
            const isSelected = prod.label === selectedProduk;
            const g = prod.growth?.[activeChip];
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.produkCard, isSelected && styles.produkCardSelected]}
                onPress={() => setSelectedProduk(prod.label)}
                activeOpacity={0.8}>
                <Text style={styles.produkLabel}>{prod.label}</Text>
                <Text style={[styles.produkNilai, isSelected && styles.produkNilaiSelected]}>
                  {prod.nilai}
                </Text>
                {/* NPL row — always rendered so growth stays aligned */}
                <View style={styles.nplRow}>
                  {prod.npl !== undefined ? (
                    <>
                      <Text style={styles.nplLabel}>NPL </Text>
                      <Text style={styles.nplVal}>{prod.npl}</Text>
                    </>
                  ) : (
                    <View style={styles.nplPlaceholder} />
                  )}
                </View>
                {g && (
                  <Text style={[styles.growthText, {color: g.up ? Colors.successDark : Colors.dangerDark}]}>
                    {g.up ? '↑' : '↓'} {g.pct} {activeChip}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Shifting Kolektibilitas section ── */}
      <View style={styles.section}>
        <Text style={styles.title}>
          Shifting Kolektibilitas
          {selectedProduk !== data.produkList[0].label
            ? <Text style={styles.titleSuffix}> · {selectedProduk}</Text>
            : null}
        </Text>

        {/* Legend */}
        <View style={styles.legendRow}>
          {shifting.summary.map((s, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: stayColor(s.label, s.warna)}]} />
              <Text style={styles.legendText}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.titleSuffix, {color: Colors.textSecondary}]}>
          Ket: dalam Rp M.
        </Text>

        {/* Matrix */}
        {(() => {
          const colTotals = shifting.kolList.map((_, ci) =>
            shifting.rows.reduce((sum, row) => sum + (row.toValues[ci] ?? 0), 0),
          );
          const grandTotal = colTotals.reduce((a, b) => a + b, 0);

          return (
            <View style={styles.matrixWrap}>
              {/* Header row */}
              <View style={styles.matrixRow}>
                <View style={styles.matrixCorner} />
                {shifting.kolList.map((kol, ci) => (
                  <View key={ci} style={styles.matrixHeaderCell}>
                    <Text style={styles.matrixHeaderText}>{kol.replace('Kol ', '')}</Text>
                  </View>
                ))}
                <View style={styles.matrixHeaderCell}>
                  <Text style={styles.matrixSigmaText}>Σ</Text>
                </View>
              </View>

              {/* Data rows */}
              {shifting.rows.map((row, ri) => {
                const rowTotal = row.toValues.reduce((sum: number, v) => sum + (v ?? 0), 0);
                return (
                  <View key={ri} style={styles.matrixRow}>
                    <View style={styles.matrixRowLabel}>
                      <Text style={styles.matrixRowLabelText}>{row.fromKol.replace('Kol ', '')}</Text>
                    </View>
                    {row.toValues.map((val, ci) => {
                      const {bg, text} = getCellStyle(ri, ci, val);
                      return (
                        <View key={ci} style={[styles.matrixCell, {backgroundColor: bg}]}>
                          <Text style={[styles.matrixCellText, {color: text}]}>
                            {val !== null ? val : '—'}
                          </Text>
                        </View>
                      );
                    })}
                    <View style={[styles.matrixCell, styles.matrixTotalCell]}>
                      <Text style={styles.matrixTotalText}>{rowTotal}</Text>
                    </View>
                  </View>
                );
              })}

              {/* Totals row */}
              <View style={styles.matrixRow}>
                <View style={[styles.matrixRowLabel, styles.matrixTotalCell]}>
                  <Text style={styles.matrixSigmaText}>Σ</Text>
                </View>
                {colTotals.map((total, ci) => (
                  <View key={ci} style={[styles.matrixCell, styles.matrixTotalCell]}>
                    <Text style={styles.matrixTotalText}>{total}</Text>
                  </View>
                ))}
                <View style={[styles.matrixCell, styles.matrixGrandTotalCell]}>
                  <Text style={styles.matrixTotalText}>{grandTotal}</Text>
                </View>
              </View>
            </View>
          );
        })()}

        {/* Summary cards */}
        <View style={styles.summaryRow}>
          {shifting.summary.map((s, i) => {
            const c = stayColor(s.label, s.warna);
            return (
            <View key={i} style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>{s.label}</Text>
              <Text style={[styles.summaryRekening, {color: c}]}>{s.rekening}</Text>
              <Text style={[styles.summaryNilai, {color: c}]}>{s.nilai}</Text>
            </View>
            );
          })}
        </View>
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
  },
  section: {
    padding: Spacing.sm,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  titleSuffix: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  // Period chips
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
  // Product cards
  produkList: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  produkCard: {
    width: 108,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    padding: Spacing.sm,
    paddingVertical: Spacing.sm + 2,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  produkCardSelected: {
    borderColor: Colors.successDark,
    borderWidth: 2,
    backgroundColor: Colors.successLight,
  },
  produkLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  produkNilai: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.successDark,
  },
  produkNilaiSelected: {
    color: Colors.success,
  },
  nplRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nplLabel: {
    fontSize: 9,
    color: Colors.textMuted,
  },
  nplVal: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
  nplPlaceholder: {
    height: 13,
  },
  growthText: {
    fontSize: 9,
    fontWeight: '600',
  },
  // Shifting matrix
  legendRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginBottom: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  matrixWrap: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  matrixRow: {
    flexDirection: 'row',
  },
  matrixCorner: {
    width: 40,
    height: 28,
    backgroundColor: Colors.background,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  matrixHeaderCell: {
    flex: 1,
    height: 28,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  matrixHeaderText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  matrixRowLabel: {
    width: 40,
    height: 28,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  matrixRowLabelText: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  matrixCell: {
    flex: 1,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  matrixCellText: {
    fontSize: 9,
    fontWeight: '600',
  },
  matrixSigmaText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  matrixTotalCell: {
    backgroundColor: Colors.background,
  },
  matrixGrandTotalCell: {
    backgroundColor: '#DDE2E8',
  },
  matrixTotalText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  // Summary
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 6,
    padding: Spacing.sm,
    gap: 2,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  summaryRekening: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    textAlign: 'center',
  },
  summaryNilai: {
    fontSize: 9,
    textAlign: 'center',
  },
});
