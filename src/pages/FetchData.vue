<template>
  <q-page class="row items-center justify-evenly">
    <p>FetchData</p>
    <q-btn label="Load data" @click="loadData" />
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
      // get
      // const response = await useFetch<unknown[]>({
      //   API: '/test',
      //   method: 'GET',
      // });

      // post
      const response = await useFetch<unknown[]>({
        API: '/test/test-post',
        method: 'POST',
        body: {
          userRegister: {
            email: 'user01@mydomain.com',
            username: null,
            password: '1234',
            active: true,
            selectedRoles: [],
            userData: null,
          },
        },
      });

      // GET
      // const response = await useFetch<Post[]>({
      //   API: '/posts',
      //   method: 'GET',
      // });

      WeeLoader(false);
      console.log('response', response);
    };

    return { data, loadData };
  },
});
</script>
