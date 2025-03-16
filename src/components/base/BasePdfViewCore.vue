<script setup lang="ts">
/* @vite-ignore */
// import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { ref } from 'vue';
import { usePDF } from 'boot/pdfVue';
// import '@tato30/vue-pdf/style.css';

const {
  src,
  fitParent = false,
  textLayer = false,
  hideForms = false,
} = defineProps<{
  src: any;
  fitParent?: boolean;
  textLayer?: boolean;
  width?: number | undefined;
  height?: number | undefined;
  watermarkText?: string | undefined;
  hideForms?: boolean;
}>();
const scale = defineModel('scale', { type: Number, default: 1 });
const page = defineModel('page', { type: Number, default: 1 });
const pagess = defineModel('pagess', { type: Number, default: 1 });
const loading = defineModel('loading', { type: Boolean, default: true });

const firstLoaded = ref(false);
const { pdf, pages /* info */ } = usePDF(src);
const emit = defineEmits(['onPageChange']);

const onLoaded = () => {
  firstLoaded.value = true;
  pagess.value = pages.value;
};
</script>
<template>
  <q-no-ssr>
    <div class="row justify-center">
      <q-linear-progress v-if="!firstLoaded" query color="primary" style="height: 5px" />
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
  </q-no-ssr>
</template>
