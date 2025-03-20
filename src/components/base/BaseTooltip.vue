<script setup lang="ts">
import type { AppColor } from '@/types/common';
import { useTheme } from 'src/composables/useTheme';
defineProps<{
  color?: AppColor;
  label?: string;
}>();
const { isDark } = useTheme();
</script>

<template>
  <q-tooltip :class="`bg-${color || (isDark ? 'white text-black' : 'black')}`"
    ><slot>{{ label }}</slot>
  </q-tooltip>
</template>
