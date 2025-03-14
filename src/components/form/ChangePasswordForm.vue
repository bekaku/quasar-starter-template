<template>
  <q-dialog v-model="show" persistent transition-show="slide-up" transition-hide="slide-down">
    <q-card style="max-width: 480px" flat bordered>
      <q-bar class="bg-transparent q-my-sm">
        <q-icon :name="biKey" />
        <div>{{ t('base.changePassword') }}</div>

        <q-space />

        <q-btn dense flat :icon="biX" size="md" @click="onClose">
          <q-tooltip>{{ t('base.close') }}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form @submit="onOkay" class="q-px-sm">
          <q-card-section>
            <q-input
              class="q-pt-md"
              outlined
              dense
              v-model="newPassword"
              type="password"
              :label="t('authen.newPassword')"
              :rules="[
                required,
                (val) => validatePasswordStrongV2(val) || t('error.passwordStrongError'),
              ]"
            >
              <template #prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <div>
              <q-checkbox v-model="logoutAllDevice" :label="t('authen.logoutAll')" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn unelevated color="primary" :label="t('updatePassword')" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { biX, biKey, biLock } from '@quasar/extras/bootstrap-icons';
import UserService from '@/api/UserService';
import type { UserChangePasswordRequest } from '@/types/models';
import { useBase } from '@/composables/useBase';
const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  isFromCompanyAdmin: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: undefined,
  },
  userId: {
    type: Number,
    default: undefined,
  },
});
const emit = defineEmits(['on-close', 'on-okay']);
const { t } = useLang();
const { appLoading } = useBase();
const show = ref(false);
const newPassword = ref('');
const logoutAllDevice = ref(true);
const { validatePasswordStrongV2, required } = useValidation();
const { updateUserPassword, updateUserPasswordByAdmin } = UserService();
const onClose = () => {
  emit('on-close');
};
const onOkay = () => {
  // emit('on-okay', {
  //   userChangePasswordRequest: {
  //     password: newPassword.value,
  //     logoutAllDevice: logoutAllDevice.value,
  //   },
  // });
  onUpdateUserPassword({
    userChangePasswordRequest: {
      password: newPassword.value,
      logoutAllDevice: logoutAllDevice.value,
    },
  });
};
const onUpdateUserPassword = async (req: UserChangePasswordRequest) => {
  if (!props.userId) {
    return;
  }
  appLoading();
  if (!props.isFromCompanyAdmin) {
    await updateUserPassword(req, props.userId);
  } else {
    await updateUserPasswordByAdmin(req, props.userId);
  }

  appLoading(false);
  onClose();

  newPassword.value = '';
  logoutAllDevice.value = true;
};
watch(
  () => props.dialog,
  (dialog) => {
    show.value = dialog;
  },
);
</script>
