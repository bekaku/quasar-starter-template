<template>
  <div
    v-if="(breadcrumbs && breadcrumbs.length > 0) || (tabs && tabs.length > 0)"
    class="row q-mt-lg"
  >
    <div class="col">
      <q-toolbar v-if="breadcrumbs && breadcrumbs.length > 0" flat bordered class="rounded">
        <BaseBreadcrumbs
          v-if="breadcrumbs.length > 0"
          :items="breadcrumbs"
          :separator-icon="biChevronRight"
        />
      </q-toolbar>
      <q-separator v-if="tabs && tabs.length > 0 && breadcrumbs && breadcrumbs.length > 0" />
      <div class="block" v-if="tabs && tabs.length > 0">
        <BaseTabsRoute :items="tabs" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppBreadcrumbTabs } from '@/composables/useAppBreadcrumbTabs';
import { defineAsyncComponent } from 'vue';
import { biChevronRight } from '@quasar/extras/bootstrap-icons';
const BaseBreadcrumbs = defineAsyncComponent(() => import('@/components/base/BaseBreadcrumbs.vue'));
const BaseTabsRoute = defineAsyncComponent(() => import('@/components/base/BaseTabsRoute.vue'));
const { breadcrumbs, tabs } = useAppBreadcrumbTabs();
</script>
