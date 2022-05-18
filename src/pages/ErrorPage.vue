<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <!-- <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div> -->
    <app-result status="error" :title="code" :description="message">
      <template #extra>
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
import { defineComponent } from 'vue';
import useBase from 'src/composables/useBase';
import AppResult from 'components/base/AppResult.vue';
import { useLang } from 'src/composables/useLang';
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
export default defineComponent({
  name: 'ErrorPage',
  components: {
    AppResult,
  },
  setup() {
    const { t } = useLang();
    const { WeeGetParam } = useBase();
    useMeta({
      title: t('error.error'),
    });
    return {
      code: WeeGetParam('code'),
      message: WeeGetParam('message'),
      t,
      biArrowLeft,
    };
  },
});
</script>
