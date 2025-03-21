<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseSwiperSlides from '@/components/base/BaseSwiperSlides.vue';
import BaseRippleItem from '@/components/base/BaseRippleItem.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import type { SlideOptions } from '@/types/common';
import { biArrowLeft, biArrowRight } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseImage from 'src/components/base/BaseImage.vue';
import BasePage from 'src/components/base/BasePage.vue';
import { useDevice } from 'src/composables/useDevice';
import { useTemplateRef } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Swipper | ${t('app.name')}`);
const { isSmallScreen } = useDevice();
const testSwiperRef = useTemplateRef<InstanceType<typeof BaseSwiperSlides>>('testSwiperRef');
const items = [
  {
    id: 1,
    name: 'Cody Fisher',
    time: '12.30',
    new: 9,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
    message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?',
  },
  {
    id: 2,
    name: 'PrimeTek Team',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
    message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀',
  },
  {
    id: 3,
    name: 'Robert Fox',
    time: '12.30',
    new: 8,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n',
  },
  {
    id: 4,
    name: 'Esther Howard',
    time: '12.30',
    new: 1,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    message: 'Quick one, team! Anyone',
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    message: 'ust explored PrimeVue\'s themes',
  },
  {
    id: 6,
    name: 'Ralph Edwards',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
    message: 'PrimeVue is a game-changer, righ',
  },
  {
    id: 7,
    name: 'Darrell Steward',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
    message: 'Reflecting on PrimeVue\'s impact o',
  },
  {
    id: 8,
    name: 'PrimeTek Team',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
    message: 'Let\'s implement PrimeVue',
  },
  {
    id: 9,
    name: 'Cody Fisher',
    time: '12.30',
    new: 9,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
    message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?',
  },
  {
    id: 10,
    name: 'PrimeTek Team',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
    message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀',
  },
  {
    id: 11,
    name: 'Robert Fox',
    time: '12.30',
    new: 8,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n',
  },
  {
    id: 12,
    name: 'Esther Howard',
    time: '12.30',
    new: 1,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    message: 'Quick one, team! Anyone',
  },
  {
    id: 13,
    name: 'Darlene Robertson',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    message: 'ust explored PrimeVue\'s themes',
  },
  {
    id: 14,
    name: 'Ralph Edwards',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
    message: 'PrimeVue is a game-changer, righ',
  },
  {
    id: 15,
    name: 'Darrell Steward',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
    message: 'Reflecting on PrimeVue\'s impact o',
  },
  {
    id: 16,
    name: 'PrimeTek Team',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
    message: 'Let\'s implement PrimeVue',
  },
];
const defualtStyle = {
  minHeight: '100px',
};
const slideOpts: SlideOptions = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 4.7,
  spaceBetween: 5,
  centeredSlides: false,
  navigation: true,
  autoplay: false,
  // style: {
  //     '--swiper-navigation-color': '#00aba9',
  //     '--swiper-pagination-color': '#00aba9',
  // },
  pagination: true,
  paginationDynamic: true,
  paginationType: 'bullets',
  // direction: 'vertical',
  effect: 'slide',
  zoom: true,
};
const slideOptsVertical: SlideOptions = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 2.7,
  spaceBetween: 5,
  centeredSlides: false,
  navigation: false,
  autoplay: false,
  pagination: true,
  paginationDynamic: true,
  paginationType: 'bullets',
  direction: 'vertical',
  effect: 'slide',
  zoom: true,
};
</script>

<template>
  <BasePage>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-sm">
        <BaseCard title="Horizontal" style="min-height: 450px;">
          <q-card-section>
            <base-swiper-slides ref="testSwiperRef" :params="slideOpts">
              <swiper-slide v-for="(item, i) in items" :key="i">
                <q-card flat class="text-center" style="height: 150px">
                  <base-ripple-item>
                    <base-avatar rounded :src="item.image" size="56px"> </base-avatar>
                    <q-item>
                      <q-item-section>
                        <q-item-label lines="1">
                          {{ item.name }}
                        </q-item-label>
                        <q-item-label caption lines="1" class="q-text-caption">
                          {{ item.time }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </base-ripple-item>
                </q-card>
              </swiper-slide>

              <template #start> Slot start </template>
              <template #end>
                <div v-if="testSwiperRef" class="row justify-center q-gutter-md">
                  <BaseButton
                    flat
                    light
                    label="Prev"
                    :icon="biArrowLeft"
                    @click="testSwiperRef.onPrev()"
                  />
                  <BaseButton
                    flat
                    light
                    label="Next"
                    :icon="biArrowRight"
                    @click="testSwiperRef.onNext()"
                  />
                </div>
              </template>
            </base-swiper-slides>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-6 q-pa-sm">
        <BaseCard title="Virtical">
          <q-card-section>
            <base-swiper-slides :params="slideOptsVertical" style="height: 350px">
              <swiper-slide v-for="(item, i) in items" :key="`virtical-${i}`">
                <q-card flat class="text-center" style="height: 150px">
                  <base-ripple-item>
                    <base-avatar rounded :src="item.image" size="56px"> </base-avatar>
                    <q-item>
                      <q-item-section>
                        <q-item-label lines="1">
                          {{ item.name }}
                        </q-item-label>
                        <q-item-label caption lines="1" class="q-text-caption">
                          {{ item.time }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </base-ripple-item>
                </q-card>
              </swiper-slide>
            </base-swiper-slides>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-6 q-pa-sm">
        <BaseCard title="Card">
          <div class="row justify-center q-pa-md">
            <base-swiper-slides
              :params="{
                slidesPerView: 1,
                spaceBetween: 5,
                navigation: true,
                pagination: true,
                paginationDynamic: true,
                paginationType: 'bullets',
                effect: 'cards',
                speed: 800,
              }"
              style="height: 350px; width: 250px"
            >
              <swiper-slide v-for="(item, i) in items" :key="`card-${i}`">
                <q-card flat bordered class="text-center cursor-pointer" style="height: 300px">
                  <base-image :src="item.image" />
                  <q-item>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ item.name }}
                      </q-item-label>
                      <q-item-label caption lines="1" class="q-text-caption">
                        {{ item.time }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </swiper-slide>
            </base-swiper-slides>
          </div>
        </BaseCard>
      </div>
      <div class="col-12 col-md-6 q-pa-sm">
        <BaseCard title="Grid" style="min-height: 440px;">
          <q-card-section>
            <q-no-ssr>
              <base-swiper-slides
                :params="{
                  initialSlide: 0,
                  speed: 400,
                  slidesPerView: !isSmallScreen ? 5 : 2.5,
                  spaceBetween: 30,
                  pagination: true,
                  gridRows: 2,
                }"
                style="height: 250px"
              >
                <swiper-slide v-for="(item, i) in items" :key="`gird-row-${i}`">
                  <q-card flat class="text-center" style="height: 100px">
                    <base-ripple-item>
                      <base-avatar rounded :src="item.image" size="56px"> </base-avatar>
                      <q-item>
                        <q-item-section>
                          <q-item-label lines="1">
                            {{ item.name }}
                          </q-item-label>
                          <q-item-label caption lines="1" class="q-text-caption">
                            {{ item.time }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </base-ripple-item>
                  </q-card>
                </swiper-slide>
              </base-swiper-slides>
            </q-no-ssr>
          </q-card-section>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
