import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ChatSettingType } from '@/types/common';
import type { GroupChatRequest } from '@/types/models';

export const useChatStore = defineStore('chatStore', () => {
  const removeChat = ref(false);
  const chatId = ref<number>();
  const messageIdFocus = ref<number>();
  const toggleChatSetting = ref(false);
  const chatSettingType = ref<ChatSettingType>();
  const requestItem = ref<GroupChatRequest>();
  const totalNewChat = ref<number>(0);
  const currentDateForShow = ref<string>();

  const openMiniChatPage = ref<boolean>(false);
  const miniChatGroupId = ref<number>();
  const miniChatMinimize = ref(false);
  const clearSetting = () => {
    chatId.value = undefined;
    chatSettingType.value = undefined;
    toggleChatSetting.value = false;
    requestItem.value = undefined;
  };

  const onCloseMiniChatPage = () => {
    openMiniChatPage.value = false;
    miniChatGroupId.value = undefined;
    miniChatMinimize.value = false;
  };
  const isCurrentOpenMiniChatByGroupId = (groupChatId: number) => {
    if (!groupChatId) {
      return false;
    }
    return openMiniChatPage.value && miniChatGroupId.value && miniChatGroupId.value == groupChatId;
  };
  return {
    removeChat,
    chatId,
    totalNewChat,
    toggleChatSetting,
    chatSettingType,
    clearSetting,
    currentDateForShow,
    requestItem,
    messageIdFocus,
    onCloseMiniChatPage,
    openMiniChatPage,
    miniChatGroupId,
    miniChatMinimize,
    isCurrentOpenMiniChatByGroupId
  };
});
