<template>
  <div>
    Current locale :
    {{ langugeAndThemeStore ? langugeAndThemeStore.locale : '' }}
    <select v-model="langugeAndThemeStore.locale">
      <option
        v-for="lang in availableLocales"
        :key="lang.iso"
        :value="lang.iso"
      >
        {{ lang.flag }} {{ lang.name }} ({{ lang.iso }})
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableLocales } from 'src/utils/lang';
const langugeAndThemeStore = useLangugeAndThemeStore();
</script>
