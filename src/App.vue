<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue';
import { AppSetup } from './utils/app';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { useAuthenStore } from 'stores/authenStore';
import { ITheme } from 'src/interface/common';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const authenStore = useAuthenStore();
    const $q = useQuasar();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    AppSetup();

    onMounted(() => {
      if (!$q.screen.gt.xs) {
        langugeAndThemeStore.setLeftDrawer(false);
      }
      window.onpopstate = () => {
        if (
          router.options.history.state.forward == '/auth/login' &&
          !authenStore.auth
        ) {
          window.history.forward();
        }
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
