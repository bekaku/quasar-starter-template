<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string;
  }>(),
  {
    height: '420px',
  },
);
</script>

<template>
  <q-scroll-area
    :style="{ height }"
    content-active-style="width: 100%;"
    content-style="width: 100%;"
  >
    <slot />
  </q-scroll-area>
</template>
