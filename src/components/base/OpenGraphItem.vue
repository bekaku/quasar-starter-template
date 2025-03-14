<template>
  <q-card
    v-bind="$attrs"
    v-if="item && (item.image || item.domain || item.title || item.desc)"
    flat
  >
    <a v-if="!short" :href="item.url" target="_blank">
      <q-img
        v-if="item.image"
        spinner-color="white"
        :src="item.image"
        :ratio="16 / 9"
        :style="{ maxHeight: imageMaxHeight }"
      />
    </a>
    <q-item
      clickable
      :class="{
        'q-pl-none q-pt-none q-pb-none': short,
      }"
      class="bg-app-content-item"
      :href="item.url"
      target="_blank"
      :dense="short"
    >
      <q-item-section v-if="short && item.image" side>
        <q-img :src="item.image" :style="{ width: `${imageSize}` }" :ratio="4 / 3" />
      </q-item-section>
      <q-item-section>
        <q-item-label v-if="item.domain" :lines="textLines">
          {{ item.domain }}
        </q-item-label>
        <q-item-label v-if="item.title" :lines="textLines">
          {{ item.title }}
        </q-item-label>
        <q-item-label v-if="item.desc" caption :lines="!short ? descriptionLines : 1">
          {{ item.desc }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon :name="biBoxArrowUpRight" />
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script setup lang="ts">
import type { OgMeta } from '@/types/models';
import { biBoxArrowUpRight } from '@quasar/extras/bootstrap-icons';

withDefaults(
  defineProps<{
    item: OgMeta;
    short?: boolean;
    showBg?: boolean;
    textLines?: number;
    descriptionLines?: number;
    imageSize?: string;
    imageMaxHeight?: string;
  }>(),
  {
    short: false,
    showBg: true,
    textLines: 1,
    descriptionLines: 2,
    imageSize: '125px',
    imageMaxHeight: '250px',
  },
);
</script>
