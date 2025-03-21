<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useLang } from '@/composables/useLang';
import {
  biChevronRight,
  biPinAngle,
  biPinFill,
  biStar,
  biStarFill,
  biVolumeMute,
  biVolumeUp,
  biX,
  biGear,
  biArrowRight,
  biBoxArrowRight,
  biCameraVideo,
  biTelephone,
  biThreeDots,
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import type { ChatMessageType, LabelValue } from 'src/types/common';
import { computed, onMounted, ref } from 'vue';
import BaseTabs from '../base/BaseTabs.vue';
import type { GroupChatDto, UserDto } from 'src/types/models';
import BaseCard from '../base/BaseCard.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseScrollArea from '../base/BaseScrollArea.vue';
import ChatGroupAvatar from './ChatGroupAvatar.vue';
import { userItems } from '@/libs/data';
import ChatGroupFilesTabs from './ChatGroupFilesTabs.vue';
import BaseLink from '../base/BaseLink.vue';

const { t } = useLang();
const { dark } = useQuasar();
const { showClose = false, chatWith } = defineProps<{
  showClose?: boolean;
  chatWith?: UserDto;
}>();
const emit = defineEmits<{
  'toggle-mute': [chatId: number];
  'toggle-pin': [chatId: number];
  'toggle-fav': [chatId: number];
  'on-close': [];
}>();
const modelValue = defineModel<GroupChatDto>();

const showMember = ref(false);
const showFileDialog = ref(false);
const showFileDialogType = ref<ChatMessageType>('IMAGE');

const getProfileViewLink = computed(() => {
  if (!chatWith) {
    return '#';
  }
  return `/user/${chatWith.id}`;
});
const toggleMute = () => {
  if (!modelValue.value || !modelValue.value.id) {
    return;
  }
  emit('toggle-mute', modelValue.value.id);
};
const togglePin = () => {
  if (!modelValue.value || !modelValue.value.id) {
    return;
  }
  emit('toggle-pin', modelValue.value.id);
};
const toggleFav = () => {
  if (!modelValue.value || !modelValue.value.id) {
    return;
  }
  emit('toggle-fav', modelValue.value.id);
};
const onOpenFileDialog = (fileType: ChatMessageType) => {
  showFileDialogType.value = fileType;
  showFileDialog.value = true;
};
</script>
<template>
  <BaseCard v-bind="$attrs" v-if="modelValue" flat :bordered="false">
    <BaseButton v-if="showClose" flat round :icon="biX" @click="$emit('on-close')" />
    <BaseScrollArea height="85vh" :style="showClose ? 'width: 350px' : ''">
      <q-card-section class="text-center">
        <ChatGroupAvatar :item="modelValue" rounded avatar-size="75px" :show-pin="false" />
        <div class="text-subtitle1 text-weight-bold q-pt-sm long-text-break">
          <BaseLink :to="getProfileViewLink">
            {{ modelValue.groupName }}
          </BaseLink>
        </div>
        <div class="text-caption text-muted">
          {{ modelValue.chatType == 'PERSONAL' ? 'Software engineer' : 'Group' }}
        </div>
        <div class="row justify-center">
          <q-btn
            flat
            round
            :icon="!modelValue.pin ? biPinAngle : biPinFill"
            size="sm"
            @click="togglePin"
            :color="modelValue.pin ? 'primary' : undefined"
          >
            <q-tooltip>
              {{ modelValue.pin ? t('chats.unpin') : t('chats.pin') }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            :icon="!modelValue.favorite ? biStar : biStarFill"
            size="sm"
            @click="toggleFav"
            :color="modelValue.favorite ? 'amber-8' : undefined"
          >
            <q-tooltip>
              {{ modelValue.favorite ? t('chats.unfavorite') : t('chats.favorite') }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            :icon="!modelValue.muteNotify ? biVolumeUp : biVolumeMute"
            size="sm"
            @click="toggleMute"
            :color="modelValue.muteNotify ? 'negative' : undefined"
          >
            <q-tooltip>
              {{ modelValue.muteNotify ? t('chats.unmuteNotify') : t('chats.muteNotify') }}
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="modelValue.chatType == 'GROUP'"
            flat
            round
            :icon="biGear"
            size="sm"
            @click="showMember = true"
          >
            <q-tooltip>
              {{ t('chats.groupSettings') }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <q-list v-if="modelValue.chatType == 'GROUP'" dense>
        <q-item>
          <q-item-section>
            <q-item-label> {{ `${t('chats.members')}(${userItems.length})` }} </q-item-label>
          </q-item-section>
          <q-item-section side>
            <BaseButton flat :label="t('base.viewAll')" />
          </q-item-section>
        </q-item>
        <q-item
          v-for="(u, index) in userItems.slice(0, 5)"
          :key="`index-${index}-${u.id}`"
          clickable
        >
          <q-item-section avatar>
            <base-avatar :src="u.avatar?.thumbnail || '/images/ninja.png'" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ u.username }}</q-item-label>
            <q-item-label caption>{{ u.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
      </q-list>

      <ChatGroupFilesTabs :group-chat="modelValue" @on-open-dialog="onOpenFileDialog" />
    </BaseScrollArea>
  </BaseCard>
</template>
