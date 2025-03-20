<script setup lang="ts" generic="T">
import type { AppColor, LabelValue } from '@/types/common';
import BaseAvatar from './BaseAvatar.vue';

const {
  item,
  iconSize = '20px',
  avatarSize = '24px',
  dense = true,
  seperator = false,
  rounded = false,
} = defineProps<{
  item?: LabelValue<T>;
  iconSize?: string;
  avatarSize?: string;
  dense?: boolean;
  clickable?: boolean | undefined;
  seperator?: boolean;
  rounded?: boolean;
  color?: AppColor;
}>();
const emit = defineEmits<{
  'on-click': [val: T | undefined];
}>();
const onClick = () => {
  if (!item?.children || item.children.length == 0) {
    emit('on-click', item?.value);
  }
};
</script>
<template>
  <q-item
    v-if="item"
    v-bind="$attrs"
    :clickable="clickable"
    :class="{ rounded }"
    :dense
    @click="onClick"
  >
    <slot name="start">
      <q-item-section v-if="item.avatar || item.icon" side>
        <template v-if="item.avatar">
          <base-avatar
            v-if="item.avatar"
            :size="item.avatarSize || avatarSize"
            :fetch-image="!!item.fetch"
            :src="item.avatar"
          />
        </template>
        <template v-else>
          <q-icon :name="item.icon" :size="item.iconSize || iconSize" :color="item.color" />
        </template>
      </q-item-section>
    </slot>
    <q-item-section>
      <slot name="label">
        <q-item-label :class="color ? 'text-' + color : item.color ? 'text-' + item.color : ''">
          {{ item.label }}
        </q-item-label>
        <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
      </slot>
    </q-item-section>
    <slot name="end" />
    <slot />
  </q-item>
  <q-separator v-if="seperator" />
</template>
<style scoped></style>
