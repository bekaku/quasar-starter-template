<script setup lang="ts">
import AuthenService from '@/api/AuthenService';
import { useAuth } from '@/composables/useAuth';
import { useDevice } from '@/composables/useDevice';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { getYearNow } from '@/utils/dateUtil';
import {
  biChevronExpand,
  biEye,
  biEyeSlash,
  biGlobe,
  biLock,
  biPerson,
} from '@quasar/extras/bootstrap-icons';
import { Cookies, useMeta } from 'quasar';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseInput from 'src/components/base/BaseInput.vue';
import BaseLangugeSwitcher from 'src/components/base/BaseLangugeSwitcher.vue';
import BaseLink from 'src/components/base/BaseLink.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseThemeSwitcher from 'src/components/base/BaseThemeSwitcher.vue';
import Ellipsis from 'src/components/base/Ellipsis.vue';
import { useBase } from 'src/composables/useBase';
import { AppAuthTokenKey } from 'src/libs/constant';
import { defineAsyncComponent, onMounted, ref } from 'vue';
const ForgotPassword = defineAsyncComponent(() => import('@/components/app/ForgotPassword.vue'));
const { getDeviceId, isSmallScreen } = useDevice();
const { singin } = AuthenService();
const { setAuthenticationCookies } = useAuth();
const { t, currenLocale } = useLang();
const { required } = useValidation();
const { isDark } = useBase();
const email = ref<string | null>('admin@mydomain.com');
const password = ref<string | null>('P@ssw0rd');
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginForm = ref(null);
const deviceId = ref();
const rememberMe = ref(false);
const dialogForgotPassword = ref<boolean>(false);
const appVersion = process.env.APP_VERSION;
// useMeta({
//   title: `${t('page.login')} | ${t('app.monogram')}`,
// });
defineOptions({
  preFetch({ ssrContext, redirect }) {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
    // detroyAuthCookie(cookies);
    if (cookies.get(AppAuthTokenKey)) {
      redirect({ path: '/' });
    }
  },
});
const metaData = {
  // sets document title
  title: t('page.login'),
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title: any) => `${title} - Vue Quasar Example`,

  // meta tags
  meta: {
    description: { name: 'description', content: t('ssDescription') },
    keywords: {
      name: 'keywords',
      content: 'Vue Quasar Example, Vue Quasar Example',
    },
    twitterCard: {
      name: 'twitter:card',
      content: 'https://app.yourdomain.com/card.jpg',
    },
    ogTitle: {
      property: 'og:title',
      content: 'Vue Quasar Example',
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://app.yourdomain.com',
    },
    ogType: {
      property: 'og:type',
      content: 'website',
    },
    ogDescription: {
      property: 'og:description',
      content: t('ssDescription'),
    },
    ogImage: {
      property: 'og:image',
      content: 'https://app.yourdomain.com/card.jpg',
    },
  },
};
useMeta(metaData);
onMounted(async () => {
  // destroyAuthDataAndRedirect(false);
  deviceId.value = await getDeviceId();
});

