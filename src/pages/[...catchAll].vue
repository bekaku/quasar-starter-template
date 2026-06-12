<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <base-result status="404" :description="t('error.pageNotFound')">
      <template #extra>
        <q-btn
          outline
          :icon="biArrowLeft"
          :label="t('base.back') + t('base.home')"
          :to="previosPath"
        />
      </template>
    </base-result>
  </div>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';
import { ref } from 'vue';
import BaseResult from 'components/base/BaseResult.vue';
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
const { getPreviousPath } = useBase();
const previosPath = ref(getPreviousPath());
useMeta({
  title: t('http.404'),
});
</script>
