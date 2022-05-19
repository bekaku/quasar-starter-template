<template>
  <q-layout view="hHh LpR fFf">
    <app-header-alt />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeaderAlt from 'src/components/base/AppHeaderAlt.vue';
export default {
  name: 'MainLayout',
  components: {
    AppHeaderAlt,
  },
  setup() {
    return {};
  },
};
</script>
