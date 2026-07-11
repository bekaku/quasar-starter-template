<script setup lang="ts">
import { useRoleBase } from '@/composables/useRoleBase';
import type { RBACProps } from '@/types/props';
import { computed } from 'vue';

const { rbac } = defineProps<{
  rbac?: RBACProps | undefined;
}>();
const { hasPermission } = useRoleBase();
const canShow = computed<boolean>(() => {
  return hasPermission(rbac);
});
</script>
<template>
  <slot v-if="canShow"></slot>
</template>
