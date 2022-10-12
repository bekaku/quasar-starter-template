<template>
  <q-layout view="hHh LpR fFf">
    <app-header />
    <app-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { useAuthenStore } from 'stores/authenStore';
import useInitAuth from 'src/composables/useInitAuth';
export default {
  async preFetch({ ssrContext, redirect }) {
    const authenStore = useAuthenStore();
    if (!authenStore.auth) {
      const { init } = useInitAuth(ssrContext, redirect);
      const userData = await init();
      if (userData) {
        authenStore.setAuthen(userData);
      }
    }
  },
};
</script>

<script lang="ts" setup>
import AppDrawer from 'src/components/base/AppDrawer.vue';
import AppHeader from 'src/components/base/AppHeader.vue';
</script>
