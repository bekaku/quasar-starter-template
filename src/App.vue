<template>
  <router-view />
</template>

<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { usePreFetch } from '@/composables/usePreFetch';
import { useRequiredAuth } from '@/composables/useRequiredAuth';
import { appNavs } from '@/libs/navs';
import { useAppStore } from '@/stores/appStore';
import { useExceptionStore } from '@/stores/exceptionStore';
import type { ITheme } from '@/types/common';
import type { UserDto } from '@/types/models';
import { detroyAuthCookie, isAppException } from '@/utils/appUtil';
import { AppAuthTokenKey, AUTH_NO_FILTER } from '@/libs/constant';
import { Cookies, useQuasar } from 'quasar';
import { useAuthenStore } from 'stores/authenStore';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AppSetup } from './utils/app';
import { userData } from './libs/data';
import { useDevice } from 'src/composables/useDevice';
defineOptions({
  async preFetch({ currentRoute, ssrContext, redirect }) {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
    const authenStore = useAuthenStore();
    const appStore = useAppStore();
    const { callAxiosProcess } = usePreFetch(ssrContext, redirect);
    if (
      !AUTH_NO_FILTER.find((t) => t == currentRoute.path) &&
      cookies &&
      cookies.get(AppAuthTokenKey) &&
      !authenStore.auth
    ) {
      /* TODO You need to work with your API, you can use my Java Springboot from the link https://github.com/bekaku/java-spring-boot-starter
      const refreshTokenReponse = await authenStore.refreshToken(ssrContext);
      if (refreshTokenReponse && !refreshTokenReponse.status && refreshTokenReponse.fourceLogout) {
        redirect({ path: '/auth/login' });
      }
      const userDataResponse = await callAxiosProcess<UserDto>({
        API: '/api/user/currentUserData',
        method: 'GET',
      });
      */

      const userDataResponse: any = {
        status: 200,
        statusText: 'OK',
        data: userData,
      };
      if (
        userDataResponse &&
        userDataResponse.status &&
        userDataResponse.status === 200 &&
        userDataResponse.data &&
        !isAppException(userDataResponse.data)
      ) {
        const userData = userDataResponse.data;
        authenStore.setAuthen(userData);

        if (userDataResponse.data?.permissions && userDataResponse.data.permissions.length > 0) {
          appStore.setPermissions(userDataResponse.data.permissions);
        }
        const backendDrawer = await appStore.initialAppNav(appNavs);
        appStore.setDrawers(backendDrawer);
      } else if (userDataResponse && userDataResponse.status && userDataResponse.status == 403) {
        detroyAuthCookie(cookies);
        redirect({ path: '/auth/login' });
      } else {
        redirect(`/error?code=${userDataResponse.status}`);
      }
    }
  },
});

const { appGoto, isDevMode } = useBase();
const exceptionStore = useExceptionStore();
const router = useRouter();
const authenStore = useAuthenStore();
const $q = useQuasar();
const langugeAndThemeStore = useLangugeAndThemeStore();
useRequiredAuth();
AppSetup();
const { initialDevice } = useDevice();

onMounted(() => {
  initialDevice();

  if (exceptionStore.error && exceptionStore.error.status && exceptionStore.error.message) {
    appGoto('/error', true);
  }
  if (authenStore.auth) {
    if (isDevMode()) {
      console.log('App.vue > authenStore >', authenStore.auth);
    }
    // authenStore.startRefreshTokenTimer();
  }
  if (!$q.screen.gt.xs) {
    // langugeAndThemeStore.setLeftDrawer(false);
  }
  window.onpopstate = () => {
    if (router.options.history.state.forward == '/auth/login' && !authenStore.auth) {
      window.history.forward();
    }
    // if (
    //   authenStore.auth !== undefined &&
    //   this.$route.path == '/login'
    // ) {
    //   this.$router.push('/');
    // }
    // if (authenStore.auth === undefined) {
    //   appGoto('/auth/login', true);
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
watch(authenStore, (state) => {
  if (state && state.sessionExpired) {
    appGoto('/auth/login', true);
  }
});
onBeforeUnmount(() => {});
</script>
