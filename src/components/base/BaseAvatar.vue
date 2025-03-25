<script setup lang="ts">
import BaseImage from '@/components/base/BaseImage.vue';
import type { AvatarProps } from 'src/types/props';
import BaseBadge from './BaseBadge.vue';
const {
  spinnerColor = 'white',
  ratio = 1,
  size = '32px',
  alt = 'avatar',
  square = false,
  rounded = false,
  fetch = false,
  bordered = false,
  borderedColor = '#fff',
  borderedWidth = '2px',
} = defineProps<AvatarProps>();
</script>
<template>
  <q-avatar :size="size" :square="square" :rounded="rounded" v-bind="$attrs" :color="color">
    <slot>
      <template v-if="!fetch">
        <q-img
          :src="src"
          :class="{
            bordered,
            'avatar-rounded': !square && rounded,
            'avatar-round': !square && !rounded,
          }"
          :alt="alt"
          :spinner-color="spinnerColor"
          :ratio
          no-native-menu
        />
      </template>
      <template v-else>
        <base-image
          v-if="src"
          :src="src"
          :class="{
            bordered,
            'avatar-rounded': !square && rounded,
            'avatar-round': !square && !rounded,
          }"
          :ratio
          :fetch="fetch"
          :alt="alt"
        />
      </template>
      <slot name="extra" />
      <slot name="badge">
        <BaseBadge v-if="badge" v-bind="badge" />
      </slot>
    </slot>
  </q-avatar>
</template>
<style lang="scss" scoped>
.bordered {
  border: v-bind(borderedWidth) solid v-bind(borderedColor);
  width: v-bind(size);
  height: v-bind(size);
}

.avatar-holder {
  display: flex;
}

.avatar {
  width: v-bind(size);
  height: v-bind(size);
}

.avatar-round {
  border-radius: 50%;
}

.avatar-rounded {
  border-radius: 10px;
}
</style>
