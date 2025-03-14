<template>
  <q-card flat class="full-height">
    <q-list bordered>
      <template v-for="link in links1" :key="link.text">
        <q-separator v-if="link.separator" spaced />
        <q-item-label v-else-if="link.header" header>
          {{ link.header }}
        </q-item-label>
        <q-item v-else :to="link.link" v-ripple clickable>
          <q-item-section avatar>
            <q-icon :color="dark.isActive ? 'white' : 'black'" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t(`${link.text}`) }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<script lang="ts" setup>
import { useLang } from '@/composables/useLang';
import { biEnvelope, biPerson, biShieldLock } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
const { t } = useLang();
const { dark } = useQuasar();
const links1 = ref([
  {
    icon: biPerson,
    text: 'page.settingsPublicProfile',
    link: '/settings/profile',
  },
  // {
  //   icon: biBell,
  //   text: 'page.settingsNotification',
  //   link: '/settings/notifications',
  // },
  {
    separator: true,
  },
  {
    header: 'Access',
  },
  {
    icon: biShieldLock,
    text: 'page.settingsSecurity',
    link: '/settings/security',
  },
  {
    icon: biEnvelope,
    text: 'contactInfo',
    link: '/settings/emails',
  },
]);
</script>
