import {useCallback} from 'react';

export function useFormatNumber() {
  const formatCurrency = useCallback((value: number, ringkas = false): string => {
    if (ringkas) {
      if (value >= 1_000_000_000_000) {
        return `Rp ${(value / 1_000_000_000_000).toFixed(1)} T`;
      }
      if (value >= 1_000_000_000) {
        return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
      }
      if (value >= 1_000_000) {
        return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
      }
    }
    return `Rp ${value.toLocaleString('id-ID')}`;
  }, []);

  const formatValue = useCallback(
    (value: number, satuan: string, ringkas = false): string => {
      if (satuan === 'Rp') {
        return formatCurrency(value, ringkas);
      }
      if (satuan === '%') {
        return `${value.toFixed(1)}%`;
      }
      return `${value.toLocaleString('id-ID')} ${satuan}`;
    },
    [formatCurrency],
  );

  const formatPercent = useCallback((value: number): string => {
    return `${value.toFixed(1)}%`;
  }, []);

  return {formatCurrency, formatValue, formatPercent};
}
