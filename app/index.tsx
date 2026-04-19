import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  // Shape 1 (violet — top-left)
  const shape1X = useSharedValue(-width);
  const shape1Opacity = useSharedValue(0);

  // Shape 2 (cyan — bottom-right)
  const shape2X = useSharedValue(width);
  const shape2Opacity = useSharedValue(0);

  // Logo
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.75);
  const logoY = useSharedValue(16);

  // App name
  const nameOpacity = useSharedValue(0);
  const nameY = useSharedValue(10);

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);

    // Phase 1 — shapes animate in (0–700ms)
    shape1X.value = withTiming(0, { duration: 700, easing: ease });
    shape1Opacity.value = withTiming(1, { duration: 400 });

    shape2X.value = withTiming(0, { duration: 700, easing: ease });
    shape2Opacity.value = withTiming(1, { duration: 400 });

    // Phase 2 — logo appears (700–1300ms)
    logoOpacity.value = withDelay(650, withTiming(1, { duration: 500 }));
    logoScale.value = withDelay(650, withTiming(1, { duration: 600, easing: Easing.out(Easing.back(1.3)) }));
    logoY.value = withDelay(650, withTiming(0, { duration: 600, easing: ease }));

    // Phase 3 — name appears (950–1400ms)
    nameOpacity.value = withDelay(900, withTiming(1, { duration: 450 }));
    nameY.value = withDelay(900, withTiming(0, { duration: 450, easing: ease }));

    // Phase 4 — navigate (2400ms)
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const shape1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: shape1X.value }],
    opacity: shape1Opacity.value,
  }));

  const shape2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: shape2X.value }],
    opacity: shape2Opacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoY.value }],
  }));

  const nameStyle = useAnimatedStyle(() => ({
    opacity: nameOpacity.value,
    transform: [{ translateY: nameY.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#2D1B69', '#1A0A3D']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Shape 1 — violet blob top-left */}
      <Animated.View style={[styles.shape1Wrapper, shape1Style]}>
        <LinearGradient
          colors={['#7C3AED', '#9F67FF']}
          style={styles.shape1}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Shape 2 — cyan blob bottom-right */}
      <Animated.View style={[styles.shape2Wrapper, shape2Style]}>
        <LinearGradient
          colors={['#0EA5E9', '#06B6D4']}
          style={styles.shape2}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Center content */}
      <SafeAreaView style={styles.center}>
        {/* Logo mark */}
        <Animated.View style={[styles.logoWrapper, logoStyle]}>
          <LinearGradient
            colors={['#A78BFA', '#7C3AED']}
            style={styles.logoContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* "E" lettermark */}
            <Text style={styles.logoLetter}>E</Text>
          </LinearGradient>
        </Animated.View>

        {/* App name */}
        <Animated.View style={nameStyle}>
          <Text style={styles.appName}>Event</Text>
          <Text style={styles.tagline}>Viva o momento.</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const SHAPE_SIZE = width * 1.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3D',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  // Shapes
  shape1Wrapper: {
    position: 'absolute',
    top: -height * 0.25,
    left: -width * 0.3,
  },
  shape1: {
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    borderRadius: SHAPE_SIZE / 2,
    opacity: 0.35,
  },
  shape2Wrapper: {
    position: 'absolute',
    bottom: -height * 0.2,
    right: -width * 0.3,
  },
  shape2: {
    width: SHAPE_SIZE * 0.9,
    height: SHAPE_SIZE * 0.9,
    borderRadius: (SHAPE_SIZE * 0.9) / 2,
    opacity: 0.3,
  },
  // Logo
  logoWrapper: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});
