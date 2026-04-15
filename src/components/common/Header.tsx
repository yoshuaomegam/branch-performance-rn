import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {Colors, Typography, Spacing} from '../../theme';

interface HeaderProps {
  title: string;
  cabangNama?: string;
  area?: string;
  pimpinan?: string;
  skor?: number;
  kategori?: string;
  activeTab?: string;
  tabs?: string[];
  onTabChange?: (tab: string) => void;
  onNotificationPress?: () => void;
}

function getSkorBadgeBg(skor: number): string {
  if (skor >= 80) return Colors.successLight;
  if (skor >= 60) return Colors.warningLight;
  return Colors.dangerLight;
}

function getSkorBadgeColor(skor: number): string {
  if (skor >= 80) return Colors.success;
  if (skor >= 60) return Colors.warning;
  return Colors.danger;
}

export function Header({
  title,
  cabangNama,
  area,
  pimpinan,
  skor,
  kategori,
  activeTab,
  tabs,
  onTabChange,
  onNotificationPress,
}: HeaderProps) {
  const areaLine = [area, pimpinan].filter(Boolean).join(' · ');

  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <Svg style={StyleSheet.absoluteFill} height="100%" width="100%">
        <Defs>
          <LinearGradient id="headerGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#0D1E2D" stopOpacity="1" />
            <Stop offset="1" stopColor="#121518" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#headerGrad)" />
      </Svg>

      {/* Row 1: Title + notification bell */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress} activeOpacity={0.7}>
          <View style={styles.notifDot} />
          <View style={styles.bellOuter}>
            <View style={styles.bellBody} />
            <View style={styles.bellBase} />
            <View style={styles.bellClapper} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Row 2: Branch name + score badge */}
      {(cabangNama || skor !== undefined) && (
        <View style={styles.branchRow}>
          <View style={styles.branchLeft}>
            {cabangNama && <Text style={styles.cabangNama}>{cabangNama}</Text>}
            {areaLine ? <Text style={styles.cabangSub}>{areaLine}</Text> : null}
          </View>
          {skor !== undefined && (
            <View style={[styles.scoreBadge, {backgroundColor: getSkorBadgeBg(skor)}]}>
              {kategori && (
                <Text style={[styles.scoreBadgeKategori, {color: getSkorBadgeColor(skor)}]}>
                  {kategori}
                </Text>
              )}
              <Text style={[styles.scoreBadgeNum, {color: getSkorBadgeColor(skor)}]}>{skor}</Text>
            </View>
          )}
        </View>
      )}

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <View style={styles.tabsRow}>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => onTabChange?.(tab)}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                activeOpacity={0.8}>
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textPrimary,
    paddingTop: Spacing.sm,
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '700',
    color: Colors.textWhite,
    flex: 1,
    marginRight: Spacing.sm,
  },
  iconBtn: {
    position: 'relative',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: Colors.textPrimary,
  },
  bellOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
  },
  bellBody: {
    width: 14,
    height: 12,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    borderBottomWidth: 0,
    marginTop: 3,
  },
  bellBase: {
    width: 16,
    height: 2,
    backgroundColor: Colors.textMuted,
    borderRadius: 1,
  },
  bellClapper: {
    width: 5,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: Colors.textMuted,
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  branchLeft: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  cabangNama: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: 2,
  },
  cabangSub: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  scoreBadge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    minWidth: 72,
  },
  scoreBadgeKategori: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600',
    marginBottom: 1,
  },
  scoreBadgeNum: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: '800',
    lineHeight: 28,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: Colors.textPrimary,
    backgroundColor: Colors.background,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
