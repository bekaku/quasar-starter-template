<script setup lang="ts">
import type { IHrefTarget } from '@/types/common';
const { external = false } = defineProps<{
  label?: string;
  external?: boolean;
  href?: string;
  target?: IHrefTarget;
  to: string;
  color?: string;
  colorDark?: string;
}>();
</script>
<template>
  <a
    v-if="external"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    class="app-text-link"
    :class="!color ? 'q-text-black' : 'text-' + color"
  >
  <slot>
      {{ label }}
    </slot>
  </a>
  <router-link
    v-else
    :to="to"
    :target="external ? '_blank' : undefined"
    class="app-text-link"
    :class="!color ? 'q-text-black' : 'text-' + color"
  >
    <slot>
      {{ label }}
    </slot>
  </router-link>
</template>
