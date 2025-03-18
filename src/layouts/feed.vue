<template>
  <q-layout view="hHh LpR fFf">
    <base-header bordered />
    <feed-drawer overlay />
    <q-page-container class="app-feed-container q-my-lg">
      <div class="row">
        <div v-if="screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-left class="fixed" />
        </div>
        <div class="col-12 col-md-6 app-feed-page">
          <router-view />
        </div>
        <div v-if="screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-right class="fixed" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import FeedDrawer from '@/components/feed/FeedDrawer.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import FeedLeft from '@/components/feed/FeedLeft.vue';
import FeedRight from '@/components/feed/FeedRight.vue';
import { useQuasar } from 'quasar';
const { screen } = useQuasar();
</script>
