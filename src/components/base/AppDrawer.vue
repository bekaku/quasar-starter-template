<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="240">
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
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-9'"
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
          :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-9'"
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
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { fabYoutube } from '@quasar/extras/fontawesome-v6';

export default defineComponent({
  name: 'AppDrawer',
  props: {},
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref('');
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      links1: [
        // { icon: 'bi-house-door', text: 'Home', link: '/' },
        { icon: 'mdi-fruit-pineapple', text: 'Pinia Store', link: '/pinia' },
        { icon: 'bi-translate', text: 'I18n', link: '/i18n' },
        {
          icon: 'bi-file-arrow-down',
          text: 'Fetch data',
          link: '/fetch-data',
        },
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
      text-decoration: none
</style>
