<script setup lang="ts">
import type { EmojiCountDto } from '@/types/models';
import {
    biEmojiFrownFill,
    biHandThumbsUpFill,
    biHeartFill
} from '@quasar/extras/bootstrap-icons';
import { mdiEmoticonLol, mdiEmoticonSad, mdiHandPeaceVariant, mdiHeart, mdiThumbUp } from '@quasar/extras/mdi-v7';
import { appPreventDefult } from 'src/utils/appUtil';
import { ref } from 'vue';
const { chatId, iconSize = 32 } = defineProps<{
  chatId: number;
  items: EmojiCountDto[];
  iconSize?: number;
}>();
const emit = defineEmits<{
  'on-click': [chatId: number];
}>();
const size = ref(`${iconSize}px`);
const show = ref(false);
const onClick = (ev: any) => {
  show.value = true;
  appPreventDefult(ev);
  emit('on-click', chatId);
};
</script>
<template>
  <div v-bind="$attrs" class="row cursor-pointer holder" @click="onClick($event)">
    <div
      v-for="(item, index) in items"
      class="icon text-center relative-position"
      :style="`left: -${index * 5}px`"
      :key="item.emojiType"
    >
      <q-avatar v-if="item.emojiType == 'CARE'" color="pink" text-color="white" :size="size">
        <q-icon :name="mdiHeart" size="20px" />
      </q-avatar>
      <q-avatar
        v-else-if="item.emojiType == 'LAUGH'"
        color="orange"
        text-color="white"
        :size="size"
      >
        <q-icon :name="mdiEmoticonLol" size="24px" />
      </q-avatar>
      <q-avatar
        v-else-if="item.emojiType == 'SAD'"
        color="deep-purple"
        text-color="white"
        :size="size"
      >
        <q-icon :name="mdiEmoticonSad" size="24px" />
      </q-avatar>
      <q-avatar
        v-else-if="item.emojiType == 'LIKE'"
        color="primary"
        text-color="white"
        :size="size"
      >
        <q-icon :name="mdiThumbUp" size="20px" />
      </q-avatar>
      <q-avatar
        v-else-if="item.emojiType == 'FIGHTING'"
        color="green"
        text-color="white"
        :size="size"
      >
        <q-icon :name="mdiHandPeaceVariant" size="24px" />
      </q-avatar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.holder {
  width: fit-content;
}

.icon {
  height: v-bind(size);
  width: v-bind(size);
}
</style>
