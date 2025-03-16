<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- eslint-disable ts/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<script setup lang="ts">
import { biFileImage, biCheck, biArrowClockwise, biArrowCounterclockwise, biArrowLeftRight, biArrowsCollapse, biZoomIn, biZoomOut } from '@quasar/extras/bootstrap-icons';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { blobToFile } from 'src/utils/fileUtil';
import { onUnmounted, ref, useTemplateRef, watchEffect } from 'vue';
import BaseFilePicker from './BaseFilePicker.vue';
import BaseScrollArea from './BaseScrollArea.vue';
import BaseButton from './BaseButton.vue';
const {
  ratio = 1,
  disabled = false,
  initialSrc,
  width = '100%',
  height = '550px',
  clearOnSubmit = false,
  cropWidth = 960
} = defineProps<{
  ratio?: number, // 1,4/3,16/9
  disabled?: boolean
  initialSrc?: string | undefined
  width?: string
  height?: string
  clearOnSubmit?: boolean
  cropWidth?: number
}>()

const emit = defineEmits<{
  'on-close': []
  'on-submit': [File]
  'on-cropend': [string]
}>()
const { t } = useLang();
const { appToast } = useBase();
const originalimagFile = ref<any>(null);
const maximizedToggle = ref(false);
const loading = ref(false);
const priviewImage = ref<string | undefined>();
const canvasRef = useTemplateRef<any>('canvasRef')
const canvasImg = useTemplateRef<any>('canvasImg')
const selectionRef = useTemplateRef<any>('selectionRef')
// const viewerRef = useTemplateRef<any>('viewerRef')
const cropTimeout = ref<any>(null)
const src = ref<string | undefined>(initialSrc)
watchEffect(() => {
  if (initialSrc && canvasImg.value) {
    console.log('watchEffetch initialSrc :', initialSrc);
    // canvasImg.value.src = src;
    src.value = initialSrc
    onCropend();
  }
})

const onClose = () => {
  clearCropper();
  originalimagFile.value = null;
  emit('on-close');
  maximizedToggle.value = false;
};

const onFileAdded = (files: File[]) => {
  if (files && files.length > 0) {
    originalimagFile.value = files[0];
    if (/^image\/\w+/.test(originalimagFile.value.type)) {
      // canvasImg.value.src = URL.createObjectURL(originalimagFile.value);
      src.value = URL.createObjectURL(originalimagFile.value);
      onCropend();
    } else {
      appToast('Please choose an image file.', { type: 'negative' });
    }
  }
}
const onRejected = (rejectedEntries: any) => {
  appToast(t('error.filesValidationFmt', { total: rejectedEntries.length }), {
    type: 'negative',
  });
};


const onSelectionChange = (event: any) => {
  // console.log('onSelectionChange', event);
}
const onCanvaAction = (event: any) => {
  // console.log('onCanvaCAction', event);
}
const onCanvaActionstart = (event: any) => {
  // console.log('onCanvaActionstart', event);
}
const onCanvaActionmove = (event: any) => {
  // console.log('onCanvaActionmove', event);
}
const onCanvaActionend = (event: any) => {
  onCropend();
}
const getSelectionCanvas = async (): Promise<any> => {
  if (!selectionRef.value) {
    return new Promise((resolve) => {
      resolve(null);
    })
  }
  const selectionCanvas = await selectionRef.value.$toCanvas({
    beforeDraw: (context: any, canvas: any) => {
      context.imageSmoothingQuality = 'high';
    },
    width: cropWidth,
  });
  return new Promise((resolve) => {
    resolve(selectionCanvas);
  })
}
const onCropend = async () => {
  cropTimeout.value = setTimeout(async () => {
    const selectionCanvas = await getSelectionCanvas();
    if (selectionCanvas) {
      priviewImage.value = selectionCanvas.toDataURL('image/jpeg')
      if (priviewImage.value) {
        emit('on-cropend', priviewImage.value)
      }
    }
    // viewerRef.value.replaceChildren(selectionCanvas)
    // console.log('onCropend', selectionCanvas.toDataURL())
  }, 500)
}
const onSubmit = async () => {
  const selectionCanvas = await getSelectionCanvas();
  if (selectionCanvas) {
    loading.value = true;
    selectionCanvas.toBlob(async (blob: any) => {
      const f = await blobToFile(blob, originalimagFile.value.name);
      loading.value = false;
      emit('on-submit', f);
      if (clearOnSubmit) {
        onClose();
      }
    }, 'image/jpeg');
  }
};
const clearCropper = () => {
  if (selectionRef.value) {
    selectionRef.value.$clear();
  }
  if (cropTimeout.value) {
    clearTimeout(cropTimeout.value)
    cropTimeout.value = null;
  }
};

