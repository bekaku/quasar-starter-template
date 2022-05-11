<template>
  <q-page class="row items-center justify-evenly">
    <p>{{ t('app.name') }}</p>

    <div>Pinia Counter : {{ counterStore.counter }}</div>

    <div class="q-gutter-lg">
      <q-btn label="show loading" @click="loader" />
      <q-btn label="show toast" @click="toaster" />
      <q-btn label="show confirm" @click="confirm" />
    </div>

    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { Todo, Meta } from 'src/interface/models';
import { defineComponent, ref, defineAsyncComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useCounterStore } from 'stores/counter';
import useBase from 'src/composables/useBase';
const metaData = {
  // sets document title
  title: 'Index Page',
  titleTemplate: (title: string) => `${title} - My Website`,
  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle: string) {
        return `${ogTitle} - My Website`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    },
  },
};
export default defineComponent({
  name: 'IndexPage',
  components: {
    ExampleComponent: defineAsyncComponent(
      () => import('@/components/ExampleComponent.vue')
    ),
  },
  setup() {
    useMeta(metaData);
    const { WeeLoader, WeeToast, WeeConfirm } = useBase();
    const counterStore = useCounterStore();
    const { t } = useLang();
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    const confirm = async () => {
      const conf = await WeeConfirm(t('app.monogram'), t('base.deleteConfirm'));
      if (conf) {
        WeeToast('Confirm', { type: 'positive' });
      } else {
        WeeToast('Cancle', { type: 'negative' });
      }
    };
    const loader = () => {
      WeeLoader();
      setTimeout(() => {
        WeeLoader(false);
      }, 3000);
    };
    const toaster = () => {
      WeeToast('this is a toast', { type: 'positive' });
    };
    return { todos, meta, t, counterStore, loader, toaster, confirm };
  },
});
</script>
