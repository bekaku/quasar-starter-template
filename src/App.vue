<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { AppSetup } from './utils/app';
import { useSSRContext } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const ready = ref(false);
    nextTick(() => {
      ready.value = true;
    });
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    AppSetup(ssrContext);
    return {
      ready,
    };
  },
});
</script>
