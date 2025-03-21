<script setup lang="ts">
import type { EmojiType, GroupChatMsgDto } from '@/types/models';
import type { ChatType } from '@/types/common';
import ChatMessageItem from '@/components/chats/ChatMessageItem.vue';
import { defineAsyncComponent } from 'vue';
const ChatMessageReply = defineAsyncComponent(
  () => import('@/components/chats/ChatMessageReply.vue'),
);
const {
  item,
  showSenderAvatar = false,
  showSenderName = false,
  miniChat = false,
} = defineProps<{
  item: GroupChatMsgDto;
  chatType: ChatType;
  index?: number;
  showSenderAvatar?: boolean;
  showSenderName?: boolean;
  miniChat?: boolean;
  label?: string;
  highLightText?: string;
}>();

const emit = defineEmits<{
  'message-reaction': [type: EmojiType, id: number];
  'message-delete': [id: number];
  'message-unsend': [id: number];
  'message-reply': [id: number];
  'on-open-seen-dialog': [id: number, count: number];
  'message-share': [id: number];
  'on-open-message-dialog': [id: number];
}>();

const onReact = async (l: EmojiType) => {
  if (!item.id) {
    return;
  }
  emit('message-reaction', l, item.id);
};
const onDelete = async () => {
  if (!item.id) {
    return;
  }
  emit('message-delete', item.id);
};
const onUnsend = async () => {
  if (!item.id) {
    return;
  }
  emit('message-unsend', item.id);
};
const onRepy = async () => {
  if (!item.id) {
    return;
  }
  emit('message-reply', item.id);
};
const onShare = async () => {
  if (!item.id) {
    return;
  }
  emit('message-share', item.id);
};
const onOpenReadDialog = (messageId: number, readCount: number) => {
  emit('on-open-seen-dialog', messageId, readCount);
};
const onReplyClick = (messageId: number) => {
  // if (miniChat) {
  //   return;
  // }
  // const selector = document.getElementById(`${ChatMesageFocusableId}-${messageId}`);
  // if (selector && selector?.scrollIntoView) {
  //   selector.scrollIntoView();
  // } else {
  //   emit('on-open-message-dialog', messageId);
  // }
  emit('on-open-message-dialog', messageId);
};
</script>

<template>
  <template v-if="item.dtoReplyTo && !item.unsend">
    <ChatMessageReply
      :item="item.dtoReplyTo"
      :sent="item.sent"
      @on-click="onReplyClick"
      :mini-chat="miniChat"
    />
  </template>
  <ChatMessageItem
    :item="item"
    :index="index"
    :chat-type="chatType"
    :have-reply="item.dtoReplyTo != null"
    :mini-chat="miniChat"
    :high-light-text="highLightText"
    :show-sender-avatar="showSenderAvatar"
    :show-sender-name="showSenderName"
    @message-delete="onDelete"
    @message-unsend="onUnsend"
    @message-reply="onRepy"
    @message-reaction="onReact"
    @on-open-seen-dialog="onOpenReadDialog"
    @message-share="onShare"
  />
</template>
