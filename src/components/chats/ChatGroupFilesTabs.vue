<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import type { ChatMessageType, LabelValue } from '@/types/common';
import type { GroupChatDto } from '@/types/models';
import { useTheme } from 'src/composables/useTheme';
import { defineAsyncComponent, ref } from 'vue';
import BaseTabs from '../base/BaseTabs.vue';
const ChatGroupFiles = defineAsyncComponent(() => import('components/chats/ChatGroupFiles.vue'));
const {
  canOpenDialog = true,
  showLoadmore = false,
  height = '350px',
  showImageSlideAll = true,
} = defineProps<{
  groupChat: GroupChatDto;
  canOpenDialog?: boolean;
  showLoadmore?: boolean;
  height?: string;
  showImageSlideAll?: boolean;
}>();

const emit = defineEmits<{
  'on-open-dialog': [ChatMessageType];
}>();

const { t } = useLang();
const { isDark } = useTheme();
const midiaTab = ref<ChatMessageType>('MEDIA');
const midiaTabs = ref<LabelValue<ChatMessageType>[]>([
  {
    label: t('chats.media'),
    value: 'MEDIA',
  },
  {
    label: t('chats.files'),
    value: 'FILE',
  },
]);
const onOpenFileDialog = (fileType: ChatMessageType) => {
  emit('on-open-dialog', fileType);
};
</script>
<template>
  <BaseTabs v-model="midiaTab" :items="midiaTabs" use-tab-panels :animated="false" class="q-ml-xs">
    <template #MEDIA>
      <ChatGroupFiles
        file-type="IMAGE"
        @on-open-dialog="onOpenFileDialog"
        :can-open-dialog="canOpenDialog"
        :show-loadmore="showLoadmore"
        :height="height"
        :show-image-slide-all="showImageSlideAll"
        :group-chat="groupChat"
      />
    </template>
    <template #FILE>
      <ChatGroupFiles
        file-type="FILE"
        @on-open-dialog="onOpenFileDialog"
        :can-open-dialog="canOpenDialog"
        :show-loadmore="showLoadmore"
        :height="height"
        :show-image-slide-all="showImageSlideAll"
        :group-chat="groupChat"
      />
    </template>
  </BaseTabs>
</template>
