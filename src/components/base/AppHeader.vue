<template>
  <q-header
    class="q-py-xs"
    :class="
      $q.dark.isActive
        ? 'wee-second-bg-color-theme-dark text-white'
        : 'bg-white text-black'
    "
    height-hint="58"
  >
    <q-toolbar>
      <q-btn
        v-if="hambergerMenu"
        flat
        dense
        round
        @click="
          langugeAndThemeStore.setLeftDrawer(
            !langugeAndThemeStore.leftDrawerOpen
          )
        "
        aria-label="Menu"
        :icon="biList"
      />

      <q-btn
        flat
        no-caps
        no-wrap
        class="q-ml-xs"
        :ripple="false"
        to="/"
        v-if="$q.screen.gt.xs"
      >
        <q-avatar class="q-ml-xs" size="36px">
          <img src="/logo/logo-36.png" />
        </q-avatar>
        <q-toolbar-title
          shrink
          class="text-weight-bold text-uppercase"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
        >
          Vue Social
        </q-toolbar-title>
      </q-btn>

      <q-space />

      <div class="YL__toolbar-input-container row no-wrap">
        <q-input
          dense
          outlined
          square
          v-model="search"
          :placeholder="t('base.search')"
          class="col"
        >
          <template v-slot:append>
            <q-btn round dense flat :icon="biSearch" />
          </template>
        </q-input>
        <!-- <q-btn
          :color="$q.dark.isActive ? 'grey-9' : 'grey-2'"
          class="YL__toolbar-input-btn"
          :text-color="$q.dark.isActive ? 'grey-3' : 'grey-9'"
          :icon="biSearch"
          unelevated
        >
          <q-tooltip>{{ t('base.search') }}</q-tooltip>
        </q-btn> -->
      </div>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <q-btn round dense flat :icon="biCameraVideo" v-if="$q.screen.gt.sm">
          <q-tooltip>Create a video or post</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biAppIndicator" v-if="$q.screen.gt.sm">
          <q-tooltip>Apps</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biChatDots" v-if="$q.screen.gt.sm">
          <q-tooltip>Messages</q-tooltip>
        </q-btn>
        <q-btn round dense flat :icon="biBell" class="text-weight-bolder">
          <q-badge color="negative" text-color="white" floating> 2 </q-badge>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>
        <!-- <q-btn round flat> -->
        <q-btn dense flat no-wrap>
          <q-avatar class="shadow-5" round size="36px">
            <img :src="authenStore.auth?.avatar?.thumbnail" />
          </q-avatar>
          <q-icon :name="biCaretDownFill" size="16px" />

          <q-menu>
            <q-list style="min-width: 260px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="authenStore.auth?.avatar?.thumbnail" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div>
                    Signed in as
                    <strong>{{ authenStore.auth?.username }}</strong>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>
                  <div>
                    <q-icon
                      :name="biEmojiSmile"
                      color="primary"
                      class="q-mr-sm"
                      size="18px"
                    />
                    Set your status
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biPersonSquare" />
                </q-item-section>
                <q-item-section>{{ t('base.yourProfile') }}</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon :name="biMoon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    {{ t('base.appearance') }} :
                    {{ t(`theme.${langugeAndThemeStore.theme}`) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon :name="biChevronRight" />
                </q-item-section>
                <q-menu
                  :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'"
                  self="top start"
                >
                  <q-list style="min-width: 150px">
                    <q-item
                      clickable
                      v-for="theme in availableThemes"
                      :key="theme.key"
                      @click="langugeAndThemeStore.setThemeSetting(theme.key)"
                    >
                      <q-item-section avatar>
                        <q-icon :name="theme.icon" />
                      </q-item-section>
                      <q-item-section>{{ t(theme.text) }}</q-item-section>
                      <q-item-section
                        v-if="theme.key == langugeAndThemeStore.themeSetting"
                        side
                      >
                        <q-icon :name="biCheck2" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon :name="biTranslate" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    {{ t('base.language') }} :
                    {{ currenLocale ? currenLocale.name : '' }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon :name="biChevronRight" />
                </q-item-section>
                <q-menu
                  :anchor="!$q.screen.gt.xs ? 'bottom left' : 'top end'"
                  self="top start"
                >
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
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biQuestionCircle" />
                </q-item-section>
                <q-item-section>{{ t('base.help') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/settings">
                <q-item-section avatar>
                  <q-icon :name="biGear" />
                </q-item-section>
                <q-item-section>{{ t('base.setting') }}</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="signOut">
                <q-item-section avatar>
                  <q-icon :name="biBoxArrowRight" />
                </q-item-section>
                <q-item-section>{{ t('base.logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  biChatDots,
  biBell,
  biAppIndicator,
  biCameraVideo,
  biSearch,
  biCaretDownFill,
  biEmojiSmile,
  biPersonSquare,
  biMoon,
  biTranslate,
  biQuestionCircle,
  biGear,
  biBoxArrowRight,
  biChevronRight,
  biCheck2,
  biList,
} from '@quasar/extras/bootstrap-icons';
import { availableThemes } from 'src/utils/theme';
import { availableLocales } from 'src/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from 'stores/authenStore';
import useAuth from 'src/composables/useAuth';
defineProps({
  hambergerMenu: {
    type: Boolean,
    default: true,
  },
});
const { t } = useLang();
const authenStore = useAuthenStore();
const langugeAndThemeStore = useLangugeAndThemeStore();
const { signOut } = useAuth();
const search = ref('');
const currenLocale = computed(() =>
  availableLocales.find((t) => t.iso == langugeAndThemeStore.locale)
);
</script>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
</style>
