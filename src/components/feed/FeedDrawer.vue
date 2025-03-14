<script setup lang="ts">
import { biHouseDoor } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useLangugeAndThemeStore } from 'stores/langugeAndThemeStore';
import type { PropType } from 'vue';
import { ref } from 'vue';
type ISideType = 'left' | 'right' | undefined;
defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String as PropType<ISideType>,
    default: 'left',
  },
});
const { dark } = useQuasar();
const miniState = ref(true);
const langugeAndThemeStore = useLangugeAndThemeStore();
const links1 = [{ icon: biHouseDoor, text: 'Home', link: '/' }];
const links2 = [
  { icon: 'bi-folder2', text: 'Library' },
  { icon: 'bi-clock-history', text: 'History' },
  { icon: 'bi-clock', text: 'Watch later' },
  { icon: 'bi-hand-thumbs-up', text: 'Liked videos' },
];
const links3 = [
  { icon: 'bi-play-btn', text: 'Movies & Shows' },
  { icon: 'bi-cast', text: 'Gaming' },
  { icon: 'bi-tv', text: 'Live' },
];
const links4 = [
  { icon: 'bi-gear', text: 'Settings' },
  { icon: 'bi-flag', text: 'Report history' },
  { icon: 'bi-question-circle', text: 'Help' },
  { icon: 'bi-info-square', text: 'Send feedback' },
];
</script>
<template>
  <q-drawer
    v-model="langugeAndThemeStore.leftDrawerOpen"
    show-if-above
    :width="240"
    :overlay="overlay"
    :side="side"
    bordered
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
  >
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item v-for="link in links1" :key="link.text" :to="link.link" v-ripple clickable>
          <q-item-section avatar>
            <q-icon :color="dark.isActive ? 'white' : 'black'" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon :color="dark.isActive ? 'white' : 'black'" :name="link.icon" />
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
            <q-icon :color="dark.isActive ? 'white' : 'black'" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon :color="dark.isActive ? 'white' : 'black'" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<style lang="sass">
.menu-list .q-item
  border-radius: 0 32px 32px 0
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
</style>
