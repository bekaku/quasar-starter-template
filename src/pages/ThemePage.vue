<template>
  <q-page class="row items-center justify-evenly">
    <p>Theme Page</p>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableLocales } from 'src/utils/lang';
import { useMeta } from 'quasar';
useMeta({
  title: 'I18n Page',
});
const { t } = useLang();
const langugeAndThemeStore = useLangugeAndThemeStore();
</script>
