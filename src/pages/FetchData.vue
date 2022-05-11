<template>
  <q-page class="row items-center justify-evenly">
    <p>FetchData</p>
    <q-btn label="Load data" @click="loadData" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import useBase from 'src/composables/useBase';
import useCallApi from 'src/composables/useCallApi';
import { Post } from 'src/interface/models';
import { useMeta } from 'quasar';
export default defineComponent({
  components: {},
  setup() {
    useMeta({
      title: 'Fetch Data Page',
      meta: {
        description: { name: 'description', content: 'Fetch Data Page' },
        keywords: { name: 'keywords', content: 'Quasar website' },
        equiv: {
          'http-equiv': 'Content-Type',
          content: 'text/html; charset=UTF-8',
        },
        // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
        ogTitle: {
          property: 'og:title',
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template() {
            return 'Fetch Data Page';
          },
        },
      },
    });
    const { WeeLoader } = useBase();
    const { useFetch } = useCallApi();
    const data = ref<Post[]>([]);

    onBeforeMount(async () => {
      const response = await useFetch<unknown[]>({
        API: '/test',
        method: 'GET',
      });
      console.log('response', response);
    });
    const loadData = async () => {
      WeeLoader();
      // get
      const response = await useFetch<unknown[]>({
        API: '/test',
        method: 'GET',
      });

      // post
      // const response = await useFetch<unknown[]>({
      //   API: '/test/test-post',
      //   method: 'POST',
      //   body: {
      //     userRegister: {
      //       email: 'user01@mydomain.com',
      //       username: null,
      //       password: '1234',
      //       active: true,
      //       selectedRoles: [],
      //       userData: null,
      //     },
      //   },
      // });

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
