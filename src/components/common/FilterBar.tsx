import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Colors, Typography, Spacing} from '../../theme';
import type {SelectOption} from '../../types';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function FilterDropdown({label, value, options, onChange}: FilterDropdownProps) {
  const [visible, setVisible] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <>
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}>
        <Text style={styles.filterLabel}>{label}</Text>
        <View style={styles.filterValueRow}>
          <Text style={styles.filterValue} numberOfLines={1}>
            {selected?.label ?? '—'}
          </Text>
          <Text style={styles.chevron}>▾</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          <SafeAreaView style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.optionRow,
                    item.value === value && styles.optionRowSelected,
                  ]}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}>
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

interface FilterBarProps {
  periodeList: SelectOption[];
  selectedPeriode: string;
  onPeriodeChange: (value: string) => void;
  cabangList: SelectOption[];
  selectedCabang: string;
  onCabangChange: (value: string) => void;
}

export function FilterBar({
  periodeList,
  selectedPeriode,
  onPeriodeChange,
  cabangList,
  selectedCabang,
  onCabangChange,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      <FilterDropdown
        label="Periode"
        value={selectedPeriode}
        options={periodeList}
        onChange={onPeriodeChange}
      />
      <View style={styles.separator} />
      <FilterDropdown
        label="Pilih Cabang"
        value={selectedCabang}
        options={cabangList}
        onChange={onCabangChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterBtn: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  filterLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  filterValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterValue: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  chevron: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
  },
  separator: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  // Modal sheet
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surfaceLight,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Spacing.xl,
    maxHeight: '60%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sheetTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionRowSelected: {
    backgroundColor: Colors.successLight,
  },
  optionText: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: '700',
  },
});
