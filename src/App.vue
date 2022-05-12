<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppSetup } from './utils/app';
import { useSSRContext } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    // const ready = ref(false);
    // nextTick(() => {
    //   ready.value = true;
    // });
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    AppSetup(ssrContext);
    return {};
  },
});
</script>
