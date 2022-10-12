<template>
  <q-toolbar
    class="q-py-xs"
    style="background: none"
    :class="
      $q.dark.isActive
        ? 'wee-second-bg-color-theme-dark text-white'
        : 'text-black'
    "
  >
    <q-space />
    <q-btn
      flat
      no-wrap
      :icon="biTranslate"
      :label="currenLocale ? currenLocale.name : ''"
    >
      <q-icon class="q-ml-sm" :name="biCaretDown" size="16px" />
      <q-menu>
        <q-list style="min-width: 150px">
          <q-item
            clickable
            v-for="lang in availableLocales"
            :key="lang.iso"
            @click="langugeAndThemeStore.setLocale(lang.iso)"
          >
            <q-item-section>{{ lang.name }}</q-item-section>
            <q-item-section v-if="lang.iso == langugeAndThemeStore.locale" side>
              <q-icon :name="biCheck2" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  biCaretDown,
  biTranslate,
  biCheck2,
} from '@quasar/extras/bootstrap-icons';
import { availableLocales } from 'src/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
const langugeAndThemeStore = useLangugeAndThemeStore();
const currenLocale = computed(() =>
  availableLocales.find((t) => t.iso == langugeAndThemeStore.locale)
);
</script>
<style lang="sass"></style>
