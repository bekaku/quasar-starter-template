<template>
  <q-page class="window-height row justify-center items-center">
    <div class="row">
      <div class="col-12 col-md-6">
        <q-card
          square
          flat
          class="q-pb-lg bg-primary"
          v-if="!$q.screen.sm && !$q.screen.xs"
          :style="`width: 480px; height: ${cardHeight}`"
        >
          <q-card-section>
            <q-carousel
              autoplay
              infinite
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              navigation
              height="500px"
              class="bg-primary text-white rounded-borders"
            >
              <q-carousel-slide name="style" class="column no-wrap flex-center">
                <div class="q-mt-md text-center">
                  <img
                    src="~assets/images/ss02.png"
                    style="height: 175px; width: auto"
                  />
                  <div class="text-h3 text-weight-bolder text-uppercase">
                    Super Synapse
                  </div>
                  <div class="text-subtitle1 q-mt-lg">
                    Organization culture building solution
                  </div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <img
                  src="~assets/images/ss01.png"
                  style="height: 175px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  Awake hidden potentials by Connecting within.
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
                <img
                  src="~assets/images/all-icon.png"
                  style="height: 205px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Itaque voluptatem totam, architecto cupiditate officia rerum,
                  error dignissimos praesentium libero ab nemo.
                </div>
              </q-carousel-slide>
              <q-carousel-slide name="map" class="column no-wrap flex-center">
                <img
                  src="~assets/images/prize01.png"
                  style="height: 175px; width: auto"
                />
                <div class="text-subtitle1 q-mt-md text-center">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Itaque voluptatem totam, architecto cupiditate officia rerum,
                  error dignissimos praesentium libero ab nemo.
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card
          square
          flat
          class="q-pa-lg"
          :style="`width: 480px; height: ${cardHeight}`"
        >
          <q-toolbar
            class="q-py-xs"
            style="background: none"
            :class="
              $q.dark.isActive
                ? 'wee-second-bg-color-theme-dark text-white'
                : 'text-black'
            "
          >
            <q-space />
            <q-btn
              flat
              no-wrap
              :icon="biTranslate"
              :label="currenLocale ? currenLocale.name : ''"
            >
              <q-icon class="q-ml-sm" :name="biCaretDown" size="16px" />
              <q-menu auto-close>
                <q-list style="min-width: 150px">
                  <q-item
                    clickable
                    v-for="lang in availableLocales"
                    :key="lang.iso"
                    @click="langugeAndThemeStore.setLocale(lang.iso)"
                  >
                    <q-item-section>{{ lang.name }}</q-item-section>
                    <q-item-section
                      v-if="lang.iso == langugeAndThemeStore.locale"
                      side
                    >
                      <q-icon :name="biCheck2" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
          <q-card-section class="text-center">
            <q-img
              src="/logo/logo.png"
              spinner-color="white"
              style="height: auto; max-width: 45px"
            />
            <div class="text-h4 text-weight-bolder q-my-md">Hello Again</div>
            <div class="text-body1 text-grey-6 q-my-md">
              We're excited to see you again!
            </div>
            <!-- <q-separator /> -->
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
            <q-card-actions>
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
          <q-card-section class="q-mt-lg text-center">
            <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">
              {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMeta } from 'quasar';
import { getYearNow } from 'src/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import { validateEmail } from 'src/utils/appUtil';
import {
  biCaretDown,
  biTranslate,
  biCheck2,
  biEnvelope,
  biLock,
  biEye,
  biEyeSlash,
} from '@quasar/extras/bootstrap-icons';
import { availableLocales } from 'src/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import AuthenService from '@/api/AuthenService';
import useAuth from '@/composables/useAuth';
const { singin } = AuthenService();
const { setAuthenticationCookies, destroyAuthDataAndRedirect } = useAuth();
const { t } = useLang();
const cardHeight = ref('700px');
const email = ref<string | null>('admin@mydomain.com');
const password = ref<string | null>('1234');
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginForm = ref(null);
const slide = ref('style');
useMeta({
  title: `${t('page.login')} | ${t('app.monogram')}`,
});

onMounted(() => {
  destroyAuthDataAndRedirect(false);
});

const onSubmit = async () => {
  console.log('onSubmit');
  loading.value = true;
  const response = await singin({
    user: {
      email: email.value,
      password: password.value,
      loginForm: 1,
    },
  });
  loading.value = false;
  if (response.authenticationToken) {
    setAuthenticationCookies(response);
    loading.value = false;
    // redirect to index page
    window.location.replace('/');
  }
};
const onReset = () => {
  email.value = null;
  password.value = null;
  showPassword.value = false;
};

const langugeAndThemeStore = useLangugeAndThemeStore();
const currenLocale = computed(() =>
  availableLocales.find((t) => t.iso == langugeAndThemeStore.locale)
);
</script>
