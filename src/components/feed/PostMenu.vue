<template>
  <q-btn dense :icon="biThreeDots" flat round>
    <q-menu cover anchor="top middle">
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section side top>
            <q-icon :name="biBookmark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('saveThisPost') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section side top>
            <q-icon :name="biLink45deg" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('copyLinkToPost') }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section side top>
            <q-icon :name="biFlag" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t('reportPost') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import {
  biThreeDots,
  biBookmark,
  biLink45deg,
  biFlag,
} from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
</script>
