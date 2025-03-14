<template>
  <q-card flat>
    <div class="row justify-center">
      <q-linear-progress v-if="!firstLoaded" query color="primary" class="q-mt-sm" />
      <q-no-ssr>
        <pdf-vue
          :pdf="pdf"
          :scale="scale"
          :page="page"
          @loaded="onLoaded"
          :fit-parent="fitParent"
          :width="width"
          :height="height"
          :text-layer="textLayer"
          :watermark-text="watermarkText"
          :hide-forms="hideForms"
        />
        <!--      <VuePDF-->
        <!--        :pdf="pdf"-->
        <!--        :scale="scale"-->
        <!--        :page="page"-->
        <!--        @loaded="onLoaded"-->
        <!--        :fit-parent="fitParent"-->
        <!--        :width="width"-->
        <!--        :height="height"-->
        <!--        :text-layer="textLayer"-->
        <!--        :watermark-text="watermarkText"-->
        <!--        :hide-forms="hideForms"-->
        <!--      />-->
      </q-no-ssr>
    </div>
  </q-card>
</template>

<script setup lang="ts">
/* @vite-ignore */
// import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { ref } from 'vue';
import { usePDF } from 'boot/pdfVue';
// import '@tato30/vue-pdf/style.css';

const props = withDefaults(
  defineProps<{
    src: any;
    fitParent?: boolean;
    textLayer?: boolean;
    width?: number | undefined;
    height?: number | undefined;
    watermarkText?: string | undefined;
    hideForms?: boolean;
  }>(),
  {
    fitParent: false,
    textLayer: false,
    hideForms: false,
  },
);
// const scale = ref(1);
// const page = ref(1);
const scale = defineModel('scale', { type: Number, default: 1 });
const page = defineModel('page', { type: Number, default: 1 });
const pagess = defineModel('pagess', { type: Number, default: 1 });
const loading = defineModel('loading', { type: Boolean, default: true });

const firstLoaded = ref(false);
// const pages = defineModel('pages', { type: Number, default: 1 });
const { pdf, pages /* info */ } = usePDF(props.src);
const emit = defineEmits(['onPageChange']);
// watchEffect(() => {
//   console.log('watchEffect > test', test.value);
//   console.log('watchEffect > test2', test2.value);

//   if(test.value!=undefined){}

// });

const onLoaded = () => {
  firstLoaded.value = true;
  pagess.value = pages.value;
  // emit('onPageChange', pages.value);
};
</script>
