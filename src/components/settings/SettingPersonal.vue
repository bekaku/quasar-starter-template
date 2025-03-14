<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">{{ t('base.privateData') }}</div>
      <q-form @submit="onSubmit">
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <q-input
              outlined
              v-model="entity.fullName"
              :label="t('base.editName')"
              :rules="[required]"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <q-input
              outlined
              v-model="entity.positionName"
              :label="t('model.user_data.positionName')"
              :rules="[required]"
            />
          </div>
        </div>
        <div class="col-12 col-md-12 q-pa-md">
          <form-togle
            v-if="entity.autoFollowUser != undefined"
            :label="t('base.other')"
            v-model="entity.autoFollowUser"
          />
        </div>
        <q-card-actions align="right">
          <q-btn
            :disable="!canSubmit"
            unelevated
            color="primary"
            :icon="biPencil"
            :label="t('base.okay')"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
    <q-inner-loading :showing="loading" :label="t('base.pleaseWait')" label-class="text-primary" />
  </q-card>
</template>
<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import type { UserPersonalEditRequest } from '@/types/models';
import UserService from '@/api/UserService';
import { useValidation } from '@/composables/useValidation';
import { biPencil } from '@quasar/extras/bootstrap-icons';
const FormTogle = defineAsyncComponent(() => import('@/components/base/BaseToggle.vue'));
const { t } = useLang();
const { updatePersonalData } = UserService();
const { required } = useValidation();
const entity = ref<UserPersonalEditRequest>({
  fullName: '',
  positionName: '',
  teamLeaderName: '',
  autoFollowUser: true,
  initialConfig: true,
});
const loading = ref(false);
const emit = defineEmits(['on-finish']);
const canSubmit = computed(() => {
  return entity.value.fullName && entity.value.fullName.length >= 4;
});
const onSubmit = async () => {
  loading.value = true;
  await updatePersonalData(entity.value);
  loading.value = false;
  emit('on-finish');
};
</script>
