<script setup lang="ts">
import ChatContent from '@/components/chats/ChatContent.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biChatDots, biList } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import BaseResult from 'src/components/base/BaseResult.vue';
import BaseSpinner from 'src/components/base/BaseSpinner.vue';
import BaseSuspense from 'src/components/base/BaseSuspense.vue';
import SkeletonItem from 'src/components/skeleton/SkeletonItem.vue';
import { useBase } from 'src/composables/useBase';
import { useDevice } from 'src/composables/useDevice';
import { chatHistoryListApi } from 'src/libs/data';
import { useChatStore } from 'src/stores/chatStore';
import type { ChatSettingType } from 'src/types/common';
import type { GroupChatDto } from 'src/types/models';
import { cloneObject } from 'src/utils/appUtil';
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const ChatLeft = defineAsyncComponent(() => import('@/components/chats/ChatLeft.vue'));
const ChatRight = defineAsyncComponent(() => import('@/components/chats/ChatRight.vue'));
const { t } = useLang();
const { screen } = useQuasar();
const { setTitle } = useAppMeta();
setTitle(`${t('chats.chats')} | ${t('app.name')}`);
const { getParamNumber, appNavigateTo } = useBase();
const chatStore = useChatStore();
const { isSmallScreen, isMobileOrTablet } = useDevice();
const route = useRoute();
const groupItem = ref<GroupChatDto>();
const groupId = computed<number>(() => getParamNumber('groupId') || 0);
const dialogLeft = ref(false);
const dialogRight = ref(false);
const firstLoad = ref(false);
const loading = ref(true);

const dataList = ref<GroupChatDto[]>([...chatHistoryListApi.dataList]);
onMounted(async () => {
  isMobileOrTablet().then((res) => {
    if (res) {
      dialogLeft.value = true;
    }
  });
  await onFetchGroupData();
  firstLoad.value = true;
});
const onItemClick = (item: GroupChatDto) => {
  if (item) {
    appNavigateTo(`/example/chats/g/${item.id}`);
  }
};
const onFetchGroupData = async () => {
  loading.value = true;
  await onClearConversation();
  if (!groupId.value) {
    loading.value = false;
    return new Promise((resolve) => resolve(false));
  }
  const res = dataList.value.find((t) => t.id == groupId.value);
  console.log('onFetchGroupData, id ', groupId.value, res);
  if (res) {
    groupItem.value = cloneObject<GroupChatDto>(res);
  }
  loading.value = false;
  return new Promise((resolve) => {
    resolve(true);
  });
};
const onClearConversation = () => {
  groupItem.value = undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
const setSettingeStore = (type: ChatSettingType, chatId: number) => {
  chatStore.toggleChatSetting = true;
  chatStore.chatId = chatId;
  chatStore.chatSettingType = type;
};
const toggleMute = async (chatId: number, fromConversation: boolean = true) => {
  if (!chatId) {
    return;
  }
  if (fromConversation && groupItem.value) {
    console.log('toggleMute', chatId);
    groupItem.value.muteNotify = !groupItem.value.muteNotify;
  }
  setSettingeStore('NOTIFICATION', chatId);
};
const togglepin = async (chatId: number, fromConversation: boolean = true) => {
  if (!chatId) {
    return;
  }
  if (fromConversation && groupItem.value) {
    groupItem.value.pin = !groupItem.value.pin;
  }
  setSettingeStore('PIN', chatId);
};
const toggleFav = async (chatId: number, fromConversation: boolean = true) => {
  if (!chatId) {
    return;
  }
  if (fromConversation && groupItem.value) {
    groupItem.value.favorite = !groupItem.value.favorite;
  }
  setSettingeStore('FAVORITE', chatId);
};
const deleteChat = async (chatId: number, fromConversation: boolean = true) => {
  if (!chatId) {
    return;
  }
  setSettingeStore('LEAVE', chatId);
  if (fromConversation) {
    onClearConversation();
    appNavigateTo('/example/chats/g/0', true);
  }
};
const leaveChatGroup = async (chatId: number, fromConversation: boolean = true) => {
  if (!chatId) {
    return;
  }
  setSettingeStore('LEAVE', chatId);
  if (fromConversation) {
    onClearConversation();
    appNavigateTo('/example/chats/g/0', true);
  }
};
const onCloseChat = (chatId: number) => {
  console.log('onCloseChat', chatId);
  onClearConversation();
  appNavigateTo('/example/chats/g/0', true);
};
watch(
  () => route.params.groupId,
  () => {
    onFetchGroupData();
  },
);
</script>
<template>
  <q-page>
    <q-card flat square style="min-height: 91vh">
      <div class="row">
        <div class="col-12 col-md-3 col-sm-4 q-pa-sm" v-if="screen.gt.xs">
          <BaseSuspense>
            <template #default>
              <chat-left
                class="content-limit720"
                @on-item-click="onItemClick"
                :group-item="groupItem"
              />
            </template>
            <template #fallback>
              <SkeletonItem :no="5" />
            </template>
          </BaseSuspense>
        </div>
        <div v-else class="col-12">
          <q-btn :icon="biList" flat round @click="dialogLeft = true" />
          <q-btn :icon="biList" flat round @click="dialogRight = true" class="float-right" />
        </div>
        <div class="col-12 col-md-6 col-sm-8 q-pa-md">
          <!-- <base-spinner v-if="loading" /> -->
          <SkeletonItem v-if="loading" show-header :no="8" />
          <chat-content
            v-else-if="groupItem"
            v-model="groupItem"
            class="content-limit"
            @toggle-mute="toggleMute"
            @toggle-pin="togglepin"
            @toggle-fav="toggleFav"
            @delete-chat="deleteChat"
            @leave-group="leaveChatGroup"
            @on-close="onCloseChat"
          />
          <template v-else>
            <div style="height: 50vh" class="row items-center flex-center">
              <BaseResult
                status="empty"
                :description="t('chats.chatContentEmpty')"
                :show-icon="false"
              >
                <template #extra>
                  <q-icon :name="biChatDots" size="120px" class="text-muted" />
                </template>
              </BaseResult>
            </div>
          </template>
        </div>
        <div class="col-12 col-md-3 q-pa-sm" v-if="screen.gt.xs && screen.gt.sm">
          <BaseSuspense>
            <template #default>
              <chat-right
                v-if="groupItem"
                v-model="groupItem"
                @toggle-mute="toggleMute"
                @toggle-pin="togglepin"
                @toggle-fav="toggleFav"
                :show-close="isSmallScreen"
                @on-close="dialogRight = false"
                class="content-limit720"
              />
            </template>
            <template #fallback>
              <SkeletonItem :no="5" />
            </template>
          </BaseSuspense>
        </div>
      </div>
    </q-card>

    <q-dialog v-model="dialogLeft" position="left">
      <q-card style="max-width: 350px; min-width: 90vw; min-height: 100vh">
        <chat-left
          :auto-detect="false"
          @on-item-click="onItemClick"
          show-close
          @on-close="dialogLeft = false"
          :group-item="groupItem"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-if="dialogRight && groupItem" v-model="dialogRight" position="right">
      <q-card style="max-width: 350px; min-height: 100vh">
        <chat-right
          v-model="groupItem"
          @toggle-mute="toggleMute"
          @toggle-pin="togglepin"
          @toggle-fav="toggleFav"
          show-close
          @on-close="dialogRight = false"
          class="content-limit720"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>
