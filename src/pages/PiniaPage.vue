<template>
  <q-page class="row items-center justify-evenly">
    <p>Pinia Store</p>
    <div>Counter : {{ counterStore.counter }}</div>

    <q-btn color="primary" label="Increment" @click="counterStore.increment" />
    <q-btn
      color="primary"
      label="Increment x2"
      @click="counterStore.increment2x"
    />
    <q-btn color="primary" label="decrement" @click="counterStore.decrement" />
    <q-btn color="primary" label="reset" @click="counterStore.reset" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useCounterStore } from 'stores/counter';
export default defineComponent({
  components: {},
  setup() {
    const counterStore = useCounterStore();
    const { t } = useLang();
    return { t, counterStore };
  },
});
</script>
