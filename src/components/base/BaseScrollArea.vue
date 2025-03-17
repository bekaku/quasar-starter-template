<script setup lang="ts">
const { height = '420px', maxWidth = '100vw' } = defineProps<{
  height?: string;
  maxWidth?: string;
}>();
</script>

<template>
  <q-scroll-area
    v-bind="$attrs"
    :style="{ height, maxWidth }"
    content-active-style="width: 100%;"
    content-style="width: 100%;"
  >
    <slot />
  </q-scroll-area>
</template>
