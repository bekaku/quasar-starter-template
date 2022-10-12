<template>
  <q-page
    class="window-height row justify-center items-center"
    :style="`
     background: #5865f2;
    background: url(/login-bg.png) no-repeat center center fixed;
    background: url(/login-bg.png) no-repeat center center fixed, linear-gradient(#5865f2, #0c1aa5);
  background-size: auto;
  background-repeat: no-repeat;`"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card
          class="shadow-24 q-pb-lg"
          :style="$q.screen.gt.xs ? 'width: 480px' : ''"
        >
          <q-card-section class="text-center">
            <q-img
              src="/logo/logo.png"
              spinner-color="white"
              style="height: auto; max-width: 55px"
            />
            <div class="text-h5 text-weight-bolder q-my-md text-uppercase">
              {{ t('app.monogram') }}
            </div>
            <div class="text-subtitle1 text-grey-6 q-my-md">
              We're excited to see you again!
            </div>
            <q-separator />
          </q-card-section>

          <q-form
            @submit="onSubmit"
            @reset="onReset"
            ref="loginForm"
            class="q-px-sm"
          >
            <q-card-section>
              <q-input
                :readonly="loading"
                outlined
                clearable
                v-model="email"
                type="email"
                :label="t('base.email')"
                :rules="[
                  (val) =>
                    (val && val.length > 0 && validateEmail(val)) ||
                    t('error.emailValidate'),
                ]"
              >
                <template v-slot:prepend>
                  <q-icon :name="biEnvelope" color="grey-9" />
                </template>
              </q-input>
              <q-input
                class="q-pt-lg"
                :readonly="loading"
                outlined
                clearable
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :label="t('authen.password')"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    t('error.validateRequire', [t('authen.password')]),
                ]"
              >
                <template v-slot:prepend>
                  <q-icon :name="biLock" color="grey-9" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? biEye : biEyeSlash"
                    @click="showPassword = !showPassword"
                    class="cursor-pointer"
                    color="grey-9"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                :loading="loading"
                size="lg"
                color="primary"
                class="full-width text-white"
                :label="t('authen.login')"
                type="submit"
              />
            </q-card-actions>
          </q-form>

          <q-card-section class="text-center q-pa-sm">
            <a
              class="wee-link text-grey-6"
              href="javascript:void(0)"
              @click="onReset"
            >
              {{ t('authen.forgetPassword') }}
            </a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMeta } from 'quasar';
import {
  biEnvelope,
  biLock,
  biEye,
  biEyeSlash,
} from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
import { validateEmail } from 'src/utils/appUtil';
const { t } = useLang();
const email = ref(undefined);
const password = ref(undefined);
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginForm = ref(null);
useMeta({
  title: `${t('page.login')} | ${t('app.monogram')}`,
});

const onSubmit = () => {
  console.log('onSubmit');
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000 * 3);
};
const onReset = () => {
  email.value = undefined;
  password.value = undefined;
  showPassword.value = false;
};
</script>
