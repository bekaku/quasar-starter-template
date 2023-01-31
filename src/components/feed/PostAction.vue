<template>
  <q-separator />
  <q-card-actions align="around">
    <q-btn
      v-if="!actionType"
      flat
      :icon="biHeart"
      class="text-capitalize"
      label="Love it"
      @mouseover="reactHover = true"
    >
      <q-menu
        v-model="showReact"
        cover
        anchor="bottom left"
        auto-close
        @hide="reactHover = false"
        @mouseleave="reactHover = false"
      >
        <div class="row justify-between q-pa-md q-gutter-md">
          <transition-group
            appear
            enter-active-class="animated lightSpeedInLeft"
          >
            <q-btn
              key="btn-1"
              round
              dense
              flat
              color="pink"
              @mouseover="loveHover = true"
              @mouseleave="loveHover = false"
              :icon="loveHover ? biHeartFill : biHeart"
              @click="onLiked('LOVE_IT')"
            >
              <q-tooltip
                class="bg-pink"
                anchor="top middle"
                self="center middle"
              >
                Love it
              </q-tooltip>
            </q-btn>
            <q-btn
              key="btn-2"
              round
              dense
              flat
              color="amber-8"
              @mouseover="prizeHover = true"
              @mouseleave="prizeHover = false"
              :icon="prizeHover ? biGiftFill : biGift"
              @click="onLiked('PRIZE_IT')"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
                class="bg-amber-8"
                >Prize it</q-tooltip
              ></q-btn
            >
            <q-btn
              key="btn-3"
              round
              dense
              flat
              color="green"
              @mouseover="adoptHover = true"
              @mouseleave="adoptHover = false"
              :icon="adoptHover ? biHandbagFill : biHandbag"
              @click="onLiked('ADOPT_IT')"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
                class="bg-green"
                >Adopt it</q-tooltip
              ></q-btn
            >
            <q-btn
              key="btn-4"
              round
              dense
              flat
              color="blue"
              @mouseover="actionHover = true"
              @mouseleave="actionHover = false"
              :icon="actionHover ? biHandIndexThumbFill : biHandIndexThumb"
              @click="onLiked('ACTION_IT')"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
                class="bg-blue"
                >Action it</q-tooltip
              ></q-btn
            >
          </transition-group>
        </div>
      </q-menu>
    </q-btn>
    <transition v-else appear enter-active-class="animated heartBeat">
      <q-btn
        flat
        :icon="actionIcon"
        class="text-capitalize"
        :label="actionText"
        :color="actionColor"
        @click="onUnLiked"
      ></q-btn>
    </transition>

    <q-separator vertical />
    <q-btn
      class="text-capitalize"
      flat
      :icon="biChatSquareDots"
      label="Comment it"
    >
      <q-tooltip>Comment it</q-tooltip></q-btn
    >
    <q-separator vertical />
    <q-btn class="text-capitalize" flat :icon="biBookmark" label="Save it">
      <q-tooltip>Save it</q-tooltip></q-btn
    >
    <q-separator vertical />
    <q-btn
      class="text-capitalize"
      flat
      :icon="biArrow90degRight"
      label="Share it"
    >
      <q-tooltip>Share it</q-tooltip></q-btn
    >
  </q-card-actions>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onBeforeUnmount,
  onMounted,
  computed,
  PropType,
} from 'vue';
import { PostActionType } from '@/types/models';
import useBase from '@/composables/useBase';
import {
  biHandIndexThumbFill,
  biHandIndexThumb,
  biHeart,
  biChatSquareDots,
  biGiftFill,
  biGift,
  biArrow90degRight,
  biHeartFill,
  biHandbagFill,
  biHandbag,
  biBookmark,
} from '@quasar/extras/bootstrap-icons';
import { AvatarPlaceHolder128 } from 'src/utils/constant';
const { WeeToast } = useBase();
const props = defineProps({
  action: {
    type: String as PropType<PostActionType | undefined>,
    default: undefined,
  },
});
const showReact = ref(false);
const reactHover = ref(false);
const hoverTimeOut = ref<any>();
const loveHover = ref(false);
const prizeHover = ref(false);
const adoptHover = ref(false);
const actionHover = ref(false);
const actionType = ref<PostActionType>();
onMounted(() => {
  actionType.value = props.action;
});
watch(reactHover, (hover) => {
  if (hover) {
    hoverTimeOut.value = setTimeout(() => {
      showReact.value = hover;
    }, 300);
  } else {
    showReact.value = hover;
  }
});
onBeforeUnmount(() => {
  if (hoverTimeOut.value) {
    clearTimeout(hoverTimeOut.value);
    hoverTimeOut.value = null;
  }
});
const onLiked = (like: PostActionType) => {
  actionType.value = like;
  if (like === 'PRIZE_IT') {
    testNotify();
  }
};
const onUnLiked = () => {
  hoverTimeOut.value = setTimeout(() => {
    actionType.value = undefined;
  }, 300);
  showReact.value = false;
};
const actionIcon = computed(() => {
  if (!actionType.value) {
    return '';
  }
  if (actionType.value == 'LOVE_IT') {
    return biHeartFill;
  } else if (actionType.value == 'PRIZE_IT') {
    return biGiftFill;
  } else if (actionType.value == 'ADOPT_IT') {
    return biHandbagFill;
  } else {
    return biHandIndexThumbFill;
  }
});
const actionText = computed(() => {
  if (!actionType.value) {
    return '';
  }
  if (actionType.value == 'LOVE_IT') {
    return 'I loved it';
  } else if (actionType.value == 'PRIZE_IT') {
    return 'I prized it';
  } else if (actionType.value == 'ADOPT_IT') {
    return 'I adopted it';
  } else {
    return 'I actioned it';
  }
});
const actionColor = computed(() => {
  if (!actionType.value) {
    return '';
  }
  if (actionType.value == 'LOVE_IT') {
    return 'pink';
  } else if (actionType.value == 'PRIZE_IT') {
    return 'amber-8';
  } else if (actionType.value == 'ADOPT_IT') {
    return 'green';
  } else {
    return 'blue';
  }
});
// test
const testNotify = () => {
  WeeToast(
    `
    <strong>Chanavee Bekaku</strong><br> Received a reward from Danial <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"/></svg>
    `,
    {
      caption: '5 Minutes ago',
      avatar: AvatarPlaceHolder128,
      position: 'right',
      color: 'primary',
      html: true,
      multiLine: true,
      hideClose: true,
    }
  );
};
</script>
