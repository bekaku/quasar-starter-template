<template>
  <base-dialog
    v-model="show"
    :title="title ? title : 'Pdf view'"
    @on-close="onClose"
    @on-hide="onClose"
    :persistent="true"
    transition-show="fade"
    transition-hide="fade"
    :icon="biFilePdf"
    full-width
    full-height
  >
    <template #toolbarAction>
      <q-btn flat round :icon="biZoomOut" @click="scale = scale > 0.25 ? scale - 0.25 : scale">
        <q-tooltip> Zoom-</q-tooltip>
      </q-btn>
      <span>{{ scale * 100 + '%' }}</span>
      <q-btn flat round :icon="biZoomIn" @click="scale = scale < 2 ? scale + 0.25 : scale">
        <q-tooltip> Zoom+</q-tooltip>
      </q-btn>
      <q-separator vertical />

      <q-btn @click="page = page > 1 ? page - 1 : page" flat round :icon="biArrowLeft" />
      <span>{{ page }} / {{ pages }}</span>
      <q-btn @click="page = page < pages ? page + 1 : page" flat round :icon="biArrowRight" />

      <q-space />
      <q-btn v-if="showDownload && !loading" @click="downloadPdf" flat round :icon="biFloppy">
        <q-tooltip>
          {{ t('base.download') }}
        </q-tooltip>
      </q-btn>
      <q-btn round @click="onClose" flat :icon="biX">
        <q-tooltip>
          {{ t('base.close') }}
        </q-tooltip>
      </q-btn>
    </template>
    <q-separator />
    <q-card style="min-height: 500px; min-width: 100%">
      <q-card-section>
        <q-linear-progress v-if="downloadLoading" query color="primary" class="q-my-sm" />
        <template v-if="loading">
          <skeleton-item v-if="loading" :text-number="3" flat show />
        </template>
        <template v-else-if="pdfSrc">
          <q-scroll-area style="height: 80vh">
            <q-no-ssr>
              <PdfViewBase
                :src="pdfSrc"
                v-model:scale="scale"
                v-model:page="page"
                v-model:pagess="pages"
              />
            </q-no-ssr>
          </q-scroll-area>
        </template>
        <template v-else> Error</template>
      </q-card-section>
    </q-card>
  </base-dialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/base/BaseDialog.vue';
import {
  biArrowLeft,
  biArrowRight,
  biFilePdf,
  biFloppy,
  biX,
  biZoomIn,
  biZoomOut,
} from '@quasar/extras/bootstrap-icons';
import FileManagerService from '@/api/FileManagerService';
import PdfViewBase from '@/components/base/PdfViewBase.vue';
import { onMounted, ref } from 'vue';
import {
  downloadFileFromUrl,
  downloadFromBlob,
  getBlobFromAxiosResponse,
  getFileNameFromAxiosResponse,
} from '@/utils/fileUtils';
import { useLang } from '@/composables/useLang';
import SkeletonItem from '@/components/skeleton/SkeletonCard.vue';

const props = withDefaults(
  defineProps<{
    title?: string | undefined;
    src: string;
    fetchToServer?: boolean;
    showDownload?: boolean;
    isBlob?: boolean;
  }>(),
  {
    showDownload: true,
    fetchToServer: false,
    isBlob: false,
  },
);
const { fethCdnData, downloadCdnData } = FileManagerService();
const emit = defineEmits(['on-close']);
const { t } = useLang();
const show = defineModel('show', { type: Boolean, default: false });
const pdfSrc = ref<any>();
const loading = ref(true);
const downloadLoading = ref(false);
const fileName = ref();
const contentType = ref();
const scale = ref(1);
const page = ref(1);
const pages = ref(0);
onMounted(async () => {
  onLoad();
});
const onLoad = async () => {
  loading.value = true;
  if (props.fetchToServer) {
    const response = await fethCdnData(props.src, 'axiosresponse');
    if (response) {
      pdfSrc.value = await getBlobFromAxiosResponse(response);
      contentType.value = response.headers['content-type'];
      fileName.value = getFileNameFromAxiosResponse(response);
      loading.value = false;
    }
  } else {
    pdfSrc.value = props.src;
    loading.value = false;
  }
};
const downloadPdf = async () => {
  downloadLoading.value = true;
  if (props.fetchToServer) {
    await downloadCdnData(props.src, props.title);
  } else {
    if (props.isBlob) {
      try {
        downloadFromBlob(props.src, props.title || 'pdf_file.pdf');
      } catch (err) {
        console.error(err);
      }
    } else {
      downloadFileFromUrl(props.src, props.title || 'pdf_file.pdf');
    }
  }
  downloadLoading.value = false;
};
const onPageChange = (p: number) => {
  pages.value = p;
};
const onClose = () => {
  emit('on-close');
  show.value = false;
};
</script>
