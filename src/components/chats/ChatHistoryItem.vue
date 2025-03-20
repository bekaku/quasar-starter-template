<script setup lang="ts">
import BaseContentHtml from '@/components/base/BaseContentHtml.vue';
import ChatGroupAvatar from '@/components/chats/ChatGroupAvatar.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { GroupChatDto } from '@/types/models';
import { getMessageTypeText, numberFormat } from '@/utils/appUtil';
import { biStarFill, biVolumeMute } from '@quasar/extras/bootstrap-icons';

const {
  item,
  isActive = false,
  dense = false,
  showSettingIcon = true,
  clickable = true,
} = defineProps<{
  item: GroupChatDto;
  avatarSize?: number;
  isActive?: boolean;
  dense?: boolean;
  closePopup?: boolean;
  showSettingIcon?: boolean;
  clickable?: boolean;
}>();

const emit = defineEmits(['on-item-click']);
const { appFormatDateAuto } = useBase();
const { t } = useLang();
const onItemClick = () => {
  emit('on-item-click', item);
};
</script>
<template>
  <q-item
    v-bind="$attrs"
    v-if="item"
    :dense="dense"
    :clickable="clickable"
    v-close-popup
    @click="onItemClick"
    :class="{ 'active-chat': isActive }"
  >
    <q-item-section avatar>
      <ChatGroupAvatar :item="item" />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">
        <q-icon
          v-if="item.favorite && showSettingIcon"
          color="amber-8"
          size="11px"
          class="q-mb-xs"
          :name="biStarFill"
        />
        {{
          `${item.chatType == 'GROUP' ? '(' + numberFormat(item.totalMembers) + ') ' : ''}${
            item.groupName ? item.groupName : t('chats.groupUntitledName')
          }`
        }}
      </q-item-label>
      <q-item-label caption lines="1">
        <div class="row">
          <q-icon
            v-if="item.muteNotify && showSettingIcon"
            size="15px"
            class="text-muted"
            :name="biVolumeMute"
          />
          <template v-if="item.latestMessageType != 'LOCATION' && item.latestMessage">
            <BaseContentHtml :content="item.latestMessage" is-escape-html />
          </template>
          <template v-else-if="getMessageTypeText(item.latestMessageType) != ''">
            {{ t(getMessageTypeText(item.latestMessageType)) }}
          </template>
          <template v-else> &nbsp; </template>
        </div>
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <slot name="side">
        <q-item-label v-if="item.latestUpdate" caption lines="1">
          {{ appFormatDateAuto(item.latestUpdate) }}
        </q-item-label>
        <q-item-label v-if="!isActive && item.totalNewMessage > 0" caption>
          <q-badge color="negative">
            {{ item.totalNewMessage >= 100 ? '99+' : item.totalNewMessage }}
          </q-badge>
        </q-item-label>
      </slot>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.active-chat {
  background-color: var(--color-zinc-100);
}

body.body--dark {
  .active-chat {
    background-color: var(--color-zinc-700);
  }
}
</style>
