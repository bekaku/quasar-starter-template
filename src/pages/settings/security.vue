<script setup lang="ts">
import AuthenService from '@/api/AuthenService';
import UserService from '@/api/UserService';
import { useAppMeta } from '@/composables/useAppMeta';
import { useAuth } from '@/composables/useAuth';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { usePaging } from '@/composables/usePaging';
import type { AccessTokenDto } from '@/types/models';
import { biDisplay, biDot } from '@quasar/extras/bootstrap-icons';
import { mdiAndroid, mdiApple } from '@quasar/extras/mdi-v6';
import { date } from 'quasar';
import BaseCard from 'src/components/base/BaseCard.vue';
import SettingLayout from 'src/components/settings/SettingLayout.vue';
import PasswordForm from '@/components/app/PasswordForm.vue';
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue';
const BaseLoadmore = defineAsyncComponent(() => import('@/components/base/BaseLoadmore.vue'));
useAppMeta();
const { appConfirm, appLoading } = useBase();
const { t } = useLang();
const { signOut } = useAuth();
const { selfUpdatePassword, currentAuthSession } = UserService();
const { removeAccessTokenSession } = AuthenService();
const { pages } = usePaging(10);
const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const rePassword = ref<string>('');
const showPassword = ref(false);
const logoutAllDevice = ref(true);
const loading = ref(false);
const sessionList = ref<AccessTokenDto[]>([]);
const sessionLoading = ref(true);
const timeout = ref<any>(null);

const isInfiniteDisabled = ref(false);
const fristLoaded = ref(false);
onMounted(() => {
  loadSeesionLogined();
});
onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value);
    timeout.value = null;
  }
});
const pageParam = computed(
  () =>
    `?page=${pages.value.current > 0 ? pages.value.current - 1 : 0}&size=${
      pages.value.itemsPerPage
    }`,
);
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
  if (res && res.status == 'OK') {
    timeout.value = setTimeout(() => {
      signOut();
    }, 1500);
  }
};
const onReset = () => {
  currentPassword.value = '';
  newPassword.value = '';
  rePassword.value = '';
  showPassword.value = false;
};

const loadNextPage = async () => {
  pages.value.current++;
  await loadSeesionLogined();
};
const loadSeesionLogined = async (): Promise<void> => {
  const res = await currentAuthSession(pageParam.value);
  if (res) {
    if (res.length > 0) {
      sessionList.value.push(...res);
      if (res.length < pages.value.itemsPerPage) {
        isInfiniteDisabled.value = true;
      }
    } else {
      isInfiniteDisabled.value = true;
    }
  } else {
    isInfiniteDisabled.value = true;
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  sessionLoading.value = false;
};

const displayDate = (d: string) => {
  if (!d) {
    return '-';
  }
  return date.formatDate(d, 'MMMM DD YYYY, HH:mm:ss');
};
const onDeleteSession = async (index: number) => {
  const conf = await appConfirm(t('authSessions'), t('base.deleteConfirm'));
  if (conf) {
    const item = sessionList.value[index];
    if (item && item.id) {
      appLoading();
      const res = await removeAccessTokenSession(item.id);

      appLoading(false);
      if (res && res.status == 'OK') {
        sessionList.value.splice(index, 1);
      }
    }
  }
};
</script>
<template>
  <SettingLayout>
    <template #content>
      <BaseCard :title="t('updatePassword')">
        <q-card-section>
          <password-form
            v-model:currentPassword="currentPassword"
            v-model:newPassword="newPassword"
            v-model:logoutAllDevice="logoutAllDevice"
            v-model:loading="loading"
            show-current-password
            show-logout
            @on-submit="onSubmit"
            :submit-label="t('updatePassword')"
            action-align="left"
          ></password-form>
        </q-card-section>
        <q-separator />
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
        <q-list v-else separator class="rounded-borders">
          <q-item-label header>{{ t('authSessionsHelp') }}</q-item-label>
          <q-virtual-scroll style="max-height: 350px" :items="sessionList" v-slot="{ item, index }">
            <q-item :key="item.id">
              <q-item-section avatar top>
                <q-icon
                  :name="
                    item.loginFrom == 'WEB'
                      ? biDisplay
                      : item.loginFrom == 'IOS'
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
                    t('lastestActive') + ' ' + displayDate(item.lastestActive || item.createdDate)
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
          </q-virtual-scroll>
        </q-list>
        <base-loadmore
          v-if="!isInfiniteDisabled && fristLoaded"
          :loading="loading"
          :frist-loaded="fristLoaded"
          :is-infinite-disabled="isInfiniteDisabled"
          :label="t('base.loadMore')"
          @on-next-page="loadNextPage"
          button
          show-icon
          full-width
        >
        </base-loadmore>
      </BaseCard>
    </template>
  </SettingLayout>
</template>
