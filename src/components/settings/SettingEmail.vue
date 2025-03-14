<template>
  <q-card-section>
    <div class="text-h6">{{ t('base.emailEdit') }}</div>
    <q-form @submit="onSubmit">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <q-input
            outlined
            v-model="entity.email"
            :label="t('base.emailEdit')"
            :rules="[required, requireEmail]"
            type="email"
          />
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn
          :disable="!canSubmit"
          unelevated
          color="primary"
          :icon="biPencil"
          :label="t('base.edit')"
          type="submit"
        />
      </q-card-actions>
    </q-form>
    <q-inner-loading
      :showing="loading"
      :label="t('base.pleaseWait')"
      label-class="text-primary"
    />
  </q-card-section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthenStore } from '@/stores/authenStore';
import type { UserPersonalEditRequest } from '@/types/models';
import { validateEmail } from '@/utils/appUtil';
import UserService from '@/api/UserService';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { biPencil } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
const authenStore = useAuthenStore();
const { updateEmail } = UserService();
const { required, requireEmail } = useValidation();
const entity = ref<UserPersonalEditRequest>({
  email: '',
});
const loading = ref(false);
onMounted(() => {
  if (authenStore.auth && authenStore.auth.email) {
    entity.value.email = authenStore.auth.email;
  }
});
const canSubmit = computed(() => {
  return entity.value.email && emailValid.value;
});
const emailValid = computed(() => {
  return entity.value.email ? validateEmail(entity.value.email) : false;
});
const onSubmit = async () => {
  loading.value = true;
  const res = await updateEmail(entity.value);
  loading.value = false;
  if (res && res.status == 'OK') {
    if (authenStore.auth) {
      authenStore.auth.email = entity.value.email as string;
    }
  }
};
</script>
