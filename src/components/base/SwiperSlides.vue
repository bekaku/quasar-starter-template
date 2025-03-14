<template>
  <q-no-ssr>
    <slot name="start" />
    <swiper-container
      ref="swiperElRef"
      v-if="params"
      v-bind="$attrs"
      :keyboard="params?.keyboard || false"
      :pagination="getPagination"
      :navigation="params?.navigation || false"
      :scrollbar="params?.scrollbar || false"
      :zoom="params?.zoom || false"
      :initial-slide="params?.initialSlide || 0"
      :lazy="params?.lazy || true"
      :style="
        params?.style || {
          '--swiper-navigation-color': '#2e86de',
          '--swiper-pagination-color': '#2e86de',
          '--swiper-navigation-size': '20px',
          '--swiper-navigation-top-offset': '50%',
          '--swiper-navigation-sides-offset': '5px',
        }
      "
      :autoplay="params?.autoplay || false"
      :speed="params?.speed || 300"
      :slides-per-view="params?.slidesPerView || 1"
      :space-between="params?.spaceBetween || 0"
      :centered-slides="params?.centeredSlides || false"
      :pagination-dynamic-bullets="params?.paginationDynamic || false"
      :pagination-type="params?.paginationType || 'bullets'"
      :direction="params?.direction || 'horizontal'"
      :loop="params?.loop || false"
      :effect="params?.effect || 'slide'"
      :allow-touch-move="params?.allowTouchMove != undefined ? params.allowTouchMove : true"
      :updateOnWindowResize="params?.updateOnWindowResize || false"
      :slidesPerGroup="params?.slidesPerGroup || 1"
      :pagination-clickable="params?.paginationClickable || true"
      :grid-rows="params?.gridRows || 1"
      @swiperslidechange="onSlideChange"
    >
      <slot />
    </swiper-container>
    <slot name="end" />
  </q-no-ssr>
</template>
<script setup lang="ts">
import { PropType, ref, onMounted, watch, computed, useTemplateRef } from 'vue';
import type { SlideOptions, SlidePaginationy } from '@/types/common';
// import { register } from 'swiper/element/bundle';
// register();
const { params, max = 0 } = defineProps<{
  params: SlideOptions;
  max?: number;
}>();
const currentIndex = defineModel('currentIndex', { type: Number, default: 0 });
const swiperElRef = useTemplateRef<any>('swiperElRef');
const getPagination = computed(() => {
  let initPagination: SlidePaginationy | undefined;
  if (params?.pagination != undefined) {
    if (typeof params?.pagination === 'boolean') {
      initPagination = {
        enabled: params?.pagination,
      };
    } else {
      initPagination = params?.pagination;
    }
  }
  return initPagination;
});
const onSlideChange = (e: any) => {};
const onNext = () => {
  if (swiperElRef.value) {
    swiperElRef.value.swiper.slideNext();
  }
};
const onPrev = () => {
  if (swiperElRef.value) {
    swiperElRef.value.swiper.slidePrev();
  }
};
defineExpose({
  onNext,
  onPrev,
});
</script>
