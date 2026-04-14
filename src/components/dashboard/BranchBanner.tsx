import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Colors, Spacing, Typography} from '../../theme';
import type {CabangInfo} from '../../types';

interface BranchBannerProps {
  cabang: CabangInfo;
  skor: number;
  kategori: string;
  activeTab: string;
  tabs: string[];
  onTabChange: (tab: string) => void;
}

export function BranchBanner({cabang, skor, kategori, activeTab, tabs, onTabChange}: BranchBannerProps) {
  return (
    <View style={styles.banner}>
      {/* Branch info row */}
      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Text style={styles.cabangNama}>{cabang.nama}</Text>
          <Text style={styles.cabangKota}>{cabang.kota}</Text>
        </View>
        <View style={styles.scoreBlock}>
          <View style={styles.kategoriPill}>
            <Text style={styles.kategoriText}>{kategori}</Text>
          </View>
          <Text style={styles.scoreNum}>{skor}</Text>
        </View>
      </View>

      {/* Tab navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              activeOpacity={0.8}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.surfaceDark,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
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
  cabangKota: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  scoreBlock: {
    alignItems: 'flex-end',
    gap: 4,
  },
  kategoriPill: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
  },
  kategoriText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  scoreNum: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textWhite,
    lineHeight: 36,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 0,
  },
  tabItem: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: Colors.textWhite,
  },
  tabText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.textWhite,
    fontWeight: '700',
  },
});
