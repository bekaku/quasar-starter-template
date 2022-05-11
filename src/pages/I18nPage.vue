<template>
  <q-page class="row items-center justify-evenly">
    <p>I18n Page</p>
    <p>{{ t('base.appCookiepolicy') }}</p>
    <p>
      Current locale :
      {{ langugeAndThemeStore ? langugeAndThemeStore.locale : '' }}
    </p>
    <select v-model="langugeAndThemeStore.locale">
      <option
        v-for="lang in availableLocales"
        :key="lang.iso"
        :value="lang.iso"
      >
        {{ lang.flag }} {{ lang.name }} ({{ lang.iso }})
      </option>
    </select>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndTheme';
import { availableLocales } from 'src/utils/lang';
import { useMeta } from 'quasar';
export default defineComponent({
  components: {},
  setup() {
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
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableLocales };
  },
});
</script>
