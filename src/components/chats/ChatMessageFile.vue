<script setup lang="ts">
import BaseFilesPreviewItem from '@/components/base/BaseFilesPreviewItem.vue';
import BaseFilesPreviewItemAlt from 'components/base/BaseFilesPreviewItemAlt.vue';
import { useLang } from '@/composables/useLang';
import type { FileManagerDto, GroupChatFileDto } from '@/types/models';
import { computed, defineAsyncComponent, ref } from 'vue';
import { useTheme } from 'src/composables/useTheme';
import { useDevice } from 'src/composables/useDevice';
const BaseFileViewDialog = defineAsyncComponent(
  () => import('@/components/base/BaseFileViewDialog.vue'),
);
const {
  files,
  sent,
  showImageSlideAll = true,
} = defineProps<{
  chatId?: number;
  files: GroupChatFileDto[];
  sent: boolean;
  showImageSlideAll?: boolean;
  miniChat?: boolean;
  fileTextColor?: string;
}>();
const { isSmallScreen } = useDevice();
const { t } = useLang();
const fileForView = ref<GroupChatFileDto>();
const fileImageItemsForView = ref<FileManagerDto[]>([]);
const fileImageSelectIndex = ref<number>(0);
const showFileView = ref(false);

const getItems = computed(() => files.filter((f) => f.fileManager));
const getImageItems = computed(() => files.filter((f) => f.fileManager && f.fileManager.image));
const getFileItems = computed(() => files.filter((f) => f.fileManager && !f.fileManager.image));
const divSize = computed(() => {
  const length = getImageItems.value.length;
  if (length == 1) {
    return 'col-12 col-md-12';
  } else if (length == 2) {
    return 'col-6 col-md-6';
  } else if (length == 3) {
    return 'col-4 col-md-4';
  }
  return 'col-3 col-md-3';
});
const getImgSize = computed(() => {
  if (getItems.value.length == 1) {
    return '250px';
  } else if (getItems.value.length == 2) {
    return '125px';
  } else {
    return '100px';
  }
});
const getImgSizeHeight = computed(() => {
  if (getFileItems.value.length == 1) {
    return '550px';
  } else if (getFileItems.value.length == 2) {
    return '125px';
  } else {
    return '100px';
  }
});
const getFileByIndex = (index: number) => {
  if (index == undefined) {
    return undefined;
  }
  if (getFileItems.value && getItems.value.length > 0) {
    return getItems.value[index];
  }
  return undefined;
};
const getFileOnlyByIndex = (index: number) => {
  if (index == undefined) {
    return undefined;
  }
  if (getFileItems.value && getFileItems.value.length > 0) {
    return getFileItems.value[index];
  }
  return undefined;
};
const setImagesFileView = (file: GroupChatFileDto) => {
  return new Promise((resolve) => {
    const index = getImageItems.value.findIndex((t) => t.id == file.id);
    if (index >= 0) {
      const list = getImageItems.value;
      for (const f of list) {
        if (f && f.fileManager) {
          fileImageItemsForView.value.push(f.fileManager);
        }
      }
      fileImageSelectIndex.value = index;
    }
    resolve(true);
  });
};
const onImagePreviewClick = async (index: number) => {
  showFileView.value = false;
  fileImageSelectIndex.value = 0;
  fileImageItemsForView.value = [];
  const file = getFileByIndex(index);
  if (file && file.fileManager) {
    if (showImageSlideAll) {
      if (file.fileManager.image) {
        await setImagesFileView(file);
      }
    }
    fileForView.value = file;
    showFileView.value = true;
  }
};
const onFilePreviewClick = async (index: number, event: any) => {
  showFileView.value = false;
  const file = getFileOnlyByIndex(index);
  if (file && file.fileManager) {
    fileForView.value = file;
    showFileView.value = true;
  }
};
</script>
<template>
  <div v-bind="$attrs">
    <div v-if="getImageItems && getImageItems.length > 0" class="row">
      <div
        v-for="(p, previewIndex) in getImageItems"
        :key="`chat-message-f-preview-${previewIndex}-${p.id}`"
        class="q-pa-xs"
        :class="divSize"
      >
        <BaseFilesPreviewItem
          v-if="p.fileManager"
          class="rounded"
          style="border-radius: 10px"
          :item="p.fileManager"
          :index="previewIndex"
          :show-delete="false"
          show-tooltip
          :text-color="fileTextColor ? fileTextColor : sent ? 'text-black' : undefined"
          :use-thumbnail="getImageItems.length > 1"
          :image-size="getImgSize"
          :image-height="getImgSizeHeight"
          :show-name="!p.fileManager?.image"
          :show-size="false"
          @on-click="onImagePreviewClick"
        />
      </div>
    </div>
    <div v-if="getFileItems && getFileItems.length > 0" class="row">
      <div class="col-12 q-py-sm" style="overflow-x: auto">
        <q-list>
          <template
            v-for="(f, previewFileIndex) in getFileItems"
            :key="`chat-message-file-preview-${previewFileIndex}-${f.id}`"
          >
            <BaseFilesPreviewItemAlt
              v-if="f.fileManager"
               :style="{ maxWidth: !isSmallScreen ? '100%' : '230px' }"
              :item="f.fileManager"
              :index="previewFileIndex"
              @on-click="(index: number, ev: any) => onFilePreviewClick(index, ev)"
              :show-delete="false"
              icon-size="2em"
              image-size="2em"
              :text-color="sent ? 'text-black' : ''"
              clickable
            >
              <template #fileName>
                {{ f.fileManager.fileName }}
              </template>
            </BaseFilesPreviewItemAlt>
          </template>
        </q-list>
      </div>
    </div>
  </div>
  <BaseFileViewDialog
    v-if="showFileView && fileForView && fileForView.fileManager"
    :item="fileForView.fileManager"
    :image-list="fileImageItemsForView"
    :select-index="fileImageSelectIndex"
    :title="t('chats.chats')"
    :show-arrow="showImageSlideAll"
    v-model:show="showFileView"
  />
</template>
