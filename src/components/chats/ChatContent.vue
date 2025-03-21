<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatMessage from '@/components/chats/ChatMessage.vue';
import type { ChatHistoryTab } from '@/types/common';
import { biSearch, biThreeDots } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref, useTemplateRef } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import { useLang } from 'src/composables/useLang';
import { useChatStore } from 'src/stores/chatStore';
import { useAuthenStore } from 'src/stores/authenStore';
import type {
  EmojiCountDto,
  EmojiType,
  GroupChatDto,
  GroupChatMsgDto,
  GroupChatMsgRequest,
} from 'src/types/models';
import ChatContentHeader from './ChatContentHeader.vue';
import BaseScrollArea from '../base/BaseScrollArea.vue';
import { chatMessageListApi } from 'src/libs/data';

const {
  showHeader = true,
  square = false,
  inputAvata = true,
  scrollAreaHeight = '65vh',
  miniChat = false,
  miniminze = false,
} = defineProps<{
  showHeader?: boolean;
  square?: boolean;
  inputDense?: boolean;
  inputAvata?: boolean;
  scrollAreaHeight?: string;
  miniChat?: boolean;
  miniminze?: boolean;
}>();
const emit = defineEmits<{
  'toggle-mute': [chatId: number];
  'toggle-pin': [chatId: number];
  'toggle-fav': [chatId: number];
  'toggle-chat': [chatId: number];
  'delete-chat': [chatId: number];
  'leave-group': [chatId: number];
  'on-close': [chatId: number];
}>();
const { t } = useLang();
const chatStore = useChatStore();
const authenStore = useAuthenStore();
const modelValue = defineModel<GroupChatDto>();
const dataList = ref<GroupChatMsgDto[]>([...chatMessageListApi.dataList]);

const scrollAreaRef = ref<any>(null);
const chatInfinityScrollRef = useTemplateRef<any>('chatInfinityScrollRef');
const setScrollTimeout = ref<any>(null);
const isScrollingToTop = ref(false);
const currentUserID = ref<number>();
const latestUpdateReadMessageId = ref<number>();
const updateReadTimeout = ref<any>(null);

const showSearch = ref(false);
const textSearch = ref<string>('');
const messageEntity = ref<GroupChatMsgRequest>({
  chatMsg: null,
  fileIds: [],
  chatMessageType: null,
});
const showTypingTextProgress = ref(false);
const replyMessageItem = ref<GroupChatMsgDto>();
const showMessageDialog = ref(false);
const messageSelectdId = ref<number>();
const showSeenDialog = ref(false);
const messageSelectdReadCount = ref<number>(0);
const showChatInput = ref(true);
const showChatInputTimeout = ref();
const chatContentInputRef = useTemplateRef('chatContentInputRef');
const focusTimeout = ref<any>(null);
const showMessageShareDialog = ref(false);
const miniminzeNewMessage = ref<number>(0);
const shareMessageItem = ref<GroupChatMsgDto>();
const showActionForm = ref(false);
const showPostForm = ref(false);
const scrollerChatRef = ref<any>(null);
const infinityResumeTimeout = ref<any>(null);

onMounted(async () => {});

