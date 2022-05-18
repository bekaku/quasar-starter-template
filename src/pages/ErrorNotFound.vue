<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result status="404" :description="t('error.pageNotFound')">
      <template #extra>
        <q-btn
          outline
          icon="mdi-arrow-left"
          :label="t('base.back') + t('base.home')"
          to="/"
        />
      </template>
    </app-result>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';
import AppResult from 'components/base/AppResult.vue';
import { useLang } from 'src/composables/useLang';
export default defineComponent({
  name: 'ErrorPage',
  components: {
    AppResult,
  },
  setup() {
    const { t } = useLang();
    useMeta({
      title: t('http.404'),
    });
    return {
      t,
    };
  },
});
</script>
