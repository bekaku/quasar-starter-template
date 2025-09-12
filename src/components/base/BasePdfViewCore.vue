<script setup lang="ts">
/* @vite-ignore */
// import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { ref } from 'vue';
import { usePDF } from 'boot/pdfVue';
import BaseCard from './BaseCard.vue';
import type { WatermarkOptions } from '@tato30/vue-pdf';
// import '@tato30/vue-pdf/style.css';

const {
  src,
  fitParent = false,
  textLayer = false,
  hideForms = false,
  allPage = true,
} = defineProps<{
  src: any;
  fitParent?: boolean;
  textLayer?: boolean;
  width?: number | undefined;
  height?: number | undefined;
  watermarkText?: string | undefined;
  watermarkViewOptions?: WatermarkOptions;
  hideForms?: boolean;
  allPage?: boolean | undefined;
}>();
const scale = defineModel('scale', { type: Number, default: 1 });
const page = defineModel('page', { type: Number, default: 1 });
const pagess = defineModel('pagess', { type: Number, default: 1 });

const firstLoaded = ref(false);
const { pdf, pages /* info */, download, print } = usePDF(src);
defineEmits(['onPageChange']);

const onLoaded = () => {
  firstLoaded.value = true;
  pagess.value = pages.value;
};
defineExpose({
  download,
  print,
});
</script>
<template>
  <BaseCard flat :bordered="false" :margin="false">
    <q-linear-progress v-if="!firstLoaded" query color="primary" style="height: 5px" />
    <q-no-ssr>
      <div v-if="!allPage" class="row justify-center">
        <pdf-vue
          :pdf="pdf"
          :scale="scale"
          :page="page"
          :fit-parent="fitParent"
          :width="width"
          :height="height"
          :text-layer="textLayer"
          :watermark-text="watermarkText"
          :hide-forms="hideForms"
          @loaded="onLoaded"
        />
      </div>
      <template v-else>
        <div v-for="p in pages" :key="p" class="row justify-center">
          <pdf-vue
            :pdf="pdf"
            :scale="scale"
            :page="p"
            :fit-parent="fitParent"
            :width="width"
            :height="height"
            :text-layer="textLayer"
            :watermark-text="watermarkText"
            :watermark-options="watermarkViewOptions"
            :hide-forms="hideForms"
            @loaded="onLoaded"
          />
        </div>
      </template>
    </q-no-ssr>
  </BaseCard>
</template>