const onSubmit = async () => {
  loading.value = true;
  const response = await singin({
    user: {
      emailOrUsername: email.value,
      password: password.value,
      loginFrom: 'WEB',
      deviceId: deviceId.value ? deviceId.value : null,
    },
  });
  console.log('response', response);
  loading.value = false;
  if (response && response.authenticationToken) {
    setAuthenticationCookies(response);
    loading.value = false;
    // redirect to index page
    // window.location.replace('/');
    window.location.replace(process.env.APP_PUBLIC_PATH || '/');
  }
};
const onReset = () => {
  email.value = null;
  password.value = null;
  showPassword.value = false;
};
</script>
<template>
  <BasePage
    :padding="false"
    :class="{ 'bg-white': !isDark, 'app-second-bg-color-theme-dark': isDark }"
    :full="false"
  >
    <div class="row items-center " :class="{ 'q-pa-md': !isSmallScreen }" style="height: 100vh">
      <!-- Left Column - Fantasy Background -->
      <div class="col-12 col-md-6 fantasy-bg">
        <div class="overlay flex flex-center text-white">
          <div class="q-pa-xl text-center">
            <h2 class="text-h3 text-weight-bold q-mb-md">
              <Ellipsis :lines="2"> Welcome to Our {{ t('app.monogram') }} </Ellipsis>
            </h2>
            <div class="text-h5">
              <Ellipsis :lines="1"> Embark on your next adventure sadasd </Ellipsis>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Column - Login Form -->
      <div class="col-12 col-md-6 flex flex-center">
        <div class="q-pa-md" :style="{ width: !isSmallScreen ? '70%' : '90%', maxWidth: !isSmallScreen ? '80%' : '90%' }">
          <div class="text-center q-mb-xl">
            <q-avatar size="100px" class="q-mb-md" square>
              <q-img
                :src="isDark ? '/logo/logo-white.png' : '/logo/logo-black.png'"
                spinner-color="white"
                alt="logo"
                style="height: auto; max-width: 120px"
              />
            </q-avatar>
            <div class="text-h4 text-weight-bolder q-my-md">
              {{ t('base.loginTitle') }}
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              {{ t('base.loginTitle2') }}
            </div>
          </div>

          <q-form ref="loginForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
            <BaseInput
              v-model="email"
              :readonly="loading"
              :dense="false"
              :label="t('base.emailOrUsername')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biPerson" color="grey-9" />
              </template>
            </BaseInput>
            <BaseInput
              v-model="password"
              :readonly="loading"
              :dense="false"
              :type="showPassword ? 'text' : 'password'"
              :label="t('authen.password')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template #append>
                <q-icon
                  :name="showPassword ? biEye : biEyeSlash"
                  class="cursor-pointer"
                  color="grey-9"
                  @click="showPassword = !showPassword"
                />
              </template>
            </BaseInput>

            <div class="row items-center justify-between">
              <q-checkbox v-model="rememberMe" label="Remember me" />
              <!-- <BaseLink to="/auth/forgot-password" color="primary">
                {{ t('authen.forgetPassword') }}
              </BaseLink> -->
              <BaseButton
                flat
                :label="t('authen.forgetPassword')"
                @click="dialogForgotPassword = true"
              />
            </div>

            <div class="q-px-sm">
              <BaseButton
                unelevated
                :loading="loading"
                size="lg"
                color="primary"
                class="full-width text-white"
                :label="t('authen.login')"
                type="submit"
              />
            </div>
          </q-form>

          <div class="text-center q-mt-lg">
            Don't have an account?
            <BaseLink to="/signup" color="primary">Sign Up</BaseLink>
            <!-- <BaseLink to="/auth/forgot-password">
                               {{ t('authen.forgetPassword') }}
                           </BaseLink> -->

            <q-separator class="q-my-md" />
            <div class="row items-center q-gutter-x-md justify-center">
              <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                {{ `@ ${getYearNow()} ${t('app.monogram')} ${appVersion}` }}
              </div>
              <q-btn
                size="13px"
                flat
                dense
                no-caps
                no-wrap
                :icon="biGlobe"
                :label="currenLocale ? currenLocale.name : ''"
              >
                <q-icon class="q-ml-sm" :name="biChevronExpand" size="14px" />
                <BaseLangugeSwitcher anchor="top left" self="bottom left" close-on-click />
              </q-btn>
              <BaseThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
    <forgot-password v-if="dialogForgotPassword" v-model="dialogForgotPassword" />
  </BasePage>
</template>
<style scoped>
.fantasy-bg {
  background-image: url('https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  border-radius: 20px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(16, 0, 43, 0) 0%, rgba(52, 0, 87, 0.6) 100%);

  border-radius: 20px;
}

@media (max-width: 768px) {
  .fantasy-bg {
    min-height: 40vh;
    /* border-radius: 20px 20px 0 0; */
    border-radius: 0 0 0 0;
  }

  .overlay {
    /* border-radius: 20px 20px 0 0; */
    border-radius: 0 0 0 0;
  }
}
@media (max-width: 1180px) {
  .fantasy-bg {
    min-height: 40vh;
    border-radius: 0 0 0 0;
  }
  .overlay {
    border-radius: 0 0 0 0;
  }
}
</style>
