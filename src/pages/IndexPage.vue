<template>
  <q-page padding>
    <q-card elavated>
      <q-card-section>
        <p>{{ t('app.name') }}</p>

        <div>Pinia Counter : {{ counterStore.counter }}</div>

        <div class="q-gutter-lg">
          <q-btn
            label="show loading"
            color="primary"
            unelevated
            @click="loader"
          />
          <q-btn label="show toast" color="warning" @click="toaster" />
          <q-btn label="show confirm" color="negative" @click="confirm" />
        </div>

        <example-component
          title="Example component"
          active
          :todos="todos"
          :meta="meta"
        ></example-component>
      </q-card-section>
      <q-card-section> auth : {{ authenStore.auth }} </q-card-section>

      <q-card-section>
        <app-result status="empty" :description="t('error.dataNotfound')">
          <template #extra>
            <q-btn
              outline
              icon="bi-arrow-left"
              :label="t('base.back') + t('base.home')"
            />
          </template>
        </app-result>

        <app-alert
          radius
          type="is-light"
          message="This is alert message!!"
          title="Title"
        >
        </app-alert>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { Todo, Meta } from '@/types/models';
import { ref, defineAsyncComponent } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useCounterStore } from 'stores/counter';
import { useAuthenStore } from 'stores/authenStore';
import useBase from 'src/composables/useBase';
import AppResult from '@/components/base/AppResult.vue';
const ExampleComponent = defineAsyncComponent(
  () => import('@/components/ExampleComponent.vue')
);
const AppAlert = defineAsyncComponent(
  () => import('@/components/base/AppAlert.vue')
);
useMeta({
  title: 'Index Page',
});
const { WeeLoader, WeeToast, WeeConfirm } = useBase();
const counterStore = useCounterStore();
const authenStore = useAuthenStore();
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
</script>
