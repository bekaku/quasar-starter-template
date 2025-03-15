<script setup lang="ts">
import UserNavSetting from '@/components/user/UserNavSetting.vue';
import { useLang } from '@/composables/useLang';
import { useNotification } from '@/composables/useNotification';
import {
  biAppIndicator,
  biBell,
  biCameraVideo,
  biChatDots,
  biChevronLeft,
  biChevronRight,
  biSearch,
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useDevice } from 'src/composables/useDevice';
import { useAppStore } from 'src/stores/appStore';
import { defineAsyncComponent, onMounted, ref } from 'vue';
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
}>();

const { dark, screen } = useQuasar();
const { appGoto } = useBase();
const { notify, resetBadgeCount } = useNotification();
const { t } = useLang();
// const search = ref('');
const showSearch = ref(false);
const onOpenSearch = () => {
  showSearch.value = true;
};
const onSearchMenuClick = (to: string) => {
  showSearch.value = false;
  setTimeout(() => {
    appGoto(to);
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

      <div class="q-gutter-md row items-center no-wrap">
        <q-btn round dense flat :icon="biCameraVideo" v-if="screen.gt.sm">
          <q-tooltip>Create a video or post</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biAppIndicator" v-if="screen.gt.sm">
          <q-tooltip>Apps</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biChatDots" v-if="screen.gt.sm" to="/example/chats">
          <q-tooltip>Messages</q-tooltip>
        </q-btn>
        <q-btn v-if="!screen.gt.xs" round dense flat @click="onOpenSearch">
          <q-icon :name="biSearch" />
        </q-btn>
        <q-btn round dense flat @click="resetBadgeCount" :icon="biBell">
          <q-badge
            v-if="notify && notify.totalNotify"
            color="negative"
            rounded
            text-color="white"
            floating
          >
            {{ notify.totalNotify > 99 ? '99+' : notify.totalNotify }}
          </q-badge>
          <q-tooltip>{{ t('nav.notifications') }}</q-tooltip>
          <q-menu anchor="bottom left" self="top left" :style="{ width: '360px' }">
            <notification-bar-menu />
          </q-menu>
        </q-btn>
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
