<template>
  <q-page class="row items-center justify-evenly">
    <p>I18n Page</p>
    <p>{{ t('base.appCookiepolicy') }}</p>
    <p>Current locale : {{ langugeAndThemeStore.locale }}</p>
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
export default defineComponent({
  components: {},
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableLocales };
  },
});
</script>
