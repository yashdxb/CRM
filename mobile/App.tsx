import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
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
        colors={['#0f172a', '#1a2744', '#0f172a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screen}
      >
        <SafeAreaView style={styles.screen}>
          <StatusBar style="light" />
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
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setRefreshing(false), 600);
  }, []);
  // Tab switch fade animation
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;

  const switchTab = (tab: TabKey) => {
    if (tab === activeTab) return;
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 8,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveTab(tab);
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const contentAnimStyle = {
    opacity: contentOpacity,
    transform: [{ translateY: contentTranslateY }],
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#1a2744', '#0f172a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen}>
        <StatusBar style="light" />

        {/* Ambient glow orbs */}
        <View style={styles.orbPrimary} />
        <View style={styles.orbCyan} />
        <View style={styles.orbPurple} />
        <View style={styles.orbAccent} />

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
          <Animated.ScrollView
            style={[styles.content, contentAnimStyle]}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            }
          >
            {activeTab === 'home' ? <HomeScreen key={refreshKey} /> : null}
            {activeTab === 'leads' ? <LeadsScreen key={refreshKey} /> : null}
            {activeTab === 'contacts' ? <ContactsScreen key={refreshKey} /> : null}
            {activeTab === 'deals' ? <DealsScreen key={refreshKey} /> : null}
            {activeTab === 'activities' ? <ActivitiesScreen key={refreshKey} /> : null}
          </Animated.ScrollView>

          {/* Frosted Glass Tab Bar */}
          <View style={styles.tabBarShell}>
            <BlurView
              intensity={30}
              tint="dark"
              style={styles.tabBarBlur}
            >
              <View style={styles.tabBar}>
                {tabs.map((tab) => {
                  const isActive = tab.key === activeTab;
                  return (
                    <Pressable
                      key={tab.key}
                      onPress={() => switchTab(tab.key)}
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
    top: -120,
    right: -60,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(102, 126, 234, 0.18)',
  },
  orbCyan: {
    position: 'absolute',
    bottom: 80,
    left: -90,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
  },
  orbPurple: {
    position: 'absolute',
    top: '40%' as unknown as number,
    right: -30,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
  orbAccent: {
    position: 'absolute',
    top: '20%' as unknown as number,
    left: '20%' as unknown as number,
    width: 120,
    height: 120,
    borderRadius: 999,
    backgroundColor: 'rgba(102, 126, 234, 0.06)',
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
    color: '#ffffff',
  },
  headerMeta: {
    marginTop: 2,
    fontSize: Typography.caption.fontSize,
    color: 'rgba(148, 163, 184, 0.8)',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBadgeText: {
    color: 'rgba(148, 163, 184, 0.8)',
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
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
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
    backgroundColor: 'rgba(102, 126, 234, 0.12)',
  },
  tabIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconBubbleActive: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
  },
  tabLabel: {
    fontSize: Typography.label.fontSize,
    fontWeight: Typography.label.fontWeight,
    color: 'rgba(148, 163, 184, 0.6)',
  },
  tabLabelActive: {
    color: Colors.primary,
  },
});
