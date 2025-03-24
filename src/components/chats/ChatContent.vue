<script setup lang="ts">
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatMessage from '@/components/chats/ChatMessage.vue';
import { useLang } from 'src/composables/useLang';
import { chatMessageListApi, userItems } from 'src/libs/data';
import { useAuthenStore } from 'src/stores/authenStore';
import { useChatStore } from 'src/stores/chatStore';
import type {
  EmojiCountDto,
  EmojiType,
  FileManagerDto,
  GroupChatDto,
  GroupChatFileDto,
  GroupChatMsgDto,
  GroupChatMsgRequest,
} from 'src/types/models';
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import BaseInfiniteScroll from '../base/BaseInfiniteScroll.vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseVirtualScrollerDynamic from '../base/BaseVirtualScrollerDynamic.vue';
import ChatContentHeader from './ChatContentHeader.vue';
import { biArrowDown } from '@quasar/extras/bootstrap-icons';
import { useTheme } from 'src/composables/useTheme';
import { randomNumber } from 'src/utils/appUtil';
import { getImgUrlFromFile, isImageFile } from '@/utils/fileUtil';
import { FORMAT_DATE13, getCurrentDateByFormat } from 'src/utils/dateUtil';
import type { VirtualScrollerUpdate } from 'src/types/common';
import { file } from 'jszip';
import { is } from 'quasar';
const ChatReplyItem = defineAsyncComponent(() => import('@/components/chats/ChatReplyItem.vue'));
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
const { isDark } = useTheme();
const chatStore = useChatStore();
const authenStore = useAuthenStore();
const modelValue = defineModel<GroupChatDto>();
const dataList = ref<GroupChatMsgDto[]>([...chatMessageListApi.dataList]);
const chatInfinityScrollRef = useTemplateRef<any>('chatInfinityScrollRef');
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
const showMessageShareDialog = ref(false);
const miniminzeNewMessage = ref<number>(0);
const shareMessageItem = ref<GroupChatMsgDto>();
const scrollerChatRef = useTemplateRef<any>('scrollerChatRef');

const chatInfiniteDisable = ref<boolean>(true);
const creatingNewMessage = ref(false);

const uploadFileTotal = ref<number>(0);
const uploadFileSucess = ref<number>(0);
const mockLatesChattId = ref<number>(1000);
const isScrollingToTop = ref<boolean>(false);

const initialTimeout = ref<any>(null);
const createMessageTimeout = ref<any>(null);
onMounted(async () => {
  initialChatList();
});

