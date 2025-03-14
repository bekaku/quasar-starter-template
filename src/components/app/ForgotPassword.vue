<template>
  <base-dialog
    v-if="modelValue != undefined"
    v-model="modelValue"
    :full-width="false"
    :title="t('authen.forgetPassword')"
    @on-close="modelValue = false"
    @on-hide="modelValue = false"
    :persistent="true"
    transition-show="fade"
    transition-hide="fade"
    :icon="biKey"
  >
    <q-separator />
    <q-card flat>
      <q-card-section>
        <q-stepper flat bordered v-model="step" ref="stepper" color="primary" animated>
          <q-step
            :name="1"
            :title="t('authen.verification')"
            :icon="biPersonVcard"
            :done="step > 1"
          >
            <q-form @submit="requestVerifyCode" class="q-px-sm">
              <div class="q-pa-md text-center">
                <div class="text-body1">
                  {{ t('authen.forgotPwdTitle') }}
                </div>
                <div class="text-subtitle2 text-muted">
                  {{ t('authen.forgotPwdSubtitle') }}
                </div>
              </div>

              <q-input
                outlined
                v-model="entity.email"
                :label="t('base.email')"
                :rules="[requireEmail]"
              >
                <template #prepend>
                  <q-icon :name="biEnvelope" />
                </template>
              </q-input>

              <q-card-actions align="center">
                <q-btn unelevated type="submit" color="primary" :label="t('base.continue')" />
              </q-card-actions>
            </q-form>
          </q-step>

          <q-step :name="2" :title="t('authen.verificationCode')" :icon="bi123" :done="step > 2">
            <div class="q-pa-md text-center">
              <div class="text-body1 text-center">
                {{ t('authen.login_main_helper4') }}
              </div>
              <div class="text-subtitle2 text-muted">
                {{ t('authen.login_main_helper5') }}
              </div>
              <div class="text-subtitle2 text-warning">
                {{ t('authen.login_main_helper6') }}
              </div>
            </div>

            <BaseInputOtp :input-length="6" @on-submit="verifyCode" />
            <q-card-actions align="center">
              <q-btn
                flat
                color="primary"
                @click="step = 1"
                :label="t('base.previous')"
                class="q-ml-sm"
              />
            </q-card-actions>
          </q-step>

          <q-step :name="3" :title="t('authen.setPassword')" :icon="biKey" :done="step > 3">
            <password-form
              v-if="entity"
              v-model:newPassword="entity.newPassword"
              v-model:loading="loading"
              @on-submit="setNewPassword"
            />
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </base-dialog>
</template>

<script setup lang="ts">
import AuthenService from '@/api/AuthenService';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import type { AppException, ForgotPasswordRequest, ResponseMessage } from '@/types/common';
import { bi123, biEnvelope, biKey, biPersonVcard } from '@quasar/extras/bootstrap-icons';
import { defineAsyncComponent, ref } from 'vue';
const BaseDialog = defineAsyncComponent(() => import('@/components/base/BaseDialog.vue'));
const BaseInputOtp = defineAsyncComponent(() => import('@/components/base/BaseInputOtp.vue'));
const PasswordForm = defineAsyncComponent(() => import('@/components/app/PasswordForm.vue'));
const { requestVerifyCodeToResetPwd, sendVerifyCodeToResetPwd, resetPassword } = AuthenService();
const { requireEmail } = useValidation();
const { appLoading, appToast } = useBase();
const { t } = useLang();
const modelValue = defineModel<boolean>();
const stepper = ref();
const step = ref(1);
const entity = ref<ForgotPasswordRequest>({
  email: '',
  token: '',
  newPassword: '',
  confirmPassword: '',
});
const loading = ref(false);
const requestVerifyCode = async () => {
  if (!entity.value.email) {
    return;
  }
  appLoading();
  const res = await requestVerifyCodeToResetPwd(entity.value);
  appLoading(false);
  if (res && res.status && res.status == 200) {
    const responseData = res.data as ResponseMessage;
    if (responseData.message) {
      appToast(responseData.message, {
        type: 'positive',
        position: 'bottom',
        multiLine: false,
      });
    }
    if (stepper.value) {
      stepper.value.next();
    }
  } else if (res && res.data) {
    notifyError(res.data as AppException);
  }
};
const verifyCode = async (code?: string) => {
  if (!code || !entity.value.email) {
    return;
  }
  entity.value.token = code;
  appLoading();
  const res = await sendVerifyCodeToResetPwd(entity.value);
  appLoading(false);
  if (res && res.status != undefined && res.status != 200) {
    notifyError(res.data as AppException);
  } else {
    if (stepper.value) {
      stepper.value.next();
    }
  }
};
const notifyError = (error: AppException) => {
  if (error.errors) {
    appToast(error.errors.toString(), {
      type: 'negative',
      position: 'bottom',
      multiLine: false,
    });
  }
};
const setNewPassword = async () => {
  if (!entity.value.token || !entity.value.email || !entity.value.newPassword) {
    return;
  }
  appLoading();
  const res = await resetPassword(entity.value);
  appLoading(false);
  if (res && res.status && res.status == 200) {
    const responseData = res.data as ResponseMessage;
    if (responseData.message) {
      appToast(responseData.message, {
        type: 'positive',
        position: 'bottom',
        multiLine: false,
      });
    }
    modelValue.value = false;
  } else if (res && res.data) {
    notifyError(res.data as AppException);
  }
};
</script>

<style lang="scss" scoped>
// .dialog {
//   width: 100%;
//   max-width: 1500px;
//   min-width: 1500px;
// }
</style>
