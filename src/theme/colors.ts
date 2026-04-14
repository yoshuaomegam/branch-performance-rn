// Colors extracted from Dashboard Kinerja Cabang SVG design
export const Colors = {
  // Background
  background: '#F5F6F7',
  surfaceDark: '#0D1E2D',
  surfaceDark2: '#1A2D3E',
  surfaceLight: '#FFFFFF',

  // Text
  textPrimary: '#121518',
  textSecondary: '#6A727D',
  textMuted: '#BFC2C8',
  textWhite: '#FFFFFF',

  // Status
  success: '#06AA6F',
  successLight: '#EBFAF5',
  successDark: '#09A854',

  warning: '#D19000',
  warningLight: '#FFF6E6',
  warningDark: '#9E6700',

  danger: '#D93535',
  dangerLight: '#FFF0F1',
  dangerDark: '#A31920',

  // Brand / Accent
  primary: '#0061AA',
  primaryLight: '#307FE2',
  accent: '#534AB7',

  // UI Elements
  border: '#DDE2E8',
  divider: '#DDE2E8',
  placeholder: '#BFC2C8',
};

export const StatusColors: Record<string, {bg: string; text: string; bar: string}> = {
  good: {
    bg: Colors.successLight,
    text: Colors.successDark,
    bar: Colors.success,
  },
  warning: {
    bg: Colors.warningLight,
    text: Colors.warningDark,
    bar: Colors.warning,
  },
  bad: {
    bg: Colors.dangerLight,
    text: Colors.dangerDark,
    bar: Colors.danger,
  },
};
