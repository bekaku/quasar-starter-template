<template>
    <q-card
      flat
      bordered
      class="q-mt-md"
      :style="{ width: `${FeedSectionWidth}px` }"
    >
      <q-list>
        <q-item-label header>{{ t('todayMostViewPosts') }}</q-item-label>
        <q-item v-for="(item, index) in items" :key="index">
          <q-item-section avatar>
            <q-avatar
              size="36px"
              :color="!$q.dark.isActive ? 'blue-1' : 'white'"
              :class="!$q.dark.isActive ? 'text-blue' : 'app-main-bg'"
            >
              {{ index + 1 }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">{{ item.title }}</q-item-label>
            <q-item-label caption lines="1">By {{ item.author }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-icon color="primary" :name="biChevronDown" />
          </q-item-section>
          <q-item-section class="text-primary">{{
            t('base.seeMore')
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useLang } from '@/composables/useLang';
  import { biChevronDown } from '@quasar/extras/bootstrap-icons';
  import { FeedSectionWidth } from 'src/utils/constant';
  const { t } = useLang();
  const items = ref([
    {
      title: 'The Six Morning Habit of SEO Specialist at Taksdfds',
      author: 'Chanavee Bekaku',
    },
    { title: 'Unconscious Bias', author: 'Stacey Gordon' },
    { title: 'Critical Thinking for Better life', author: 'Becki Saltzman' },
  ]);
  </script>