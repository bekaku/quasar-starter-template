<script setup lang="ts" generic="T">
import type { LabelValue } from '@/types/common';
import BaseAvatar from './BaseAvatar.vue';

const {
  items,
  inline = true,
  size = 'md',
  leftLabel = false,
  editMode = true,
} = defineProps<{
  items: LabelValue<T>[] | any;
  disable?: boolean;
  inline?: boolean;
  size?: string;
  color?: string;
  leftLabel?: boolean;
  editMode?: boolean;
}>();

const modelValue = defineModel<T>();
</script>
<template>
  <q-option-group
    v-model="modelValue"
    :disable="!editMode || disable"
    :options="items"
    type="radio"
    :color
    :size
    :inline
    :left-label="leftLabel"
  >
    <template #label="opt">
      <div class="row items-center q-gutter-x-sm">
        <base-avatar v-if="opt.avatar" v-bind="{ ...opt.avatar }" />
        <q-icon v-else-if="opt.icon" :name="opt.icon" />
        <span>{{ opt.label }}</span>
      </div>
    </template>
  </q-option-group>
</template>
