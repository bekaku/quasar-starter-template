<template>
  <q-card square flat>
    <q-list>
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
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLang } from '@/composables/useLang';
export default defineComponent({
  name: 'UserSettingDrawer',
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useLang();
    return {
      t,
      links1: [
        {
          icon: 'bi-person',
          text: t('page.settingsPublicProfile'),
          link: '/settings/profile',
        },
        {
          icon: 'bi-bell',
          text: t('page.settingsNotification'),
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
          text: t('page.settingsSecurity'),
          link: '/settings/security',
        },
        {
          icon: 'bi-envelope',
          text: t('page.settingsEmail'),
          link: '/settings/emails',
        },
      ],
    };
  },
});
</script>
