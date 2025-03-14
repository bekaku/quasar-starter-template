<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { biCopy } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';

const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Use base | ${t('app.name')}`);

const { appLoading, appToast, appConfirm, writeToClipboard } = useBase();
const textModel = ref<string>('Text to copy');
const confirm = async () => {
  const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
  if (conf) {
    appToast('Confirm', { type: 'positive', multiLine: false });
  } else {
    appToast('Cancel', { type: 'negative', multiLine: false });
  }
};
const confirm2 = async () => {
  const conf = await appConfirm(
    t('app.monogram'),
    t('base.deleteConfirm'),
    {
      textColor: 'white',
      flat: false,
      noCaps: true,
      color: 'positive',
      label: 'Acknowledge',
    },
    {
      textColor: 'white',
      flat: false,
      color: 'negative',
      label: 'Just text',
      noCaps: true,
    },
  );
  console.log(conf);
};
const loader = () => {
  appLoading();
  setTimeout(() => {
    appLoading(false);
  }, 3000);
};
const toaster = () => {
  appToast('this is a toast', {
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    multiLine: false,
    color: 'primary',
    timeout: 5000,
  });
};
const onCopyText = async () => {
  await writeToClipboard(textModel.value);
};
</script>

<template>
  <BasePage>
    <BaseCard title="useBase">
      <q-card-section class="q-gutter-md">
        <BaseButton label="show loading" color="primary" unelevated @click="loader" />
        <BaseButton label="show toast" color="warning" @click="toaster" />
        <BaseButton label="show confirm" color="negative" @click="confirm" />
        <BaseButton label="show confirm Custom Btn" @click="confirm2" />
        <q-input v-model="textModel" outlined style="width: 250px">
          <template #append>
            <BaseButton flat round :icon="biCopy" @click="onCopyText"> </BaseButton>
          </template>
        </q-input>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
