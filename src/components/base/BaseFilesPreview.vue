<script setup lang="ts">
import type { FileManagerDto } from '@/types/models';
import FilesPreviewItemAlt from './FilesPreviewItemAlt.vue';
import FilesPreviewItem from './FilesPreviewItem.vue';

const {
  showDelete = true,
  col = 'col-3 q-pa-md',
  gallery = true,
} = defineProps<{
  showDelete?: boolean;
  col?: string;
  items: FileManagerDto[];
  formatSize?: boolean;
  gallery?: boolean;
  imageSize?: string;
}>();
const emit = defineEmits(['on-remove']);
const onRemove = (index: number) => {
  emit('on-remove', index);
};
</script>
<template>
  <div v-if="items.length > 0" class="row">
    <template v-if="gallery">
      <div
        v-for="(f, index) in items"
        :key="`f-${index}-${f.fileName}`"
        :class="col"
        class="div-style q-pa-md"
      >
        <FilesPreviewItem
          :item="f"
          :index="index"
          :show-delete="showDelete"
          :format-size="formatSize || false"
          @on-remove="onRemove"
        />
      </div>
    </template>
    <template v-else>
      <div class="col">
        <FilesPreviewItemAlt
          v-for="(f, fileIndex) in items"
          :key="`f-alt-${fileIndex}-${f.fileName}`"
          :item="f"
          :index="fileIndex"
          dense
          :show-delete="showDelete"
          :format-size="formatSize || false"
          :image-size="imageSize || ''"
          @on-remove="onRemove"
        />
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped></style>
