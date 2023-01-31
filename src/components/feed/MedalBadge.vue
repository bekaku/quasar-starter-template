<template>
    <q-btn
      :flat="flat"
      unelevated
      dense
      round
      :color="!$q.dark.isActive ? color : colorDark"
      :size="size"
      :icon="laMedalSolid"
    >
      <q-tooltip>{{ label }}</q-tooltip>
    </q-btn>
  </template>
  
  <script setup lang="ts">
  import { laMedalSolid } from '@quasar/extras/line-awesome';
  defineProps({
    label: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'grey-6',
    },
    colorDark: {
      type: String,
      default: 'grey-5',
    },
    size: {
      type: String,
      default: 'md',
    },
    flat: {
      type: Boolean,
      default: true,
    },
  });
  </script>