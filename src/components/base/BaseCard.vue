<script setup lang="ts">
import BaseTextHeader from './BaseTextHeader.vue';

const {
  flat = false,
  bordered = true,
  separator = false,
  bgTransparent = false,
  margin = true,
} = defineProps<{
  flat?: boolean;
  bordered?: boolean;
  title?: string;
  subTitle?: string;
  icon?: string;
  separator?: boolean;
  bgTransparent?: boolean;
  margin?: boolean;
}>();
</script>
<template>
  <q-card
    v-bind="$attrs"
    :flat
    :bordered="bordered"
    :class="{ 'default-card-shadow': !flat, 'bg-transparent': bgTransparent, 'q-mb-md': margin }"
    class="default-card"
  >
    <slot name="header">
      <BaseTextHeader
        v-if="icon || title"
        class="q-py-md q-px-lg"
        :title="title"
        :sub-title="subTitle"
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
body.body--dark {
  .default-card-shadow {
    box-shadow:
      0 0 $elevation-dark-ambient,
      0 0 $elevation-dark-ambient,
      0 1px 2px 0 $elevation-dark-ambient;
  }
}
</style>
