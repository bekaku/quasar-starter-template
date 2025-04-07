<script setup lang="ts">
import BaseScrollArea from '@/components/base/BaseScrollArea.vue';
import ChatHistoryItem from '@/components/chats/ChatHistoryItem.vue';
import SkeletonItem from '@/components/skeleton/SkeletonItem.vue';
import { useChat } from '@/composables/useChat';
import { useLang } from '@/composables/useLang';
import type { GroupChatDto } from '@/types/models';
import { biArrowRightShort } from '@quasar/extras/bootstrap-icons';
import { chatHistoryListApi } from 'src/libs/data';
import { onMounted, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseLink from '../base/BaseLink.vue';

const { t } = useLang();
const { onOpenMiniChat } = useChat();
const items = ref<GroupChatDto[]>([]);
const loading = ref(true);
onMounted(async () => {
  items.value = [...chatHistoryListApi.dataList.slice(0, 5)];
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
const onItemClick = (item: GroupChatDto) => {
  if (item && item.id) {
    onOpenMiniChat(item.id);
  }
};
</script>
<template>
  <q-card flat>
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h6 text-weight-bold">
          {{ t('chats.chats') }}
        </div>
      </q-toolbar-title>
      <q-space />

      <BaseLink to="/example/chats">
        {{ t('chats.openChatPage') }}
      </BaseLink>
    </q-toolbar>
    <q-separator />

    <base-scroll-area>
      <skeleton-item v-if="loading" :no="5" :show-header="false" show />
      <template v-else>
        <ChatHistoryItem
          v-for="(item, index) in items"
          :key="`chat-noti-${item.id}-${index}`"
          :item="item"
          @on-item-click="onItemClick"
        />
      </template>
    </base-scroll-area>
  </q-card>
</template>
