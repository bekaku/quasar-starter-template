<script setup lang="ts" generic="T">
/*
<BaseVirtualScrollerDynamic
            ref="scrollerTestRef"
            class="q-pa-sm"
            key-field="id"
            :items="dataList"
            :min-item-size="24"
            :scroll-area-height="scrollAreaHeight"
            @on-update="onVirtualScrollUpdate"
          >
            <template #slotBefore>
            </template>
            <template v-slot="{ item, index, active }">
              <div
                :key="`message-${item.id}-${index}`"
                :item="item"
              >
                {{item.message}}
              </div>
            </template>
            <template #slotAfter>
            </template>
          </BaseVirtualScrollerDynamic>

const onScrollTo = (index: number) => {
    if (scrollerTestRef.value) {
        scrollerTestRef.value.onScrollToItem(index);
    }
}
const scrollToBottom = () => {
    if (scrollerTestRef.value) {
        scrollerTestRef.value.onScrollToBottom();
    }
};
*/
import { useTemplateRef } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const {
  minItemSize = 54,
  emitUpdate = true,
  scrollAreaHeight = '65vh',
  items,
  keyField = 'id',
  buffer = 800,
  pageMode = false,
} = defineProps<{
  minItemSize?: number;
  emitUpdate?: boolean;
  scrollAreaHeight?: string;
  minHeight?: string;
  keyField?: string;
  pageMode?: boolean;
  buffer?: number;
  items: T[];
}>();

const appDynamicScrollerRef = useTemplateRef<any>('appDynamicScrollerRef');
// const emit = defineEmits<{
//   onUpdate: [val: VirtualScrollerUpdate];
// }>();

const emit = defineEmits(['on-update']);
const onScrollToItem = (index: number | undefined) => {
  if (index == undefined) {
    return;
  }
  if (appDynamicScrollerRef.value) {
    appDynamicScrollerRef.value.$forceUpdate(); // Recalculate sizes
    appDynamicScrollerRef.value.scrollToItem(index);
  }
};
const onScrollToBottom = () => {
  if (appDynamicScrollerRef.value) {
    appDynamicScrollerRef.value.scrollToBottom();
  }
};
const onForceUpdate = () => {
  if (appDynamicScrollerRef.value) {
    appDynamicScrollerRef.value.$forceUpdate(); // Recalculate sizes
  }
};
const onUpdate = (
  viewStartIndex: number,
  viewEndIndex: number,
  visibleStartIndex: number,
  visibleEndIndex: number,
) => {
  // console.log(`${viewStartIndex}-[${visibleStartIndex}-${visibleEndIndex}]-${viewEndIndex}`);
  // if (visibleEndIndex == viewEndIndex) {
  //   console.log('isBottom');
  // } else if (viewStartIndex == 0 && visibleStartIndex == 0) {
  //   console.log('isTop');
  // } else {
  //   console.log('scrolling');
  // }
  const isScrollingToTop = !(visibleEndIndex == viewEndIndex);
  emit('on-update', {
    viewStartIndex,
    viewEndIndex,
    visibleStartIndex,
    visibleEndIndex,
    isScrollingToTop,
  });
};
const onResize = () => {};
defineExpose({
  onScrollToBottom,
  onScrollToItem,
  onForceUpdate,
});
</script>

<template>
  <DynamicScroller
    v-bind="$attrs"
    ref="appDynamicScrollerRef"
    :items="items"
    :emit-update="emitUpdate"
    :key-field="keyField"
    :min-item-size="minItemSize"
    :buffer="buffer"
    :page-mode="pageMode"
    :style="{ height: 'auto', maxHeight: scrollAreaHeight }"
    @resize="onResize"
    @update="onUpdate"
  >
    <template #before>
      <slot name="slotBefore" />
    </template>
    <template #default="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <slot v-bind="{ item, index, active }" />
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="slotAfter" />
    </template>
  </DynamicScroller>
</template>

<style scoped lang="scss"></style>
