<script setup lang="ts">
import { biCheck2, biMoon, biSun } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import BaseButton from './BaseButton.vue';
import { useTheme } from 'src/composables/useTheme';
const {
  closeOnClick = false,
  anchor = 'bottom left',
  self = 'top start',
  width = '180px',
  toggle = true,
} = defineProps<{
  closeOnClick?: boolean;
  toggle?: boolean;
  anchor?: any;
  self?: any;
  width?: string;
}>();
const { t } = useLang();
const { isDark, onSetTheme, availableThemes } = useTheme();
</script>
<template>
  <BaseButton
    v-if="toggle"
    flat
    :icon="isDark ? biSun : biMoon"
    round
    dense
    @click="!isDark ? onSetTheme('dark') : onSetTheme('light')"
  >
    <q-tooltip>
      {{ !isDark ? t('theme.dark') : t('theme.light') }}
    </q-tooltip>
  </BaseButton>
  <q-menu v-else :anchor="anchor" :self="self" v-bind="$attrs" :auto-close="closeOnClick">
    <q-list :style="{ minWidth: width }">
      <q-item
        v-for="theme in availableThemes"
        :key="theme.key"
        clickable
        @click="onSetTheme(theme.key)"
      >
        <q-item-section avatar>
          <q-icon :name="theme.icon" />
        </q-item-section>
        <q-item-section>{{ t(theme.text) }}</q-item-section>
        <q-item-section v-if="(theme.key == 'dark' && isDark) || (theme.key == 'light' && !isDark)" side>
          <q-icon :name="biCheck2" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
