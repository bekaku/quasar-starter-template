<template>
  <q-layout view="hHh LpR fFf">
    <base-header />
    <!-- <app-drawer /> -->
    <q-page-container class="app-feed-container q-my-lg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import AppDrawer from '@/components/base/AppDrawer.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
</script>
