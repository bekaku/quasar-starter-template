<template>
  <q-card-section>
    <div class="text-h6">{{ t('base.phoneEdit') }}</div>
    <q-form @submit="onSubmit">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <q-input
            bottom-slots
            outlined
            v-model="entity.mobilePhone"
            :label="t('base.phoneEdit')"
          >
            <template v-if="!phoneValid" v-slot:hint>
              <span class="text-negative">
                {{ t('error.validatePhone') }}
              </span>
            </template>
          </q-input>
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
        >
        </q-btn>
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
import { ref, computed } from 'vue';
import { UserPersonalEditRequest } from '@/types/models';
import UserService from '@/api/UserService';
import { useLang } from '@/composables/useLang';
import { biPencil } from '@quasar/extras/bootstrap-icons';
import { CountryCode, Country } from '@/types/common';
import { isValidPhoneNumber } from 'libphonenumber-js';
const { t } = useLang();
const { updatePersonalData } = UserService();
const countryCode = ref<CountryCode>('TH');
const entity = ref<UserPersonalEditRequest>({
  mobilePhone: '',
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const countryList = ref<Country[]>([
  {
    code: 'TH',
    no: 66,
    name: 'Thailand',
  },
]);
const loading = ref(false);
const canSubmit = computed(() => {
  return entity.value.mobilePhone && phoneValid.value;
});
const phoneValid = computed(() => {
  return entity.value.mobilePhone
    ? isValidPhoneNumber(entity.value.mobilePhone, countryCode.value)
    : false;
});
const onSubmit = async () => {
  loading.value = true;
  await updatePersonalData(entity.value);
  loading.value = false;
};
</script>
