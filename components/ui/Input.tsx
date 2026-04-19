import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EventColors } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: string;
  iconRight?: string;
  onIconRightPress?: () => void;
  containerStyle?: ViewStyle;
  isDark?: boolean;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  iconRight,
  onIconRightPress,
  containerStyle,
  isDark = false,
  style,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? EventColors.error
    : focused
    ? (isDark ? EventColors.dark.borderFocus : EventColors.light.borderFocus)
    : (isDark ? EventColors.dark.border : EventColors.light.border);

  const bgColor = isDark ? EventColors.dark.inputBg : '#FFFFFF';
  const textColor = isDark ? EventColors.dark.text : EventColors.light.text;
  const placeholderColor = isDark ? EventColors.dark.textTertiary : EventColors.light.textTertiary;
  const labelColor = focused
    ? (isDark ? EventColors.primaryLight : EventColors.primary)
    : (isDark ? EventColors.dark.textSecondary : EventColors.light.textSecondary);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputWrapper,
          { borderColor, backgroundColor: bgColor },
          focused && styles.focused,
        ]}
      >
        {label && (
          <Text style={[styles.floatingLabel, { color: labelColor }]}>{label}</Text>
        )}

        <View style={styles.row}>
          {icon && (
            <Icon
              name={icon}
              size={20}
              color={focused ? EventColors.primary : placeholderColor}
              style={styles.iconLeft}
            />
          )}

          <TextInput
            {...props}
            style={[
              styles.input,
              { color: textColor, paddingTop: label ? 18 : 0 },
              icon && { paddingLeft: 4 },
              style,
            ]}
            placeholderTextColor={placeholderColor}
            onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          />

          {iconRight && (
            <TouchableOpacity onPress={onIconRightPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Icon name={iconRight} size={22} color={placeholderColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.hint, { color: isDark ? EventColors.dark.textTertiary : EventColors.light.textTertiary }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    minHeight: 58,
  },
  focused: {
    borderWidth: 2,
  },
  floatingLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    padding: 0,
    margin: 0,
  },
  error: {
    color: EventColors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
