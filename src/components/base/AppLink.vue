<template>
  <q-btn
    class="text-capitalize app-text-link btn--no-hover"
    :ripple="false"
    :class="!$q.dark.isActive ? color : colorDark"
    dense
    flat
    :label="label"
    :to="to"
    :href="href ? href : undefined"
    :target="external ? '_blank' : undefined"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IHrefTarget } from '@/types/common';
defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'text-muted',
  },
  colorDark: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<IHrefTarget>,
    default: '_blank',
  },
});
</script>
