<script setup lang="ts">
import { ref } from 'vue';
import BaseTextHeader from './BaseTextHeader.vue';

const {
  flat = false,
  bordered = true,
  separator = false,
  bgTransparent = false,
  margin = true,
  square = false,
  hover = false,
} = defineProps<{
  flat?: boolean;
  bordered?: boolean;
  title?: string;
  subtitle?: string;
  icon?: string;
  separator?: boolean;
  bgTransparent?: boolean;
  margin?: boolean;
  square?: boolean;
  hover?: boolean;
}>();
const isHover = ref<boolean>(false);
const onHover = (state: boolean) => {
  if (!hover) {
    return;
  }
  isHover.value = state;
};
</script>
<template>
  <q-card
    v-bind="$attrs"
    :flat
    :bordered="bordered"
    :square
    :class="{
      'default-card': !square,
      'default-card-shadow': !flat,
      'bg-transparent': bgTransparent,
      'q-mb-md': margin,
      'hover-shadow': isHover,
    }"
    @mouseover="onHover(true)"
    @mouseleave="onHover(false)"
  >
    <slot name="header">
      <BaseTextHeader
        v-if="icon || title"
        class="q-px-lg"
        :title="title"
        :subtitle="subtitle"
        :icon
      >
        <template #start>
          <slot name="start" />
        </template>
        <template #end>
          <slot name="end" />
        </template>
      </BaseTextHeader>
      <q-separator v-if="separator" />
    </slot>
    <slot />
    <slot name="footer" />
  </q-card>
</template>
<style scoped lang="scss">
.default-card {
  border-radius: 1rem !important;
}
.default-card-shadow {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.hover-shadow {
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-shadow: var(--color-zinc-200) 0px 7px 29px 0px;
}
body.body--dark {
  .default-card-shadow {
    box-shadow:
      0 0 $elevation-dark-ambient,
      0 0 $elevation-dark-ambient,
      0 1px 2px 0 $elevation-dark-ambient;
  }
  .hover-shadow {
    box-shadow: var(--color-zinc-800) 0px 7px 29px 0px;
  }
}
</style>
