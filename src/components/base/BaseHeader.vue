<script setup lang="ts">
import UserNavSetting from '@/components/user/UserNavSetting.vue';
import { useLang } from '@/composables/useLang';
import {
  biChevronLeft,
  biChevronRight,
  biGithub,
  biSearch
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useDevice } from 'src/composables/useDevice';
import { useAppStore } from 'src/stores/appStore';
import { defineAsyncComponent, ref } from 'vue';
import ChatHeaderIcon from '../chats/ChatHeaderIcon.vue';
import BaseLangugeSwitcherButton from './BaseLangugeSwitcherButton.vue';
import BaseThemeSwitcher from './BaseThemeSwitcher.vue';
const NotificationBarMenu = defineAsyncComponent(
  () => import('@/components/notification/NotificationBarMenu.vue'),
);
const SearchMenu = defineAsyncComponent(() => import('@/components/search/SearchMenu.vue'));
const appStore = useAppStore();
const {
  bordered = false,
  reveal = false,
  showTogleDrawer = false,
  showLogo = true,
  showUserSetting = true,
  hambergerIcon = biChevronLeft,
  hambergerIconOff = biChevronRight,
  showChatBtn = true
} = defineProps<{
  bordered?: boolean;
  reveal?: boolean;
  showTogleDrawer?: boolean;
  frontend?: boolean;
  showLogo?: boolean;
  hambergerMenu?: boolean;
  hambergerIcon?: string;
  hambergerIconOff?: string;
  showUserSetting?: boolean;
  showChatBtn?: boolean;
}>();

const { dark, screen } = useQuasar();
const { appNavigateTo } = useBase();
const { t } = useLang();
const { isSmallScreen } = useDevice();
const showSearch = ref(false);
const onOpenSearch = () => {
  showSearch.value = true;
};
const onSearchMenuClick = (to: string) => {
  showSearch.value = false;
  setTimeout(() => {
    appNavigateTo(to);
  }, 500);
};
</script>
<template>
  <!-- :class="
      $q.dark.isActive
        ? 'wee-second-bg-color-theme-dark text-white'
        : 'bg-white text-black'
    " -->
  <q-header
    :reveal="reveal"
    height-hint="58"
    :bordered="bordered"
    :class="{
      'app-second-bg-color-theme-dark text-white': dark.isActive,
      'bg-white text-black': !dark.isActive,
    }"
  >
    <q-toolbar class="q-py-xs">
      <q-btn
        v-if="showTogleDrawer"
        dense
        flat
        round
        :icon="
          !appStore.isMobileOrTablet
            ? appStore.expandDrawer
              ? hambergerIcon
              : hambergerIconOff
                ? hambergerIconOff
                : hambergerIcon
            : hambergerIconOff
        "
        @click="
          !appStore.isMobileOrTablet
            ? appStore.setExpandDrawer(!appStore.expandDrawer)
            : appStore.setDrawerOpen(!appStore.drawerOpen)
        "
      />
      <q-btn
        v-if="showLogo"
        flat
        no-caps
        no-wrap
        class="q-mr-xs btn--no-hover"
        :ripple="false"
        to="/"
      >
        <q-avatar style="height: auto; width: 42px" square>
          <img :src="!dark.isActive ? '/logo/logo-black.png' : '/logo/logo-white.png'" />
        </q-avatar>
      </q-btn>

      <q-btn v-if="screen.gt.xs" flat @click="onOpenSearch" class="text-capitalize">
        <span class="q-mr-sm text-muted">{{ t('base.search') + ' Vue Quasar' }}</span>
        <q-icon :name="biSearch" />
      </q-btn>
      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn v-if="!screen.gt.xs" round dense flat @click="onOpenSearch">
          <q-icon :name="biSearch" />
        </q-btn>
        <q-btn
          :icon="biGithub"
          flat
          round
          dense
          href="https://github.com/bekaku/quasar-starter-template"
          target="_blank"
        />
        <NotificationBarMenu v-if="!isSmallScreen" />
        <ChatHeaderIcon v-if="showChatBtn" />
        <BaseLangugeSwitcherButton v-if="!isSmallScreen" />
        <BaseThemeSwitcher v-if="!isSmallScreen" toggle />
        <user-nav-setting v-if="showUserSetting" style="max-width: 225px" />
      </div>
    </q-toolbar>
    <SearchMenu v-if="showSearch" v-model="showSearch" @on-click="onSearchMenuClick" />
  </q-header>
</template>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 35%

.div-btn
  display: block
  border-radius: 5px
  height: 65px
</style>
