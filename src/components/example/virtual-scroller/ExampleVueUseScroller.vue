<script setup lang="ts">
import { biCode } from '@quasar/extras/bootstrap-icons';
import { useVirtualList } from '@vueuse/core';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseInput from 'src/components/base/BaseInput.vue';
import { computed, onMounted, shallowRef } from 'vue';

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
  if (index.value) {
    scrollTo(index.value);
  }
}
onMounted(() => {
  scrollTo(filteredItems.value.length - 1);
});
</script>
<template>
  <BaseCard title="Vue use virtual scroller">
    <template #end>
      <q-btn
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleVueUseScroller.vue"
        target="_blank"
        :icon="biCode"
        flat
        round
      >
        <q-tooltip>View Source</q-tooltip>
      </q-btn>
    </template>
    <q-card-section>
      <div>
        <div class="row q-my-md">
          <div class="col col-md-6">
            <BaseInput label="Jump to index" placeholder="Index" type="number" v-model="index">
              <template #append>
                <BaseButton label="Go" @click="handleScrollTo" />
              </template>
            </BaseInput>
          </div>
          <div class="col col-md-6">
            <BaseInput
              label="Filter list by size"
              placeholder="e.g. small, medium, large"
              type="search"
              v-model="search"
            />
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
</template>
<style scoped>
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
