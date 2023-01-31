<template>
  <q-card flat bordered :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="48px" color="orange" class="text-white">
            <q-icon :name="biTrophy" />
          </q-avatar>
        </q-item-section>
        <q-item-section> SS Leaderboard </q-item-section>
      </q-item>
      <q-separator />
      <div class="row justify-around text-center q-pa-xs">
        <div>
          <q-avatar size="48px">
            <q-icon :name="biArrowUp" color="positive" />
          </q-avatar>
        </div>
        <div>
          <div class="text-weight-bold text-subtitle1">75</div>
          <span class="wee-text-muted">Your rank</span>
        </div>
        <div>
          <div class="text-weight-bold text-subtitle1 text-positive">+7</div>
          <span class="wee-text-muted">Change</span>
        </div>
      </div>
      <q-separator />
      <q-item>
        <q-item-section> Leaders </q-item-section>
        <q-item-section side> D/E </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="36px">
            <q-img spinner-color="white" :src="AvatarPlaceHolder128" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">1. Jane Groowy</q-item-label>
          <q-item-label caption lines="1">Account Manager</q-item-label>
        </q-item-section>
        <q-item-section side> 5.5 </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="36px">
            <q-img spinner-color="white" :src="AvatarPlaceHolder128" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">2. Jane Groowy</q-item-label>
          <q-item-label caption lines="1">Account Manager</q-item-label>
        </q-item-section>
        <q-item-section side> 5.5 </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="36px">
            <q-img spinner-color="white" :src="AvatarPlaceHolder128" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">3. Jane Groowy</q-item-label>
          <q-item-label caption lines="1">Account Manager</q-item-label>
        </q-item-section>
        <q-item-section side> 5.5 </q-item-section>
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
import { AvatarPlaceHolder128 } from 'src/utils/constant';
import { useLang } from '@/composables/useLang';
import { FeedSectionWidth } from 'src/utils/constant';
import {
  biChevronDown,
  biTrophy,
  biArrowUp,
} from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
</script>
