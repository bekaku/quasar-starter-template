<script setup lang="ts">
import BaseEmojiPicker from '@/components/base/BaseEmojiPicker.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import { biCode, biEmojiSmile, biImage, biSend } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { ref, useId } from 'vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';

const authenStore = useAuthenStore();
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`File picker | ${t('app.name')}`);
const { dark } = useQuasar();
const contentID = useId();
const message = ref();
const onEmojiClick = (emoji: string) => {
  if (!message.value) {
    message.value = '';
  }
  message.value += emoji;
};
</script>

<template>
  <BasePage :full="false">
    <BaseCard title="Emoji picker">
      <template #end>
        <BaseButton
          href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/emoji-picker.vue"
          target="_blank"
          :icon="biCode"
          flat
          round
        >
          <q-tooltip>View Source</q-tooltip>
        </BaseButton>
      </template>
      <q-card-section>
        <q-input outlined v-model="message" type="textarea" autogrow label="Type message">
          <template #prepend v-if="authenStore?.auth?.avatar?.thumbnail">
            <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
          </template>
          <template #before>
            <BaseButton round flat :icon="biImage" color="grey-7" />
            <q-no-ssr>
              <q-btn round flat :icon="biEmojiSmile" color="grey-7">
                <q-menu>
                  <base-emoji-picker
                    :picker-id="`emo-${contentID}`"
                    :theme="dark.isActive ? 'dark' : 'light'"
                    @on:emoji-click="onEmojiClick"
                  >
                  </base-emoji-picker>
                </q-menu>
              </q-btn>
            </q-no-ssr>
          </template>
          <template #after>
            <BaseButton flat round :icon="biSend" color="primary">
              <q-tooltip> Send </q-tooltip>
            </BaseButton>
          </template>
        </q-input>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
