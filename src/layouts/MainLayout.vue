<template>
  <q-layout view="hHh LpR fFf">
    <app-header />
    <app-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import AppDrawer from 'src/components/base/AppDrawer.vue';
import AppHeader from 'src/components/base/AppHeader.vue';
</script>
