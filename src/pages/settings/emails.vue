<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useAppMeta } from '@/composables/useAppMeta';
import SettingLayout from 'src/components/settings/SettingLayout.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
const SettingEmail = defineAsyncComponent(() => import('@/components/settings/SettingEmail.vue'));
const SettingPhone = defineAsyncComponent(() => import('@/components/settings/SettingPhone.vue'));
useAppMeta();
</script>
<template>
  <SettingLayout>
    <template #content>
      <div class="q-pl-lg">
        <BaseCard>
          <SettingEmail />
          <q-separator />
          <SettingPhone class="q-mt-md" />
        </BaseCard>
      </div>
    </template>
  </SettingLayout>
</template>