// infinite scroll
const initialChatList = async () => {
  initialTimeout.value = setTimeout(() => {
    scrollToBottom();
    initialTimeout.value = setTimeout(() => {
      chatInfiniteDisable.value = false;
    }, 1000);
  }, 1500);
};
const onInfiniteChatVirtual = (index: number, done: any) => {
  console.log('onInfiniteChatVirtual', index);
  setTimeout(async () => {
    done();
    // TODO
    stopChatInfinityScroll();
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
const onVirtualScrollUpdate = (item: VirtualScrollerUpdate) => {
  if (!item) {
    return;
  }
  isScrollingToTop.value = !(item.visibleEndIndex == item.viewEndIndex);
};
const scrollToBottom = () => {
  isScrollingToTop.value = false;
  if (scrollerChatRef.value) {
    scrollerChatRef.value.onScrollToBottom();
  }
};
const onScrollToItem = (index: number | undefined) => {
  if (index == undefined) {
    return;
  }
  if (scrollerChatRef.value) {
    scrollerChatRef.value.onScrollToItem(index);
  }
};
// end infinite scroll
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
  return new Promise((resolve) => {
    if (index >= 0) {
      dataList.value.splice(index, 1);
    }
    resolve(true);
  });
};
const messageDelete = async (messageId: number) => {
  console.log('messageDelete', messageId);
  stopChatInfinityScroll();
  const index = await findIndexByID(messageId);
  if (index >= 0) {
    await removeItemByIndex(index);
  }
  scrollToBottom();
  resumeChatInfinityScroll();
  // TODO delete from server
  // await deleteMessage(messageId)
};
const messageUnsend = async (messageId: number, unsendToServer: boolean = true) => {
  console.log('messageUnsend', { messageId, unsendToServer });
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
  console.log('messageReaction', { l, messageId });
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
      if (!item.reactionEngage) {
        item.reactionEngage = [];
      }
      const exist = item.reactionEngage.find((t) => t.emojiType == l);
      if (!exist) {
        item.reactionEngage.push({ emojiType: l, total: 1 });
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
  console.log('messageReply', replyToMessageId);
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
const onCloseReplyTo = () => {
  replyMessageItem.value = undefined;
};
const onOpenSeenDialog = (messageId: number, readCount: number) => {
  console.log('onOpenSeenDialog', { messageId, readCount });
  if (!messageId) {
    return;
  }
  messageSelectdId.value = messageId;
  messageSelectdReadCount.value = readCount;
  showSeenDialog.value = true;
};
const onFocusMessageReply = async (messageId: number) => {
  if (!messageId) {
    return;
  }
  const itemIndex = await findIndexByID(messageId);
  if (itemIndex >= 0) {
    onScrollToItem(itemIndex);
  } else {
    messageSelectdId.value = messageId;
    showMessageDialog.value = true;
  }
};
const onShare = async (messageId: number) => {
  console.log('onShare', messageId);
  if (!messageId) {
    return;
  }
  const shareItem = await findMessageById(messageId);
  if (shareItem) {
    shareMessageItem.value = shareItem;
    showMessageShareDialog.value = true;
  }
};

// send message
const onChatInputFocus = () => {
  if (chatContentInputRef.value) {
    chatContentInputRef.value.onInputFocus();
  }
};
const onSendMessage = async (
  message: string | undefined,
  files: File[] | undefined,
  mapLatlong: string | undefined,
) => {
  if (!modelValue.value || !modelValue.value?.id) {
    return;
  }
  if (!message && !files && !mapLatlong) {
    return;
  }
  scrollToBottom();
  creatingNewMessage.value = true;
  console.log('onSendMessage', { message, files, mapLatlong });
  if (message) {
    messageEntity.value.chatMsg = message;
  }
  if (mapLatlong) {
    messageEntity.value.chatMsg = mapLatlong;
    messageEntity.value.chatMessageType = 'LOCATION';
  }
  if (replyMessageItem.value && replyMessageItem.value?.id) {
    messageEntity.value.replyToId = replyMessageItem.value.id;
  }


  const filesUploads: GroupChatFileDto[] = await uploadFileProcess(files);
  if (filesUploads.length > 0) {
    messageEntity.value.chatMessageType = 'IMAGE';
  }
  // TODO
  // try {
  //   await createNewMessage(modelValue.value.id, messageEntity.value)
  // } catch (e) {
  //   console.log(e)
  // } finally {
  //   onClearMessage()
  // }

  await mockCreateNewMessage(filesUploads);
  scrollToBottom();
  await creatMockReplyMessage();
  scrollToBottom();
  onClearMessage();
};
const uploadFileProcess = async (files: File[] | undefined): Promise<GroupChatFileDto[]> => {
  const filesUploads: GroupChatFileDto[] = [];
  if (files && files.length > 0) {
    // TODO upload file to server
    for (const f of files) {
      const finalFile = await mockUploadFile(f);
      if (finalFile) {
        filesUploads.push(finalFile);
      }
    }
    return new Promise((resolve) => resolve(filesUploads));
  } else {
    return new Promise((resolve) => resolve(filesUploads));
  }
};
const mockUploadFile = async (f: File): Promise<GroupChatFileDto | null> => {
  const isImg = isImageFile(f);
  let url: string | undefined;
  if (isImg) {
    url = await getImgUrlFromFile(f);
    mockLatesChattId.value++;
    return new Promise((resolve) =>
      resolve({
        id: mockLatesChattId.value,
        fileManager: {
          id: mockLatesChattId.value,
          fileMime: f.type,
          fileName: f.name,
          filePath: url || '',
          fileThumbnailPath: '',
          fileSize: f.size + '',
          functionId: 0,
          isImage: isImg,
          image: isImg,
          file: f,
        },
      }),
    );
  }
  return new Promise((resolve) => resolve(null));
};
const mockCreateNewMessage = (filesUploads: GroupChatFileDto[]) => {
  if (!messageEntity.value) {
    return new Promise((resolve) => resolve(true));
  }
  mockLatesChattId.value++;
  const createItem: GroupChatMsgDto = {
    id: mockLatesChattId.value,
    chatMsg: messageEntity.value.chatMsg,
    msgDateTime: getCurrentDateByFormat(FORMAT_DATE13),
    groupId: 17,
    readCount: 0,
    unsend: false,
    sent: true,
    sendUser: authenStore.auth,
    files: filesUploads,
    liked: false,
    emojiType: null,
    reactionEngage: [],
    dtoReplyTo: replyMessageItem.value || null,
    chatMessageType: messageEntity.value.chatMessageType || 'TEXT',
  };
  console.log('createItem', createItem);
  return new Promise((resolve) => {
    createMessageTimeout.value = setTimeout(() => {
      creatingNewMessage.value = false;
      dataList.value.push(createItem);
      resolve(true);
    }, 1000);
  });
};

const creatMockReplyMessage = () => {
  showTypingTextProgress.value = true;
  mockLatesChattId.value++;
  const createAutoReplyItem: GroupChatMsgDto = {
    id: mockLatesChattId.value,
    chatMsg: 'Doing fine, how r you?',
    msgDateTime: getCurrentDateByFormat(FORMAT_DATE13),
    groupId: 17,
    readCount: 10,
    unsend: false,
    sent: false,
    sendUser: userItems[randomNumber(0, 15)],
    files: [],
    liked: false,
    emojiType: null,
    reactionEngage: [],
    dtoReplyTo: replyMessageItem.value || null,
    chatMessageType: 'TEXT',
  };
  return new Promise((resolve) => {
    createMessageTimeout.value = setTimeout(() => {
      showTypingTextProgress.value = false;
      dataList.value.push(createAutoReplyItem);
      resolve(true);
    }, 1000);
  });
};

const onClearMessage = () => {
  // creatingNewMessage.value = false;
  messageEntity.value.fileIds = [];
  messageEntity.value.chatMsg = null;
  messageEntity.value.replyToId = null;
  messageEntity.value.chatMessageType = undefined;
  replyMessageItem.value = undefined;
  uploadFileTotal.value = 0;
  uploadFileSucess.value = 0;
};
// end send message
onUnmounted(() => {
  if (initialTimeout.value) {
    clearTimeout(initialTimeout.value);
    initialTimeout.value = null;
  }
  if (createMessageTimeout.value) {
    clearTimeout(createMessageTimeout.value);
    createMessageTimeout.value = null;
  }
});
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
      :margin="false"
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
        >
        <template #headerRight>
          <slot name="headerRight" />
        </template>

        </ChatContentHeader>
        <q-separator />
      </template>
      <div v-show="!miniminze">
        <BaseVirtualScrollerDynamic
          id="scroll-chat-target-id"
          ref="scrollerChatRef"
          class="q-pa-sm"
          key-field="id"
          :items="dataList"
          :min-item-size="24"
          :scroll-area-height="scrollAreaHeight"
          @on-update="onVirtualScrollUpdate"
        >
          <template #slotBefore>
            <BaseInfiniteScroll
              ref="chatInfinityScrollRef"
              scroll-target="#scroll-chat-target-id"
              reverse
              :disable="chatInfiniteDisable"
              :offset="0"
              @on-infinite="onInfiniteChatVirtual"
            />
          </template>
          <template #default="{ item, index /*active */ }">
            <ChatMessage
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
              @on-focus-message-reply="onFocusMessageReply"
              @message-share="onShare"
            />
          </template>
          <template #slotAfter>
            <q-chat-message
              v-if="creatingNewMessage"
              :name="t('base.you')"
              bg-color="message-sent"
              sent
            >
              <template #avatar>
                <base-avatar
                  v-if="authenStore?.auth?.avatar?.thumbnail"
                  class="q-message-avatar q-message-avatar--sent"
                  :src="authenStore?.auth?.avatar?.thumbnail"
                />
              </template>
              <div>
                <template v-if="uploadFileTotal > 0">
                  {{
                    t('chats.sendFileFmt', { success: uploadFileSucess, total: uploadFileTotal })
                  }}
                </template>
                <template v-else>
                  {{ t('chats.sendingMessage') }}
                </template>
                <q-spinner-dots class="q-ml-sm" size="2rem" />
              </div>
            </q-chat-message>
            <q-chat-message v-if="showTypingTextProgress" bg-color="message-received" :sent="false">
              <template #avatar>
                <BaseAvatar class="q-mr-xs" src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </template>
              <div class="text-center">
                <q-spinner-dots size="2rem" color="primary" />
              </div>
            </q-chat-message>
          </template>
        </BaseVirtualScrollerDynamic>
      </div>
      <div
        v-if="isScrollingToTop && !miniminze"
        class="row justify-center absolute full-width"
        style="bottom: 50px"
      >
        <q-btn
          round
          :color="!isDark ? 'white' : 'black'"
          :text-color="!isDark ? 'black' : 'white'"
          @click="scrollToBottom"
          :icon="biArrowDown"
        />
      </div>
    </BaseCard>
    <ChatReplyItem v-if="!miniminze&&replyMessageItem" :item="replyMessageItem" @on-close="onCloseReplyTo" />
    <chat-input
      ref="chatContentInputRef"
      v-if="!miniminze && modelValue && modelValue.id && showChatInput"
      :input-id="modelValue.id"
      :mini-chat="miniChat"
      :emoji-picker-id="`chat-message-emoji-${modelValue.id}`"
      :loading="creatingNewMessage"
      @on-submit="onSendMessage"
      :input-dense="true"
      :input-avata="inputAvata"
    />
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
