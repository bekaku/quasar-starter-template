<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biArrowDown, biArrowUp } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref, useTemplateRef } from 'vue';
import type { VirtualScrollerUpdate } from '@/types/common';
import BasePage from 'src/components/base/BasePage.vue';
import BaseVirtualScrollerDynamic from 'src/components/base/BaseVirtualScrollerDynamic.vue';
import BaseVirtualScrollerRecycle from 'src/components/base/BaseVirtualScrollerRecycle.vue';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Virtual scroller | ${t('app.name')}`);

const dataList = ref<any[]>([]);

const maxSize = 10000;
const updateItem = ref<VirtualScrollerUpdate>();
const scrollerDynamicRef = useTemplateRef<any>('scrollerDynamicRef');

const scrollerRecycleRef = useTemplateRef<any>('scrollerRecycleRef');
const chatInfinityScrollRef = useTemplateRef<any>('chatInfinityScrollRef');
const items = ref<any[]>([]);

const scrollPosition = ref<number>(10);

const virtualListRef = useTemplateRef<any>('virtualListRef');
const virtualListIndex = ref(0);

const virtualChatListRef = useTemplateRef<any>('virtualChatListRef');
const chatList = ref<any[]>([]);
const chatInfiniteDisable = ref<boolean>(true);
onMounted(() => {
  stopChatInfinityScroll();
  for (let i = 0; i < maxSize; i++) {
    dataList.value.push({
      id: i + 1,
      label: 'Option ' + (i + 1),
    });
  }
  generateItems();
  initialChatList();
});
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

const initialChatList = async () => {
  // stopChatInfinityScroll();
  await onSetChatData();
  onVirtualChatScrollTo(chatList.value.length - 1);
  // resumeChatInfinityScroll();
  setTimeout(() => {
    chatInfiniteDisable.value = false;
  }, 1000);
};

const onSetChatData = () => {
  return new Promise((resolve) => {
    let count = chatList.value.length;
    for (let i = 0; i < 40; i++) {
      count++;
      chatList.value.push({
        id: count,
        label: 'Option ' + count,
      });
    }
    resolve(true);
  });
};
const onFetchChatPage = () => {
  return new Promise((resolve) => {
    for (let i = 0; i < 10; i++) {
      chatList.value.unshift({
        id: dataList.value.length + 1,
        label: 'Option ' + (dataList.value.length + 1),
      });
    }
    resolve(true);
  });
};
const onVirtualChatScrollTo = (index: number) => {
  if (virtualChatListRef.value) {
    virtualChatListRef.value.scrollTo(index, 'start-force');
  }
};
const onInfiniteChatVirtual = (index: number, done: any) => {
  console.log('onInfiniteChatVirtual', index);
  setTimeout(async () => {
    await onFetchChatPage();
    done();
    if (index == 3) {
      stopChatInfinityScroll();
    }
    onVirtualChatScrollTo(9);
  }, 1000);
};
const stopChatInfinityScroll = () => {
  if (chatInfinityScrollRef.value) {
    chatInfinityScrollRef.value.stop();
    chatInfiniteDisable.value = true;
  }
};
const resumeChatInfinityScroll = () => {
  if (chatInfinityScrollRef.value) {
    chatInfinityScrollRef.value.resume();
    chatInfiniteDisable.value = false;
  }
};
</script>

<template>
  <BasePage :full="false">
    <BaseCard title="Dynamic Scroller">
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

    <BaseCard title="Recycle Scroller + infinite-scroll">
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

    <BaseCard flat bordered title="Quasar virtual Scroller">
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

    <BaseCard flat bordered title="Chat style virtual scroller">
      <q-card-section>
        <div id="virtual-scroll-chat-target-holder" class="scroll" style="max-height: 300px">
          <BaseInfiniteScroll
            ref="chatInfinityScrollRef"
            scroll-target="#virtual-scroll-chat-target-holder"
            reverse
            :disable="chatInfiniteDisable"
            @on-infinite="onInfiniteChatVirtual"
          />
          <q-virtual-scroll
            id="q-scroll-target-id"
            ref="virtualChatListRef"
            v-slot="{ item, index }"
            scroll-target="#virtual-scroll-chat-target-holder"
            :items="chatList"
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
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
