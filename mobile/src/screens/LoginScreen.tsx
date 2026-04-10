import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { CrmTheme } from '../theme';

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

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
    <SafeAreaView style={s.screen}>
      <View style={s.glowTop} />
      <View style={s.glowBottom} />

      <KeyboardAvoidingView
        style={s.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.container}>
          {/* Brand */}
          <View style={s.brandBlock}>
            <Text style={s.brandName}>North Edge</Text>
            <Text style={s.brandProduct}>CRM</Text>
            <Text style={s.brandTagline}>
              Sales execution intelligence, in motion
            </Text>
          </View>

          {/* Glass card */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Sign in</Text>
            <Text style={s.cardSubtitle}>
              Use your workspace credentials
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              mode="outlined"
              style={s.input}
              textColor="#f4f8ff"
              theme={{
                colors: {
                  primary: '#7fa1ff',
                  onSurfaceVariant: '#adc0df',
                  outline: 'rgba(255,255,255,0.18)',
                  surfaceVariant: 'rgba(255,255,255,0.06)',
                },
              }}
              left={<TextInput.Icon icon="email-outline" color="#7fa1ff" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              mode="outlined"
              style={s.input}
              textColor="#f4f8ff"
              theme={{
                colors: {
                  primary: '#7fa1ff',
                  onSurfaceVariant: '#adc0df',
                  outline: 'rgba(255,255,255,0.18)',
                  surfaceVariant: 'rgba(255,255,255,0.06)',
                },
              }}
              left={<TextInput.Icon icon="lock-outline" color="#7fa1ff" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  color="#adc0df"
                  onPress={() => setShowPassword((v) => !v)}
                />
              }
            />

            {displayError ? (
              <View style={s.errorBox}>
                <Text style={s.errorText}>{displayError}</Text>
              </View>
            ) : null}

            <Pressable
              style={[s.loginBtn, isLoading && s.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size={20} />
              ) : (
                <Text style={s.loginBtnText}>Sign in</Text>
              )}
            </Pressable>
          </View>

          <Text style={s.footer}>
            Powered by North Edge Systems
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0c1730',
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: 'rgba(77, 123, 255, 0.35)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -140,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(253, 141, 90, 0.22)',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 32,
  },
  brandBlock: {
    alignItems: 'center',
    gap: 4,
  },
  brandName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#f4f8ff',
    letterSpacing: -0.5,
  },
  brandProduct: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7fa1ff',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  brandTagline: {
    marginTop: 8,
    fontSize: 14,
    color: '#b7c8e6',
    textAlign: 'center',
  },
  card: {
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f5f9ff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#c1d3ef',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  errorBox: {
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fca5a5',
  },
  loginBtn: {
    marginTop: 4,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b7eff',
    shadowColor: '#3b5eff',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8ea4c8',
  },
});
