<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService';
import {
  biArrowLeft,
  biArrowRight,
  biDownload,
  biPrinter,
  biX,
  biZoomIn,
  biZoomOut,
} from '@quasar/extras/bootstrap-icons';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import SkeletonItem from 'src/components/skeleton/SkeletonItem.vue';
import { useLang } from 'src/composables/useLang';
import { useTheme } from 'src/composables/useTheme';
import type { PdfWatermarkOptions } from 'src/types/common';
import { isLinkFromWebCdn } from 'src/utils/appUtil';
import { getBlobFromAxiosResponse, getFileNameFromAxiosResponse } from 'src/utils/fileUtil';
import { onMounted, ref, useTemplateRef } from 'vue';
import BaseCheckbox from './BaseCheckbox.vue';
import BasePdfViewCore from './BasePdfViewCore.vue';
import BaseTooltip from './BaseTooltip.vue';
import { useBase } from 'src/composables/useBase';
const {
  src,
  title,
  showDownload = true,
  fetchToServer = false,
  scrollHeight = '80vh',
  minHeight = '500px',
  minWidth = '100%',
  closeable = true,
  allPage = true,
  watermarkOptions,
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
  allPage?: boolean | undefined;
  watermarkOptions?: PdfWatermarkOptions | undefined;
}>();
const { isDark } = useTheme();
const { appLoading } = useBase();
const { fethCdnData } = FileManagerService();
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
const pdfViewBaseRef = useTemplateRef<any>('pdfViewBaseRef');
const showAllPage = ref(allPage);
onMounted(async () => {
  loading.value = true
  const fileUrl = await onLoad();
  if (fileUrl) {
    if (
      watermarkOptions?.text ||
      watermarkOptions?.image ||
      (watermarkOptions?.items && watermarkOptions.items.length > 0)
    ) {
      const finalBob = await addWatermarkFrombUrl(fileUrl);
      if (finalBob) {
        pdfSrc.value = URL.createObjectURL(finalBob);
      }
    } else {
      pdfSrc.value = fileUrl;
    }
  }
  loading.value = false;
});
const onLoad = async (): Promise<string> => {
  let url: string = '';
  if (fetchToServer || isLinkFromWebCdn(src)) {
    const response = await fethCdnData(src, 'axiosresponse');
    if (response) {
      url = (await getBlobFromAxiosResponse(response)) as string;
      contentType.value = response.headers['content-type'];
      fileName.value = getFileNameFromAxiosResponse(response);
    }
  } else {
    url = src;
  }

  return new Promise((resolve) => {
    resolve(url);
  });
};
const addWatermarkFrombUrl = async (fileUrl: string): Promise<Blob> => {
  // 1. Fetch blob from URL
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();

  // 2. Load into pdf-lib
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // 3. Embed font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const margin = 20;
  // 4. Add watermark on each page
  const fontSize = watermarkOptions?.fontSize != undefined ? watermarkOptions.fontSize : 16;
  const opacity = watermarkOptions?.opacity != undefined ? watermarkOptions.opacity : 0.7;
  const color: any =
    watermarkOptions?.color != undefined ? watermarkOptions.color : rgb(0.75, 0.75, 0.75);
  const rotate = watermarkOptions?.rotation != undefined ? watermarkOptions.rotation : 45;
  const cols = watermarkOptions?.columns != undefined ? watermarkOptions.columns : 4;
  const rows = watermarkOptions?.rows != undefined ? watermarkOptions.rows : 3;
  const defultText = watermarkOptions?.text != undefined ? watermarkOptions?.text : '';

  const imageUrl = watermarkOptions?.image;
  let img: any;
  let imgDims: any;
  if (imageUrl) {
    const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
    if (imageUrl.toLowerCase().endsWith('.png')) {
      img = await pdfDoc.embedPng(imageBytes);
    } else {
      img = await pdfDoc.embedJpg(imageBytes);
    }
    imgDims = img.scale(0.5);
  }
  pdfDoc.getPages().forEach(async (page) => {
    const { width, height } = page.getSize();

    if (imageUrl) {
      page.drawImage(img, {
        x: width / 2 - imgDims.width / 2,
        y: height / 2 - imgDims.height / 2,
        width: imgDims.width,
        height: imgDims.height,
        opacity: 0.2, // transparent watermark
      });
    }

    if (watermarkOptions?.items && watermarkOptions.items.length > 0) {
      for (const wmItem of watermarkOptions.items) {
        const txt = wmItem?.text || defultText;

        if (wmItem?.position === 'top-left') {
          // top-left
          page.drawText(txt, {
            x: margin,
            y: height - fontSize - margin,
            size: fontSize,
            font,
            color,
            rotate: degrees(0),
            opacity,
          });
        } else if (wmItem?.position === 'top-right') {
          // top-right
          page.drawText(txt, {
            x: width - margin - font.widthOfTextAtSize(txt, fontSize),
            y: height - fontSize - margin,
            size: fontSize,
            font,
            color,
            rotate: degrees(0),
            opacity,
          });
        } else if (wmItem?.position === 'bottom-left') {
          // bottom-left
          page.drawText(txt, {
            x: margin,
            y: margin,
            size: fontSize,
            font,
            color,
            rotate: degrees(0),
            opacity,
          });
        } else if (wmItem?.position === 'bottom-right') {
          // bottom-right
          page.drawText(txt, {
            x: width - margin - font.widthOfTextAtSize(txt, fontSize),
            y: margin,
            size: fontSize,
            font,
            color,
            rotate: degrees(0),
            opacity,
          });
        } else {
          page.drawText(txt, {
            x: wmItem.x || 0,
            y: wmItem.y || 0,
            size: fontSize,
            font,
            color,
            rotate: degrees(rotate),
            opacity,
          });
        }
      }
    } else {
      const xSpacing = width / cols;
      const ySpacing = height / rows;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          page.drawText(defultText, {
            x: col * xSpacing + 20, // adjust offset
            y: row * ySpacing + 20,
            size: fontSize,
            font,
            color,
            opacity,
            rotate: degrees(rotate),
          });
        }
      }
    }
  });
  // 5. Save modified PDF
  const pdfBytes = await pdfDoc.save();

  // 6. Download
  const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
  // const link = document.createElement('a')
  // link.href = URL.createObjectURL(blob)
  // link.download = 'watermarked.pdf'
  // link.click()
  return blob;
};
const printPdf = async () => {
  if (!pdfViewBaseRef.value) {
    return;
  }
  appLoading()
  await pdfViewBaseRef.value.print();
  appLoading(false)
};
const downloadPdf = async () => {
  if (!pdfViewBaseRef.value) {
    return;
  }
  appLoading()
  await pdfViewBaseRef.value.download(title || 'pdf_file.pdf');
  appLoading(false)
  // downloadLoading.value = true;
  // if (isBlob) {
  //   try {
  //     if (isBlobUrl(pdfSrc.value)) {
  //       downloadFromBlobUrl(pdfSrc.value, title || 'pdf_file.pdf');
  //     } else {
  //       downloadFromBlob(src, title || 'pdf_file.pdf');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else {
  //   try {
  //     if (isBlobUrl(pdfSrc.value)) {
  //       downloadFromBlobUrl(pdfSrc.value, title || 'pdf_file.pdf');
  //     } else {
  //       if (fetchToServer) {
  //         if (isLinkFromWebCdn(pdfSrc.value)) {
  //           await downloadCdnData(src, title);
  //         } else {
  //           downloadFileFromUrl(pdfSrc.value, title || 'pdf_file.pdf');
  //         }
  //       } else {
  //         downloadFileFromUrl(pdfSrc.value, title || 'pdf_file.pdf');
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // downloadLoading.value = false;
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
      <template v-if="!showAllPage">
        <q-btn flat dense round :icon="biArrowLeft" @click="page = page > 1 ? page - 1 : page" />
        <span>{{ page }} / {{ pages }}</span>
        <q-btn
          dense
          flat
          round
          :icon="biArrowRight"
          @click="page = page < pages ? page + 1 : page"
        />
      </template>
      <BaseCheckbox v-model="showAllPage" :label="t('base.showAllPage')" />
      <q-space />

      <q-btn v-if="!loading" @click="printPdf" flat round :icon="biPrinter">
        <BaseTooltip>
          {{ t('base.print') }}
        </BaseTooltip>
      </q-btn>
      <q-btn
        v-if="showDownload && !loading"
        dense
        flat
        round
        :icon="biDownload"
        @click="downloadPdf"
      >
        <BaseTooltip>
          {{ t('base.download') }}
        </BaseTooltip>
      </q-btn>
      <q-btn v-if="closeable" round flat dense :icon="biX" @click="onClose">
        <BaseTooltip>
          {{ t('base.close') }}
        </BaseTooltip>
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
              ref="pdfViewBaseRef"
              v-model:scale="scale"
              v-model:page="page"
              v-model:pagess="pages"
              :all-page="showAllPage"
              :src="pdfSrc"
            />
          </q-scroll-area>
        </template>
        <template v-else> Error</template>
      </div>
    </div>
  </q-card>
</template>
