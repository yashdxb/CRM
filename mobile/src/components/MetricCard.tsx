import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../theme/tokens';
import { entityGradients, primaryGradient, cyanGradient, orangeGradient, successGradient, purpleGradient } from '../theme/gradients';

type GradientVariant = 'home' | 'leads' | 'contacts' | 'deals' | 'activities' | 'cyan' | 'orange' | 'green' | 'purple';

const variantGradients: Record<string, { colors: readonly string[]; start: { x: number; y: number }; end: { x: number; y: number } }> = {
  home: primaryGradient,
  leads: cyanGradient,
  contacts: successGradient,
  deals: orangeGradient,
  activities: purpleGradient,
  cyan: cyanGradient,
  orange: orangeGradient,
  green: successGradient,
  purple: purpleGradient,
};

/** Stroke colors used by the ring chart per variant */
const ringColors: Record<string, string> = {
  home: '#a5b4fc',
  leads: '#67e8f9',
  contacts: '#86efac',
  deals: '#fdba74',
  activities: '#d8b4fe',
  cyan: '#67e8f9',
  orange: '#fdba74',
  green: '#86efac',
  purple: '#d8b4fe',
};

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
  /** Ionicons name for the card icon */
  ionicon?: string;
  variant?: GradientVariant;
  trend?: { direction: 'up' | 'down'; text: string };
  /** Ring chart percentage (0–100). Omit to hide ring. */
  ringPercent?: number;
  /** Small notification badge number (e.g. "1") */
  badge?: string;
  style?: ViewStyle;
}

// ─── Animated Ring ──────────────────────────────

const RING_SIZE = 36;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function RingChart({ percent, color }: { percent: number; color: string }) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: percent,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const dashOffset = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [RING_CIRCUMFERENCE, 0],
  });

  return (
    <View style={ringStyles.wrap}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        {/* Background ring */}
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={RING_STROKE}
        />
        {/* Animated fill ring */}
        <AnimatedCircle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={`${RING_CIRCUMFERENCE}`}
          strokeDashoffset={dashOffset}
          rotation="-90"
          origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
        />
      </Svg>
      <Text style={ringStyles.label}>{Math.round(percent)}%</Text>
    </View>
  );
}

const ringStyles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.85)',
  },
});

// ─── Animated Counter ───────────────────────────

function AnimatedValue({ value }: { value: string }) {
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = value.match(/[^0-9.]*$/)?.[0] ?? '';
  const isNumeric = !isNaN(numericPart) && numericPart > 0;

  const animValue = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = React.useState(isNumeric ? '0' : value);

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value);
      return;
    }

    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: numericPart,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const listenerId = animValue.addListener(({ value: v }) => {
      const rounded = numericPart >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
      setDisplay(`${prefix}${rounded}${suffix}`);
    });
    return () => animValue.removeListener(listenerId);
  }, [value]);

  return <Text style={s.value}>{display}</Text>;
}

// ─── MetricCard ─────────────────────────────────

export default function MetricCard({
  label,
  value,
  icon,
  ionicon,
  variant = 'home',
  trend,
  ringPercent,
  badge,
  style,
}: MetricCardProps) {
  const gradient = variantGradients[variant] ?? primaryGradient;
  const ringColor = ringColors[variant] ?? '#a5b4fc';
  const hasRing = ringPercent != null;

  return (
    <View style={[s.card, style]}>
      <LinearGradient
        colors={[...gradient.colors] as [string, string, ...string[]]}
        start={gradient.start}
        end={gradient.end}
        style={s.gradient}
      >
        {/* Ring chart OR icon */}
        {hasRing ? (
          <RingChart percent={ringPercent} color={ringColor} />
        ) : (
          <View style={s.iconWrap}>
            <Ionicons
              name={(ionicon ?? 'analytics-outline') as any}
              size={18}
              color="rgba(255,255,255,0.7)"
            />
          </View>
        )}

        {/* Animated value */}
        <AnimatedValue value={value} />

        <Text style={s.label} numberOfLines={1}>
          {label}
        </Text>

        {/* Optional trend */}
        {trend ? (
          <View style={s.trendRow}>
            <Ionicons
              name={trend.direction === 'up' ? 'arrow-up' : 'arrow-down'}
              size={10}
              color="rgba(255,255,255,0.8)"
            />
            <Text style={s.trendText}>{trend.text}</Text>
          </View>
        ) : null}

        {/* Optional badge */}
        {badge ? (
          <View style={s.badge}>
            <Text style={s.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  gradient: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    minHeight: 100,
    justifyContent: 'flex-end',
  },
  iconWrap: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 6,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
  },
});
