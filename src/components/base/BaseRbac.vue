<script setup lang="ts">
import { useRbac } from 'src/composables/useRbac';
import type { RBACProps } from 'src/types/props';
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
