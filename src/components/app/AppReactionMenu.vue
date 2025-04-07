<script setup lang="ts">
import type { EmojiType } from '@/types/models';
import {
  mdiEmoticonLol,
  mdiEmoticonLolOutline,
  mdiEmoticonSad,
  mdiEmoticonSadOutline,
  mdiHandPeace,
  mdiHandPeaceVariant,
  mdiHeart,
  mdiHeartOutline,
  mdiThumbUp,
  mdiThumbUpOutline,
} from '@quasar/extras/mdi-v7';
import { ref } from 'vue';
const { iconSize = '40px', iconZoomSize = '55px' } = defineProps<{
  iconSize?: string;
  iconZoomSize?: string;
}>();
const emit = defineEmits(['on:like']);
const loveHover = ref(false);
const fightHover = ref(false);
const laughHover = ref(false);
const careHover = ref(false);
const sadHover = ref(false);
const onLike = (l: EmojiType) => {
  emit('on:like', l);
};
</script>
<template>
  <!-- <div class="row justify-between q-pa-md q-gutter-md"> -->
  <div class="row justify-center q-pa-sm q-gutter-sm">
    <transition-group appear enter-active-class="animated lightSpeedInLeft">
      <div key="btn-1" class="btn-holder">
        <q-btn
          round
          dense
          flat
          color="primary"
          @mouseover="loveHover = true"
          @mouseleave="loveHover = false"
          @click="onLike('LIKE')"
        >
          <q-icon :name="loveHover ? mdiThumbUp : mdiThumbUpOutline" :size="loveHover ? iconZoomSize : iconSize" />
          <q-tooltip class="bg-primary" anchor="top middle" self="center middle"> Like </q-tooltip>
        </q-btn>
      </div>
      <div key="btn-2" class="btn-holder">
        <q-btn
          round
          dense
          flat
          color="green"
          @mouseover="fightHover = true"
          @mouseleave="fightHover = false"
          @click="onLike('FIGHTING')"
        >
          <q-icon :name="fightHover ? mdiHandPeaceVariant : mdiHandPeace" :size="fightHover ? iconZoomSize : iconSize" />
          <q-tooltip class="bg-green" anchor="top middle" self="center middle">
            Give going
          </q-tooltip>
        </q-btn>
      </div>

      <div key="btn-3" class="btn-holder">
        <q-btn
          round
          dense
          flat
          color="amber"
          @mouseover="laughHover = true"
          @mouseleave="laughHover = false"
          @click="onLike('LAUGH')"
        >
          <q-icon :name="laughHover ? mdiEmoticonLol : mdiEmoticonLolOutline" :size="laughHover ? iconZoomSize : iconSize" />
          <q-tooltip class="bg-amber" anchor="top middle" self="center middle"> LOL </q-tooltip>
        </q-btn>
      </div>

      <div key="btn-4" class="btn-holder">
        <q-btn
          round
          dense
          flat
          color="pink"
          @mouseover="careHover = true"
          @mouseleave="careHover = false"
          @click="onLike('CARE')"
        >
          <q-icon :name="careHover ? mdiHeart : mdiHeartOutline" :size="careHover ? iconZoomSize : iconSize" />
          <q-tooltip class="bg-pink" anchor="top middle" self="center middle"> Care </q-tooltip>
        </q-btn>
      </div>

      <div key="btn-5" class="btn-holder">
        <q-btn
          round
          dense
          flat
          color="deep-purple"
          @mouseover="sadHover = true"
          @mouseleave="sadHover = false"
          @click="onLike('SAD')"
        >
          <q-icon :name="sadHover ? mdiEmoticonSad : mdiEmoticonSadOutline" :size="sadHover ? iconZoomSize : iconSize" />
          <q-tooltip class="bg-deep-purple" anchor="top middle" self="center middle">
            Sad
          </q-tooltip>
        </q-btn>
      </div>
    </transition-group>
  </div>
</template>
<style scoped lang="scss">
.btn-holder {
  width: 40px;
  height: 40px;
}
</style>
