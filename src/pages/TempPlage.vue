<template>
  <q-page padding>
    <q-card flat bordered class="wee-container-responsive-center">
      <q-card-section>
        <p>{{ t('app.name') }}</p>
        <q-icon :name="biPeople" />
        <app-result status="empty" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref } from 'vue';
import { useLang } from 'src/composables/useLang';
import useBase from 'src/composables/useBase';
import useAppMeta from '@/composables/useAppMeta';
import UserService from 'src/api/UserService';
import { UserDto } from '@/types/models';
import { biPeople } from '@quasar/extras/bootstrap-icons';
const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue')
);
const { t } = useLang();
const { WeeLoader } = useBase();
const { findCurrentUserData } = UserService();
const user = ref<UserDto>();
const { setTitle } = useAppMeta();
setTitle(`${t('dashboard')} | ${t('app.name')}`);
onMounted(async () => {
  console.log('onMounted');
  WeeLoader();
  const res = await findCurrentUserData();
  WeeLoader(false);
  if (res) {
    user.value = res;
  }
});
</script>
