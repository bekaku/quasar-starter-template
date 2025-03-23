<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { ChatMessageType, LabelValue } from '@/types/common';
import {
    biCopy,
    biReply,
    biSendDash,
    biShare,
    biThreeDotsVertical,
    biTrash
} from '@quasar/extras/bootstrap-icons';
import { onMounted } from 'vue';
import BaseDropdownMenu from '../base/BaseDropdownMenu.vue';

const { showCopy = true, sent } = defineProps<{
  chatId: number;
  sent: boolean;
  showCopy?: boolean | undefined;
  messageType?: ChatMessageType | undefined;
}>();

const emit = defineEmits([
  'message-delete',
  'message-unsend',
  'message-copy',
  'on-hide',
  'message-reply',
  'message-share',
  'on-share-post',
  'on-share-action',
]);
const { appConfirm } = useBase();
const { t } = useLang();
const items: LabelValue<number>[] = [
  {
    label: t('chats.reply'),
    value: 1,
    icon: biReply,
    onHandle() {
      onReply();
    },
  },
  {
    label: t('chats.share'),
    value: 2,
    icon: biShare,
    onHandle() {
      onShare();
    },
  },
  {
    label: t('base.copy'),
    value: 3,
    icon: biCopy,
    onHandle() {
      onCopy();
    },
  },
  {
    label: t('base.delete'),
    value: 4,
    icon: biTrash,
    onHandle() {
      onDelete();
    },
  },
  {
    label: t('chats.unsendMessage'),
    value: 5,
    icon: biSendDash,
    onHandle() {
      onUnsend();
    },
  },
];
onMounted(() => {
  if (!showCopy) {
    items.splice(2, 1);
  }
  if (!sent) {
    items.splice(4, 1);
  }
});
const onDelete = async () => {
  const conf = await appConfirm(t('app.monogram'), t('chats.deleteChatConfirm'));
  if (conf) {
    emit('message-delete');
  }
};
const onUnsend = async () => {
  const conf = await appConfirm(t('app.monogram'), t('chats.unsendMessageConfirm'));
  if (conf) {
    emit('message-unsend');
  }
};
const onCopy = async () => {
  emit('message-copy');
};
const onReply = () => {
  emit('message-reply');
};
const onShare = () => {
  emit('message-share');
};
</script>
<template>
  <BaseDropdownMenu :items="items" @on-hide="$emit('on-hide')">
    <q-btn
      flat
      round
      dense
      size="sm"
      :icon="biThreeDotsVertical"
      class="text-muted"
      style="opacity: 0.5"
    />
  </BaseDropdownMenu>
</template>
