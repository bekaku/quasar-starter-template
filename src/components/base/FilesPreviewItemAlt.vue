<template>
  <q-item v-bind="$attrs" :dense="dense" :clickable @click="onClick($event, index)">
    <q-item-section side>
      <template v-if="item.isImage || item.image">
        <q-avatar square :size="imageSize" class="cursor-pointer" @click="onClick($event, index)">
          <base-image :fetch="fetch || false" :src="item.filePath" />
        </q-avatar>
      </template>
      <template v-else>
        <div
          :style="{ width: imageSize }"
          class="cursor-pointer text-center"
          @click="onClick($event, index)"
        >
          <q-icon :class="textColor" :name="getFileTypeIcon(item.fileMime)" :size="iconSize" />
        </div>
      </template>
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1" :class="textColor">
        <slot name="fileName">
          {{ item.fileName }}
        </slot>
      </q-item-label>
      <q-item-label v-if="showSize" caption :class="textColor">
        <slot name="size">
          {{ formatSize ? formatBytes(item.fileSize) : item.fileSize }}
        </slot>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <slot name="end">
        <q-btn
          v-if="showDelete"
          @click="onRemove($event, index)"
          flat
          round
          :icon="biX"
          color="negative"
        >
          <q-tooltip class="bg-negative">
            {{ t('base.delete') }}
          </q-tooltip>
        </q-btn>
      </slot>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import BaseImage from '@/components/base/BaseImage.vue';
import { useLang } from '@/composables/useLang';
import type { FileManagerDto } from '@/types/models';
import { formatBytes } from '@/utils/appUtil';
import { getFileTypeIcon } from '@/utils/fileUtils';
import { biX } from '@quasar/extras/bootstrap-icons';

withDefaults(
  defineProps<{
    showDelete?: boolean;
    col?: string;
    item: FileManagerDto;
    index: number;
    formatSize?: boolean;
    imageSize?: string;
    iconSize?: string;
    fetch?: boolean;
    dense?: boolean;
    clickable?: boolean;
    textColor?: string;
    showSize?: boolean;
  }>(),
  {
    showDelete: true,
    formatSize: false,
    showSize: true,
    fetch: false,
    dense: false,
    clickable: false,
    imageSize: '75px',
    textColor: 'q-text-black',
    iconSize: '4em',
  },
);
const { t } = useLang();
const emit = defineEmits(['on-remove', 'on-click']);
const onRemove = (event: any, index: number) => {
  emit('on-remove', index);
  if (event) {
    event.stopImmediatePropagation();
  }
};
const onClick = (event: any, index: number) => {
  emit('on-click', index, event);
  if (event) {
    event.stopImmediatePropagation();
  }
};
</script>
