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
<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { availableLocales } from 'src/utils/lang';
export default defineComponent({
  components: {},
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return { t, langugeAndThemeStore, availableLocales };
  },
});
</script>
