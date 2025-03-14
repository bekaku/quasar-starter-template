<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
// setTitle(`Blang page | ${t('app.name')}`);
</script>
<template>
  <BasePage>
    <BaseCard title="Blank page">
      <q-card-section> Starter page </q-card-section>
    </BaseCard>
  </BasePage>
</template>
