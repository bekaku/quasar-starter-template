<template>
  <q-btn
    class="text-capitalize app-text-link btn--no-hover"
    :ripple="false"
    :class="color"
    dense
    flat
    :label="label"
    :to="to"
    :href="href ? href : undefined"
    :target="external ? '_blank' : undefined"
    @mouseover="hover = true"
    @mouseleave="onMouseLeave"
  >
    <q-menu
      v-model="show"
      style="width: 350px"
      @hide="hover = false"
      @mouseleave="hover = false"
      cover
      anchor="center left"
    >
      <q-card>
        <profile-card
          avatar-image="http://192.168.7.249:8080/cdn/images/202206/9_1656492735469_83bd2a0841514c4fbb81c8f674026519.jpg"
          cover-image="http://192.168.7.249:8080/cdn/images/202207/9_1656661445570_8ded7c66943c4f69ac5db376236a7e09.jpg"
          :name="label"
          description="Software Engineer"
          height="85px"
          avatar-top="35px"
          avatar-size="48px"
          descriptionStyle="margin-top:5px"
          show-medal
        />
      </q-card>
    </q-menu>
  </q-btn>
  <medal-badge label="Silver medal" />
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import ProfileCard from '@/components/feed/ProfileCard.vue';
import MedalBadge from '@/components/feed/MedalBadge.vue';
defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'text-muted',
  },
  external: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
});
const show = ref(false);
const hover = ref(false);
const hoverTimeOut = ref<any>();
watch(hover, (newHover) => {
  if (newHover) {
    hoverTimeOut.value = setTimeout(() => {
      show.value = newHover;
    }, 1 * 1000);
  } else {
    show.value = newHover;
  }
});
onBeforeUnmount(() => {
  clearTo();
});
const clearTo = () => {
  if (hoverTimeOut.value) {
    clearTimeout(hoverTimeOut.value);
    hoverTimeOut.value = null;
  }
  hover.value = false;
};
const onMouseLeave = () => {
  if (!show.value) {
    clearTo();
  }
};
</script>
