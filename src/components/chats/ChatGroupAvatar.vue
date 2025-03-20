<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import type { GroupChatDto } from '@/types/models';
import { biPinAngleFill } from '@quasar/extras/bootstrap-icons';

const {
  avatarSize = '40px',
  rounded = false,
  showPin = true,
} = defineProps<{
  item?: GroupChatDto;
  avatarSize?: string;
  rounded?: boolean;
  showPin?: boolean;
}>();
</script>
<template>
  <div v-if="item">
    <base-avatar
      v-if="item.dtoAvatar"
      fetch-image
      :rounded="rounded"
      :src="item.dtoAvatar.thumbnail"
      :size="avatarSize"
    >
      <template #extra>
        <slot name="extra">
          <q-badge
            v-if="item.online"
            floating
            color="positive"
            rounded
            transparent
            class="absolute"
          />
          <q-avatar
            v-if="showPin && item.pin"
            class="absolute"
            color="primary"
            size="18px"
            style="top: 25px; left: 25px"
          >
            <q-icon color="white" :name="biPinAngleFill" />
          </q-avatar>
        </slot>
      </template>
    </base-avatar>
    <q-avatar v-else :size="`${avatarSize}px`" :rounded="rounded">
      <q-img
        :src="
          item.chatType == 'GROUP'
            ? '/images/ninja_duplicate.png'
            : 'images/ninja.png'
        "
      />
      <slot name="extra">
        <q-badge
          v-if="item.online"
          floating
          color="positive"
          rounded
          transparent
          class="absolute"
        />
        <q-avatar
          v-if="showPin && item.pin"
          class="absolute"
          color="primary"
          size="18px"
          style="top: 25px; left: 25px"
        >
          <q-icon color="white" :name="biPinAngleFill" />
        </q-avatar>
      </slot>
    </q-avatar>
  </div>
</template>
