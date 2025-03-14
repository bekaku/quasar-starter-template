<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import BaseImageCropper from './BaseImageCropper.vue';
import BaseDialog from './BaseDialog.vue';
const {
  ratio = 1,
  disabled = false,
  initialSrc,
  width = '100%',
  height = '550px',
  clearOnSubmit = false,
  cropWidth = 960, // default 960, cover = 1920
} = defineProps<{
  ratio?: number; // 1,4/3,16/9
  title?: string;
  disabled?: boolean;
  initialSrc?: string;
  width?: string;
  height?: string;
  clearOnSubmit?: boolean;
  cropWidth?: number;
}>();

const emit = defineEmits<{
  'on-close': [];
  'on-submit': [File];
  'on-cropend': [string];
}>();
const modelValue = defineModel<boolean>({ default: false });
const maximized = ref(false);
const timeout = ref<any>(null);
const onSubmit = (f: File) => {
  emit('on-submit', f);
  timeout.value = setTimeout(() => {
    emit('on-close');
  }, 250);
};
const onClose = () => {
  emit('on-close');
};
onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
});
</script>
<template>
  <BaseDialog
    v-model="modelValue"
    :title
    :maximized
    dialog-style="min-width: 80%"
    :auto-close="false"
    can-maximized
    @on-close="onClose"
  >
    <q-card-section class="q-pt-none">
      <q-no-ssr>
        <BaseImageCropper
          :ratio="ratio || 1"
          :disabled
          :crop-width="cropWidth"
          :initial-src="initialSrc"
          :width
          :height
          :clear-on-submit
          @on-close="onClose"
          @on-submit="(file: File) => onSubmit(file)"
          @on-cropend="(imageUrl: string) => $emit('on-cropend', imageUrl)"
        >
          <template #preview>
            <slot name="preview" />
          </template>
        </BaseImageCropper>
      </q-no-ssr>
    </q-card-section>
  </BaseDialog>
</template>
