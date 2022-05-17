<template>
  <q-layout view="hHh LpR fFf">
    <app-header />
    <app-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppDrawer from 'src/components/base/AppDrawer.vue';
import AppHeader from 'src/components/base/AppHeader.vue';
export default {
  name: 'MainLayout',
  components: {
    AppDrawer,
    AppHeader,
  },
  setup() {
    return {};
  },
};
</script>