const invitePeople = (chatId: number) => {
  console.log('invitePeople', chatId);
};
const findIndexByID = (messageId: number): Promise<number> => {
  return new Promise((resolve) => {
    const i = dataList.value.findIndex((t) => t.id == messageId);
    resolve(i);
  });
};
const findMessageById = async (messageId: number): Promise<GroupChatMsgDto | undefined> => {
  return new Promise((resolve) => {
    const item = dataList.value.find((t) => t.id == messageId);
    resolve(item);
  });
};
const findItemByIndex = (index: number) => {
  return dataList.value[index];
};
const removeItemByIndex = (index: number) => {
  if (index >= 0) {
    dataList.value.splice(index, 1);
  }
};
const messageDelete = async (messageId: number) => {
  const index = await findIndexByID(messageId);
  if (index >= 0) {
    removeItemByIndex(index);
  }
  // TODO delete from server
  // await deleteMessage(messageId)
};
const messageUnsend = async (messageId: number, unsendToServer: boolean = true) => {
  if (!messageId) {
    return;
  }

  const index = await findIndexByID(messageId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      item.unsend = true;
      item.chatMsg = undefined;
      item.files = [];
      item.reactionEngage = [];
    }
    if (unsendToServer) {
      // TODO unsend from server
      // await unsendMessage(messageId)
    }
  }
};
const messageRead = async (messageId: number) => {
  if (!messageId) {
    return;
  }

  const index = await findIndexByID(messageId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item && item.sent) {
      item.readCount = item.readCount + 1;
    }
  }
};
const messageReaction = async (l: EmojiType, messageId: number) => {
  const index = await findIndexByID(messageId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      if (!item.liked) {
        item.liked = true;
        item.emojiType = l;
      } else if (item.liked && item.emojiType == l) {
        item.liked = false;
        item.emojiType = null;
      } else {
        item.emojiType = l;
      }
      // TODO reaction from server
      // await reactionMessage(messageId, { emojiId: l, id: null })
    }
  }
};
const messageReactionUpdate = async (items: EmojiCountDto[], messageId: number) => {
  const index = await findIndexByID(messageId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      item.reactionEngage = items;
    }
  }
};
const messageReply = async (replyToMessageId: number) => {
  showChatInput.value = false;
  showChatInputTimeout.value = setTimeout(() => {
    showChatInput.value = true;
  }, 100);
  const index = await findIndexByID(replyToMessageId);
  if (index >= 0) {
    const item = findItemByIndex(index);
    if (item) {
      replyMessageItem.value = item;
    }
  }
};
const onOpenSeenDialog = (messageId: number, readCount: number) => {
  if (!messageId) {
    return;
  }
  messageSelectdId.value = messageId;
  messageSelectdReadCount.value = readCount;
  showSeenDialog.value = true;
};
const onOpenMessageDialog = async (messageId: number) => {
  if (!messageId) {
    return;
  }
  const itemIndex = await findIndexByID(messageId);
  if (itemIndex >= 0) {
    // onScrollToItem(itemIndex)
  } else {
    messageSelectdId.value = messageId;
    showMessageDialog.value = true;
  }
};
const onShare = async (messageId: number) => {
  if (!messageId) {
    return;
  }
  const shareItem = await findMessageById(messageId);
  if (shareItem) {
    shareMessageItem.value = shareItem;
    showMessageShareDialog.value = true;
  }
};
</script>
<template>
  <div v-bind="$attrs">
    <BaseCard
      v-if="modelValue"
      flat
      :bordered="!square"
      class="card-bg"
      :class="{ 'card-minipage-style': miniChat }"
      :square
    >
      <template v-if="showHeader">
        <ChatContentHeader
          :item="modelValue"
          :mini-chat
          :miniminze
          @toggle-pin="(chatId: number) => $emit('toggle-pin', chatId)"
          @toggle-mute="(chatId: number) => $emit('toggle-mute', chatId)"
          @toggle-fav="(chatId: number) => $emit('toggle-fav', chatId)"
          @delete-chat="(chatId: number) => $emit('delete-chat', chatId)"
          @leave-group="(chatId: number) => $emit('leave-group', chatId)"
          @invite-people="invitePeople"
          @on-close="(chatId: number) => $emit('on-close', chatId)"
        />
        <q-separator />
      </template>
      <BaseScrollArea height="68vh">
        <div class="q-pa-md">
          <!-- <chat-message /> -->
          <ChatMessage
            v-for="(item, index) in dataList"
            :key="`message-${item.id}-${index}`"
            :item="item"
            :index="index"
            :chat-type="modelValue.chatType"
            :mini-chat="miniChat"
            :high-light-text="textSearch"
            @message-reaction="messageReaction"
            @message-delete="messageDelete"
            @message-unsend="messageUnsend"
            @message-reply="messageReply"
            @on-open-seen-dialog="onOpenSeenDialog"
            @on-open-message-dialog="onOpenMessageDialog"
            @message-share="onShare"
          />
        </div>
      </BaseScrollArea>
    </BaseCard>
    <ChatInput ref="chatContentInputRef" />
  </div>
</template>
<style lang="scss" scoped>
.card-bg {
  background-color: var(--color-zinc-50);
}

.card-top-bg {
  background-color: #fff;
}
.card-minipage-style {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
body.body--dark {
  .card-bg {
    background-color: var(--color-zinc-800);
  }

  .card-top-bg {
    background-color: var(--color-zinc-900);
  }
}
</style>
