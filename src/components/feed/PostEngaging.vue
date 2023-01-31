<template>
  <q-card-section>
    <div class="text-caption text-muted">
      <q-icon :name="biMagic" /> {{ t('userEngagement') }} 21.8k
    </div>
    <div class="row justify-between">
      <div class="row">
        <div class="q-mr-xs">
          <q-avatar
            color="pink"
            text-color="white"
            size="20px"
            :icon="biHeartFill"
            class="relative-position"
            style="left: 0px"
          />
          <q-avatar
            color="amber-8"
            text-color="white"
            size="20px"
            :icon="biGiftFill"
            class="relative-position"
            style="left: -5px"
          />
          <q-avatar
            color="green"
            text-color="white"
            size="20px"
            :icon="biHandbagFill"
            class="relative-position"
            style="left: -10px"
          />
          <q-avatar
            color="blue"
            text-color="white"
            size="20px"
            :icon="biHandIndexThumbFill"
            class="relative-position"
            style="left: -15px"
          />
          <a
            href="javascript:void(0)"
            class="wee-link wee-text-muted text-caption"
            >10.9k</a
          >
        </div>
      </div>
      <div class="q-gutter-x-md">
        <a
          href="javascript:void(0)"
          class="wee-link wee-text-muted text-caption"
          >9k {{ t('comments') }}</a
        >
        <a
          href="javascript:void(0)"
          class="wee-link wee-text-muted text-caption"
          >1.9k {{ t('shares') }}</a
        >
      </div>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import {
  biHandIndexThumbFill,
  biGiftFill,
  biHeartFill,
  biHandbagFill,
  biMagic,
} from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
</script>
