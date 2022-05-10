<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppSetup } from './utils/app';
export default defineComponent({
  name: 'App',
  setup() {
    AppSetup();
  },
});
</script>
