<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          v-for="link in links1"
          :key="link.text"
          :to="link.link"
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              link.i18n ? t(link.text) : link.text
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item icon="bi-file" label="Pages">
          <q-list class="q-pl-lg">
            <q-item to="/auth/login" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/auth/login2"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-in-right" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header class="text-weight-bold">Generic</q-item-label>
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="bi-person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>User Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/Maintenance"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="bi-gear" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Maintenance</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              link.i18n ? t(link.text) : link.text
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label header class="text-weight-bold text-uppercase">
          More from Youtube
        </q-item-label>

        <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              link.i18n ? t(link.text) : link.text
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{
              link.i18n ? t(link.text) : link.text
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { getYearNow } from 'src/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import {
  biHouseDoor,
  biCardHeading,
  bi123,
  biTranslate,
} from '@quasar/extras/bootstrap-icons';
export default defineComponent({
  name: 'AppDrawer',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useLang();
    const langugeAndThemeStore = useLangugeAndThemeStore();
    return {
      langugeAndThemeStore,
      getYearNow,
      t,
      miniState: ref(true),
      links1: [
        { icon: biHouseDoor, text: 'nav.forAdmin', link: '/admin', i18n: true },
        { icon: biCardHeading, text: 'nav.social', link: '/', i18n: true },
        { icon: bi123, text: 'nav.pinia', link: '/admin/pinia', i18n: true },
        {
          icon: biTranslate,
          text: 'nav.i18n',
          link: '/admin/i18n',
          i18n: true,
        },
        {
          icon: 'bi-file-arrow-down',
          text: 'nav.fetchData',
          link: '/admin/fetch-data',
          i18n: true,
        },
        { icon: 'bi-file', text: 'Tutor1', link: '/tutor1', i18n: false },
      ],
      links2: [
        { icon: 'bi-folder2', text: 'Library', i18n: false },
        { icon: 'bi-clock-history', text: 'History', i18n: false },
        { icon: 'bi-clock', text: 'Watch later', i18n: false },
        { icon: 'bi-hand-thumbs-up', text: 'Liked videos', i18n: false },
      ],
      links3: [
        { icon: 'bi-play-btn', text: 'Movies & Shows', i18n: false },
        { icon: 'bi-cast', text: 'Gaming', i18n: false },
        { icon: 'bi-tv', text: 'Live', i18n: false },
      ],
      links4: [
        { icon: 'bi-gear', text: 'Settings', i18n: false },
        { icon: 'bi-flag', text: 'Report history', i18n: false },
        { icon: 'bi-question-circle', text: 'Help', i18n: false },
        { icon: 'bi-info-square', text: 'Send feedback', i18n: false },
      ],
      buttons1: [
        { text: 'About', i18n: false },
        { text: 'Press', i18n: false },
        { text: 'Copyright', i18n: false },
        { text: 'Contact us', i18n: false },
        { text: 'Creators', i18n: false },
        { text: 'Advertise', i18n: false },
        { text: 'Developers', i18n: false },
      ],
      buttons2: [
        { text: 'Terms', i18n: false },
        { text: 'Privacy', i18n: false },
        { text: 'Policy & Safety', i18n: false },
        { text: 'Test new features', i18n: false },
      ],
    };
  },
});
</script>
<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      text-decoration: underline
</style>
