<script setup lang="ts">
import { biCheck2, biMoon, biSun } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import BaseButton from './BaseButton.vue';
import BaseTooltip from './BaseTooltip.vue';
import { useTheme } from 'src/composables/useTheme';
import { useQuasar } from 'quasar';
import type { ITheme } from 'src/types/common';
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
const { dark } = useQuasar();
const { onSetTheme, availableThemes } = useTheme();
const setTheme = (theme: ITheme) => {
  // dark.set(theme === 'dark');
  onSetTheme(theme);
};
</script>
<template>
  <BaseButton
    v-if="toggle"
    flat
    :icon="dark.isActive ? biSun : biMoon"
    round
    dense
    @click="!dark.isActive ? setTheme('dark') : setTheme('light')"
  >
  <BaseTooltip>
      {{ dark.isActive ? t('theme.switchThemeLight') : t('theme.switchThemeDark') }}
    </BaseTooltip>
  </BaseButton>
  <q-menu v-else :anchor="anchor" :self="self" v-bind="$attrs" :auto-close="closeOnClick">
    <q-list :style="{ minWidth: width }" dense class="q-pa-xs">
      <q-item
        v-for="theme in availableThemes"
        :key="theme.key"
        clickable
        class="rounded"
        @click="setTheme(theme.key)"
      >
        <q-item-section avatar>
          <q-icon :name="theme.icon" />
        </q-item-section>
        <q-item-section>{{ t(theme.text) }}</q-item-section>
        <q-item-section
          v-if="(theme.key == 'dark' && dark.isActive) || (theme.key == 'light' && !dark.isActive)"
          side
        >
          <q-icon :name="biCheck2" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
