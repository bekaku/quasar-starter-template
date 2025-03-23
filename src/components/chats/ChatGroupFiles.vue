<script setup lang="ts">
import BaseScrollArea from '@/components/base/BaseScrollArea.vue';
import { useLang } from '@/composables/useLang';
import type { ChatMessageType } from '@/types/common';
import type { GroupChatDto, GroupChatFileDto } from '@/types/models';
import { readableNumber } from '@/utils/appUtil';
import { biArrowRight } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { imageItemsData, pdfItemsData } from 'src/libs/data';
import { computed, ref } from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseResult from '../base/BaseResult.vue';
import BaseSpinner from '../base/BaseSpinner.vue';
import ChatMessageFile from './ChatMessageFile.vue';

const {
  fileType,
  canOpenDialog = true,
  showLoadmore = false,
  height = '350px',
  showImageSlideAll = true,
} = defineProps<{
  groupChat: GroupChatDto;
  fileType: ChatMessageType;
  canOpenDialog?: boolean | undefined;
  showLoadmore?: boolean | undefined;
  height?: string | undefined;
  showImageSlideAll?: boolean | undefined;
}>();
const emit = defineEmits<{
  'on-open-dialog': [ChatMessageType];
}>();
const { t } = useLang();
const { dark } = useQuasar();
const firstLoaded = ref(true);
const dataList = computed<GroupChatFileDto[]>(() => {
  if (fileType == 'IMAGE') {
    return imageItemsData.map((item) => {
      return {
        id: item.id,
        fileManager: item,
      };
    });
  }
  return pdfItemsData.map((item) => {
    return {
      id: item.id,
      fileManager: item,
    };
  });
});
const onOpenDialog = () => {
  if (!canOpenDialog) {
    return;
  }
  emit('on-open-dialog', fileType);
};
</script>
<template>
  <div class="row">
    <div class="col">
      <template v-if="!firstLoaded">
        <BaseSpinner />
      </template>
      <template v-else-if="dataList && dataList.length > 0">
        <BaseScrollArea :height="height">
          <template v-if="fileType == 'IMAGE' || fileType == 'FILE'">
            <ChatMessageFile
              :files="dataList"
              :show-image-slide-all="showImageSlideAll"
              :file-text-color="dark.isActive ? 'text-white' : 'text-black'"
              :sent="false"
            />
          </template>
          <BaseButton
            v-if="canOpenDialog"
            :label="`${t('base.seeMore')} (+${readableNumber(1999)})`"
            class="q-mt-md"
            outline
            full
            :icon-right="biArrowRight"
            @click="onOpenDialog"
          />
        </BaseScrollArea>
      </template>
      <template v-else>
        <BaseResult status="empty" icon-size="100px" />
      </template>
    </div>
  </div>
</template>
