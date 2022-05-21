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
<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableThemes } from 'src/utils/theme';
export default defineComponent({
  components: {},
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableThemes };
  },
});
</script>
