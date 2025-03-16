<script setup lang="ts">
import type { FileManagerDto } from '@/types/models';
import FileManagerService from '@/api/FileManagerService';
import type { FileType } from '@/types/common';
import { downloadFileFromUrl, downloadFromBlob, fileToBlob, generateFileNameByExtesnsion, getFileExtension, getFileType } from '@/utils/fileUtil';
import { onMounted, ref } from 'vue';
import { useBase } from 'src/composables/useBase';
import BasePdfViewDialog from 'src/components/base/BasePdfViewDialog.vue';
import BaseImageViewDialog from 'src/components/base/BaseImageViewDialog.vue';
const { title, imageList, item, selectIndex, showArrow = true, fetch = false, isBlob = false } = defineProps<{
    title?: string;
    item: FileManagerDto;
    imageList?: FileManagerDto[];
    selectIndex?: number;
    fetch?: boolean;
    showArrow?: boolean;
    isBlob?: boolean;
}>();
const show = defineModel<boolean>('show', { default: false });
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
    if (selectIndex != undefined && selectIndex >= 0) {
        imageSelectIndex.value = selectIndex;
    }
    if (fileType.value == 'pdf') {
        if (item.file) {
            const b = await fileToBlob(item.file);
            if (b) {
                pdfSrc.value = b;
            }
        } else {
            pdfSrc.value = item.filePath;
        }
        showView.value = true;
    } else if (fileType.value == 'image') {
        // show image
        if (imageList && imageList.length > 0) {
            imageItems.value.push(...imageList);
        } else {
            imageItems.value.push(item);
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
    const file = item;
    if (!file || !file.filePath) {
        onClose();
        return new Promise((resolve) => resolve(false));
    }

    if (fetch) {
        await downloadCdnData(file.filePath, file.fileName || title);
    } else {
        const fileExtension = getFileExtension(file.fileMime);
        const fileGenerateName = generateFileNameByExtesnsion(fileExtension);
        if (fileExtension && fileGenerateName) {
            if (isBlob) {
                try {
                    downloadFromBlob(file.filePath, file.fileName || fileGenerateName);
                } catch (err) {
                    console.error(err)
                }
            } else {
                try {
                    downloadFileFromUrl(file.filePath, file.fileName || fileGenerateName);
                } catch (err) {
                    console.error(err)
                }
            }
        }
    }

    return new Promise((resolve) => resolve(true));
};
const detechFile = async () => {
    return new Promise((resolve) => {
        if (!item) {
            onClose();
        }
        fileType.value = getFileType(item.fileMime);
        resolve(true);
    });
};
const onClose = () => {
    show.value = false;
};
</script>
<template>
    <div v-if="item && fileType">
        <base-pdf-view-dialog v-if="showView && fileType == 'pdf' && pdfSrc" v-model="showView" :src="pdfSrc"
            :fetch-to-server="fetch" :title="item.fileName || title" @on-close="onClose" />

        <base-image-view-dialog v-else-if="fileType == 'image' && showView" v-model="showView" :files="imageItems"
            :selected-index="imageSelectIndex" :show-delete-image="false" :maximized="false" :fetch="fetch"
            :show-arrow="showArrow" @on-close="onClose" />
    </div>
</template>