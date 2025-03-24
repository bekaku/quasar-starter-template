<script setup lang="ts">
import { useTemplateRef } from 'vue';

const {
  debounce = 250,
  offset = 500,
  reverse = false,
  disable = false,
} = defineProps<{
  scrollTarget?: string; // #scroll-target-id
  reverse?: boolean;
  debounce?: number;
  offset?: number;
  disable?: boolean;
}>();
const emit = defineEmits<{
  'on-infinite': [index: number, done: any];
}>();
const baseInfiniteScrollRef = useTemplateRef<any>('baseInfiniteScrollRef');
const onInfinite = (index: number, done: any) => {
  emit('on-infinite', index, done);
};
const stop = () => {
  if (baseInfiniteScrollRef.value) {
    baseInfiniteScrollRef.value.stop();
  }
};
const resume = () => {
  if (baseInfiniteScrollRef.value) {
    baseInfiniteScrollRef.value.resume();
  }
};
defineExpose({
  stop,
  resume,
});
</script>
<template>
  <div v-bind="$attrs">
    <slot />
    <q-infinite-scroll
      ref="baseInfiniteScrollRef"
      :reverse
      :offset
      :debounce
      :disable
      :scroll-target="scrollTarget"
      @load="onInfinite"
    >
      <template #loading>
        <div class="row justify-center">
          <q-spinner-dots color="primary" size="2em" class="self-center" />
        </div>
      </template>
    </q-infinite-scroll>
    <slot name="bottom" />
  </div>
</template>
<style scoped></style>
