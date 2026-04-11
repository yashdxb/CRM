import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, DarkColors, Spacing, Radius, Typography } from '../theme/tokens';
import type { DashboardTask } from '../models';

interface TaskListProps {
  tasks: DashboardTask[];
  dark?: boolean;
}

export default function TaskList({ tasks: initial, dark }: TaskListProps) {
  const [tasks, setTasks] = useState(initial);

  const toggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <View style={s.list}>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} onToggle={toggle} dark={dark} />
      ))}
    </View>
  );
}

function TaskRow({
  task,
  onToggle,
  dark,
}: {
  task: DashboardTask;
  onToggle: (id: string) => void;
  dark?: boolean;
}) {
  return (
    <View style={[s.row, dark && s.rowDark]}>
      <Pressable onPress={() => onToggle(task.id)} style={s.checkbox}>
        {task.completed ? (
          <Ionicons name="checkmark-circle" size={22} color={Colors.green} />
        ) : (
          <View style={[s.unchecked, dark && s.uncheckedDark]} />
        )}
      </Pressable>
      <View style={s.content}>
        <Text
          style={[s.title, dark && s.titleDarkTheme, task.completed && s.titleDone]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <View style={s.meta}>
          <Text style={[s.category, dark && s.categoryDark]}>{task.category}</Text>
          {task.badge ? (
            <View
              style={[
                s.badge,
                { backgroundColor: task.badgeColor ?? Colors.primary },
              ]}
            >
              <Text style={s.badgeText}>{task.badge}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <Text style={[s.time, dark && s.timeDark]}>{task.time}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  list: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.10)',
  },
  checkbox: {
    width: 28,
    alignItems: 'center',
  },
  unchecked: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#94a3b8',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: Typography.body.fontSize,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  category: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  time: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textMuted,
  },
  rowDark: {
    borderBottomColor: DarkColors.separator,
  },
  uncheckedDark: {
    borderColor: 'rgba(148, 163, 184, 0.25)',
  },
  titleDarkTheme: {
    color: DarkColors.textPrimary,
  },
  categoryDark: {
    color: DarkColors.textSecondary,
  },
  timeDark: {
    color: DarkColors.textMuted,
  },
});
