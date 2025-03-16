<script setup lang="ts">
import { useDevice } from 'src/composables/useDevice';
import BasePdfView from './BasePdfView.vue';
const {
  src,
  title,
  showDownload = true,
  fetchToServer = false,
  isBlob = false,
  scrollHeight = '85vh',
  minHeight = '500px',
  minWidth = '100%',
  closeable = true,
  maximized = false,
} = defineProps<{
  title?: string | undefined;
  src: string;
  fetchToServer?: boolean;
  showDownload?: boolean;
  isBlob?: boolean;
  scrollHeight?: string;
  minHeight?: string;
  minWidth?: string;
  closeable?: boolean;
  maximized?: boolean;
}>();
const emit = defineEmits<{
  'on-close': [];
  'on-before-hide': [];
  'on-delete': [index: number];
}>();
const modelValue = defineModel<boolean>({ default: false });
const { isSmallScreen } = useDevice();
const onClose = () => {
  modelValue.value = false;
  emit('on-close');
};
</script>
<template>
  <q-dialog
    :model-value="modelValue"
    :maximized="maximized || isSmallScreen"
    full-width
    full-height
    @hide="onClose"
    @before-hide="$emit('on-before-hide')"
  >
    <base-pdf-view
      :src
      :closeable
      :title
      :fetch-to-server
      :show-download
      :is-blob
      :scroll-height
      :min-height
      :min-width
      @on-close="onClose"
    />
  </q-dialog>
</template>
<style lang="scss" scoped></style>
