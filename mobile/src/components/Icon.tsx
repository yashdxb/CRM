import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../theme/tokens';
import { entityGradients, primaryGradient } from '../theme/gradients';

/** Semantic icon map: CRM concept → Ionicon name */
const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'grid-outline',
  leads: 'pulse-outline',
  contacts: 'people-outline',
  deals: 'briefcase-outline',
  activities: 'flash-outline',
  search: 'search-outline',
  add: 'add-circle-outline',
  edit: 'create-outline',
  delete: 'trash-outline',
  email: 'mail-outline',
  phone: 'call-outline',
  lock: 'lock-closed-outline',
  eye: 'eye-outline',
  'eye-off': 'eye-off-outline',
  back: 'chevron-back',
  forward: 'chevron-forward',
  close: 'close-outline',
  check: 'checkmark-circle-outline',
  calendar: 'calendar-outline',
  clock: 'time-outline',
  user: 'person-outline',
  settings: 'settings-outline',
  logout: 'log-out-outline',
  star: 'star-outline',
  chart: 'analytics-outline',
  filter: 'funnel-outline',
  sort: 'swap-vertical-outline',
  refresh: 'refresh-outline',
  location: 'location-outline',
  link: 'link-outline',
  attach: 'attach-outline',
  note: 'document-text-outline',
  target: 'crosshair-sharp' as any,
  company: 'business-outline',
  money: 'cash-outline',
  trophy: 'trophy-outline',
  notification: 'notifications-outline',
  info: 'information-circle-outline',
  warning: 'warning-outline',
  error: 'alert-circle-outline',
};

type GradientVariant = 'primary' | 'leads' | 'contacts' | 'deals' | 'activities' | 'home';

interface IconProps {
  /** Semantic name (e.g. 'leads') or direct Ionicons name (e.g. 'pulse-outline') */
  name: string;
  size?: number;
  color?: string;
  /** Wrap icon in a gradient circle background */
  gradientBubble?: GradientVariant;
  /** Size of the bubble (default: size * 2.2) */
  bubbleSize?: number;
}

export default function Icon({ name, size = 22, color, gradientBubble, bubbleSize }: IconProps) {
  const resolvedName = (iconMap[name] ?? name) as keyof typeof Ionicons.glyphMap;
  const resolvedColor = color ?? (gradientBubble ? '#ffffff' : Colors.textSecondary);

  if (gradientBubble) {
    const bSize = bubbleSize ?? Math.round(size * 2.2);
    const gradient = entityGradients[gradientBubble as keyof typeof entityGradients] ?? primaryGradient;
    return (
      <View style={[s.bubbleWrap, { width: bSize, height: bSize, borderRadius: bSize / 2 }]}>
        <LinearGradient
          colors={[...gradient.colors] as [string, string, ...string[]]}
          start={gradient.start}
          end={gradient.end}
          style={[s.bubbleGradient, { borderRadius: bSize / 2 }]}
        >
          <Ionicons name={resolvedName} size={size} color={resolvedColor} />
        </LinearGradient>
      </View>
    );
  }

  return <Ionicons name={resolvedName} size={size} color={resolvedColor} />;
}

const s = StyleSheet.create({
  bubbleWrap: {
    overflow: 'hidden',
  },
  bubbleGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
