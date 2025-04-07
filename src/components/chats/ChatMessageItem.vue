<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import RippleItem from '@/components/base/BaseRippleItem.vue';
import ContentItem from '@/components/base/BaseContentItem.vue';
import OpenGraphItemAlt from '@/components/base/OpenGraphItemAlt.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { ChatMesageFocusableId } from '@/libs/constant';
import { useChatStore } from '@/stores/chatStore';
import type { ChatType } from '@/types/common';
import type { EmojiType, GroupChatMsgDto } from '@/types/models';
import { numberFormat } from '@/utils/appUtil';
import { biEmojiSmile } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import AppReactionMenu from '../app/AppReactionMenu.vue';
import ChatMessageMenu from './ChatMessageMenu.vue';

// const LikeEmojiMenu = defineAsyncComponent(
//   () => import('@/components/reaction/LikeEmojiMenu.vue')
// );
const ChatMessageFile = defineAsyncComponent(
  () => import('@/components/chats/ChatMessageFile.vue'),
);
const ChatMessageEngage = defineAsyncComponent(
  () => import('@/components/chats/ChatMessageEngage.vue'),
);
const BaseMapPreview = defineAsyncComponent(() => import('@/components/base/BaseMapPreview.vue'));
const {
  item,
  chatType,
  index,
  showSenderAvatar = false,
  showSenderName = false,
  haveReply = false,
  miniChat = false,
  highLightText,
} = defineProps<{
  item: GroupChatMsgDto;
  chatType: ChatType;
  index?: number | undefined;
  showSenderAvatar?: boolean | undefined;
  showSenderName?: boolean | undefined;
  label?: string | undefined;
  haveReply?: boolean | undefined;
  miniChat?: boolean | undefined;
  highLightText?: string | undefined;
}>();
const emit = defineEmits<{
  'message-reaction': [type: EmojiType, id: number];
  'message-delete': [id: number];
  'message-unsend': [id: number];
  'message-reply': [id: number];
  'on-open-seen-dialog': [id: number, count: number];
  'message-share': [id: number];
}>();
const chatStore = useChatStore();
const { screen, dark } = useQuasar();
const { t } = useLang();
const { appFormatDateTimeAuto, writeToClipboard } = useBase();
const isHoverMessage = ref(false);
const isFocus = ref(false);
const messageFocusTimeout = ref<any>(null);
const cssClass = computed(() =>
  item.sent ? 'absolute-bottom-left q-text-black' : 'absolute-bottom-right q-text-black',
);
const cssStyle = computed(() => (item.sent ? 'left: -55px;' : 'right: -50px;'));
const engageCssClass = computed(() =>
  item.sent ? 'absolute-bottom-right' : 'absolute-bottom-left',
);
const engageCssStyle = computed(() =>
  item.sent
    ? item.chatMsg
      ? 'bottom:-25px'
      : 'bottom:-15px'
    : item.chatMsg
      ? 'bottom:-55px'
      : 'bottom:-25px',
);
const getName = computed(() =>
  !item.sent ? item.sendUser?.name : showSenderName ? t('base.you') : '',
);
const getImageItems = computed(() => {
  if (!item?.files || item.files.length == 0) {
    return [];
  }
  return item.files.filter((f) => f.fileManager && f.fileManager.image);
});
const getFilesItems = computed(() =>
  !item.files ? [] : item.files.filter((f) => f.fileManager && !f.fileManager.image),
);
const isMutedMessage = computed(
  () => item.unsend || item.chatMessageType == 'LEAVE' || item.chatMessageType == 'INVITE',
);
const isBgTransparent = computed(
  () => getImageItems.value.length > 0 && !item.chatMsg && getFilesItems.value.length == 0,
);
const messageBg = computed(() => {
  if (isMutedMessage.value) {
    return 'message-unsend';
  }
  if (isBgTransparent.value) {
    return 'message-transparent';
  }
  return item.sent ? 'message-sent' : 'message-received';
});
const userLink = computed(() => {
  if (!item.sent) {
    return `user/${item.sendUser?.id}`;
  }
  return '#';
});
const messageCssClass = computed(() => {
  if (item.reactionEngage && item.reactionEngage.length > 0) {
    return 'q-mb-xl';
  }
  return 'q-mb-sm';
});
const messageSize = computed(() => {
  if (isMutedMessage.value) {
    return undefined;
  }
  if (!item.files) {
    return undefined;
  }
  if (item.chatMessageType == 'LOCATION') {
    return !miniChat ? '9' : '10';
  }
  const imagesLength = getImageItems.value.length;
  const filesLength = getFilesItems.value.length;
  if (miniChat && (imagesLength > 0 || filesLength > 0)) {
    return '10';
  }
  if (screen.gt.xs) {
    if (imagesLength == 1 || imagesLength == 2) {
      return '4';
    }
    if (imagesLength > 0) {
      return '6';
    }
  } else {
    if (imagesLength > 0) {
      return '8';
    }
  }
  return undefined;
});
const messageTextColor = computed(() => {
  if (isMutedMessage.value) {
    return dark.isActive ? 'grey-4' : 'grey-7';
  }
  return item.sent ? 'grey-10' : dark.isActive ? 'white' : 'black';
});
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
const onCopy = async () => {
  console.log('onCopy');
  if (item.chatMsg) {
    await writeToClipboard(item.chatMsg);
  }
};
const onMessageHover = () => {
  isHoverMessage.value = true;
};
const onMessageHoverLeave = () => {
  // isHoverMessage.value = false;
};
const onReact = async (l: EmojiType) => {
  if (!item.id) {
    return;
  }
  emit('message-reaction', l, item.id);
};
const onOpenReadDialog = () => {
  if (!item.id || !item?.readCount || item.readCount == 0 || !item.sent || chatType == 'PERSONAL') {
    return;
  }
  emit('on-open-seen-dialog', item.id, item.readCount);
};
const setMessageFucusAsync = (active: boolean) => {
  return new Promise((resolve) => {
    messageFocusTimeout.value = setTimeout(() => {
      isFocus.value = active;
      resolve(true);
    }, 500);
  });
};
const onMessageFocus = async () => {
  isFocus.value = true;
  await setMessageFucusAsync(false);
  await setMessageFucusAsync(true);
  await setMessageFucusAsync(false);
  await setMessageFucusAsync(true);
  await setMessageFucusAsync(false);
  clearTimeout(messageFocusTimeout.value);
  messageFocusTimeout.value = null;
  chatStore.messageIdFocus = undefined;
};
const onReactionClick = (chatId: number) => {
  console.log('onReactionClick', chatId);
};
watch(chatStore, (state) => {
  if (item && item.id && state && state.messageIdFocus && state.messageIdFocus == item.id) {
    onMessageFocus();
  }
});
</script>
<template>
  <div
    v-bind="$attrs"
    v-if="item && index != undefined"
    class="row"
    :id="`${ChatMesageFocusableId}-${item.id}`"
    :class="{ 'holder-recive': !item.sent && miniChat, 'holder-sent': item.sent && miniChat }"
  >
    <div class="col-12">
      <template v-if="item.onlyLabel">
        <q-chat-message v-if="item.chatMsg">
          <template #label>
            <span class="text-muted">{{ item.chatMsg }}</span>
          </template>
        </q-chat-message>
      </template>
      <template v-else>
        <q-chat-message v-if="label">
          <template #label>
            <span class="text-muted">{{ label }}</span>
          </template>
        </q-chat-message>
        <q-chat-message
          v-if="item"
          :text-color="messageTextColor"
          :bg-color="messageBg"
          :class="messageCssClass"
          :size="messageSize"
          :sent="item.sent"
        >
          <template #name>
            <div class="text-muted">
              <template v-if="!item.sent && chatType != 'PERSONAL' && (!haveReply || item.unsend)">
                <router-link v-if="userLink" :to="userLink">
                  {{ getName }}
                </router-link>
              </template>
            </div>
          </template>
          <template #stamp>
            <span class="text-caption" :class="{ 'text-muted': dark.isActive && isBgTransparent }">
              {{ appFormatDateTimeAuto(item.msgDateTime) }}
            </span>
          </template>
          <template v-if="!item.sent || showSenderAvatar" #avatar>
            <router-link v-if="userLink && item.sendUser?.avatar?.thumbnail" :to="userLink">
              <base-avatar class="q-mr-xs" :src="item.sendUser?.avatar?.thumbnail" fetch-image />
            </router-link>
          </template>
          <div :class="{ 'message-focus': isFocus }">
            <div
              v-if="!item.sent && chatType != 'PERSONAL' && haveReply && !item.unsend"
              class="text-muted text-caption"
            >
              {{ getName }}
            </div>
            <template v-if="!isMutedMessage">
              <template v-if="item.chatMessageType != 'LOCATION'">
                <content-item
                  v-if="item.chatMsg"
                  :class="screen.gt.xs ? 'text-div-web' : 'text-div-mobile'"
                  class="q-pa-xs"
                  :wrap-text="true"
                  :limit="20"
                  is-escape-html
                  :high-light-text="highLightText || ''"
                  :content="item.chatMsg"
                  :hashtag-urlify="false"
                  :content-id="`chat-message-${item.id}-${index}-content`"
                  :link-style="item.sent ? 'app-text-link' : 'app-text-link'"
                  text-style="text-black"
                />

                <open-graph-item-alt
                  v-if="item.chatMsg"
                  class="q-pa-sm"
                  :style="{ maxWidth: screen.xs ? '60vw' : !miniChat ? '25vw' : '13vw' }"
                  :content="item.chatMsg"
                  :short="!miniChat"
                  :image-max-height="!miniChat ? '150px' : '120px'"
                  :image-size="!miniChat ? '120px' : '50px'"
                  :show-bg="false"
                />

                <ChatMessageFile
                  v-if="item.files && item.files.length > 0 && item.id"
                  class="q-mt-sm"
                  :mini-chat="miniChat"
                  :chat-id="item.id"
                  :files="item.files"
                  :sent="item.sent"
                />
              </template>
              <template v-else>
                <BaseMapPreview
                  :preview-src="item.chatMsg"
                  preview
                  :height="!miniChat ? 150 : 140"
                  :zoom="2"
                />
              </template>

              <div
                v-if="item.reactionEngage && item.reactionEngage.length > 0"
                :class="engageCssClass"
                :style="engageCssStyle"
                style="width: 175px"
              >
                <ChatMessageEngage
                  v-if="item.reactionEngage && item.reactionEngage.length > 0 && item.id"
                  :chat-id="item.id"
                  :class="item.sent ? 'float-right' : 'float-left'"
                  :items="item.reactionEngage"
                  @on-click="onReactionClick"
                />
              </div>

              <ripple-item
                v-if="item.sent && item.readCount > 0"
                class="absolute-bottom-left text-muted text-weight-light text-caption app-border-radius q-px-xs"
                :cursor-pointer="chatType != 'PERSONAL'"
                style="left: -50px; bottom: 25px"
                @click="onOpenReadDialog"
              >
                {{
                  `${t('chats.read')} ${chatType == 'GROUP' ? numberFormat(item.readCount) : ''}`
                }}
              </ripple-item>

              <div v-if="item.id" :class="cssClass" :style="cssStyle">
                <div class="row items-center" style="z-index: 99999">
                    <ChatMessageMenu
                      :chat-id="item.id"
                      :sent="item.sent"
                      :show-copy="item.chatMsg != null && true && item.chatMsg.length > 0"
                      :message-type="item.chatMessageType"
                      @message-copy="onCopy"
                      @message-delete="onDelete"
                      @message-unsend="onUnsend"
                      @message-reply="onRepy"
                      @message-share="onShare"
                    />
                  <q-btn
                    flat
                    round
                    dense
                    size="sm"
                    :icon="biEmojiSmile"
                    :class="item.liked ? 'text-amber-5' : 'text-muted'"
                  >
                    <q-menu
                      auto-close
                      anchor="top end"
                      self="bottom middle"
                      style="height: 65px; width: 265px"
                    >
                      <!-- <like-emoji-menu :icon-size="45" :icon-zoom-size="64" @on:like="onReact" /> -->
                      <AppReactionMenu @on:like="onReact" />
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </template>
            <template v-else-if="item.chatMsg">
              {{ item.chatMsg }}
            </template>
            <template v-else>
              {{ t('chats.unsend') }}
            </template>
          </div>
        </q-chat-message>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.text-div-web {
  max-width: 25vw;
}

.holder-sent {
  padding-left: 50px;
}

.holder-recive {
  padding-right: 50px;
}

.text-div-mobile {
  max-width: 45vw;
}

.message-focus {
  border: 3px solid var(--color-warning-400);
  border-radius: 10px;
}
</style>
