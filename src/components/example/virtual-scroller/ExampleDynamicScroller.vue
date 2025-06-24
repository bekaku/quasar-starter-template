<script setup lang="ts">
import { biArrowDown, biArrowUp, biCode } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseVirtualScrollerDynamic from 'src/components/base/BaseVirtualScrollerDynamic.vue';
import type { VirtualScrollerUpdate } from 'src/types/common';
import { onMounted, ref, useTemplateRef } from 'vue';

const dataList = ref<any[]>([]);

const updateItem = ref<VirtualScrollerUpdate>();
const scrollerDynamicRef = useTemplateRef<any>('scrollerDynamicRef');
const onVirtualScrollUpdate = (item: VirtualScrollerUpdate) => {
  // console.log('onVirtualScrollUpdate', item);
  updateItem.value = item;
};
const onScrollTo = (index: number) => {
  if (scrollerDynamicRef.value) {
    scrollerDynamicRef.value.onScrollToItem(index);
  }
};
const scrollToBottom = () => {
  if (scrollerDynamicRef.value) {
    scrollerDynamicRef.value.onScrollToBottom();
  }
};
onMounted(() => {
  for (let i = 0; i < 10000; i++) {
    dataList.value.push({
      id: i + 1,
      label: 'Option ' + (i + 1),
    });
  }
});
</script>
<template>
  <BaseCard title="Dynamic Scroller">
    <template #end>
      <q-btn
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleDynamicScroller.vue"
        target="_blank"
        :icon="biCode"
        flat
        round
      >
        <q-tooltip>View Source</q-tooltip>
      </q-btn>
    </template>
    <q-card-section class="q-gutter-y-lg">
      <div>
        <p v-if="updateItem">
          ({{
            `${updateItem.viewStartIndex}-[${updateItem.visibleStartIndex}-${updateItem.visibleEndIndex}]-${updateItem.viewEndIndex}`
          }})
        </p>
      </div>
      <q-card-actions>
        <q-btn :icon="biArrowDown" no-caps label="Scroll to bottom" @click="scrollToBottom" />
        <q-btn :icon="biArrowUp" no-caps label="Scroll to top" @click="onScrollTo(0)" />
      </q-card-actions>
      <BaseVirtualScrollerDynamic
        ref="scrollerDynamicRef"
        class="q-pa-sm"
        key-field="id"
        :items="dataList"
        :min-item-size="24"
        scroll-area-height="200px"
        @on-update="onVirtualScrollUpdate"
      >
        <template #slotBefore> Before Slot </template>
        <template #default="{ item, index /*active */ }">
          <q-item :key="index" dense clickable>
            <q-item-section>
              <q-item-label> #{{ index }} - {{ item.label }} </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template #slotAfter> After Slot </template>
      </BaseVirtualScrollerDynamic>
    </q-card-section>
  </BaseCard>
</template>
