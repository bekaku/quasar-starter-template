<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { AppSetup } from './utils/app';
import { useSSRContext } from 'vue';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndTheme';
import { ITheme } from 'src/interface/common';
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    AppSetup(ssrContext);
    if (!$q.screen.gt.xs) {
      langugeAndThemeStore.setLeftDrawer(false);
    }

    const setDark = (theme: ITheme) => {
      if (theme == 'dark') {
        $q.dark.set(true);
      } else {
        $q.dark.set(false);
      }
    };
    setDark(langugeAndThemeStore.theme as ITheme);
    watch(langugeAndThemeStore, (state) => {
      setDark(state.theme as ITheme);
    });
    return {};
  },
});
</script>
