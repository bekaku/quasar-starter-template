<template>
  <div
    class="wee-notification"
    :class="type"
    v-show="show"
    :style="{
      padding: dense ? '5px' : '1rem 2.25rem 1rem 1.25rem',
      borderRadius: radius ? '5px' : '',
    }"
  >
    <div>
      <strong>
        <q-icon v-if="icon" :name="icon" style="margin-right: 5px" size="md"
      /></strong>
      <span v-if="title" class="q-mx-sm text-weight-bold">{{ title }}</span>
      {{ message ? message : '' }}
      <div>
        <slot name="extra"></slot>
      </div>
    </div>
    <q-btn v-if="closeable" round flat @click="show = !show" icon="mdi-close" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { IAlert } from '@/types/common';

defineProps({
  message: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    default: null,
  },
  type: {
    type: String as PropType<IAlert>,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-lightbulb-on-outline',
  },
  dense: {
    type: Boolean,
    default: false,
  },
  radius: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: false,
  },
});
const show = ref(true);
</script>
