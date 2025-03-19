<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import ChatInput from '@/components/chats/ChatInput.vue';
import ChatMessage from '@/components/chats/Message.vue';
import type { ChatHistoryTab } from '@/types/common';
import { biSearch, biThreeDots } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref } from 'vue';
import BaseCard from '../base/BaseCard.vue';

const { height = 450, autofocus = false } = defineProps<{
  height?: number;
  autofocus?: boolean;
}>();
onMounted(async () => {});
</script>
<template>
  <div v-bind="$attrs">
    <BaseCard class="card-bg">
      <q-item class="card-top-bg">
        <q-item-section avatar>
          <base-avatar
            :fetch-image="false"
            src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg"
            size="42px"
          >
            <template #extra>
              <q-badge
                floating
                color="positive"
                rounded
                transparent
                class="absolute"
                style="top: 30px"
              />
            </template>
          </base-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label> Esther Howard </q-item-label>
          <q-item-label caption lines="1"> Software Engineer </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <q-btn flat round :icon="biSearch" size="sm" />
            <q-btn flat round :icon="biThreeDots" size="sm" />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-scroll-area
        style="height: 68vh"
        content-active-style="width: 100%;"
        content-style="width: 100%;"
      >
        <div class="q-pa-md">
          <chat-message />
        </div>
      </q-scroll-area>
    </BaseCard>
    <ChatInput />
  </div>
</template>
<style lang="scss" scoped>
.card-bg {
  background-color: var(--color-zinc-50);
}

.card-top-bg {
  background-color: #fff;
}

body.body--dark {
  .card-bg {
    background-color: var(--color-zinc-800);
  }

  .card-top-bg {
    background-color: var(--color-zinc-900);
  }
}
</style>
