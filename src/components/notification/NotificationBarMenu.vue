<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6">
        {{ t('base.notification') }}
      </div>
    </q-card-section>
    <skeleton-item v-if="loading" :items="5" show></skeleton-item>
    <template v-else-if="items.length > 0">
      <q-card-section>
        <q-btn
          unelevated
          rounded
          color="primary"
          class="full-width"
          :label="t('base.readAllNotifications')"
          to="/notifications"
          v-close-popup
        />
      </q-card-section>
    </template>
    <template v-else>
      <base-result status="empty" :description="t('error.dataNotfound')"></base-result>
    </template>
  </q-card>
</template>
<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import type { NotificationDto } from '@/types/models';
import UserNotifyService from '@/api/UserNotifyService';
const SkeletonItem = defineAsyncComponent(() => import('@/components/skeleton/SkeletonItem.vue'));
const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));
const { findAllByUser } = UserNotifyService();
const { t } = useLang();
const loading = ref(false);
const items = ref<NotificationDto[]>([]);

onMounted(async () => {
  loading.value = true;
  await fetchDataData();
  loading.value = false;
});
const fetchDataData = async () => {
  const res = await findAllByUser(1, 10);
  if (res && res.length > 0) {
    items.value.push(...res);
  }
  return new Promise((resolve) => {
    resolve(true);
  });
};
</script>
