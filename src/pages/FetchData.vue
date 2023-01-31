<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>FetchData</p>
        <q-btn label="Load data" @click="loadData" />
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="(item, index) in data" :key="index">
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption>{{ item.body }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import useBase from 'src/composables/useBase';
import useAxios from 'src/composables/useAxios';
import { Post } from '@/types/models';
import { useMeta } from 'quasar';
// import { preFetch } from 'quasar/wrappers';
import { useTestPost } from 'stores/testPostStore';
// import usePreFetch from 'src/composables/usePreFetch';
interface ITest {
  camelToSnake: string;
  i18nMessage: string;
  requestFrom: string;
  AUTHORIZATION: string;
  ACCEPT_LANGUGE: string;
  userAgent: string;
}
// preFetch: preFetch<ITest>(async ({ ssrContext }) => {
// async preFetch({ ssrContext, redirect }) {
//   const { useFetch } = usePreFetch(ssrContext, redirect);
//   const data = await useFetch<ITest>({
//     API: '/test',
//     method: 'GET',
//   });
//   const testPostStore = useTestPost();
//   testPostStore.setData(data);
//   console.log('preFetch', data);
// },
const { WeeLoader } = useBase();
const { callAxios } = useAxios();
const data = ref<Post[]>([]);

const dataTest = ref<ITest>();
const testPostStore = useTestPost();

useMeta({
  title: testPostStore.item ? testPostStore.item.i18nMessage : 'No Data',
});

// const post = computed(() => testPostStore.item);

onBeforeMount(async () => {
  console.log('onBeforeMount', dataTest.value);
});

const loadData = async () => {
  WeeLoader();
  // get
  const response = await callAxios<Post[]>({
    API: '/posts',
    method: 'GET',
  });
  if (response) {
    data.value = response;
  }

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
</script>
