<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import { useCookie } from 'src/composables/useCookie';
import { AppAuthCuurentUserKey, AppAuthRefeshTokenKey, AppAuthTokenKey } from 'src/libs/constant';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Test page | ${t('app.name')}`);

const { getCookie, setCookie, getAllJwtCookies, getCurrentUserToken } = useCookie();
const logined = (uid: number) => {
  setCookie(`${AppAuthTokenKey}_${uid}`, `jwt_key_from_server_u_${uid}`, 'Lax');
  setCookie(`${AppAuthRefeshTokenKey}_${uid}`, `jwt_refresh_key_from_server_u_${uid}`, 'Strict');
  setCookie(`${AppAuthCuurentUserKey}`, uid + '', 'Lax');
};

const showAllJWTCookieds = () => {
  console.log('jwtCookies', getAllJwtCookies());
};
const showCurrentUserToken = () => {
  const curentToken = getCurrentUserToken();
  console.log('currentToken', curentToken);
};
</script>
<template>
  <BasePage>
    <BaseCard title="Test page">
      <template #end>
        <BaseButton label="Back" to="/" />
      </template>
      <q-card-section>
        <div class="row q-gutter-lg">
          <BaseButton label="showAllJWTCookieds" @click="showAllJWTCookieds" />
          <BaseButton label="getCurrentUserToken" @click="showCurrentUserToken" />

          <BaseButton label="logined1" @click="logined(1)" />
          <BaseButton label="logined2" @click="logined(2)" />
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
