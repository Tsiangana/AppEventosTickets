import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { EventColors } from '@/constants/theme';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark' | 'social';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const HEIGHT: Record<Size, number> = { sm: 40, md: 48, lg: 56 };
const FONT_SIZE: Record<Size, number> = { sm: 14, md: 15, lg: 16 };

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  style,
  labelStyle,
}: ButtonProps) {
  const height = HEIGHT[size];
  const fontSize = FONT_SIZE[size];
  const radius = height / 2;
  const isDisabled = disabled || loading;

  const content = loading ? (
    <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? EventColors.primary : '#fff'} />
  ) : (
    <View style={styles.inner}>
      {icon && <View style={styles.iconLeft}>{icon}</View>}
      <Text style={[styles.label, { fontSize }, variant === 'outline' && styles.labelOutline, variant === 'ghost' && styles.labelGhost, variant === 'dark' && styles.labelDark, labelStyle]}>
        {label}
      </Text>
      {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={isDisabled}
        style={[{ height, borderRadius: radius, overflow: 'hidden', opacity: isDisabled ? 0.5 : 1 }, style]}
      >
        <LinearGradient
          colors={EventColors.gradients.primary}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={[styles.base, { height }]}>{content}</View>
      </TouchableOpacity>
    );
  }

  if (variant === 'dark') {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={isDisabled}
        style={[{ height, borderRadius: radius, backgroundColor: '#1A1033', overflow: 'hidden', opacity: isDisabled ? 0.5 : 1 }, style]}
      >
        <View style={[styles.base, { height }]}>{content}</View>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={isDisabled}
        style={[{ height, borderRadius: radius, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#fff', opacity: isDisabled ? 0.5 : 1 }, style]}
      >
        <View style={[styles.base, { height }]}>{content}</View>
      </TouchableOpacity>
    );
  }

  if (variant === 'social') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={isDisabled}
        style={[{ height, borderRadius: radius, borderWidth: 1.5, borderColor: '#E2E8F0', backgroundColor: '#fff', opacity: isDisabled ? 0.5 : 1 }, style]}
      >
        <View style={[styles.base, { height }]}>{content}</View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[{ height, borderRadius: radius, opacity: isDisabled ? 0.5 : 1 }, style]}
    >
      <View style={[styles.base, { height }]}>{content}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  labelOutline: {
    color: '#1A1033',
  },
  labelGhost: {
    color: EventColors.primary,
  },
  labelDark: {
    color: '#FFFFFF',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
});
