<template>
  <q-card flat class="bg-transparent">
    <q-card flat>
      <div
        :style="`height: ${height};
            background: url(${
              coverImage ? coverImage : '/cover.jpg'
            }), linear-gradient(to right, #000, #000);
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;`"
      />
      <div class="text-white absolute-center">
        <q-avatar :size="avatarSize" :style="{ top: avatarTop }" class="shadow-5">
          <q-img spinner-color="white" :src="avatarImage" />
        </q-avatar>
      </div>
    </q-card>
    <slot name="description">
      <q-card-section class="text-center" :style="descriptionStyle">
        <q-item dense>
          <q-item-section>
            <q-item-label class="text-weight-bold" lines="1">
              {{ name }}
            </q-item-label>
            <q-item-label caption>
              {{ description }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
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
</script>
