<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import { ExampleBtnBreadcrumb } from '@/libs/breadcrumbs';
import { TabTest } from '@/libs/tabs';
const { t } = useLang();
const { setTitle } = useAppMeta();
definePage({
  meta: {
    pageName: 'page.dashboard',
    breadcrumbs: ExampleBtnBreadcrumb,
    tabs: TabTest,
  },
});
// setTitle(`Blang page | ${t('app.name')}`);
</script>
<template>
  <BasePage>
    <BaseCard title="Blank page">
      <q-card-section> Starter page </q-card-section>
    </BaseCard>
  </BasePage>
</template>
