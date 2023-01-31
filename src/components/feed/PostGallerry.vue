<template>
  <div class="row">
    <template v-for="(item, index) in limitItems" :key="index">
      <div :class="getColWidth">
        <q-img
          class="bg-gray-1"
          :src="item.image"
          :placeholder-src="item.thumbnail"
          spinner-color="white"
          :ratio="4 / 3"
          no-native-menu
        >
          <div
            v-if="index == limitImage - 1 && getMoreNumber > 0"
            class="absolute-bottom text-subtitle1 full-height row items-center justify-center"
          >
            <div>+{{ getMoreNumber }}</div>
          </div>
        </q-img>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ImageDto } from '@/types/models';
const props = defineProps({
  items: {
    type: Array as PropType<ImageDto[]>,
    default: () => [],
  },
});
const limitImage = 6;
const getColWidth = computed(() => {
  return props.items.length === 1
    ? 'col-12'
    : props.items.length >= 3
    ? 'col-4'
    : 'col-6';
});
const getMoreNumber = computed(() =>
  props.items.length > limitImage ? props.items.length - limitImage : 0
);
const limitItems = computed(() =>
  props.items.length > 0 ? props.items.slice(0, limitImage) : []
);
</script>
