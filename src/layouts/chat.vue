<template>
  <q-layout view="hHh LpR fFf">
    <base-header bordered :show-chat-btn="false" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import BaseHeader from '@/components/base/BaseHeader.vue';
</script>
