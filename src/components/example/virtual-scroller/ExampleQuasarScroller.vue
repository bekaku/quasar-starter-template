<script setup lang="ts">
import { biCode } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import { onMounted, ref, useTemplateRef } from 'vue';
const dataList = ref<any[]>([]);

const virtualListRef = useTemplateRef<any>('virtualListRef');
const virtualListIndex = ref(0);
onMounted(() => {
});
const executeScroll = () => {
  virtualListRef.value.scrollTo(virtualListIndex.value, 'start-force');
};
const onVirtualScroll = ({ index }: any) => {
  virtualListIndex.value = index;
};
const onVirtualScrollToBottom = () => {
  virtualListRef.value.scrollTo(dataList.value.length - 1, 'start-force');
};
const onInfiniteVirtual = (index: number, done: any) => {
  console.log('onInfiniteVirtual', index);
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      dataList.value.push({
        id: dataList.value.length + 1,
        label: 'Option ' + (dataList.value.length + 1),
      });
    }
    done();
  }, 1000);
};
</script>
<template>
  <BaseCard flat bordered title="Quasar virtual Scroller">
    <template #end>
      <q-btn
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleQuasarScroller.vue"
        target="_blank"
        :icon="biCode"
        flat
        round
      >
        <q-tooltip>View Source</q-tooltip>
      </q-btn>
    </template>
    <q-card-section class="q-gutter-y-lg">
      <div class="q-pa-md row justify-center">
        <q-input
          v-model.number="virtualListIndex"
          style="min-width: 10em"
          type="number"
          :min="0"
          :max="9999"
          label="Scroll to index"
          input-class="text-right"
          outlined
        />
        <q-btn class="q-ml-sm" label="Go" no-caps color="primary" @click="executeScroll" />
        <q-btn class="q-ml-sm" label="To Bottom" no-caps @click="onVirtualScrollToBottom" />
      </div>
      <div id="virtual-scroll-target-holder" class="scroll" style="max-height: 300px">
        <p>Top Area</p>
        <q-virtual-scroll
          id="q-scroll-target-id"
          ref="virtualListRef"
          v-slot="{ item, index }"
          scroll-target="#virtual-scroll-target-holder"
          :items="dataList"
          separator
          @virtual-scroll="onVirtualScroll"
        >
          <div class="q-pa-md row justify-center">
            <div style="width: 100%">
              <q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                sent
                stamp="7 minutes ago"
              >
                <div>#{{ index }} - {{ item.label }}</div>
              </q-chat-message>
              <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                stamp="4 minutes ago"
              >
                <div>#{{ index }} - {{ item.label }}</div>
              </q-chat-message>
            </div>
          </div>
        </q-virtual-scroll>
        <p>Bottom Area</p>
        <BaseInfiniteScroll
          scroll-target="#virtual-scroll-target-holder"
          @on-infinite="onInfiniteVirtual"
        />
      </div>
    </q-card-section>
  </BaseCard>
</template>
