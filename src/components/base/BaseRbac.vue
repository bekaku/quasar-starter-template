<script setup lang="ts">
import { useRBAC } from 'src/composables/useRBAC';
import type { RBACProps } from 'src/types/props';
import { computed } from 'vue';

const { rbac } = defineProps<{
  rbac?: RBACProps | undefined;
}>();
const { hasPermission } = useRBAC();
const canShow = computed<boolean>(() => {
  return hasPermission(rbac);
});
</script>
<template>
  <slot v-if="canShow"></slot>
</template>
