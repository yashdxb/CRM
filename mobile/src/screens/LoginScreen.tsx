import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAuth } from '../auth/AuthContext';
import { Colors, Spacing, Radius, Typography, Shadows } from '../theme/tokens';
import { primaryGradient, backgroundGradient } from '../theme/gradients';
import GradientButton from '../components/GradientButton';
import Icon from '../components/Icon';

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
    <LinearGradient
      colors={[...backgroundGradient.colors]}
      start={backgroundGradient.start}
      end={backgroundGradient.end}
      style={s.screen}
    >
      <SafeAreaView style={s.flex}>
        {/* Decorative orbs */}
        <View style={s.orbPrimary} />
        <View style={s.orbCyan} />
        <View style={s.orbPurple} />

        <KeyboardAvoidingView
          style={s.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={s.container}>
            {/* Brand */}
            <View style={s.brandBlock}>
              <View style={s.brandIconWrap}>
                <LinearGradient
                  colors={[...primaryGradient.colors]}
                  start={primaryGradient.start}
                  end={primaryGradient.end}
                  style={s.brandIconGradient}
                >
                  <Icon name="briefcase" size={28} color={Colors.textInverse} />
                </LinearGradient>
              </View>
              <Text style={s.brandName}>North Edge</Text>
              <Text style={s.brandProduct}>CRM</Text>
              <Text style={s.brandTagline}>
                Sales execution intelligence, in motion
              </Text>
            </View>

            {/* Glass card */}
            <BlurView intensity={40} tint="systemChromeMaterialLight" style={s.cardBlur}>
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
                  textColor={Colors.textPrimary}
                  theme={{
                    colors: {
                      primary: Colors.primary,
                      onSurfaceVariant: Colors.textSecondary,
                      outline: Colors.glassBorderSubtle,
                      surfaceVariant: 'rgba(255,255,255,0.5)',
                    },
                  }}
                  left={<TextInput.Icon icon="email-outline" color={Colors.primary} />}
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
                  textColor={Colors.textPrimary}
                  theme={{
                    colors: {
                      primary: Colors.primary,
                      onSurfaceVariant: Colors.textSecondary,
                      outline: Colors.glassBorderSubtle,
                      surfaceVariant: 'rgba(255,255,255,0.5)',
                    },
                  }}
                  left={<TextInput.Icon icon="lock-outline" color={Colors.primary} />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      color={Colors.textMuted}
                      onPress={() => setShowPassword((v) => !v)}
                    />
                  }
                />

                {displayError ? (
                  <View style={s.errorBox}>
                    <Icon name="alert" size={16} color={Colors.red} />
                    <Text style={s.errorText}>{displayError}</Text>
                  </View>
                ) : null}

                <GradientButton
                  label="Sign in"
                  variant="primary"
                  loading={isLoading}
                  onPress={handleLogin}
                  icon="lock"
                />
              </View>
            </BlurView>

            <Text style={s.footer}>
              Powered by North Edge Systems
            </Text>
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
  orbPrimary: {
    position: 'absolute',
    top: -100,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: 'rgba(102, 126, 234, 0.25)',
    // blur simulated via large radius
  },
  orbCyan: {
    position: 'absolute',
    bottom: 80,
    left: -80,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
  },
  orbPurple: {
    position: 'absolute',
    top: '40%' as unknown as number,
    left: '60%' as unknown as number,
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing['2xl'],
  },
  brandBlock: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  brandIconWrap: {
    marginBottom: Spacing.sm,
  },
  brandIconGradient: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
  brandName: {
    fontSize: Typography.hero.fontSize,
    fontWeight: Typography.hero.fontWeight,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  brandProduct: {
    fontSize: Typography.label.fontSize,
    fontWeight: Typography.label.fontWeight,
    color: Colors.primary,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  brandTagline: {
    marginTop: Spacing.sm,
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  cardBlur: {
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    ...Shadows.card,
  },
  card: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight,
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  errorBox: {
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
    color: Colors.red,
    flex: 1,
  },
  footer: {
    textAlign: 'center',
    fontSize: Typography.caption.fontSize,
    color: Colors.textMuted,
  },
});
