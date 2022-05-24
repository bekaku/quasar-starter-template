<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';
import { AppSetup } from './utils/app';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { ITheme } from 'src/interface/common';
export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    AppSetup();

    onMounted(() => {
      if (!$q.screen.gt.xs) {
        langugeAndThemeStore.setLeftDrawer(false);
      }
      /*
      window.onpopstate = () => {
        console.log('App.vue > window.onpopstate', authenStore.auth);
        // if (
        //   authenStore.auth !== undefined &&
        //   this.$route.path == '/login'
        // ) {
        //   this.$router.push('/');
        // }
        // if (authenStore.auth === undefined) {
        //   WeeGoTo('/auth/login', true);
        // }
      };
      */
    });

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