// Clean up on unmount
onUnmounted(() => {
  clearCropper();
});
</script>
<template>
  <div class="row">
    <div class="col-12 col-md-8 q-pt-md q-pl-sm">
      <cropper-canvas id="cropperSelection" ref="canvasRef"
        :style="{ display: 'block', maxWidth: width, height }" :disabled background @action="onCanvaAction"
        @actionstart="onCanvaActionstart" @actionmove="onCanvaActionmove" @actionend="onCanvaActionend">
        <template v-if="src">
          <cropper-image ref="canvasImg" :src="src" alt="Picture" rotatable scalable skewable translatable />
          <cropper-shade hidden />
          <cropper-handle action="select" plain />
          <cropper-selection ref="selectionRef" initial-coverage="0.5" initial-aspect-ratio="1.5" movable resizable
            :aspect-ratio="ratio" @change="onSelectionChange">
            <cropper-grid role="grid" theme-color="#2e86de" covered />
            <cropper-crosshair centered />
            <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)" />
            <cropper-handle action="n-resize" />
            <cropper-handle action="e-resize" />
            <cropper-handle action="s-resize" />
            <cropper-handle action="w-resize" />
            <cropper-handle action="ne-resize" />
            <cropper-handle action="nw-resize" />
            <cropper-handle action="se-resize" />
            <cropper-handle action="sw-resize" />
          </cropper-selection>
        </template>
      </cropper-canvas>
      <div class="q-pa-sm row justify-around">
        <template v-if="canvasImg">
          <BaseButton round flat :icon="biZoomIn" @click="canvasImg.$zoom(0.1)" />
          <BaseButton round flat :icon="biZoomOut" @click="canvasImg.$zoom(-0.1)" />
          <BaseButton round flat :icon="biArrowCounterclockwise" @click="canvasImg.$rotate('-45deg')" />
          <BaseButton round flat :icon="biArrowClockwise" @click="canvasImg.$rotate('45deg')" />
          <BaseButton round flat :icon="biArrowLeftRight" @click="canvasImg.$scale(-1, 1)" />
          <BaseButton round flat :icon="biArrowsCollapse" @click="canvasImg.$scale(1, -1)" />
        </template>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="q-pa-sm">
        <BaseFilePicker accept=".jpg,.png" :multiple="false" :label="t('base.chooseFile')" :show-preview="false"
          @on-file-add="onFileAdded" />
        <div class="q-mt-md">
          <slot name="preview">
            <BaseScrollArea height="470px">
              <div v-if="priviewImage" class="cropper-viewers row q-gutter-sm">

                <q-img :src="priviewImage" style="width: 100%; max-height: 320px;" :ratio="ratio" />
                <q-img :src="priviewImage" style="width: 160px;max-height: 160px;" :ratio="ratio" />
                <q-img :src="priviewImage" style="width: 80px;max-height: 80px;" :ratio="ratio" />
                <q-img :src="priviewImage" style="width: 40px;max-height: 40px;" :ratio="ratio" />
                <q-img :src="priviewImage" style="width: 20px;max-height: 20px;" :ratio="ratio" />
                <!-- <cropper-viewer selection="#cropperSelection" style="width: 320px;" />
                                <cropper-viewer selection="#cropperSelection" style="width: 160px;" />
                                <cropper-viewer selection="#cropperSelection" style="width: 80px;" />
                                <cropper-viewer selection="#cropperSelection" style="width: 40px;" /> -->
              </div>
            </BaseScrollArea>
          </slot>
        </div>
        <div class="q-pa-md">
          <BaseButton full :icon="biCheck" :label="t('base.okay')" :loading="loading" @click="onSubmit" />
        </div>
      </div>
    </div>
  </div>
</template>
