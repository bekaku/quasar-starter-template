<script setup lang="ts">
import ChatHistoryItem from '@/components/chats/ChatHistoryItem.vue';
import { useLang } from '@/composables/useLang';
import type { ChatHistoryTab, ChatType, LabelValue } from '@/types/common';
import {
  biChatDots,
  biPeople,
  biPerson,
  biPlus,
  biSearch,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { chatHistoryListApi } from 'src/libs/data';
import { useChatStore } from 'src/stores/chatStore';
import type { GroupChatDto } from 'src/types/models';
import { computed, onMounted, ref, watch } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseCard from '../base/BaseCard.vue';
import BaseDropdownMenu from '../base/BaseDropdownMenu.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseResult from '../base/BaseResult.vue';
import BaseScrollArea from '../base/BaseScrollArea.vue';
import BaseTabs from '../base/BaseTabs.vue';
import BaseTooltip from '../base/BaseTooltip.vue';
import { sortArray } from 'src/utils/appUtil';
const {
  showClose = false,
  autoDetect = true,
  groupItem,
} = defineProps<{
  groupItem?: GroupChatDto | undefined;
  height?: number;
  showClose?: boolean;
  autoDetect?: boolean;
}>();
const { t } = useLang();
const chatStore = useChatStore();
const emit = defineEmits(['on-item-click', 'on-close']);
const histotyTab = ref<ChatHistoryTab>('ALL');
const histotyTabs = ref<LabelValue<ChatHistoryTab>[]>([
  {
    label: t('chats.all'),
    value: 'ALL',
  },
  {
    label: t('chats.groups'),
    value: 'GROUP',
  },
  {
    label: t('chats.favorite'),
    value: 'FAVORITE',
  },
]);
const dataList = ref<GroupChatDto[]>([...chatHistoryListApi.dataList]);

const searchText = ref();
// new chat
const showNewChatDialog = ref(false);
const newChatType = ref<ChatType>('PERSONAL');
const menus = ref<LabelValue<ChatType>[]>([
  {
    label: t('chats.addNewprivateChat'),
    icon: biPerson,
    value: 'PERSONAL',
  },
  {
    label: t('chats.groupChatCreate'),
    icon: biPeople,
    value: 'GROUP',
  },
]);
onMounted(async () => {
  if (autoDetect) {
    detectAutoChat();
  }
});

const filterHistoryItems = computed<GroupChatDto[]>(() => {
  const s = searchText.value?.toString().trim();
  if (!s) {
    return dataList.value;
  }
  return dataList.value.filter(
    (item) => item.groupName && item.groupName.toLowerCase().includes(s.toLowerCase()),
  );
});
const itemGroups = computed(() => filterHistoryItems.value.filter((t) => t.chatType == 'GROUP'));
const itemFavorites = computed(() => filterHistoryItems.value.filter((t) => t.favorite));
const detectAutoChat = () => {
  if (dataList.value && dataList.value.length > 0) {
    const firstItem = dataList.value[0];
    if (firstItem) {
      onItemClick(firstItem);
    }
  }
};
const onMenuClick = (value: ChatType | string | undefined) => {
  console.log('onMenuClick', value);
};
const onItemClick = (item: GroupChatDto) => {
  emit('on-item-click', item);
};
// new chat
const onOpenNewChatDialog = (type: ChatType = 'PERSONAL') => {
  newChatType.value = type;
  showNewChatDialog.value = true;
};
const onSuccessCreatedNewChat = (item: GroupChatDto) => {
  onItemClick(item);
  showNewChatDialog.value = false;
};

const onUpdatesearch = (e: string | number | undefined | null) => {
  console.log('onUpdatesearch', e);
};
const findIndexByID = (groupChatd: number) => {
  return dataList.value.findIndex((t) => t.id == groupChatd);
};
const findItemByIndex = (index: number) => {
  return dataList.value[index];
};
const updatePinSort = async () => {
  const list = await sortArray(dataList.value, 'pin', 'desc');
  dataList.value = list;
};
const removeChat = (index: number | null) => {
  if (index != null && index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      dataList.value.splice(index, 1);
    }
  }
};
const clearUnreadMessage = async (groupChatId: number, clearToServer = true) => {
  if (groupChatId) {
    const index = findIndexByID(groupChatId);
    if (index >= 0) {
      const item = findItemByIndex(index);
      if (item && item.id) {
        item.totalNewMessage = 0;
        if (clearToServer) {
          // TODO
        }
      }
    }
  }
};
const updateSetting = () => {
  if (!chatStore?.chatId || !chatStore?.chatSettingType) {
    chatStore.clearSetting();
    return;
  }

  const index = findIndexByID(chatStore.chatId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      switch (chatStore.chatSettingType) {
        case 'NOTIFICATION':
          item.muteNotify = !item.muteNotify;
          break;
        case 'PIN':
          item.pin = !item.pin;
          updatePinSort();
          break;
        case 'FAVORITE':
          item.favorite = !item.favorite;
          break;
        case 'LEAVE':
          removeChat(index);
          break;
        case 'CLEAR_NEW_MESSAGE_NUMBER':
          if (item.totalNewMessage > 0 && item.id) {
            clearUnreadMessage(item.id, true);
          }
          break;
        case 'CLEAR_NEW_MESSAGE_NUMBER_ONLY':
          if (item.id) {
            clearUnreadMessage(item.id, false);
          }
          break;
        case 'UPDATE_DATA':
          // TODO
          // if (chatStore?.requestItem) {
          //   item.groupName = chatStore.requestItem.groupName;
          //   if (chatStore.requestItem?.deleteAvatar) {
          //     item.dtoAvatar = null;
          //   }
          //   if (chatStore.requestItem?.newAvatar) {
          //     item.dtoAvatar = chatStore.requestItem.newAvatar;
          //   }
          // }
          break;
      }
    }
  }
  chatStore.clearSetting();
};
watch(chatStore, (state) => {
  if (state.toggleChatSetting) {
    updateSetting();
  }
});
</script>
<template v-bind="$attrs">
  <BaseCard flat :bordered="false">
    <q-toolbar>
      <q-toolbar-title class="text-weight-bold">
        {{ t('chats.chats') }}
      </q-toolbar-title>
      <BaseButton v-if="showClose" flat round :icon="biX" @click="$emit('on-close')" />
      <BaseButton flat round :icon="biPlus">
        <BaseDropdownMenu :items="menus" @on-click="onMenuClick" />
        <BaseTooltip>
          {{ t('chats.addNewChat') }}
        </BaseTooltip>
      </BaseButton>
    </q-toolbar>
    <q-card-section>
      <BaseInput
        v-model="searchText"
        :label="t('base.search')"
        :debounce="250"
        @update:model-value="onUpdatesearch"
      >
        <template #prepend>
          <q-icon :name="biSearch" />
        </template>
      </BaseInput>
    </q-card-section>

    <BaseTabs v-model="histotyTab" :items="histotyTabs" use-tab-panels keep-alive :animated="false" class="q-ml-xs">
      <template #ALL>
        <template v-if="filterHistoryItems.length > 0">
          <q-list>
            <BaseScrollArea height="61vh">
              <chat-history-item
                v-for="(item, index) in filterHistoryItems"
                :key="`all-${item.id}-${index}`"
                :item="item"
                :is-active="groupItem?.id == item.id"
                @on-item-click="onItemClick"
              />
            </BaseScrollArea>
          </q-list>
        </template>
        <template v-else>
          <BaseResult status="empty" :description="t('chats.chatHistoryEmpty')" :show-icon="false">
            <template #extra>
              <q-icon :name="biChatDots" size="70px" class="text-muted" />
            </template>
          </BaseResult>
        </template>
      </template>
      <template #GROUP>
        <template v-if="filterHistoryItems.length > 0">
          <q-list>
            <BaseScrollArea height="61vh">
              <chat-history-item
                v-for="(itemGroup, indexGroup) in itemGroups"
                :key="`group-${itemGroup.id}-${indexGroup}`"
                :item="itemGroup"
                :is-active="groupItem?.id == itemGroup.id"
                @on-item-click="onItemClick"
              />
            </BaseScrollArea>
          </q-list>
        </template>
        <template v-else>
          <BaseResult status="empty" :description="t('chats.chatHistoryEmpty')" :show-icon="false">
            <template #extra>
              <q-icon :name="biChatDots" size="70px" class="text-muted" />
            </template>
          </BaseResult>
        </template>
      </template>
      <template #FAVORITE> 
        <template v-if="itemFavorites.length > 0">
          <q-list>
            <BaseScrollArea height="61vh">
              <chat-history-item
              v-for="(itemFav, indexFav) in itemFavorites"
                :key="`fav-${itemFav.id}-${indexFav}`"
                :item="itemFav"
                :is-active="groupItem?.id == itemFav.id"
                @on-item-click="onItemClick"
              />
            </BaseScrollArea>
          </q-list>
        </template>
        <template v-else>
          <BaseResult status="empty" :description="t('chats.chatHistoryEmpty')" :show-icon="false">
            <template #extra>
              <q-icon :name="biChatDots" size="70px" class="text-muted" />
            </template>
          </BaseResult>
        </template>  
      </template>
    </BaseTabs>
  </BaseCard>
</template>
