<template>
  <div>
    Current themeSetting :
    {{ langugeAndThemeStore.themeSetting + ' , ' + langugeAndThemeStore.theme }}
    <select v-model="langugeAndThemeStore.themeSetting">
      <option
        v-for="theme in availableThemes"
        :key="theme.key"
        :value="theme.key"
      >
        {{ theme.text }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useLang } from 'src/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableThemes } from 'src/utils/theme';
const { t } = useLang();
const langugeAndThemeStore = useLangugeAndThemeStore();
</script>
