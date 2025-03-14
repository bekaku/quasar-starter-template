<script setup lang="ts">
const {
  width = '250px',
  contextMenu = false,
  maxWidth = '80vw',
} = defineProps<{
  width?: string;
  maxWidth?: string;
  contextMenu?: boolean;
}>();
</script>
<template>
  <q-popup-proxy :style="{ width, maxWidth }" :context-menu="contextMenu">
    <slot />
  </q-popup-proxy>
</template>
