import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Svg, {Path, Polyline, Line, Circle, Rect, Text as SvgText} from 'react-native-svg';

function CalendarIcon({size = 14, color = Colors.textSecondary}: {size?: number; color?: string}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14">
      <Rect x="1" y="2.5" width="12" height="10.5" rx="1.5" stroke={color} strokeWidth="1.2" fill="none" />
      <Line x1="1" y1="6" x2="13" y2="6" stroke={color} strokeWidth="1.2" />
      <Line x1="4" y1="1" x2="4" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <Line x1="10" y1="1" x2="10" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <Circle cx="4.5" cy="8.8" r="0.85" fill={color} />
      <Circle cx="7"   cy="8.8" r="0.85" fill={color} />
      <Circle cx="9.5" cy="8.8" r="0.85" fill={color} />
      <Circle cx="4.5" cy="11.2" r="0.85" fill={color} />
      <Circle cx="7"   cy="11.2" r="0.85" fill={color} />
    </Svg>
  );
}
import {Colors, Spacing, Typography} from '../../theme';
import type {TrenPencairanData, TrenPencairanBar} from '../../types';

// ─── Calendar helpers ────────────────────────────────────────────────────────

const MONTHS_ID = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember',
];
const DAYS_SHORT = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];

function isoDate(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function daysInMonth(y: number, m: number): number {
  return new Date(y, m + 1, 0).getDate();
}

/** Returns Mon-based offset (0 = Mon … 6 = Sun) for the 1st of the month. */
function monthStartOffset(y: number, m: number): number {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}

function rangeLabel(start: string, end: string, allBars: TrenPencairanBar[]): string {
  const inRange = allBars.filter(b => b.date >= start && b.date <= end);
  if (inRange.length >= 2) return `${inRange[0].label} – ${inRange[inRange.length - 1].label}`;
  if (inRange.length === 1) return inRange[0].label;
  // fallback: format dates
  const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const [, sm, sd] = start.split('-').map(Number);
  const [, em, ed] = end.split('-').map(Number);
  if (sm === em) return `${sd}–${ed} ${MONTHS_SHORT[sm - 1]}`;
  return `${sd} ${MONTHS_SHORT[sm - 1]} – ${ed} ${MONTHS_SHORT[em - 1]}`;
}

// ─── Calendar picker modal ───────────────────────────────────────────────────

interface CalendarProps {
  visible: boolean;
  initialStart: string;
  initialEnd: string;
  allBars: TrenPencairanBar[];
  onApply: (start: string, end: string) => void;
  onClose: () => void;
}

function CalendarPicker({
  visible, initialStart, initialEnd, allBars, onApply, onClose,
}: CalendarProps) {
  const today = new Date();
  const todayISO = isoDate(today.getFullYear(), today.getMonth(), today.getDate());

  const minDate = allBars[0]?.date ?? todayISO;
  const maxDate = allBars[allBars.length - 1]?.date ?? todayISO;
  const dataDates = useMemo(() => new Set(allBars.map(b => b.date)), [allBars]);

  // Parse initial end date to open on that month
  const [endY, endM] = initialEnd.split('-').map(Number);
  const [calYear, setCalYear] = useState(endY);
  const [calMonth, setCalMonth] = useState(endM - 1); // 0-indexed

  const [tempStart, setTempStart] = useState<string | null>(initialStart);
  const [tempEnd, setTempEnd]     = useState<string | null>(initialEnd);

  // Reset internal state whenever modal opens
  React.useEffect(() => {
    if (visible) {
      const [y, m] = initialEnd.split('-').map(Number);
      setCalYear(y);
      setCalMonth(m - 1);
      setTempStart(initialStart);
      setTempEnd(initialEnd);
    }
  }, [visible, initialStart, initialEnd]);

  function handleDayPress(iso: string) {
    if (iso < minDate || iso > maxDate) return;
    if (tempStart && tempEnd) {
      // Both set → start a new selection
      setTempStart(iso);
      setTempEnd(null);
    } else if (tempStart && !tempEnd) {
      if (iso === tempStart) return;
      if (iso > tempStart) {
        setTempEnd(iso);
      } else {
        setTempEnd(tempStart);
        setTempStart(iso);
      }
    } else {
      setTempStart(iso);
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  const [minY, minM] = minDate.split('-').map(Number);
  const [maxY, maxM] = maxDate.split('-').map(Number);
  const canPrev = calYear > minY || (calYear === minY && calMonth > minM - 1);
  const canNext = calYear < maxY || (calYear === maxY && calMonth < maxM - 1);

  // Build day grid
  const offset  = monthStartOffset(calYear, calMonth);
  const numDays = daysInMonth(calYear, calMonth);
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({length: numDays}, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const hint =
    tempStart && tempEnd ? 'Ketuk hari untuk memilih ulang'
    : tempStart          ? 'Pilih tanggal akhir'
                         : 'Pilih tanggal awal';

  const canApply = !!(tempStart && tempEnd);

  function getDayStyle(iso: string) {
    const isStart   = iso === tempStart;
    const isEnd     = iso === tempEnd;
    const inRange   = !!(tempStart && tempEnd && iso > tempStart && iso < tempEnd);
    const isToday   = iso === todayISO;
    const disabled  = iso < minDate || iso > maxDate;
    const hasData   = dataDates.has(iso);
    return {isStart, isEnd, inRange, isToday, disabled, hasData};
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={cal.overlay}>
        <View style={cal.card}>
          {/* ── Header ── */}
          <View style={cal.header}>
            <Text style={cal.headerTitle}>Pilih Rentang Tanggal</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{top:8,bottom:8,left:8,right:8}}>
              <Text style={cal.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* ── Hint ── */}
          <Text style={cal.hint}>{hint}</Text>

          {/* ── Month nav ── */}
          <View style={cal.monthNav}>
            <TouchableOpacity
              onPress={prevMonth}
              disabled={!canPrev}
              style={cal.navBtn}
              hitSlop={{top:8,bottom:8,left:8,right:8}}>
              <Text style={[cal.navArrow, !canPrev && cal.navArrowDisabled]}>‹</Text>
            </TouchableOpacity>
            <Text style={cal.monthLabel}>
              {MONTHS_ID[calMonth]} {calYear}
            </Text>
            <TouchableOpacity
              onPress={nextMonth}
              disabled={!canNext}
              style={cal.navBtn}
              hitSlop={{top:8,bottom:8,left:8,right:8}}>
              <Text style={[cal.navArrow, !canNext && cal.navArrowDisabled]}>›</Text>
            </TouchableOpacity>
          </View>

          {/* ── Day headers ── */}
          <View style={cal.weekRow}>
            {DAYS_SHORT.map(d => (
              <Text key={d} style={cal.weekDay}>{d}</Text>
            ))}
          </View>

          {/* ── Day grid ── */}
          {rows.map((row, ri) => (
            <View key={ri} style={cal.weekRow}>
              {row.map((day, ci) => {
                if (!day) return <View key={ci} style={cal.dayCell} />;
                const iso = isoDate(calYear, calMonth, day);
                const {isStart, isEnd, inRange, isToday, disabled, hasData} = getDayStyle(iso);
                const isSelected = isStart || isEnd;

                return (
                  <TouchableOpacity
                    key={ci}
                    style={[
                      cal.dayCell,
                      inRange  && cal.dayCellInRange,
                      isSelected && cal.dayCellSelected,
                    ]}
                    onPress={() => handleDayPress(iso)}
                    disabled={disabled}
                    activeOpacity={0.7}>
                    <Text style={[
                      cal.dayText,
                      isToday    && cal.dayTextToday,
                      inRange    && cal.dayTextInRange,
                      isSelected && cal.dayTextSelected,
                      disabled   && cal.dayTextDisabled,
                    ]}>
                      {day}
                    </Text>
                    {isToday && !isSelected && <View style={cal.todayDot} />}
                    {hasData && !isSelected && <View style={cal.dataDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* ── Apply button ── */}
          <TouchableOpacity
            style={[cal.applyBtn, !canApply && cal.applyBtnDisabled]}
            onPress={() => canApply && onApply(tempStart!, tempEnd!)}
            disabled={!canApply}
            activeOpacity={0.8}>
            <Text style={cal.applyText}>Terapkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Chart constants & helpers ───────────────────────────────────────────────

const CHART_H   = 130;
const LEFT_PAD  = 32;
const RIGHT_PAD = 10;
const TOP_PAD   = 22;
const BOT_PAD   = 20;
const DATA_PAD  = 14;

function buildChart(vals: number[], chartW: number) {
  const innerW = chartW - LEFT_PAD - RIGHT_PAD;
  const innerH = CHART_H - TOP_PAD - BOT_PAD;

  const rawMin = Math.min(...vals);
  const rawMax = Math.max(...vals);
  const vPad   = ((rawMax - rawMin) * 0.25) || 2;
  const minV   = Math.max(0, rawMin - vPad);
  const maxV   = rawMax + vPad;

  const n = vals.length;

  function xPos(i: number): number {
    return LEFT_PAD + DATA_PAD + (n > 1 ? (i / (n - 1)) : 0.5) * (innerW - DATA_PAD * 2);
  }
  function yPos(v: number): number {
    return TOP_PAD + innerH - ((v - minV) / (maxV - minV || 1)) * innerH;
  }

  const gridVals = [Math.round(rawMax), Math.round((rawMin + rawMax) / 2), Math.round(rawMin)]
    .filter((v, i, a) => a.indexOf(v) === i);

  const ptsStr = vals.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');

  const bottomY = TOP_PAD + innerH;
  const pts = vals.map((v, i) => ({x: xPos(i), y: yPos(v)}));
  const lineStr = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = n > 1
    ? `${lineStr} L${pts[n - 1].x},${bottomY} L${pts[0].x},${bottomY} Z`
    : '';

  const dots = vals.map((v, i) => ({x: xPos(i), y: yPos(v), v}));

  return {ptsStr, areaD, dots, gridVals, xPos, yPos};
}

// ─── Main component ──────────────────────────────────────────────────────────

interface Props {
  data: TrenPencairanData;
}

export function TrenPencairanChart({data}: Props) {
  const [activeChip, setActiveChip]   = useState(data.chips[0]);
  const [chartW, setChartW]           = useState(0);
  const [showCal, setShowCal]         = useState(false);
  const [appliedStart, setAppliedStart] = useState(data.defaultRange.start);
  const [appliedEnd, setAppliedEnd]     = useState(data.defaultRange.end);

  const filteredBars = useMemo(
    () => data.allBars.filter(b => b.date >= appliedStart && b.date <= appliedEnd),
    [data.allBars, appliedStart, appliedEnd],
  );

  const vals  = filteredBars.map(b => b.nilai);
  const chart = chartW > 0 && vals.length > 0 ? buildChart(vals, chartW) : null;

  // Skip x labels if too many bars
  const skipLabel = filteredBars.length > 9;

  const displayLabel = rangeLabel(appliedStart, appliedEnd, data.allBars);

  function handleApply(start: string, end: string) {
    setAppliedStart(start);
    setAppliedEnd(end);
    setShowCal(false);
  }

  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>Tren Pencairan per Hari</Text>

      {/* Date range button */}
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => setShowCal(true)}
        activeOpacity={0.8}>
        <CalendarIcon size={13} color={Colors.textSecondary} />
        <Text style={styles.dateBtnText}>{displayLabel}</Text>
      </TouchableOpacity>

      {/* Chips */}
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

      {/* Line chart */}
      <View
        style={styles.chartWrap}
        onLayout={e => setChartW(e.nativeEvent.layout.width)}>
        {chart ? (
          <Svg width={chartW} height={CHART_H}>
            {/* Grid lines + y-labels */}
            {chart.gridVals.map((gv, i) => {
              const y = chart.yPos(gv);
              return (
                <React.Fragment key={i}>
                  <Line
                    x1={LEFT_PAD} y1={y}
                    x2={chartW - RIGHT_PAD} y2={y}
                    stroke={Colors.border}
                    strokeWidth={0.8}
                    strokeDasharray="4,3"
                  />
                  <SvgText
                    x={LEFT_PAD - 4} y={y + 3.5}
                    fontSize={8} fill={Colors.textSecondary} textAnchor="end">
                    {gv}M
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* Area fill */}
            {chart.areaD ? (
              <Path d={chart.areaD} fill={Colors.primary} fillOpacity={0.10} />
            ) : null}

            {/* Line */}
            {vals.length > 1 && (
              <Polyline
                points={chart.ptsStr}
                fill="none"
                stroke={Colors.primary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Dots */}
            {chart.dots.map((dot, i) => (
              <Circle
                key={i}
                cx={dot.x} cy={dot.y} r={3.5}
                fill={Colors.primary}
                stroke={Colors.surfaceLight}
                strokeWidth={1.5}
              />
            ))}

            {/* Value labels above dots */}
            {chart.dots.map((dot, i) => (
              <SvgText
                key={i}
                x={dot.x} y={dot.y - 7}
                fontSize={9} fontWeight="700"
                fill={Colors.primary} textAnchor="middle">
                {dot.v}M
              </SvgText>
            ))}

            {/* X-axis labels */}
            {filteredBars.map((bar, i) => {
              if (skipLabel && i % 2 !== 0) return null;
              return (
                <SvgText
                  key={i}
                  x={chart.xPos(i)} y={CHART_H - 4}
                  fontSize={8} fill={Colors.textSecondary} textAnchor="middle">
                  {bar.label}
                </SvgText>
              );
            })}
          </Svg>
        ) : (
          <View style={styles.emptyChart}>
            <Text style={styles.emptyText}>Tidak ada data pada rentang ini</Text>
          </View>
        )}
      </View>

      {/* Calendar modal */}
      <CalendarPicker
        visible={showCal}
        initialStart={appliedStart}
        initialEnd={appliedEnd}
        allBars={data.allBars}
        onApply={handleApply}
        onClose={() => setShowCal(false)}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs + 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    marginBottom: Spacing.sm,
  },
  dateBtnText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
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
  chartWrap: {},
  emptyChart: {
    height: CHART_H,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
});

const cal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.base,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  closeBtn: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  hint: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  navBtn: {
    width: 32,
    alignItems: 'center',
  },
  navArrow: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  navArrowDisabled: {
    color: Colors.border,
  },
  monthLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textMuted,
    paddingBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    position: 'relative',
  },
  dayCellInRange: {
    backgroundColor: '#EBF3FF',
    borderRadius: 0,
  },
  dayCellSelected: {
    backgroundColor: Colors.surfaceDark,
    borderRadius: 6,
  },
  dayText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  dayTextToday: {
    fontWeight: '700',
    color: Colors.primary,
  },
  dayTextInRange: {
    color: Colors.primary,
    fontWeight: '500',
  },
  dayTextSelected: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
  dayTextDisabled: {
    color: Colors.border,
  },
  todayDot: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  dataDot: {
    position: 'absolute',
    bottom: 3,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
  applyBtn: {
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceDark,
    borderRadius: 8,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
  },
  applyBtnDisabled: {
    backgroundColor: Colors.border,
  },
  applyText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textWhite,
  },
});
