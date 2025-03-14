<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import type { OgMeta } from '@/types/models';
import { catchUrlFromText } from '@/utils/appUtil';
import UtilService from '@/api/UtilService';

const OpenGraphItem = defineAsyncComponent(() => import('@/components/base/OpenGraphItem.vue'));
const {
  short = false,
  showBg = true,
  textLines = 1,
  imageSize = '80px',
  imageMaxHeight = '250px',
  content,
} = defineProps<{
  content: string;
  short?: boolean;
  textLines?: number;
  descriptionLines?: number;
  showBg?: boolean;
  imageSize?: string;
  imageMaxHeight?: string;
}>();
const { getOgMeta } = UtilService();
const opengraphItem = ref<OgMeta>();
const showOg = ref(false);
onMounted(async () => {
  if (content) {
    const matches = catchUrlFromText(content);
    if (matches && matches.length > 0) {
      // if (!isLinkFromWebApp(matches[0])) {
      const res = await getOgMeta(matches[0]);
      if (res) {
        opengraphItem.value = res;
        showOg.value = true;
      }
      // }
    }
  }
});
</script>
<template>
  <open-graph-item
    v-bind="$attrs"
    v-if="opengraphItem && showOg"
    :item="opengraphItem"
    :short="short || false"
    :textLines="textLines || 1"
    :descriptionLines="textLines || 1"
    :showBg="showBg || false"
    :imageSize="imageSize"
    :imageMaxHeight="imageMaxHeight"
  />
</template>
