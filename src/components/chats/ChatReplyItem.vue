<script setup lang="ts">
import type { GroupChatMsgDto } from '@/types/models';
import { useAuthenStore } from '@/stores/authenStore';
import { computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { biReply, biX } from '@quasar/extras/bootstrap-icons';
import BaseAvatar from '@/components/base/BaseAvatar.vue';

const { item } = defineProps<{
  item: GroupChatMsgDto
}>();
defineEmits(['on-close']);
const { t } = useLang();
const authenStore = useAuthenStore();
const isAutor = computed(() => {
  if (!authenStore?.auth || !authenStore.auth?.id || !item || !item?.sendUser) {
    return false;
  }
  return authenStore.auth.id == item.sendUser.id;
});
</script>

<template>
  <q-item v-if="item">
    <q-item-section v-if="item.sendUser?.avatar?.thumbnail" side top>
      <base-avatar :src="item.sendUser?.avatar?.thumbnail" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <q-icon :name="biReply" />
        {{ !isAutor ? t('chats.replyTo', { name: item.sendUser?.name }) : t('chats.replyToSelf') }}
      </q-item-label>
      <q-item-label caption lines="2">
        {{ item.chatMsg }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn round flat dense :icon="biX" @click="$emit('on-close')" />
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">

</style>
