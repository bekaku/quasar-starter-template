<template>
  <q-card flat bordered :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item-label header
        ><q-icon :name="laHashtagSolid" class="q-mr-sm" />{{
          t('followingTag')
        }}</q-item-label
      >
      <q-item v-for="(item, index) in followingTags" :key="index">
        <q-item-section side top>
          <q-icon :name="laHashtagSolid" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            <app-link
              :label="item.tag"
              color="text-black"
              color-dark="text-white"
          /></q-item-label>
          <q-item-label caption> By {{ item.author }} </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            class="text-capitalize"
            size="sm"
            flat
            dense
            round
            :icon="biDashCircle"
          >
            <q-tooltip>{{ t('base.unfollow') }}</q-tooltip>
          </q-btn>
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
import AppLink from 'src/components/base/AppLink.vue';
import { biChevronDown, biDashCircle } from '@quasar/extras/bootstrap-icons';
import { laHashtagSolid } from '@quasar/extras/line-awesome';
import { useLang } from '@/composables/useLang';
import { FeedSectionWidth } from 'src/utils/constant';
const { t } = useLang();
const followingTags = ref([
  {
    tag: 'FreeDocumentary',
    author: 'TrebleRose68',
    id: 1,
  },
  {
    tag: 'Documentary',
    author: 'Bekaku',
    id: 2,
  },
]);
</script>
