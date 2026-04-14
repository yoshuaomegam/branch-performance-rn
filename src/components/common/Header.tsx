import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography, Spacing} from '../../theme';

interface HeaderProps {
  title: string;
  cabangNama?: string;
  area?: string;
  pimpinan?: string;
  onNotificationPress?: () => void;
}

export function Header({title, cabangNama, area, pimpinan, onNotificationPress}: HeaderProps) {
  const subtitleParts = [cabangNama, area && pimpinan ? `${area} · ${pimpinan}` : area ?? pimpinan].filter(Boolean);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitleParts.length > 0 && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitleParts.join(' | ')}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress} activeOpacity={0.7}>
        <View style={styles.notifDot} />
        <View style={styles.bellOuter}>
          <View style={styles.bellBody} />
          <View style={styles.bellBase} />
          <View style={styles.bellClapper} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  left: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
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
    borderColor: Colors.surfaceLight,
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
    borderColor: Colors.textSecondary,
    borderBottomWidth: 0,
    marginTop: 3,
  },
  bellBase: {
    width: 16,
    height: 2,
    backgroundColor: Colors.textSecondary,
    borderRadius: 1,
  },
  bellClapper: {
    width: 5,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: Colors.textSecondary,
  },
});
