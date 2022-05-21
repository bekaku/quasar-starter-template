<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result
      status="error"
      icon-size="256px"
      :title="code"
      :description="message"
    >
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
