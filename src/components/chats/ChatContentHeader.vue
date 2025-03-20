<script setup lang="ts">
import {
    biChevronDown,
    biSearch,
    biStarFill,
    biThreeDots
} from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import type { GroupChatDto, UserDto } from 'src/types/models';
import { computed, ref } from 'vue';
import ChatGroupAvatar from './ChatGroupAvatar.vue';
import ChatMenu from './ChatMenu.vue';

const {
  miniChat = false,
  miniminze = false,
  item,
  chatWith,
} = defineProps<{
  miniChat?: boolean;
  miniminze?: boolean;
  item: GroupChatDto;
  chatWith?: UserDto;
}>();
const miniminzeNewMessage = ref<number>(0);
const { t } = useLang();
const showSearch = ref(false);
const textSearch = ref<string>('');
defineEmits<{
  'toggle-mute': [chatId: number];
  'toggle-pin': [chatId: number];
  'toggle-fav': [chatId: number];
  'toggle-chat': [chatId: number];
  'delete-chat': [chatId: number];
  'leave-group': [chatId: number];
  'invite-people': [chatId: number];
  'on-close': [chatId: number];
}>();
const getProfileViewLink = computed(() => {
  if (!chatWith) {
    return undefined;
  }
  return `/user/${chatWith.id}`;
});
const onSearchClear = () => {
  textSearch.value = '';
};
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    onSearchClear();
  }
};
const onSearch = () => {
  const txt = textSearch.value ? textSearch.value.trim() : undefined;
  if (txt) {
    // TODO
  } else if (!txt || txt.length == 0) {
    onSearchClear();
  }
};
</script>
<template>
  <q-item class="card-top-bg">
    muteNotify  {{ item.muteNotify }}
    <q-badge v-if="miniChat && miniminze && miniminzeNewMessage > 0" color="negative" floating>
      {{ miniminzeNewMessage }}
    </q-badge>
    <q-item-section avatar>
      <ChatGroupAvatar :item="item" />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="2">
        <router-link v-if="getProfileViewLink" :to="getProfileViewLink" class="app-text-link">
          {{ item.groupName }}
        </router-link>
        <template v-else>
          {{ item.groupName ? item.groupName : t('chats.groupUntitledName') }}
        </template>

        <q-icon
          v-if="item.favorite"
          color="amber-8"
          size="14px"
          class="q-ml-xs q-mb-xs"
          :name="biStarFill"
        />
      </q-item-label>
      <q-item-label v-if="item.chatType == 'PERSONAL'" caption lines="1">
        Software Engineer
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <slot name="headerRight">
          <template v-if="!miniChat">
            <q-form @submit="onSearch">
              <q-input
                v-if="showSearch"
                v-model="textSearch"
                outlined
                dense
                clearable
                @clear="onSearchClear"
                :placeholder="t('chats.searchMessage')"
              />
            </q-form>
            <q-btn @click="toggleSearch" flat round :icon="biSearch" size="sm" />
          </template>
          <q-btn
            v-if="item.id"
            flat
            round
            :icon="!miniChat ? biThreeDots : biChevronDown"
            size="sm"
          >
            <chat-menu
              :chat-id="item.id"
              :chat-type="item.chatType"
              :pin="item.pin"
              :mute-notify="item.muteNotify"
              :favorite="item.favorite"
              :mini-chat="miniChat"
              @toggle-pin="(chatId: number) => $emit('toggle-pin', chatId)"
              @toggle-mute="(chatId: number) => $emit('toggle-mute', chatId)"
              @toggle-fav="(chatId: number) => $emit('toggle-fav', chatId)"
              @delete-chat="(chatId: number) => $emit('delete-chat', chatId)"
              @leave-group="(chatId: number) => $emit('leave-group', chatId)"
              @invite-people="(chatId: number) => $emit('invite-people', chatId)"
              @on-close="(chatId: number) => $emit('on-close', chatId)"
            />
          </q-btn>
        </slot>
      </div>
    </q-item-section>
  </q-item>
</template>
<style lang="scss" scoped>
.card-top-bg {
  background-color: #fff;
}
body.body--dark {
  .card-top-bg {
    background-color: var(--color-zinc-900);
  }
}
</style>
