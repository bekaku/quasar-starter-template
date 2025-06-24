<script setup lang="ts">
import { biCode } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseVirtualScrollerDynamic from 'src/components/base/BaseVirtualScrollerDynamic.vue';
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';

const autoSCrollToBottomRef = useTemplateRef<any>('autoSCrollToBottomRef');
const imageLoadCount = ref<number>(0);
const initial = ref<boolean>(false);
const messages = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i,
    text: i % 5 === 0 ? null : `Message #${i + 1}`,
    image: i % 5 === 0 ? `https://picsum.photos/seed/${i}/200/200` : null,
  })),
);
onMounted(() => {
  initialAutoSCrollToBottom();
  setTimeout(() => {
    initial.value = true;
  }, 3000);
});

// auto scroll to bottom on initial mount
const getImageSize = computed(() => messages.value.filter((m) => m.image).length);
const initialAutoSCrollToBottom = async () => {
  nextTick(() => {
    if (getImageSize.value == 0) {
      console.log('no images');
      setTimeout(() => {
        onAutoSCrollToBottom();
      }, 100);
    }
  });
};
const onAutoSCrollToBottom = () => {
  console.log('onAutoSCrollToBottom');
  if (autoSCrollToBottomRef.value) {
    autoSCrollToBottomRef.value.onScrollToItem(messages.value.length - 1);
  }
};
const onImgDidLoad = () => {
  // if (imageLoadCount.value >= getImageSize.value.length) {}
  if (!initial.value) {
     imageLoadCount.value++;
    onAutoSCrollToBottom();
  }
};
// end auto scroll to bottom on initial mount
</script>
<template>
  <BaseCard title="Dynamic Scroller auto scroll botton on mount">
    <template #end>
      <BaseButton
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleDynamicScroller.vue"
        target="_blank"
        :icon="biCode"
        flat
        round
      >
        <q-tooltip>View Source</q-tooltip>
      </BaseButton>
    </template>
    <BaseVirtualScrollerDynamic
      ref="autoSCrollToBottomRef"
      class="q-pa-sm"
      key-field="id"
      :items="messages"
      :min-item-size="54"
      scroll-area-height="500px"
    >
      <template #default="{ item, index /*active */ }">
        <div class="chat-message" :class="{ image: item.image }">
          <template v-if="item.image">
            <img :src="item.image" alt="chat image" @load="onImgDidLoad" />
          </template>
          <template v-else>
            <p>{{ index + ' ' + item.text }}</p>
          </template>
        </div>
      </template>
    </BaseVirtualScrollerDynamic>
  </BaseCard>
</template>
<style lang="css" scoped>
.chat-message {
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  max-width: 80%;
}

.chat-message img {
  max-width: 100%;
  border-radius: 6px;
}
</style>
