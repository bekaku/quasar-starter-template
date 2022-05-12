<template>
  <q-page class="row items-center justify-evenly">
    <p>Theme Page</p>
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
    });
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableLocales };
  },
});
</script>
