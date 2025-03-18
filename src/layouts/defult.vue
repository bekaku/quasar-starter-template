<script setup lang="ts">
import BaseHeader from '@/components/base/BaseHeader.vue';
import BaseSidebar from '@/components/base/BaseSidebar.vue';
import LayoutBreadcrumbTab from '@/components/base/LayoutBreadcrumbTab.vue';
import { BackendLogin } from '@/libs/permissions';
import { biList, biWindowSidebar } from '@quasar/extras/bootstrap-icons';
import { useAppStore } from 'src/stores/appStore';
// defineOptions({
//   preFetch({ /* ssrContext, redirect */ redirect }) {
//     const appStore = useAppStore();
//     if (!appStore.isHavePermission([BackendLogin])) {
//       redirect({ path: '/auth/login' });
//     }
//   },
// });
const appStore = useAppStore();
</script>
<template>
  <!-- <q-layout view="hHh LpR fFf"> -->
  <q-layout view="lHh Lpr lff">
    <BaseSidebar v-model="appStore.drawerOpen" bordered expan-all />
    <base-header
      :frontend="false"
      :show-togle-drawer="true"
      :show-logo="true"
      bordered
    />
    <q-page-container>
      <layout-breadcrumb-tab />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
