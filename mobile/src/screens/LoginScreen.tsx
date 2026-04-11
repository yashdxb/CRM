import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../auth/AuthContext';
import { Colors, Spacing, Radius, Shadows } from '../theme/tokens';
import Icon from '../components/Icon';

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const displayError = localError ?? error;

  // ─── Entry animation ─────────────────────────
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardFade, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(cardSlide, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleLogin = async () => {
    setLocalError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setLocalError('Email and password are required');
      return;
    }
    try {
      await login(trimmedEmail, password);
    } catch {
      // Error is set via AuthContext
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      locations={[0, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.screen}
    >
      <SafeAreaView style={s.flex}>
        <KeyboardAvoidingView
          style={s.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={s.container}>
            {/* Brand */}
            <Animated.View
              style={[
                s.brandBlock,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={s.brandIconOuter}>
                <View style={s.brandIconRing}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2', '#ec4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={s.brandIconGradient}
                  >
                    <Icon name="briefcase" size={30} color="#ffffff" />
                  </LinearGradient>
                </View>
              </View>

              <View style={s.brandTextRow}>
                <Text style={s.brandName}>North Edge</Text>
                <View style={s.brandDivider} />
                <Text style={s.brandProduct}>CRM</Text>
              </View>

              <Text style={s.brandTagline}>
                Sales intelligence, in motion
              </Text>
            </Animated.View>

            {/* Glass card */}
            <Animated.View
              style={[
                s.cardWrapper,
                { opacity: cardFade, transform: [{ translateY: cardSlide }] },
              ]}
            >
              <View style={s.card}>
                  <View style={s.cardHeader}>
                    <Text style={s.cardTitle}>Welcome back</Text>
                    <Text style={s.cardSubtitle}>
                      Sign in to your workspace
                    </Text>
                  </View>

                  {/* Email field */}
                  <View style={s.fieldGroup}>
                    <Text style={s.fieldLabel}>Email</Text>
                    <View
                      style={[
                        s.inputWrap,
                        emailFocused && s.inputWrapFocused,
                      ]}
                    >
                      <LinearGradient
                        colors={emailFocused ? ['#ec4899', '#f472b6'] : ['rgba(236, 72, 153, 0.18)', 'rgba(236, 72, 153, 0.08)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[s.inputIcon, emailFocused && s.inputIconFocused]}
                      >
                        <Icon name="email" size={16} color="#ffffff" />
                      </LinearGradient>
                      <RNTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@company.com"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        style={s.textInput}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                      />
                    </View>
                  </View>

                  {/* Password field */}
                  <View style={s.fieldGroup}>
                    <Text style={s.fieldLabel}>Password</Text>
                    <View
                      style={[
                        s.inputWrap,
                        passwordFocused && s.inputWrapFocused,
                      ]}
                    >
                      <LinearGradient
                        colors={passwordFocused ? ['#22c55e', '#4ade80'] : ['rgba(34, 197, 94, 0.18)', 'rgba(34, 197, 94, 0.08)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[s.inputIcon, passwordFocused && s.inputIconFocused]}
                      >
                        <Icon name="lock" size={16} color="#ffffff" />
                      </LinearGradient>
                      <RNTextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoComplete="password"
                        style={s.textInput}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                      />
                      <Pressable
                        onPress={() => setShowPassword((v) => !v)}
                        style={s.eyeButton}
                        hitSlop={8}
                      >
                        <Icon
                          name={showPassword ? 'eye-off' : 'eye'}
                          size={18}
                          color="rgba(255,255,255,0.5)"
                        />
                      </Pressable>
                    </View>
                  </View>

                  {/* Error */}
                  {displayError ? (
                    <View style={s.errorBox}>
                      <Icon name="error" size={14} color={Colors.red} />
                      <Text style={s.errorText}>{displayError}</Text>
                    </View>
                  ) : null}

                  {/* Sign in button */}
                  <Pressable
                    onPress={handleLogin}
                    disabled={isLoading}
                    style={({ pressed }) => [
                      s.signInBtn,
                      pressed && s.signInBtnPressed,
                      isLoading && s.signInBtnDisabled,
                    ]}
                  >
                    <LinearGradient
                      colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={s.signInGradient}
                    >
                      {isLoading ? (
                        <ActivityIndicator size={18} color="#ffffff" />
                      ) : (
                        <>
                          <Text style={s.signInText}>Sign in</Text>
                          <Icon name="forward" size={16} color="#ffffff" />
                        </>
                      )}
                    </LinearGradient>
                  </Pressable>
                </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View style={[s.footerBlock, { opacity: cardFade }]}>
              <View style={s.footerLine} />
              <Text style={s.footer}>
                Powered by North Edge Systems
              </Text>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  // ─── Layout ───────────────────────────────────
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 32,
  },

  // ─── Brand ────────────────────────────────────
  brandBlock: {
    alignItems: 'center',
    gap: 12,
  },
  brandIconOuter: {
    marginBottom: 8,
    shadowColor: '#764ba2',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  brandIconRing: {
    width: 76,
    height: 76,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  brandIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  brandDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  brandProduct: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  brandTagline: {
    fontSize: 15,
    color: 'rgba(148, 163, 184, 0.8)',
    textAlign: 'center',
    fontWeight: '400',
  },

  // ─── Card ─────────────────────────────────────
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#1e1250',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  card: {
    padding: 24,
    gap: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
  },
  cardHeader: {
    gap: 4,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(148, 163, 184, 0.8)',
    fontWeight: '400',
  },

  // ─── Fields ───────────────────────────────────
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(203, 213, 225, 0.9)',
    letterSpacing: 0.3,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 4,
    height: 52,
  },
  inputWrapFocused: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#ffffff',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  inputIconFocused: {
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: '100%',
  } as any,
  eyeButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },

  // ─── Error ────────────────────────────────────
  errorBox: {
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f87171',
    flex: 1,
  },

  // ─── Button ───────────────────────────────────
  signInBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
    shadowColor: '#1e1250',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  signInBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  signInBtnDisabled: {
    opacity: 0.6,
  },
  signInGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(191, 233, 255, 0.32)',
  },
  signInText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgba(248, 250, 252, 0.98)',
    letterSpacing: 0.3,
  },

  // ─── Footer ───────────────────────────────────
  footerBlock: {
    alignItems: 'center',
    gap: 12,
  },
  footerLine: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(100, 116, 139, 0.6)',
    fontWeight: '500',
  },
});
