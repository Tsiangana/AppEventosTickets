import React from 'react';
import {
  Dimensions,
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
import { EventColors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
        <Icon name="close" size={22} color="#1A1033" />
      </TouchableOpacity>

      {/* Illustration area */}
      <View style={styles.illustrationArea}>
        <LinearGradient
          colors={['#EDE9FE', '#FAFAFF']}
          style={styles.illustrationBg}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {/* Abstract decorative shapes */}
          <View style={styles.blob1} />
          <View style={styles.blob2} />
          <View style={styles.blob3} />

          {/* Central illustration card */}
          <View style={styles.illustrationCard}>
            <LinearGradient
              colors={EventColors.gradients.primary}
              style={styles.illustrationGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.illustrationEmoji}>🎉</Text>
            </LinearGradient>
            <View style={styles.illustrationCardInner}>
              <View style={[styles.illustrationTag, { backgroundColor: '#EDE9FE' }]}>
                <Text style={[styles.illustrationTagText, { color: EventColors.primary }]}>MÚSICA</Text>
              </View>
              <Text style={styles.illustrationTitle}>Festival Verão{'\n'}2025</Text>
              <Text style={styles.illustrationSub}>Sáb, 12 Jul • São Paulo</Text>
            </View>
          </View>

          {/* Small floating badges */}
          <View style={[styles.badge, styles.badge1]}>
            <Text style={styles.badgeEmoji}>🎟️</Text>
            <Text style={styles.badgeText}>12k indo</Text>
          </View>
          <View style={[styles.badge, styles.badge2]}>
            <Text style={styles.badgeEmoji}>❤️</Text>
            <Text style={styles.badgeText}>Favoritado</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Text + actions */}
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo!{'\n'}Vamos começar.</Text>

        <View style={styles.actions}>
          <Button
            label="Continuar com email"
            onPress={() => router.push('/(auth)/email')}
            variant="primary"
          />

          <Button
            label="Continuar com Google"
            onPress={() => {}}
            variant="outline"
            icon={<Icon name="logo-google" size={20} color="#EA4335" />}
            style={styles.socialBtn}
            labelStyle={{ color: '#1A1033' }}
          />

          <Button
            label="Continuar com Apple"
            onPress={() => {}}
            variant="dark"
            icon={<Icon name="logo-apple" size={20} color="#fff" />}
            style={styles.socialBtn}
          />
        </View>

        <TouchableOpacity style={styles.ticketLink} onPress={() => {}}>
          <Text style={styles.ticketLinkText}>Encontrar meus tickets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F0F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Illustration
  illustrationArea: {
    flex: 1,
    maxHeight: 360,
  },
  illustrationBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: EventColors.primaryAlpha,
    top: -40,
    left: -40,
  },
  blob2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(14,165,233,0.1)',
    bottom: -20,
    right: -20,
  },
  blob3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(244,63,94,0.08)',
    top: 40,
    right: 30,
  },
  // Event card
  illustrationCard: {
    width: width * 0.7,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  illustrationGradient: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: 48,
  },
  illustrationCardInner: {
    padding: 16,
  },
  illustrationTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  illustrationTagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  illustrationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1033',
    marginBottom: 4,
  },
  illustrationSub: {
    fontSize: 13,
    color: '#64748B',
  },
  // Floating badges
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 6,
  },
  badge1: {
    bottom: 32,
    left: 24,
  },
  badge2: {
    top: 32,
    right: 24,
  },
  badgeEmoji: {
    fontSize: 14,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1033',
  },
  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1033',
    letterSpacing: -0.5,
    marginBottom: 28,
  },
  actions: {
    gap: 12,
  },
  socialBtn: {
    backgroundColor: '#FFFFFF',
  },
  ticketLink: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 4,
  },
  ticketLinkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1033',
    textDecorationLine: 'underline',
  },
});
