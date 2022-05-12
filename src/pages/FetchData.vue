<template>
  <q-page class="row items-center justify-evenly">
    <p>FetchData</p>
    <q-btn label="Load data" @click="loadData" />
    <p>Post from prefect {{ post }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, computed } from 'vue';
import useBase from 'src/composables/useBase';
import useCallApi from 'src/composables/useCallApi';
import { Post } from 'src/interface/models';
import { useMeta } from 'quasar';
// import { preFetch } from 'quasar/wrappers';
import { useTestPost } from 'stores/testPostStore';
import usePreFetch from 'src/composables/usePreFetch';
interface ITest {
  camelToSnake: string;
  i18nMessage: string;
  requestFrom: string;
  AUTHORIZATION: string;
  ACCEPT_LANGUGE: string;
  userAgent: string;
}
export default defineComponent({
  components: {},
  // preFetch: preFetch<ITest>(async ({ ssrContext }) => {
  async preFetch({ ssrContext }) {
    const { useFetch } = usePreFetch(ssrContext);
    const data = await useFetch<ITest>({
      API: '/test',
      method: 'GET',
    });
    const testPostStore = useTestPost();
    testPostStore.setData(data);
    // const { useFetch } = useCallApi();
    // const response = await useFetch<ITest>({
    //   API: '/test',
    //   method: 'GET',
    // });
    // console.log('preFetch', response);
    console.log('preFetch', data);
  },
  setup() {
    const { WeeLoader } = useBase();
    const { useFetch } = useCallApi();
    const data = ref<Post[]>([]);

    const dataTest = ref<ITest>();
    const testPostStore = useTestPost();

    useMeta({
      title: testPostStore.item ? testPostStore.item.i18nMessage : 'No Data',
    });

    const post = computed(() => testPostStore.item);

    onBeforeMount(async () => {
      console.log('onBeforeMount', dataTest.value);
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

    return { data, loadData, post };
  },
});
</script>
