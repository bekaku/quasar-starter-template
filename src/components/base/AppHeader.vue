<template>
  <q-header
    bordered
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
        flat
        dense
        round
        @click="
          langugeAndThemeStore.setLeftDrawer(
            !langugeAndThemeStore.leftDrawerOpen
          )
        "
        aria-label="Menu"
        icon="mdi-menu"
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
          class="text-weight-bold"
          :class="$q.dark.isActive ? 'text-white' : 'text-black'"
        >
          SuperSynapse
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
          class="bg-white col"
        />
        <q-btn
          class="YL__toolbar-input-btn"
          color="grey-3"
          text-color="black"
          :icon="biSearch"
          unelevated
        >
          <q-tooltip>{{ t('base.search') }}</q-tooltip>
        </q-btn>
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
          <q-avatar round size="26px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-icon :name="biCaretDownFill" size="16px" />

          <q-menu>
            <q-list style="min-width: 260px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div>Signed in as <strong>Mary</strong></div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>
                  <div>
                    <q-icon :name="biEmojiSmile" color="blue-9" size="18px" />
                    Set your status
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biPersonSquare" />
                </q-item-section>
                <q-item-section>Your profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon :name="biMoon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    Appearance :
                    {{
                      capitalizeFirstLetter(langugeAndThemeStore.themeSetting)
                    }}
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
                      <q-item-section>{{ theme.text }}</q-item-section>
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
                    Languge :
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
                <q-item-section>Help</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biGear" />
                </q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon :name="biBoxArrowRight" />
                </q-item-section>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import {
  mdiBellOutline,
  mdiChatProcessingOutline,
} from '@quasar/extras/mdi-v6';
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
} from '@quasar/extras/bootstrap-icons';
import { availableThemes } from 'src/utils/theme';
import { availableLocales } from 'src/utils/lang';
import { useLangugeAndThemeStore } from 'stores/langugeAndTheme';
import { capitalizeFirstLetter } from 'src/utils/appUtil';
import { useLang } from '@/composables/useLang';
export default defineComponent({
  name: 'AppHeader',
  props: {},
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    const search = ref('');
    const currenLocale = computed(() =>
      availableLocales.find((t) => t.iso == langugeAndThemeStore.locale)
    );
    const icons = {
      mdiBellOutline,
      mdiChatProcessingOutline,
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
    };
    return {
      search,
      ...icons,
      availableThemes,
      langugeAndThemeStore,
      availableLocales,
      capitalizeFirstLetter,
      currenLocale,
      t,
    };
  },
});
</script>
<style lang="sass"></style>
