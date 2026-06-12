<script setup lang="ts">
import { useRbac } from '@/composables/useRbac';
import type { RBACProps } from '@/types/props';
import { computed } from 'vue';

const { rbac } = defineProps<{
  rbac?: RBACProps | undefined;
}>();
const { hasPermission } = useRbac();
const canShow = computed<boolean>(() => {
  return hasPermission(rbac);
});
</script>
<template>
  <slot v-if="canShow"></slot>
</template>
