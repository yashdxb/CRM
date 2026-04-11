import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../auth/AuthContext';
import { Colors } from '../theme/tokens';
import Icon from '../components/Icon';

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);
  const displayError = localError ?? error;

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
    <View style={s.screen}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <SafeAreaView style={s.flex}>
        <KeyboardAvoidingView
          style={s.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={s.container}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {/* Brand */}
            <View style={s.brandBlock}>
              <View style={s.brandIconOuter}>
                <View style={s.brandIconRing}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2', '#ec4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={s.brandIconGradient}
                    pointerEvents="none"
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
            </View>

            {/* Glass card */}
            <View style={s.cardWrapper}>
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
                  <View style={s.inputWrap}>
                    <View style={[s.inputIcon, { backgroundColor: 'rgba(236, 72, 153, 0.15)' }]} pointerEvents="none">
                      <Icon name="email" size={16} color="#ec4899" />
                    </View>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="you@company.com"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="email"
                      returnKeyType="next"
                      textContentType="emailAddress"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      style={s.textInput}
                    />
                  </View>
                </View>

                {/* Password field */}
                <View style={s.fieldGroup}>
                  <Text style={s.fieldLabel}>Password</Text>
                  <View style={s.inputWrap}>
                    <View style={[s.inputIcon, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]} pointerEvents="none">
                      <Icon name="lock" size={16} color="#22c55e" />
                    </View>
                    <TextInput
                      ref={passwordRef}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="password"
                      returnKeyType="go"
                      textContentType="password"
                      onSubmitEditing={handleLogin}
                      style={s.textInput}
                    />
                    <Pressable
                      onPress={() => setShowPassword((v) => !v)}
                      style={s.eyeButton}
                      hitSlop={12}
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
                    pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                    isLoading && { opacity: 0.6 },
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator size={18} color="#ffffff" />
                  ) : (
                    <>
                      <Text style={s.signInText}>Sign in</Text>
                      <Icon name="forward" size={16} color="#ffffff" />
                    </>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Footer */}
            <View style={s.footerBlock}>
              <View style={s.footerLine} />
              <Text style={s.footer}>
                Powered by North Edge Systems
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 4,
    height: 52,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#f1f5f9',
    paddingHorizontal: 12,
  },
  eyeButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(191, 233, 255, 0.32)',
  },
  signInText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
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
