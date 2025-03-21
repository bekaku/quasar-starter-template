<template>
  <div class="row">
    <template v-for="(item, index) in limitItems" :key="`img-${index}-${item.fileName}`">
      <div :class="getColWidth">
        <files-preview-item
          :item="item"
          :index="index"
          :show-delete="false"
          show-tooltip
          :use-thumbnail="false"
          image-size="100%"
          :show-name="false"
          :show-size="false"
        >
        <div
            v-if="index == limitImage - 1 && getMoreNumber > 0"
            class="absolute-bottom text-subtitle1 full-height row items-center justify-center"
          >
            <div>+{{ getMoreNumber }}</div>
          </div>
        </files-preview-item>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FileManagerDto } from '@/types/models';
import { computed } from 'vue';
import FilesPreviewItem from '../base/BaseFilesPreviewItem.vue';
const { items } = defineProps<{
  items: FileManagerDto[];
}>();
const limitImage = 6;
const getColWidth = computed(() => {
  return items.length === 1 ? 'col-12' : items.length >= 3 ? 'col-4' : 'col-6';
});
const getMoreNumber = computed(() => (items.length > limitImage ? items.length - limitImage : 0));
const limitItems = computed(() => (items.length > 0 ? items.slice(0, limitImage) : []));
</script>
