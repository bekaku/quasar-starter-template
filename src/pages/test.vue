<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { useVirtualList } from '@vueuse/core';
import BaseVirtualScrollerDynamic from 'src/components/base/BaseVirtualScrollerDynamic.vue';
import BaseButton from 'src/components/base/BaseButton.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Test page | ${t('app.name')}`);
// Mock chat data: mix of text and image messages
const messages = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i,
    text: i % 5 === 0 ? null : `Message #${i + 1}`,
    image: i % 5 === 0 ? `https://picsum.photos/seed/${i}/200/100` : null,
  })),
);

const index = shallowRef<number>();
const search = shallowRef('');

const allItems = Array.from(Array.from({ length: 99999 }).keys()).map((i) => ({
  height: i % 5 === 0 ? 142 : 62,
  size: i % 2 === 0 ? 'small' : 'large',
  text: i % 5 === 0 ? null : `Message #${i + 1}`,
  image: i % 5 === 0 ? `https://picsum.photos/seed/${i}/200/100` : null,
}));

const filteredItems = computed(() => {
  return allItems.filter((i) => i.size.startsWith(search.value.toLowerCase()));
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(filteredItems, {
  itemHeight: (i) => (filteredItems.value[i] ? filteredItems.value[i].height + 8 : 20),
  overscan: 10,
});
function handleScrollTo() {
  if (index.value) 
scrollTo(index.value);
}
onMounted(() => {
  scrollTo(filteredItems.value.length - 1);
});
</script>
<template>
  <BasePage>
    <BaseCard title="Test page">
      <template #end>
        <BaseButton label="Back" to="/" />
      </template>
      <q-card-section>
        <div>
          <div>
            <div class="inline-block mr-4">
              Jump to index
              <input v-model="index" placeholder="Index" type="number" />
            </div>
            <button type="button" @click="handleScrollTo">Go</button>
          </div>
          <div>
            <div class="inline-block mr-4">
              Filter list by size
              <input v-model="search" placeholder="e.g. small, medium, large" type="search" />
            </div>
          </div>
          <div
            v-bind="containerProps"
            style="height: 300px"
            class="h-300px overflow-auto p-2 bg-gray-500/5 rounded"
          >
            <div v-bind="wrapperProps">
              <div
                v-for="{ index, data } in list"
                :key="index"
                class="app-border q-mb-sm"
                :style="{
                  height: `${data.height}px`,
                }"
              >
                <div class="chat-message">
                  Row {{ index }} <span>({{ data.size }}) {{ data.text || 'Image' }}</span>
                  <div>
                    <template v-if="data.image">
                      <img :src="data.image" />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
<style scoped>
/* @import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'; */

.chat-wrapper {
  height: 500px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ccc;
  background: #f9f9f9;
  padding: 10px 0;
}
.chat-message {
  margin: 6px 12px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  max-width: 80%;
}
.chat-message img {
  max-width: 100%;
  border-radius: 6px;
}
</style>
