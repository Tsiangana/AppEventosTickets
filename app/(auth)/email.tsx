import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { EventColors } from '@/constants/theme';

export default function EmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const isValidEmail = email.includes('@') && email.includes('.');

  const handleNext = () => {
    if (!isValidEmail) return;
    // Em um app real: verificar se o email já existe no backend
    // Se existir → tela de senha (login)
    // Se não existir → tela de cadastro
    router.push({ pathname: '/(auth)/signup', params: { email } });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header navigation */}
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

        {/* Form */}
        <View style={styles.body}>
          <Text style={styles.title}>Entrar ou{'\n'}criar conta</Text>

          <View style={styles.form}>
            <Input
              label="Endereço de email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
          </View>

          {/* Info banner */}
          <View style={styles.infoBanner}>
            <LinearGradient
              colors={EventColors.gradients.authBanner}
              style={styles.infoBannerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.infoBannerContent}>
              <Icon name="ticket-outline" size={22} color="#FFFFFF" />
              <Text style={styles.infoBannerText}>
                Use o mesmo email que você usou para comprar seus tickets
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom CTA */}
        <View style={styles.footer}>
          <Button
            label="Próximo"
            onPress={handleNext}
            variant={isValidEmail ? 'primary' : 'outline'}
            disabled={!isValidEmail}
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
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1033',
    letterSpacing: -0.5,
    marginBottom: 28,
  },
  form: {
    marginBottom: 20,
  },
  // Info banner
  infoBanner: {
    borderRadius: 14,
    overflow: 'hidden',
    height: 62,
    justifyContent: 'center',
  },
  infoBannerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  infoBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  infoBannerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
