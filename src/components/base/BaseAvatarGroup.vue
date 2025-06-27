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
        :ratio="ratio"
        :style="{ zIndex: (limit || 5) + index }"
      >
        <slot name="extra" v-bind="{ index }" />
      </base-image>
      <slot name="moreNumber">
        <div v-if="items.length > limit" class="avatar extra" :style="{ zIndex: items.length + 5 }">
          +{{ items.length - limit }}
        </div>
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

const {
  boderColor = 'white',
  ratio = 1,
  size = '40px',
  square = false,
  rounded = false,
  fetch = false,
  limit = 5,
  overrapSize = '-10px',
} = defineProps<{
  items: string[];
  spinnerColor?: string;
  color?: string;
  imgBg?: string;
  ratio?: number;
  size?: string;
  square?: boolean;
  rounded?: boolean;
  fetch?: boolean;
  limit?: number;
  boderColor?: string;
  overrapSize?: string;
}>();
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
  &:hover {
    transform: translateY(-3px);
    z-index: 999 !important;
  }
}

.avatar.extra {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  background-color: var(--color-zinc-200);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: v-bind(overrapSize);
}

body.body--dark {
  .avatar.extra {
    background-color: var(--color-zinc-600);
    color: white;
  }
}
</style>
