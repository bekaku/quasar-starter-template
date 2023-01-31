<template>
  <q-card flat class="bg-transparent">
    <q-card flat>
      <div
        :style="`height: ${height};
              background: url(${
                coverImage ? coverImage : ''
              }), linear-gradient(to right, #000, #000);
              background-position: center;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;`"
      ></div>
      <div class="text-white absolute-center">
        <q-avatar
          :size="avatarSize"
          :style="{ top: avatarTop }"
          class="shadow-5"
        >
          <q-img spinner-color="white" :src="avatarImage" />
          <!-- <q-icon
              v-if="showMedal"
              :name="laMedalSolid"
              size="md"
              color="amber"
              class="absolute-bottom-right"
            /> -->
          <!-- <medal-badge
              label="Gold medal"
              class="absolute-bottom-right"
              style="top: 45px; left: 45px"
              color="amber-8"
              size="sm"
              :flat="false"
            /> -->
        </q-avatar>
      </div>
    </q-card>
    <slot name="description">
      <q-card-section class="text-center" :style="descriptionStyle">
        <q-item dense>
          <q-item-section>
            <q-item-label class="text-weight-bold" lines="1">
              {{ name }}
              <medal-badge label="Gold medal" color="amber-8" size="md" />
            </q-item-label>
            <q-item-label caption>
              {{ description }}
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section side>
              <q-btn flat dense round :icon="laMedalSolid" color="amber-8">
                <q-tooltip>Gold medal</q-tooltip>
              </q-btn>
            </q-item-section> -->
        </q-item>
      </q-card-section>
    </slot>
    <!-- <slot name="statistic">
        <div class="row justify-around text-center">
          <div>
            <q-icon :name="laMedalSolid" size="lg" color="amber-8" />
            <span class="text-amber-8 text-weight-bold">Gold medal</span>
          </div>
        </div>
      </slot> -->
    <slot name="statistic2">
      <div class="row justify-around q-pa-sm">
        <div class="text-center">
          <div class="text-weight-bold text-h6">
            <q-icon :name="biArrowDown" color="negative" />20
          </div>
          <div class="wee-text-muted text-caption">
            E-Own<span class="text-negative q-ml-xs text-caption">(-2)</span>
          </div>
          <q-tooltip>{{ t('ssCode.eOwn') }}</q-tooltip>
        </div>
        <div class="text-center">
          <div class="text-weight-bold text-h6">
            <q-icon :name="biArrowUp" color="positive" />35
          </div>
          <div class="wee-text-muted text-caption">
            D-Get<span class="text-positive text-caption q-ml-xs">(+7)</span>
          </div>
          <q-tooltip>{{ t('ssCode.dGet') }}</q-tooltip>
        </div>
        <div class="text-center">
          <div class="text-weight-bold text-h6">
            <q-icon :name="laArrowsAltVSolid" color="grey" />20
          </div>
          <div class="wee-text-muted text-caption">
            D-Give<span class="text-grey text-caption q-ml-xs">(+0)</span>
          </div>
          <q-tooltip>{{ t('ssCode.dGive') }}</q-tooltip>
        </div>
      </div>
    </slot>
    <slot name="statistic3">
      <div class="row justify-around text-center q-pa-sm">
        <div>
          <div class="text-weight-bold">78</div>
          <div class="text-caption wee-text-muted">
            <q-icon :name="biGift" class="q-mr-xs" />{{ t('prizes') }}
          </div>
        </div>
        <div>
          <div class="text-weight-bold">1.2k</div>
          <span class="text-caption wee-text-muted"
            ><q-icon :name="biPencil" class="q-mr-xs" />{{ t('posts') }}</span
          >
        </div>
        <div>
          <div class="text-weight-bold">7.5k</div>
          <span class="text-caption wee-text-muted"
            ><q-icon :name="biChatSquare" class="q-mr-xs" />{{
              t('comments')
            }}</span
          >
        </div>
      </div>
    </slot>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useLang } from '@/composables/useLang';
import MedalBadge from '@/components/feed/MedalBadge.vue';
import { laArrowsAltVSolid } from '@quasar/extras/line-awesome';
import {
  biArrowDown,
  biArrowUp,
  biGift,
  biChatSquare,
  biPencil,
} from '@quasar/extras/bootstrap-icons';
defineProps({
  coverImage: {
    type: String,
    default: undefined,
  },
  avatarImage: {
    type: String,
    default: undefined,
  },
  showMedal: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '250px',
  },
  avatarTop: {
    type: String,
    default: '75px',
  },
  avatarSize: {
    type: String,
    default: '120px',
  },
  descriptionStyle: {
    type: String,
    default: '',
  },
  name: {
    type: String as PropType<string | null | undefined>,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
const { t } = useLang();
</script>
