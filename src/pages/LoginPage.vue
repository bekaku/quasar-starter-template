<template>
  <q-page class="row items-center justify-evenly">
    <p>Login Page</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';
export default defineComponent({
  components: {},
  setup() {
    useMeta({
      title: 'Login Page Page',
    });
  },
});
</script>
