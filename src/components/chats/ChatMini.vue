<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import {
  biChatDots,
  biChevronDown,
  biChevronUp,
  biFullscreen,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { useChatStore } from '@/stores/chatStore';
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { GroupChatDto } from '@/types/models';
import { useBase } from '@/composables/useBase';
import { chatHistoryListApi } from 'src/libs/data';
import BaseTooltip from '../base/BaseTooltip.vue';

const ChatContent = defineAsyncComponent(() => import('@/components/chats/ChatContent.vue'));
const BaseSpinner = defineAsyncComponent(() => import('@/components/base/BaseSpinner.vue'));
const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));

const chatStore = useChatStore();
const { t } = useLang();
const { appNavigateTo } = useBase();
const groupId = ref<number>();
const groupItem = ref<GroupChatDto>();
const firstLoad = ref(false);
const loading = ref(true);

const onLoad = async () => {
  firstLoad.value = false;
  if (groupId.value && groupId.value > 0) {
    await onLoadGroupData();
  }
  firstLoad.value = true;
};
const findOneChat = async (id: number): Promise<GroupChatDto | undefined> => {
  const history = chatHistoryListApi.dataList.find((t) => t.id == id);
  return new Promise((resolve) => resolve(history));
};
const onLoadGroupData = async () => {
  loading.value = true;
  if (!groupId.value) {
    loading.value = false;
    return new Promise((resolve) => resolve(false));
  }
  const res = await findOneChat(groupId.value);
  if (res) {
    groupItem.value = res;
  }
  loading.value = false;
  return new Promise((resolve) => resolve(true));
};
const onClearConversation = () => {
  groupItem.value = undefined;
  groupId.value = undefined;
};
const onClose = () => {
  onClearConversation();
  chatStore.onCloseMiniChatPage();
};
const onGoToChatPage = () => {
  if (!groupItem.value) {
    return;
  }
  appNavigateTo(`/example/chats/g/${groupItem.value.id}`);
  onClose();
};
watch(chatStore, (state) => {
  if (state.openMiniChatPage && state.miniChatGroupId && groupId.value != state.miniChatGroupId) {
    onClearConversation();
    groupId.value = state.miniChatGroupId;
    onLoad();
  }
});
onBeforeUnmount(() => {
  onClose();
});
</script>
<template>
  <q-page-sticky
    v-if="chatStore && chatStore?.openMiniChatPage && chatStore?.miniChatGroupId"
    position="bottom-right"
    :offset="[50, 0]"
  >
    <q-card
      class="card-style shadow-8"
      :class="{ 'card-minimize-togle': !chatStore.miniChatMinimize }"
      style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
      square
    >
      <base-spinner v-if="!firstLoad" />
      <template v-else-if="groupItem">
        <Suspense>
          <template #default>
            <ChatContent
              v-model="groupItem"
              :show-header="true"
              input-dense
              square
              scroll-area-height="48dvh"
              :input-avata="false"
              :miniminze="chatStore.miniChatMinimize"
              mini-chat
              :class="{ 'q-pb-md': !chatStore.miniChatMinimize }"
              class="content-limit"
            >
              <template #headerRight>
                <q-btn flat round dense @click="onGoToChatPage">
                  <q-icon size="20px" :name="biFullscreen" />
                  <BaseTooltip>
                    {{ t('chats.openChatPage') }}
                  </BaseTooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense
                  :icon="!chatStore.miniChatMinimize ? biChevronDown : biChevronUp"
                  @click="chatStore.miniChatMinimize = !chatStore.miniChatMinimize"
                />
                <q-btn flat round dense @click="onClose" :icon="biX" />
              </template>
            </ChatContent>
          </template>
          <template #fallback>
            <base-spinner />
          </template>
        </Suspense>
      </template>
      <BaseResult
        v-else-if="!groupItem"
        status="empty"
        :description="t('chats.chatContentEmpty')"
        :show-icon="false"
      >
        <template #extra>
          <q-icon :name="biChatDots" />
        </template>
      </BaseResult>
    </q-card>
  </q-page-sticky>
</template>
<style scoped lang="scss">
.card-style {
  min-width: 360px;
  max-width: 360px;
}

.card-minimize-togle {
  min-height: 48dvh;
}
</style>
