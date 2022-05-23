<template>
  <q-card square flat class="bg-transparent">
    <q-card-section class="text-right">
      <p>EmailPage</p>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useMeta } from 'quasar';
export default defineComponent({
  components: {},
  setup() {
    useMeta({
      title: 'Email settings',
    });
    const { t } = useLang();
    return { t };
  },
});
</script>
