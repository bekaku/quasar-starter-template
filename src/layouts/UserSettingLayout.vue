<template>
  <q-layout view="hHh LpR fFf">
    <app-header :hamberger-menu="false" />
    <q-page-container class="wee-container-responsive-center">
      <q-page padding>
        <div class="row">
          <div class="col-12 col-md-4">
            <user-setting-drawer />
          </div>
          <div class="col-12 col-md-8">
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from 'src/components/base/AppHeader.vue';
import UserSettingDrawer from 'src/components/base/UserSettingDrawer.vue';
import { useAuthenStore } from 'stores/authenStore';
import useInitAuth from 'src/composables/useInitAuth';
export default {
  name: 'UserSettingLayout',
  components: {
    AppHeader,
    UserSettingDrawer,
  },
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
  setup() {
    return {};
  },
};
</script>
