<script setup lang="ts">
import { biCode } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import BaseVirtualScrollerRecycle from 'src/components/base/BaseVirtualScrollerRecycle.vue';
import { onMounted, ref, useTemplateRef } from 'vue';

const scrollerRecycleRef = useTemplateRef<any>('scrollerRecycleRef');
const items = ref<any[]>([]);
const scrollPosition = ref<number>(10);
// Recycle
const generateItems = () => {
  let count = items.value.length;
  for (let i = 0; i < 40; i++) {
    count++;
    items.value.push({
      id: count,
      label: 'Option ' + count,
    });
  }
};
const scrollTo = () => {
  if (scrollerRecycleRef.value) {
    scrollerRecycleRef.value.onScrollToItem(scrollPosition.value || 0);
  }
};

const onInfinite = (index: number, done: any) => {
  setTimeout(() => {
    generateItems();
    done();
  }, 500);
};
onMounted(() => {
  generateItems();
});
</script>
<template>
  <BaseCard title="Recycle Scroller + infinite-scroll">
    <template #end>
      <q-btn
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleRecycleScroller.vue"
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
        <q-input v-model="scrollPosition" label="Scroll to" type="number">
          <template #append>
            <q-btn label="Go" color="primary" @click="scrollTo" />
          </template>
        </q-input>
      </div>
      <BaseVirtualScrollerRecycle
        id="scroll-chat-target-id"
        ref="scrollerRecycleRef"
        style="padding-bottom: 65px"
        :items="items"
        scroll-area-height="200px"
        :min-item-size="42"
      >
        <template #slotBefore> Slot before </template>
        <template #default="{ item, index }">
          <q-item clickable>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
            <q-item-section side>
              <q-chip> #{{ index }} </q-chip>
            </q-item-section>
          </q-item>
        </template>

        <template #slotAfter> Slot after </template>
      </BaseVirtualScrollerRecycle>
      <BaseInfiniteScroll scroll-target="#scroll-chat-target-id" @on-infinite="onInfinite" />
    </q-card-section>
  </BaseCard>
</template>
