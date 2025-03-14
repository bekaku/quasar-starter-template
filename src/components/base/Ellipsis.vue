<script setup lang="ts">
import { ref } from 'vue';

const { lines = 0, clickable = false } = defineProps<{
  lines?: number;
  maxWidth?: string;
  clickable?: boolean;
}>();
const showLineClamp = ref<boolean>(true);
const onClick = (event: any) => {
  if (clickable) {
    showLineClamp.value = !showLineClamp.value;
  }
  event.preventDefault();
};
</script>

<template>
  <div
    v-bind="$attrs"
    :class="{ 'ellipsis-text': lines > 0 && showLineClamp, 'cursor-pointer': clickable }"
    class=""
    :style="maxWidth ? { maxWidth } : { maxWidth: '100%' }"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ellipsis-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: v-bind(lines);
  /* number of lines to show */
  line-clamp: v-bind(lines);
  -webkit-box-orient: vertical;
  -moz-line-clamp: v-bind(lines);
  -o-line-clamp: v-bind(lines);
  -moz-box-orient: vertical;
}
</style>
