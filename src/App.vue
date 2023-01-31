<template>
  <router-view />
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { AppSetup } from './utils/app';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { useAuthenStore } from 'stores/authenStore';
import { ITheme } from '@/types/common';
import { useRouter } from 'vue-router';
const router = useRouter();
const authenStore = useAuthenStore();
const $q = useQuasar();
const langugeAndThemeStore = useLangugeAndThemeStore();
AppSetup();

onMounted(() => {
  // if (!$q.screen.gt.xs) {
  //   langugeAndThemeStore.setLeftDrawer(false);
  // }
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
</script>
