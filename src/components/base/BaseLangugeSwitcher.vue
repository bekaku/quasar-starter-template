<script setup lang="ts">
import { biCheck2 } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
const {
  closeOnClick = false,
  anchor = 'bottom left',
  self = 'top start',
} = defineProps<{
  closeOnClick?: boolean;
  anchor?: any;
  self?: any;
}>();

const { locale, onSetLocale, availableLocales } = useLang();
</script>
<template>
  <!-- :anchor="!screen.gt.xs ? 'bottom left' : 'top end'" self="top start" -->
  <q-menu :anchor="anchor" :self="self" v-bind="$attrs" :auto-close="closeOnClick">
    <q-list style="min-width: 150px" dense class="q-pa-xs">
      <q-item
        v-for="lang in availableLocales"
        :key="lang.iso"
        clickable
        class="rounded"
        @click="onSetLocale(lang.iso)"
      >
        <q-item-section>{{ lang.name }}</q-item-section>
        <q-item-section v-if="lang.iso == locale" side>
          <q-icon :name="biCheck2" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
