<template>
  <div class="avatar-group" v-bind="$attrs">
    <slot>
      <base-image
        v-for="(item, index) in items.slice(0, limit)"
        :key="`${index}-${item}`"
        :square="square"
        :rounded="rounded"
        class="avatar"
        :src="item"
        :fetch="fetch || false"
        :ratio="1"
        :style="{ zIndex: limit ? limit - index : '0' }"
      >
        <slot name="extra" v-bind="{ index }" />
      </base-image>
      <slot name="moreNumber">
        <div v-if="items.length > 5" class="avatar extra">+{{ items.length - 5 }}</div>
      </slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
/*
    <base-avatar-group
      v-if="finalAvatarItems.length > 0"
      :items="finalAvatarItems"
      :size="avatarSize"
    >
    </base-avatar-group>
 */
import BaseImage from '@/components/base/BaseImage.vue';

withDefaults(
  defineProps<{
    items: string[];
    spinnerColor?: string;
    color?: string;
    imgBg?: string;
    ratio?: number;
    height?: number;
    size?: string;
    square?: boolean;
    rounded?: boolean;
    fetch?: boolean;
    limit?: number;
    boderColor?: string;
    overrapSize?: string;
  }>(),
  {
    boderColor: 'white',
    spinnerColor: 'white',
    imgBg: 'bg-grey-8',
    ratio: 4 / 3,
    size: '40px',
    square: false,
    rounded: false,
    fetch: false,
    bordered: false,
    borderedColor: '#fff',
    height: 0,
    limit: 5,
    overrapSize: '-10px',
  },
);
</script>
<style lang="scss" scoped>
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  border: 2px solid v-bind(boderColor);
  margin-left: v-bind(overrapSize);
  object-fit: cover;
}

.avatar.extra {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  background-color: var(--gray-200);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: v-bind(overrapSize);
}

body.body--dark {
  .avatar.extra {
    background-color: var(--color-dark-500);
    color: white;
  }
}
</style>
