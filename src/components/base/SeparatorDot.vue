<template>
  <span class="text-muted text-weight-light relative-position" style="top: 1px">
    <q-icon :name="biDot" color="text-muted" :size />
  </span>
</template>
<script setup lang="ts">
import { biDot } from '@quasar/extras/bootstrap-icons';
const { size = '14px' } = defineProps<{
  size?: string;
}>();
</script>
