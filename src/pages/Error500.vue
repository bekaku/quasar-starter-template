<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result
      status="error"
      icon-size="256px"
      :title="code"
      :description="message"
    >
      <template #extra>
        {{ exceptionStore.error }}
        <q-btn
          outline
          :icon="biArrowLeft"
          :label="t('base.back') + t('base.home')"
          to="/"
        />
      </template>
    </app-result>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useBase from 'src/composables/useBase';
import AppResult from 'components/base/AppResult.vue';
import { useLang } from 'src/composables/useLang';
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
import { useExceptionStore } from 'src/stores/exceptionStore';
export default defineComponent({
  name: 'ErrorPage',
  components: {
    AppResult,
  },
  setup() {
    const { t } = useLang();
    const { WeeGetParam } = useBase();
    const exceptionStore = useExceptionStore();
    useMeta({
      title: t('error.error'),
    });
    const route = useRoute();
    const code = ref(WeeGetParam('code'));
    const message = ref(WeeGetParam('message'));
    console.log('route', route.params);
    return {
      code,
      message,
      t,
      biArrowLeft,
      exceptionStore,
    };
  },
});
</script>
