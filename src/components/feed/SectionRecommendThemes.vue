<template>
  <BaseCard :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item-label header>{{ t('recommendationsThemes') }}</q-item-label>
      <q-item v-for="(item, index) in items" :key="index">
        <q-item-section avatar>
          <q-avatar size="36px">
            <q-img spinner-color="white" :src="AvatarPlaceHolder128" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>By {{ item.author }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense :icon="biPencil">
            <q-tooltip>Post it</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section side>
          <q-icon color="primary" :name="biChevronDown" />
        </q-item-section>
        <q-item-section class="text-primary">{{ t('base.seeMore') }}</q-item-section>
      </q-item>
    </q-list>
  </BaseCard>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { AvatarPlaceHolder128, FeedSectionWidth } from '@/libs/constant';
import { biChevronDown, biPencil } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
import BaseCard from '../base/BaseCard.vue';

const { t } = useLang();
const items = ref([
  {
    name: 'Security',
    author: 'Jane Groowy',
    id: 1,
  },
  {
    name: 'Coding',
    author: 'Doug McMillion',
    id: 2,
  },
  {
    name: 'Clean',
    author: 'Cristopfer Nisson',
    id: 3,
  },
]);
</script>
