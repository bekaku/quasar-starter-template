<template>
  <q-page padding>
    <q-card>
      <q-card-section class="q-gutter-md">
        <p>Pinia Store {{ t('base.welcomeText') }}</p>
        <div>Counter : {{ counterStore.counter }}</div>

        <q-btn
          color="primary"
          label="Increment"
          @click="counterStore.increment"
        />
        <q-btn
          color="primary"
          label="Increment x2"
          @click="counterStore.increment2x"
        />
        <q-btn
          color="primary"
          label="decrement"
          @click="counterStore.decrement"
        />
        <q-btn color="primary" label="reset" @click="counterStore.reset" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useLang } from 'src/composables/useLang';
import { useCounterStore } from 'stores/counter';
import { useMeta } from 'quasar';
useMeta({
  title: 'Penia Page',
  meta: {
    description: { name: 'description', content: 'Penia Page' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template() {
        return 'Penia Page';
      },
    },
  },
});
const counterStore = useCounterStore();
const { t } = useLang();
</script>
