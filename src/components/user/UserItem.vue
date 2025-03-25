<script setup lang="ts">
import type { AvatarProps } from 'src/types/props';
import BaseAvatar from '../base/BaseAvatar.vue';

const { dense = false } = defineProps<{
  avatar?: AvatarProps;
  avatarTop?: boolean;
  clickable?: boolean;
  description?: string | undefined;
  dense?: boolean;
  name?: string | undefined;
  to?: string;
  sideTop?: boolean;
}>();
</script>
<template>
  <q-item v-bind="$attrs" :clickable :dense :to>
    <q-item-section avatar :top="avatarTop" :class="{ 'no-avatar': avatar == undefined }">
      <slot name="avatar">
        <BaseAvatar v-if="avatar" v-bind="avatar" />
      </slot>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-medium">
        <slot name="name">
          {{ name }}
        </slot>
      </q-item-label>
      <q-item-label caption>
        <slot name="description">
          {{ description }}
        </slot>
      </q-item-label>
      <slot name="bottom" />
    </q-item-section>
    <q-item-section side :top="sideTop">
      <slot name="end" />
    </q-item-section>
  </q-item>
</template>
<style lang="css" scoped>
.no-avatar {
  padding: 0;
  min-width: 0;
}
</style>
