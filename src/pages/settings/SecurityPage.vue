<template>
  <q-card square flat class="bg-transparent q-pl-lg">
    <q-card-section>
      <div class="text-h6">{{ t('updatePassword') }}</div>
      <q-separator />
    </q-card-section>

    <q-card-section>
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
            dense
            v-model="currentPassword"
            :type="showPassword ? 'text' : 'password'"
            :label="t('authen.currentPassword')"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('error.validateRequire', [t('authen.currentPassword')]),
            ]"
          >
            <template v-slot:prepend>
              <q-icon :name="biShieldLock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? biEye : biEyeSlash"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            class="q-pt-md"
            :readonly="loading"
            outlined
            dense
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            :label="t('authen.newPassword')"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('error.validateRequire', [t('authen.newPassword')]),
              (val) => validatePwdStrong(val) || t('error.passwordStrongError'),
            ]"
          >
            <template v-slot:prepend>
              <q-icon :name="biLock" color="grey-9" />
            </template>
            <template v-slot:append>
              <q-icon v-if="isValidPwd" :name="biCheck" color="positive" />
            </template>
          </q-input>

          <q-input
            class="q-pt-md"
            :readonly="loading"
            outlined
            dense
            v-model="rePassword"
            :type="showPassword ? 'text' : 'password'"
            :label="t('authen.confirmPassword')"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('error.validateRequire', [t('authen.confirmPassword')]),
              (val) =>
                validateTheSamePwd(val) || t('error.passwordNotMatchNew'),
            ]"
          >
            <template v-slot:prepend>
              <q-icon :name="biLock" color="grey-9" />
            </template>
            <template v-slot:append>
              <q-icon v-if="isSamePwd" :name="biCheck" color="positive" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <div>
            <q-checkbox
              v-model="logoutAllDevice"
              :label="t('authen.logoutAll')"
            />
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            unelevated
            outline
            :loading="loading"
            :label="t('updatePassword')"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">
        {{ t('authSessions') }}
      </div>
    </q-card-section>

    <template v-if="sessionLoading">
      <q-card-section class="text-center">
        <q-spinner color="primary" size="3em" />
      </q-card-section>
    </template>
    <q-list v-else bordered separator class="rounded-borders">
      <q-item-label header>{{ t('authSessionsHelp') }}</q-item-label>

      <q-item v-for="(item, index) in sessionList" :key="item.id">
        <q-item-section avatar top>
          <q-icon
            :name="
              item.loginPlatform == 1
                ? biDisplay
                : item.loginPlatform == 2
                ? mdiApple
                : mdiAndroid
            "
            color="black"
            size="34px"
          />
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[{{ item.ipAddredd }}]</span>
            <span class="text-grey-8"> - {{ item.hostName }}</span>
            <span v-if="item.activeNow"
              ><q-icon size="lg" :name="biDot" color="positive"
            /></span>
          </q-item-label>
          <q-item-label lines="1">
            {{ item.agent }}
          </q-item-label>
          <q-item-label lines="1" caption>
            {{
              t('lastestActive') +
              ' ' +
              displayDate(item.lastestActive || item.createdDate)
            }}
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              round
              icon="bi-trash"
              @click="onDeleteSession(index)"
            >
              <q-tooltip>
                {{ t('base.delete') }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useLang } from 'src/composables/useLang';
import { useMeta } from 'quasar';
import { AccessTokenDto } from '@/types/models';
import useAuth from '@/composables/useAuth';
import UserService from 'src/api/UserService';
import AuthenService from 'src/api/AuthenService';
import { date } from 'quasar';
import useBase from '@/composables/useBase';
import {
  biLock,
  biEye,
  biEyeSlash,
  biShieldLock,
  biCheck,
  biDisplay,
  biDot,
} from '@quasar/extras/bootstrap-icons';
import { mdiAndroid, mdiApple } from '@quasar/extras/mdi-v6';
const icons = {
  biLock,
  biEye,
  biEyeSlash,
  biShieldLock,
  biCheck,
  mdiAndroid,
  mdiApple,
  biDisplay,
  biDot,
};
const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export default defineComponent({
  components: {},
  setup() {
    useMeta({
      title: 'Account security',
    });
    const { WeeConfirm, WeeLoader } = useBase();
    const { t } = useLang();
    const { logoutToServer, destroyAuthDataAndRedirect } = useAuth();
    const { selfUpdatePassword, currentAuthSession } = UserService();
    const { removeAccessTokenSession } = AuthenService();
    const currentPassword = ref<string>('');
    const newPassword = ref<string>('');
    const rePassword = ref<string>('');
    const showPassword = ref(false);
    const logoutAllDevice = ref(true);
    const loading = ref(false);
    const sessionList = ref<AccessTokenDto[]>([]);
    const sessionLoading = ref(true);
    const timeout = ref<any>(null);
    onMounted(() => {
      loadSeesionLogined();
    });
    onBeforeUnmount(() => {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
      }
    });
    const onSubmit = async () => {
      loading.value = true;
      const res = await selfUpdatePassword({
        userChangePasswordRequest: {
          password: currentPassword.value,
          newPassword: newPassword.value,
          logoutAllDevice: logoutAllDevice.value,
        },
      });
      loading.value = false;
      if (res.status == 'OK') {
        timeout.value = setTimeout(() => {
          logoutToServer();
          destroyAuthDataAndRedirect();
        }, 1500);
      }
    };
    const onReset = () => {
      currentPassword.value = '';
      newPassword.value = '';
      rePassword.value = '';
      showPassword.value = false;
    };

    const validatePwdStrong = (pwd: string) => re.test(pwd);
    const validateTheSamePwd = (pwd: string) => pwd === newPassword.value;
    const isValidPwd = computed(() => validatePwdStrong(newPassword.value));
    const isSamePwd = computed(
      () => rePassword.value && newPassword.value === rePassword.value
    );

    const loadSeesionLogined = async (): Promise<void> => {
      sessionList.value = await currentAuthSession();
      sessionLoading.value = false;
    };

    const displayDate = (d: string) => {
      if (!d) {
        return '-';
      }
      return date.formatDate(d, 'MMMM DD YYYY, HH:mm:ss');
    };
    const onDeleteSession = async (index: number) => {
      const conf = await WeeConfirm(t('authSessions'), t('base.deleteConfirm'));
      if (conf) {
        const item = sessionList.value[index];
        if (item) {
          WeeLoader();
          const res = await removeAccessTokenSession(item.id);

          WeeLoader(false);
          if (res.status == 'OK') {
            console.log('removeAccessTokenSession', res);
            sessionList.value.splice(index, 1);
          }
        }
      }
      return;
    };
    return {
      ...icons,
      onDeleteSession,
      currentPassword,
      rePassword,
      newPassword,
      showPassword,
      onSubmit,
      onReset,
      t,
      loading,
      validatePwdStrong,
      validateTheSamePwd,
      isValidPwd,
      isSamePwd,
      sessionList,
      displayDate,
      sessionLoading,
      logoutAllDevice,
    };
  },
});
</script>
