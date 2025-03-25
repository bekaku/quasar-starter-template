<script setup lang="ts">
import type { BadgeProps } from 'src/types/props';
const { floating = true, color, transparent, rounded } = defineProps<BadgeProps>();
</script>
<template>
  <q-badge v-bind="$attrs" :floating :color :rounded :transparent :class="cssClass" :style="cssStyle">
    <slot>
      {{ text }}
    </slot>
  </q-badge>
</template>
