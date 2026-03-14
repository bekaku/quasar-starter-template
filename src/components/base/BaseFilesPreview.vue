<script setup lang="ts">
import type { FileManagerDto } from '@/types/models';
import FilesPreviewItemAlt from './BaseFilesPreviewItemAlt.vue';
import FilesPreviewItem from './BaseFilesPreviewItem.vue';
import { computed, ref } from 'vue';

const {
  showDelete = true,
  gallery = 'CARD',
  softDelete = false,
  items,
  showViewDialog = false,
} = defineProps<{
  showDelete?: boolean;
  col?: string;
  items: FileManagerDto[];
  formatSize?: boolean;
  gallery?: 'CARD' | 'LIST' | 'INLINE';
  imageSize?: string;
  showSize?: boolean;
  showTooltip?: boolean;
  iconSize?: string;
  showName?: boolean;
  softDelete?: boolean;
  showViewDialog?: boolean;
}>();
const fileForView = ref<FileManagerDto>();
const showFileView = ref(false);
const fileImageItemsForView = ref<FileManagerDto[]>([]);
const fileImageSelectIndex = ref<number>(0);
const emit = defineEmits(['on-click', 'on-remove', 'on-soft-delete']);
const onRemove = (index: number) => {
  emit('on-remove', index);
};
const onSoftDelete = (index: number) => {
  emit('on-soft-delete', index);
};
const getImageItems = computed(() => {
  if (items && items.length > 0) {
    return items.filter((f) => f.image);
  }
  return [];
});
const setImagesFileView = (file: FileManagerDto) => {
  return new Promise((resolve) => {
    const index = getImageItems.value.findIndex((t) => t.id == file.id);
    if (index >= 0) {
      const list = getImageItems.value;
      // for (const f of list) {
      //   fileImageItemsForView.value.push(f)
      // }
      fileImageItemsForView.value.push(...list);
      fileImageSelectIndex.value = index;
    }
    resolve(true);
  });
};
const onClick = async (index: number) => {
  emit('on-click', index);
  if (!showViewDialog) {
    return;
  }
  showFileView.value = false;
  fileImageSelectIndex.value = 0;
  fileImageItemsForView.value.length = 0;

  const file = items[index];
  if (file) {
    if (file.image) {
      await setImagesFileView(file);
    }
    fileForView.value = file;
    showFileView.value = true;
  }
};
</script>
<template>
  <div v-if="items.length > 0" class="row">
    <template v-if="gallery == 'CARD'">
      <div
        v-for="(f, index) in items"
        :key="`f-${index}-${f.fileName}`"
        :class="col || 'col-3 q-pa-md'"
        class="div-style q-pa-md"
      >
        <FilesPreviewItem
          :item="f"
          :index="index"
          :show-delete="showDelete"
          :format-size="formatSize || false"
          :show-size="showSize"
          :show-name="showName"
          :show-tooltip="showTooltip"
          :icon-size="iconSize || '4em'"
          :image-size="imageSize || '125px'"
          @on-remove="onRemove"
        />
      </div>
    </template>
    <template v-else-if="gallery == 'LIST'">
      <div class="col" :class="col">
        <FilesPreviewItemAlt
          v-for="(f, fileIndex) in items"
          :key="`f-alt-${fileIndex}-${f.fileName}`"
          :item="f"
          :index="fileIndex"
          dense
          :show-delete="showDelete"
          :format-size="formatSize || false"
          :image-size="imageSize || ''"
          :soft-delete="softDelete"
          @on-remove="onRemove"
        />
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped></style>
