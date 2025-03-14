<template>
  <div class="row justify-center">
    <q-btn
      @click="$emit('on-next-page')"
      :disable="isInfiniteDisabled"
      :label="label"
      class="text-capitalize q-ma-sm"
      :class="color + ' ' + (fullWidth ? 'full-width' : '')"
      :icon="showIcon ? icon : undefined"
      flat
      :loading="loading"
    />
  </div>
</template>
<script setup lang="ts">
/*

        <base-loadmore
          v-if="!isInfiniteDisabled"
          :loading="commentLoading"
          :frist-loaded="fristLoaded"
          :is-infinite-disabled="isInfiniteDisabled"
          :label="t('viewMorReply')"
          @on-next-page="loadNextPage"
          button
          color="text-muted"
          :show-icon="false"
          class="q-ml-md"
        >
        </base-loadmore>
*/
import type { PropType } from 'vue';
import { biChevronDown } from '@quasar/extras/bootstrap-icons';
defineProps({
  fristLoaded: {
    type: Boolean,
    default: false,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: biChevronDown,
  },
  isInfiniteDisabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: true,
  },
  small: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: undefined,
  },
  fill: {
    type: String as PropType<'default' | 'solid' | 'clear' | 'outline'>,
    default: 'solid',
  },
});
defineEmits(['on-next-page']);
</script>
