<template>
  <q-card square flat>
    <q-list bordered>
      <template v-for="link in links1" :key="link.text">
        <q-separator v-if="link.separator" spaced />
        <q-item-label v-else-if="link.header" header>{{
          link.header
        }}</q-item-label>
        <q-item v-else :to="link.link" v-ripple clickable>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'black'"
              :name="link.icon"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t(`${link.text}`) }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
});

const { t } = useLang();
const links1 = ref([
  {
    icon: 'bi-person',
    text: 'page.settingsPublicProfile',
    link: '/settings/profile',
  },
  {
    icon: 'bi-bell',
    text: 'page.settingsNotification',
    link: '/settings/notifications',
  },
  {
    separator: true,
  },
  {
    header: 'Access',
  },
  {
    icon: 'bi-shield-lock',
    text: 'page.settingsSecurity',
    link: '/settings/security',
  },
  {
    icon: 'bi-envelope',
    text: 'page.settingsEmail',
    link: '/settings/emails',
  },
]);
</script>
