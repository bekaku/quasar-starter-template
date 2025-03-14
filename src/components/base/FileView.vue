<template>
  <div v-if="item && fileType">
    <pdf-view
      v-if="showView && fileType == 'pdf' && pdfSrc"
      :src="pdfSrc"
      :fetch-to-server="fetch || false"
      v-model:show="showView"
      :title="item.fileName || title || ''"
      @on-close="onClose"
    />

    <photo-view
      v-else-if="fileType == 'image' && showView"
      :show-dialog="showView"
      :files="imageItems"
      :selected-index="imageSelectIndex"
      :show-delete-image="false"
      :maximized="false"
      :fetch="fetch || false"
      :showArrow="showArrow || false"
      @on-close="onClose"
    />
  </div>
</template>
<script setup lang="ts">
import type { FileManagerDto } from '@/types/models';
import { useBase } from '@/composables/useBase';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import type { FileType } from '@/types/common';
import FileManagerService from '@/api/FileManagerService';
import {
  downloadFileFromUrl,
  downloadFromBlob,
  fileToBlob,
  generateFileNameByExtesnsion,
  getFileExtension,
  getFileType,
} from '@/utils/fileUtils';

const PdfView = defineAsyncComponent(() => import('@/components/base/PdfView.vue'));
const PhotoView = defineAsyncComponent(() => import('@/components/base/PhotoView.vue'));
const props = withDefaults(
  defineProps<{
    title?: string;
    item: FileManagerDto;
    imageList?: FileManagerDto[];
    selectIndex?: number;
    fetch?: boolean;
    showArrow?: boolean;
    isBlob?: boolean;
  }>(),
  {
    showArrow: true,
    fetch: false,
    isBlob: false,
  },
);
const show = defineModel('show', { type: Boolean, default: false });
const { appLoading } = useBase();
const { downloadCdnData } = FileManagerService();
const showView = ref(false);
const fileType = ref<FileType | undefined>(undefined);

const pdfSrc = ref<any>();

const imageItems = ref<FileManagerDto[]>([]);
const imageSelectIndex = ref(0);
onMounted(async () => {
  appLoading();
  await detechFile();
  if (props.selectIndex != undefined && props.selectIndex >= 0) {
    imageSelectIndex.value = props.selectIndex;
  }
  if (fileType.value == 'pdf') {
    if (props.item.file) {
      const b = await fileToBlob(props.item.file);
      if (b) {
        pdfSrc.value = b;
      }
    } else {
      pdfSrc.value = props.item.filePath;
    }
    showView.value = true;
  } else if (fileType.value == 'image') {
    // show image
    if (props.imageList && props.imageList.length > 0) {
      imageItems.value.push(...props.imageList);
    } else {
      imageItems.value.push(props.item);
    }
    showView.value = true;
  } else {
    // download file
    await onDownloadFile();
    onClose();
  }
  appLoading(false);
});
const onDownloadFile = async () => {
  const file = props.item;
  if (!file || !file.filePath) {
    onClose();
    return new Promise((resolve) => resolve(false));
  }

  if (props.fetch) {
    await downloadCdnData(file.filePath, file.fileName || props.title);
  } else {
    const fileExtension = getFileExtension(file.fileMime);
    const fileGenerateName = generateFileNameByExtesnsion(fileExtension);
    if (fileExtension && fileGenerateName) {
      if (props.isBlob) {
        try {
          downloadFromBlob(file.filePath, file.fileName || fileGenerateName);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          downloadFileFromUrl(file.filePath, file.fileName || fileGenerateName);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  return new Promise((resolve) => resolve(true));
};
const detechFile = async () => {
  return new Promise((resolve) => {
    const file = props.item;
    if (!file) {
      onClose();
    }
    fileType.value = getFileType(file.fileMime);
    resolve(true);
  });
};
const onClose = () => {
  show.value = false;
};
</script>
<style scoped lang="scss"></style>
