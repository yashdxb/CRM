import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { CrmTheme } from './src/theme';
import { AuthProvider, useAuth } from './src/auth/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { LoadingState } from './src/components/StateViews';
import Icon from './src/components/Icon';
import { Colors, Spacing, Radius, Typography, Shadows, Glass } from './src/theme/tokens';
import { backgroundGradient, primaryGradient } from './src/theme/gradients';
import HomeScreen from './src/screens/HomeScreen';
import LeadsScreen from './src/screens/LeadsScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import DealsScreen from './src/screens/DealsScreen';
import ActivitiesScreen from './src/screens/ActivitiesScreen';

type TabKey = 'home' | 'leads' | 'contacts' | 'deals' | 'activities';

const tabs: {
  key: TabKey;
  label: string;
  icon: React.ComponentProps<typeof Icon>['name'];
}[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'leads', label: 'Leads', icon: 'leads' },
  { key: 'contacts', label: 'People', icon: 'contacts' },
  { key: 'deals', label: 'Deals', icon: 'deals' },
  { key: 'activities', label: 'Actions', icon: 'activities' },
];

// ─── Root ───────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CrmTheme}>
        <AuthProvider>
          <AppGate />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function AppGate() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LinearGradient
        colors={[...backgroundGradient.colors]}
        start={backgroundGradient.start}
        end={backgroundGradient.end}
        style={styles.screen}
      >
        <SafeAreaView style={styles.screen}>
          <LoadingState label="Restoring session…" />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!session) return <LoginScreen />;
  return <AppShell />;
}

function AppShell() {
  const { session, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <LinearGradient
      colors={[...backgroundGradient.colors]}
      start={backgroundGradient.start}
      end={backgroundGradient.end}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar style="dark" />

        {/* Decorative orbs */}
        <View style={styles.orbPrimary} />
        <View style={styles.orbCyan} />

        <View style={styles.appShell}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={[...primaryGradient.colors]}
                start={primaryGradient.start}
                end={primaryGradient.end}
                style={styles.headerIconBubble}
              >
                <Icon name="briefcase" size={16} color={Colors.textInverse} />
              </LinearGradient>
              <View>
                <Text style={styles.brand}>North Edge CRM</Text>
                <Text style={styles.headerMeta}>
                  {session?.fullName ?? 'Sales workspace'}
                </Text>
              </View>
            </View>
            <Pressable onPress={logout} style={styles.headerBadge}>
              <Icon name="logout" size={14} color={Colors.textSecondary} />
              <Text style={styles.headerBadgeText}>Sign out</Text>
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'home' ? <HomeScreen /> : null}
            {activeTab === 'leads' ? <LeadsScreen /> : null}
            {activeTab === 'contacts' ? <ContactsScreen /> : null}
            {activeTab === 'deals' ? <DealsScreen /> : null}
            {activeTab === 'activities' ? <ActivitiesScreen /> : null}
          </ScrollView>

          {/* Frosted Glass Tab Bar */}
          <View style={styles.tabBarShell}>
            <BlurView
              intensity={Glass.blurIntensity}
              tint={Glass.blurTint as 'systemChromeMaterialLight'}
              style={styles.tabBarBlur}
            >
              <View style={styles.tabBar}>
                {tabs.map((tab) => {
                  const isActive = tab.key === activeTab;
                  return (
                    <Pressable
                      key={tab.key}
                      onPress={() => setActiveTab(tab.key)}
                      style={[styles.tabButton, isActive && styles.tabButtonActive]}
                    >
                      <View
                        style={[
                          styles.tabIconBubble,
                          isActive && styles.tabIconBubbleActive,
                        ]}
                      >
                        <Icon
                          name={tab.icon}
                          size={18}
                          color={isActive ? Colors.primary : Colors.textMuted}
                        />
                      </View>
                      <Text
                        style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                      >
                        {tab.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </BlurView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Styles ─────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  orbPrimary: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: 'rgba(102, 126, 234, 0.18)',
  },
  orbCyan: {
    position: 'absolute',
    bottom: 60,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: 'rgba(6, 182, 212, 0.14)',
  },
  appShell: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerIconBubble: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: Typography.title.fontSize,
    fontWeight: Typography.title.fontWeight,
    color: Colors.textPrimary,
  },
  headerMeta: {
    marginTop: 2,
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.glassSubtle,
    borderWidth: 1,
    borderColor: Colors.glassBorderSubtle,
  },
  headerBadgeText: {
    color: Colors.textSecondary,
    fontSize: Typography.caption.fontSize,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 120,
    gap: Spacing.md,
  },
  tabBarShell: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },
  tabBarBlur: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    ...Shadows.card,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    gap: 3,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
  },
  tabIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBubbleActive: {
    backgroundColor: 'rgba(102, 126, 234, 0.12)',
  },
  tabLabel: {
    fontSize: Typography.label.fontSize,
    fontWeight: Typography.label.fontWeight,
    color: Colors.textMuted,
  },
  tabLabelActive: {
    color: Colors.primary,
  },
});
