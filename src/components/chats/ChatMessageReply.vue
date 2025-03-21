<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useLang } from '@/composables/useLang';
import { useChatStore } from '@/stores/chatStore';
import type { GroupChatMsgDto } from '@/types/models';
import { getMessageTypeText } from '@/utils/appUtil';
import { biReply } from '@quasar/extras/bootstrap-icons';

const { item, miniChat = false } = defineProps<{
  item: GroupChatMsgDto;
  sent: boolean;
  miniChat?: boolean;
}>();

const emit = defineEmits(['on-click']);
const chatStore = useChatStore();
const { t } = useLang();
const onPress = () => {
  if (!item || !item.id) {
    return;
  }
  chatStore.messageIdFocus = item.id;
  emit('on-click', item.id);
};
</script>

<template>
  <div class="row" :class="{ 'justify-start': !sent, 'justify-end': sent }">
    <div :class="{ 'col-6': !miniChat, 'col-10': miniChat }">
      <q-card
        style="top: 5px"
        class="card relative-position q-pt-xs cursor-pointer"
        @click="onPress"
        flat
        :class="{ 'float-right': sent, 'float-left': !sent }"
      >
        <q-item v-if="item">
          <q-item-section>
            <q-item-label class="text-muted text-caption">
              <base-avatar
                v-if="item.sendUser?.avatar?.thumbnail"
                :src="item.sendUser?.avatar?.thumbnail"
                size="20px"
                class="q-mr-xs"
              />
              <q-icon :name="biReply" size="xs" />
              {{ t('chats.replyTo', { name: item.sendUser?.name }) }}
            </q-item-label>
            <q-item-label caption lines="2">
              {{
                item.chatMsg
                  ? item.chatMsg
                  : getMessageTypeText(item.chatMessageType)
                    ? t(getMessageTypeText(item.chatMessageType))
                    : ''
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  max-width: 100%;
  border: 1px solid var(--gray-200);
}
</style>
