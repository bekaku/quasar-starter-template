<template>
  <q-card flat bordered :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item-label header
        ><q-icon :name="biBookmark" class="q-mr-sm" />{{
          t('savedPost')
        }}</q-item-label
      >
      <q-item v-for="(item, index) in savedList" :key="index" clickable>
        <q-item-section avatar>
          <q-img
            :src="item.image"
            class="bg-gray-1"
            spinner-color="primary"
            no-native-menu
          />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item.title }}</q-item-label>
          <q-item-label caption> {{ item.author }} </q-item-label>
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
import { biChevronDown, biBookmark } from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
import { FeedSectionWidth } from 'src/utils/constant';
const { t } = useLang();
const savedList = ref([
  {
    image: 'https://picsum.photos/160',
    title:
      'Sobering up has had a negative affect on relationship with [25f] gf. How to handle?',
    author: 'BigGumbyLover',
  },
  {
    image: 'https://picsum.photos/160',
    title:
      'Worker disappears after he was accidentally paid more than 300 times his salary',
    author: 'Flair_Helper',
  },
  {
    image: 'https://i.redd.it/5jrr5k4sbs991.jpg',
    title:
      'The only picture we have of my great grandfather (left), with an unknown man (circa 1910)',
    author: 'TrebleRose68',
  },
]);
</script>
