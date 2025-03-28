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
      <q-card flat>
        <UserCard
          cover-image="https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          :avatar="{
            src: 'https://i.pravatar.cc/450',
          }"
          :name="label"
          description="Software Engineer"
          height="85px"
          avatar-top="35px"
          avatar-size="48px"
          :description-style="{ marginTop: '5px' }"
        />
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import UserCard from '../user/UserCard.vue';
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
