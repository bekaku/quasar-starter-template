<template>
  <q-card flat class="bg-transparent">
    <q-card-section>
      <span class="text-caption text-muted q-mr-sm">{{ t('sort.by') }}:</span>
      <q-btn
        class="text-capitalize"
        flat
        :icon-right="biChevronExpand"
        :label="t('sort.post.' + sort)"
      >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="onSort('NEW_POST')">
              <q-item-section side>
                <q-icon :name="laFireSolid" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('sort.post.NEW_POST') }}</q-item-label>
                <q-item-label caption>{{ t('sort.post.NEW_POST_DESC') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onSort('NEW_ACTIVITY')">
              <q-item-section side>
                <q-icon :name="laMeteorSolid" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('sort.post.NEW_ACTIVITY') }}</q-item-label>
                <q-item-label caption>{{ t('sort.post.NEW_ACTIVITY_DESC') }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onSort('TOP_POST')">
              <q-item-section side>
                <q-icon :name="laRocketSolid" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ t('sort.post.TOP_POST') }}</q-item-label>
                <q-item-label caption>{{ t('sort.post.TOP_POST_DESC') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import type { PostSortType } from '@/types/models';
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';
import { laFireSolid, laMeteorSolid, laRocketSolid } from '@quasar/extras/line-awesome';
import { ref } from 'vue';
const { t } = useLang();
const sort = ref<PostSortType>('NEW_POST');
const onSort = (s: PostSortType) => {
  sort.value = s;
};
</script>
