import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { EventColors } from '@/constants/theme';

// Força da senha: retorna 0-4
function getPasswordStrength(password: string): number {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Fraca', 'Regular', 'Boa', 'Muito Forte'];
const STRENGTH_COLORS = ['', EventColors.error, EventColors.warning, EventColors.accent, EventColors.success];

export default function SignupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string }>();

  const [form, setForm] = useState({
    email: params.email ?? '',
    confirmEmail: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(form.password);

  const isFormValid =
    form.email.includes('@') &&
    form.email === form.confirmEmail &&
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    strength >= 2;

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSignUp = async () => {
    if (!isFormValid) return;
    setLoading(true);

    // Placeholder para integração com Supabase:
    // const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { first_name: form.firstName, last_name: form.lastName } } })
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    router.push('/(auth)/location');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-back" size={22} color="#1A1033" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Icon name="close" size={22} color="#1A1033" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Criar uma conta</Text>

          {/* Email (pré-preenchido) */}
          <Input
            label="Endereço de email"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          {/* Confirmar email */}
          <Input
            label="Confirmar endereço de email"
            placeholder="Repita o email"
            value={form.confirmEmail}
            onChangeText={update('confirmEmail')}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            error={
              form.confirmEmail.length > 0 && form.email !== form.confirmEmail
                ? 'Os emails não coincidem'
                : undefined
            }
          />

          {/* Nome */}
          <Input
            label="Nome"
            placeholder="Seu nome"
            value={form.firstName}
            onChangeText={update('firstName')}
            autoCapitalize="words"
            returnKeyType="next"
          />

          {/* Sobrenome */}
          <Input
            label="Sobrenome"
            placeholder="Seu sobrenome"
            value={form.lastName}
            onChangeText={update('lastName')}
            autoCapitalize="words"
            returnKeyType="next"
          />

          {/* Senha */}
          <Input
            label="Senha"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChangeText={update('password')}
            secureTextEntry={!showPassword}
            iconRight={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onIconRightPress={() => setShowPassword((v) => !v)}
            returnKeyType="done"
          />

          {/* Indicador de força */}
          {form.password.length > 0 && (
            <View style={styles.strengthRow}>
              <Text style={styles.strengthLabel}>Força da senha</Text>
              <Text style={[styles.strengthText, { color: STRENGTH_COLORS[strength] }]}>
                {STRENGTH_LABELS[strength]}
              </Text>
              <View style={styles.strengthBar}>
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthSegment,
                      { backgroundColor: i <= strength ? STRENGTH_COLORS[strength] : '#E2E8F0' },
                    ]}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Termos */}
          <Text style={styles.terms}>
            Ao se cadastrar, você concorda com os{' '}
            <Text style={styles.termsLink}>Termos de Uso</Text>
            {' '}e a{' '}
            <Text style={styles.termsLink}>Política de Privacidade</Text>
            {' '}do Event.
          </Text>
        </ScrollView>

        {/* Footer CTA */}
        <View style={styles.footer}>
          <Button
            label={loading ? '' : 'Criar conta'}
            onPress={handleSignUp}
            variant={isFormValid ? 'primary' : 'outline'}
            disabled={!isFormValid}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1033',
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  // Password strength
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -4,
    marginBottom: 16,
  },
  strengthLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  strengthText: {
    fontSize: 13,
    fontWeight: '600',
  },
  strengthBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  // Terms
  terms: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginTop: 8,
  },
  termsLink: {
    color: EventColors.primary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#FAFAFF',
  },
});
