<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatMessage from '@/components/chats/Message.vue';
import type { ChatHistoryTab } from '@/types/common';
import { biSearch, biThreeDots } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import { useLang } from 'src/composables/useLang';
import { useChatStore } from 'src/stores/chatStore';
import { useAuthenStore } from 'src/stores/authenStore';
import type { GroupChatDto } from 'src/types/models';
import ChatContentHeader from './ChatContentHeader.vue';

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
onMounted(async () => {});

const invitePeople=(chatId: number) => {
  console.log('invitePeople', chatId);
}
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
      <q-scroll-area
        style="height: 68vh"
        content-active-style="width: 100%;"
        content-style="width: 100%;"
      >
        <div class="q-pa-md">
          <chat-message />
        </div>
      </q-scroll-area>
    </BaseCard>
    <ChatInput />
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
