<template>
  <q-menu v-bind="$attrs" :cover anchor="top middle">
    <q-list :style="{ minWidth: width + 'px' }">
      <base-menu-item
        v-for="(item, index) in items"
        :key="`app-menu-${item.value}-${index}`"
        :item="item"
        @click="onClick(item.value)"
        v-close-popup
      />
    </q-list>
  </q-menu>
</template>

<script setup lang="ts" generic="T">
import BaseMenuItem from '@/components/base/BaseMenuItem.vue';
import type { LabelValue } from '@/types/common';
import { biThreeDotsVertical } from '@quasar/extras/bootstrap-icons';

withDefaults(
  defineProps<{
    items: LabelValue<T>[];
    icon?: string;
    title?: string;
    width?: number;
    cover?: boolean;
  }>(),
  {
    icon: biThreeDotsVertical,
    width: 100,
    cover: true,
  },
);
const emit = defineEmits(['on-click']);
const onClick = (value: T) => {
  emit('on-click', value);
};
</script>

<style scoped></style>
