<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>I18n Page</p>
        <p>{{ t('base.appCookiepolicy') }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useLang } from 'src/composables/useLang';
import { useMeta } from 'quasar';
useMeta({
  title: 'I18n Page',
  meta: {
    description: { name: 'description', content: 'I18n Page' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    ogTitle: {
      property: 'og:title',
      template() {
        return 'I18n Page';
      },
    },
  },
});
const { t } = useLang();
</script>
