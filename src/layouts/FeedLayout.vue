<template>
  <q-layout view="hHh LpR fFf">
    <app-header />
    <!-- <app-drawer /> -->
    <q-page-container class="app-feed-container q-my-lg">
      <div class="row">
        <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-left class="fixed" />
        </div>
        <div class="col-12 col-md-6 app-feed-page">
          <router-view />
        </div>
        <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-right class="fixed" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import AppDrawer from 'src/components/base/AppDrawer.vue';
import AppHeader from 'src/components/base/AppHeader.vue';
import FeedLeft from 'src/components/feed/FeedLeft.vue';
import FeedRight from 'src/components/feed/FeedRight.vue';
</script>
