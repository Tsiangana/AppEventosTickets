import { Platform } from 'react-native';

export const EventColors = {
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',
  primaryAlpha: 'rgba(124,58,237,0.12)',

  accent: '#0EA5E9',
  accentLight: '#BAE6FD',
  accentDark: '#0369A1',

  rose: '#F43F5E',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  light: {
    background: '#FAFAFF',
    card: '#FFFFFF',
    text: '#1A1033',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    border: '#E2E8F0',
    borderFocus: '#7C3AED',
    tint: '#7C3AED',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#7C3AED',
    icon: '#64748B',
    inputBg: '#F8FAFC',
    surfaceAlt: '#EDE9FE',
  },

  dark: {
    background: '#0D0B1A',
    card: '#1C1830',
    text: '#F1EEF9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#2D2A4A',
    borderFocus: '#A78BFA',
    tint: '#A78BFA',
    tabIconDefault: '#64748B',
    tabIconSelected: '#A78BFA',
    icon: '#94A3B8',
    inputBg: '#1A1730',
    surfaceAlt: '#231D42',
  },

  gradients: {
    primary: ['#7C3AED', '#5B21B6'] as const,
    accent: ['#0EA5E9', '#0369A1'] as const,
    splash: ['#4C1D95', '#7C3AED'] as const,
    splashShape: ['#0EA5E9', '#06B6D4'] as const,
    card: ['#EDE9FE', '#FAFAFF'] as const,
    authBanner: ['#7C3AED', '#0EA5E9'] as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMedium: { fontSize: 16, fontWeight: '500' as const },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  label: { fontSize: 14, fontWeight: '500' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
};

// Backward-compatible alias (used by legacy components)
export const Colors = {
  light: {
    text: EventColors.light.text,
    background: EventColors.light.background,
    tint: EventColors.light.tint,
    icon: EventColors.light.icon,
    tabIconDefault: EventColors.light.tabIconDefault,
    tabIconSelected: EventColors.light.tabIconSelected,
  },
  dark: {
    text: EventColors.dark.text,
    background: EventColors.dark.background,
    tint: EventColors.dark.tint,
    icon: EventColors.dark.icon,
    tabIconDefault: EventColors.dark.tabIconDefault,
    tabIconSelected: EventColors.dark.tabIconSelected,
  },
};

export const Shadow = {
  sm: Platform.select({
    ios: { shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: { shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
    android: { elevation: 4 },
  }),
  lg: Platform.select({
    ios: { shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16 },
    android: { elevation: 8 },
  }),
};
