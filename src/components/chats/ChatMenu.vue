<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { ChatType } from '@/types/common';

const {
  chatId,
  chatType,
} = defineProps<{
  chatId: number;
  pin: boolean;
  favorite: boolean;
  muteNotify: boolean;
  chatType: ChatType;
}>();
const emit = defineEmits<{
  'toggle-mute': [chatId: number];
  'toggle-pin': [chatId: number];
  'toggle-fav': [chatId: number];
  'toggle-chat': [chatId: number];
  'delete-chat': [chatId: number];
  'leave-group': [chatId: number];
  'invite-people': [chatId: number];
  'on-close': [chatId: number];
}>();
const { appConfirm } = useBase();
const { t } = useLang();
const closeChat = () => {
  if (!chatId) {
    return;
  }
  emit('on-close', chatId);
};
const toggleMute = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-mute', chatId);
};
const togglePin = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-pin', chatId);
};
const toggleFav = () => {
  if (!chatId) {
    return;
  }
  emit('toggle-fav', chatId);
};
const invitePeople = () => {
  if (!chatId) {
    return;
  }
  emit('invite-people', chatId);
};
const deleteChat = async () => {
  if (!chatId) {
    return;
  }
  const conf = await appConfirm(t('app.monogram'), t('chats.deleteChatConfirm'));
  if (conf) {
    emit('delete-chat', chatId);
  }
};
const leaveGroup = async () => {
  if (!chatId) {
    return;
  }
  const conf = await appConfirm(t('app.monogram'), t('chats.leaveGroupConfirm'));
  if (conf) {
    emit('leave-group', chatId);
  }
};
</script>
<template>
  <q-menu v-bind="$attrs">
    <q-list dense>
      <q-item clickable v-close-popup @click="toggleMute">
        <q-item-section>
          <q-item-label>
            {{ muteNotify ? t('chats.unmuteNotify') : t('chats.muteNotify') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="togglePin">
        <q-item-section>
          <q-item-label>
            {{ pin ? t('chats.unpin') : t('chats.pin') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="toggleFav">
        <q-item-section>
          <q-item-label>
            {{ favorite ? t('chats.unfavorite') : t('chats.favorite') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <template v-if="chatType == 'GROUP'">
        <q-item clickable v-close-popup @click="invitePeople">
          <q-item-section>
            <q-item-label>
              {{ t('chats.invite') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <q-item clickable v-close-popup @click="deleteChat">
        <q-item-section>
          <q-item-label class="text-negative">
            {{ t('base.delete') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="chatType == 'GROUP'" clickable v-close-popup @click="leaveGroup">
        <q-item-section>
          <q-item-label class="text-negative">
            {{ t('chats.leaveGroup') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="closeChat">
        <q-item-section>
          <q-item-label>
            {{ t('base.close') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
