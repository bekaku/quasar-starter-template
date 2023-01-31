<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
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
            <q-item-label>{{ link.text }}</q-item-label>
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
            <q-item-label>{{ link.text }}</q-item-label>
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
            <q-item-label>{{ link.text }}</q-item-label>
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
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />

        <div
          class="q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons1"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a
              v-for="button in buttons2"
              :key="button.text"
              class="YL__drawer-footer-link"
              href="javascript:void(0)"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
        <div
          class="q-py-md q-px-md"
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
        >
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a class="YL__drawer-footer-link" href="javascript:void(0)">
              {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
            </a>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import { getYearNow } from 'src/utils/dateUtil';
import { useLang } from '@/composables/useLang';
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
      links1: [
        // { icon: 'bi-house-door', text: 'Home', link: '/' },
        { icon: 'bi-card-heading', text: 'Feed', link: '/feed' },
        { icon: 'bi-123', text: 'Pinia Store', link: '/pinia' },
        { icon: 'bi-translate', text: 'I18n', link: '/i18n' },
        {
          icon: 'bi-file-arrow-down',
          text: 'Fetch data',
          link: '/fetch-data',
        },
        { icon: 'bi-file', text: 'Tutor1', link: '/tutor1' },
      ],
      links2: [
        { icon: 'bi-folder2', text: 'Library' },
        { icon: 'bi-clock-history', text: 'History' },
        { icon: 'bi-clock', text: 'Watch later' },
        { icon: 'bi-hand-thumbs-up', text: 'Liked videos' },
      ],
      links3: [
        { icon: 'bi-play-btn', text: 'Movies & Shows' },
        { icon: 'bi-cast', text: 'Gaming' },
        { icon: 'bi-tv', text: 'Live' },
      ],
      links4: [
        { icon: 'bi-gear', text: 'Settings' },
        { icon: 'bi-flag', text: 'Report history' },
        { icon: 'bi-question-circle', text: 'Help' },
        { icon: 'bi-info-square', text: 'Send feedback' },
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
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
