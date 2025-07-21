<script setup lang="ts">
import {
  biArrowLeft,
  biArrowRight,
  biDownload,
  biX,
  biZoomIn,
  biZoomOut,
} from '@quasar/extras/bootstrap-icons';
import { useTheme } from 'src/composables/useTheme';
import FileManagerService from '@/api/FileManagerService';
import { useLang } from 'src/composables/useLang';
import BasePdfViewCore from './BasePdfViewCore.vue';
import SkeletonItem from 'src/components/skeleton/SkeletonItem.vue';
import { onMounted, ref } from 'vue';
import {
  getBlobFromAxiosResponse,
  getFileNameFromAxiosResponse,
  downloadFileFromUrl,
  downloadFromBlob,
  isBlobUrl,
  downloadFromBlobUrl,
} from 'src/utils/fileUtil';
import { useAppConfig } from 'src/composables/useAppConfig';
import { isLinkFromWebApp, isLinkFromWebAppDev } from 'src/utils/appUtil';
const {
  src,
  title,
  showDownload = true,
  fetchToServer = false,
  isBlob = false,
  scrollHeight = '80vh',
  minHeight = '500px',
  minWidth = '100%',
  closeable = true,
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
}>();
const { isDark } = useTheme();
const { fethCdnData, downloadCdnData } = FileManagerService();
const { isProduction } = useAppConfig();
const production = isProduction();
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
  if (fetchToServer) {
    const response = await fethCdnData(src, 'axiosresponse');
    if (response) {
      pdfSrc.value = await getBlobFromAxiosResponse(response);
      contentType.value = response.headers['content-type'];
      fileName.value = getFileNameFromAxiosResponse(response);
      loading.value = false;
    }
  } else {
    pdfSrc.value = src;
    loading.value = false;
  }
};
const downloadPdf = async () => {
  downloadLoading.value = true;
  // if (fetchToServer) {
  //     await downloadCdnData(src, title);
  // } else {
  if (isBlob) {
    try {
      if (isBlobUrl(pdfSrc.value)) {
        downloadFromBlobUrl(pdfSrc.value, title || 'pdf_file.pdf');
      } else {
        downloadFromBlob(src, title || 'pdf_file.pdf');
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      if (isBlobUrl(pdfSrc.value)) {
        downloadFromBlobUrl(pdfSrc.value, title || 'pdf_file.pdf');
      } else {
        if (fetchToServer) {
          if (isLinkFromWebApp(pdfSrc.value)) {
            await downloadCdnData(src, title);
          } else {
            downloadFileFromUrl(pdfSrc.value, title || 'pdf_file.pdf');
          }
        } else {
          downloadFileFromUrl(pdfSrc.value, title || 'pdf_file.pdf');
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  // }
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
<template>
  <q-card flat>
    <q-toolbar>
      <q-toolbar-title v-if="title">
        {{ title }}
      </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        :icon="biZoomOut"
        @click="scale = scale > 0.25 ? scale - 0.25 : scale"
      >
        <q-tooltip> Zoom-</q-tooltip>
      </q-btn>
      <span>{{ scale * 100 + '%' }}</span>
      <q-btn flat round dense :icon="biZoomIn" @click="scale = scale < 2 ? scale + 0.25 : scale">
        <q-tooltip> Zoom+</q-tooltip>
      </q-btn>
      <q-separator vertical class="q-mx-xs" />

      <q-btn flat dense round :icon="biArrowLeft" @click="page = page > 1 ? page - 1 : page" />
      <span>{{ page }} / {{ pages }}</span>
      <q-btn dense flat round :icon="biArrowRight" @click="page = page < pages ? page + 1 : page" />

      <q-space />
      <q-btn
        v-if="showDownload && !loading"
        dense
        flat
        round
        :icon="biDownload"
        @click="downloadPdf"
      >
        <q-tooltip>
          {{ t('base.download') }}
        </q-tooltip>
      </q-btn>
      <q-btn v-if="closeable" round flat dense :icon="biX" @click="onClose">
        <q-tooltip>
          {{ t('base.close') }}
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-separator />
    <div :class="{ 'bg-black': isDark, 'bg-grey-2': !isDark }">
      <div :style="{ minHeight, minWidth }">
        <q-linear-progress
          v-if="downloadLoading"
          query
          color="primary"
          class="q-my-sm"
          style="height: 5px"
        />
        <template v-if="loading">
          <skeleton-item v-if="loading" :height="100" :text-number="3" flat show />
        </template>
        <template v-else-if="pdfSrc">
          <q-scroll-area :style="{ height: scrollHeight }">
            <BasePdfViewCore
              v-model:scale="scale"
              v-model:page="page"
              v-model:pagess="pages"
              :src="pdfSrc"
            />
          </q-scroll-area>
        </template>
        <template v-else> Error</template>
      </div>
    </div>
  </q-card>
</template>
