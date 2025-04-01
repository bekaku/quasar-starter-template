<script setup lang="ts" generic="T">
import type { LabelValue } from '@/types/common';
import BaseAvatar from './BaseAvatar.vue';

const {
  color = 'primary',
  size = 'md',
  showTitle = false,
  inline = true,
  leftLabel = false,
  editMode = true,
} = defineProps<{
  label?: string;
  color?: string;
  size?: string;
  showTitle?: boolean;
  disable?: boolean;
  items: LabelValue<T>[] | any;
  inline?: boolean;
  leftLabel?: boolean;
  editMode?: boolean;
}>();
const modelValue = defineModel<T[]>();
</script>
<template>
  <div v-if="!label && showTitle" class="text-muted">
    {{ label }}
  </div>
  <q-option-group
    v-model="modelValue"
    :disable="!editMode || disable"
    :options="items"
    type="checkbox"
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
