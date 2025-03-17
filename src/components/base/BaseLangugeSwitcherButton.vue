<script setup lang="ts">
import { biChevronExpand, biGlobe } from '@quasar/extras/bootstrap-icons'
import { useLang } from 'src/composables/useLang';
import BaseLangugeSwitcher from './BaseLangugeSwitcher.vue';
const { currentLangugeName } = useLang()
const {
  closeOnClick = false,
  anchor = 'bottom left',
  self = 'top start'
} = defineProps<{
  closeOnClick?: boolean
  anchor?: any
  self?: any
}>()
</script>
<template>
  <q-btn size="13px" flat dense no-caps no-wrap :icon="biGlobe" :label="currentLangugeName">
    <q-icon class="q-ml-sm" :name="biChevronExpand" size="14px" />
    <BaseLangugeSwitcher :close-on-click="closeOnClick" :anchor :self />
  </q-btn>
</template>
