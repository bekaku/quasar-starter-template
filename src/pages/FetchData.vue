<template>
  <q-page class="row items-center justify-evenly">
    <p>FetchData</p>

    <q-btn label="Load data" @click="loadData" />
    {{ data }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useBase from 'src/composables/useBase';
import useCallApi from 'src/composables/useCallApi';
import { Post } from 'src/interface/models';
export default defineComponent({
  components: {},
  setup() {
    const { WeeLoader } = useBase();
    const { useFetch } = useCallApi();
    const data = ref<Post[]>([]);
    const loadData = async () => {
      WeeLoader();
      const response = await useFetch<Post[]>({
        API: '/post',
        method: 'GET',
      });
      WeeLoader(false);
      console.log('response', response);
    };
    return { data, loadData };
  },
});
</script>
