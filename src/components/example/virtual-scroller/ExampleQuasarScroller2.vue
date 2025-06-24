<script setup lang="ts">
import { biCode } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import { onMounted, ref, useTemplateRef } from 'vue';
const dataList = ref<any[]>([]);


const chatInfinityScrollRef = useTemplateRef<any>('chatInfinityScrollRef');
const virtualChatListRef = useTemplateRef<any>('virtualChatListRef');

const chatList = ref<any[]>([]);
const chatInfiniteDisable = ref<boolean>(true);
const virtualListIndex = ref(0);
onMounted(() => {
  stopChatInfinityScroll();
  initialChatList();
});
const onVirtualScroll = ({ index }: any) => {
  virtualListIndex.value = index;
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
  <BaseCard flat bordered title="Chat style virtual scroller">
     <template #end>
      <q-btn
        href="https://github.com/bekaku/quasar-starter-template/blob/main/src/components/example/virtual-scroller/ExampleQuasarScroller2.vue"
        target="_blank"
        :icon="biCode"
        flat
        round
      >
        <q-tooltip>View Source</q-tooltip>
      </q-btn>
    </template>
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
</template>
