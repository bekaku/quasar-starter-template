<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService';
import type { FileManagerDto, ImageDto, UserProfileDto } from '@/types/models';
import { downloadURI, generateimageFileName } from '@/utils/fileUtil';
import {
  biX,
  biThreeDots,
  biDownload,
  biTrash,
  biPlus,
  biDash,
  biArrowLeft,
  biArrowRight,
} from '@quasar/extras/bootstrap-icons';
import type { SlideOptions, SwiperSlideChange } from '@/types/common';
import BaseSwiperSlides from '@/components/base/BaseSwiperSlides.vue';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { useAuthenStore } from 'src/stores/authenStore';
import BaseAvatar from './BaseAvatar.vue';
const {
  showDeleteImage = false,
  dark = true,
  fetch = false,
  showArrow = true,
  files = [],
  images = [],
  selectedIndex = 0,
  allowKeyboard = true,
  height = '90vh',
  width = '100%',
  closeable = true,
} = defineProps<{
  showDeleteImage?: boolean;
  fetch?: boolean;
  showArrow?: boolean;
  user?: UserProfileDto;
  files?: FileManagerDto[];
  images?: ImageDto[];
  selectedIndex?: number;
  allowKeyboard?: boolean;
  height?: string;
  width?: string;
  dark?: boolean;
  closeable?: boolean;
}>();
const emit = defineEmits<{
  onClose: [];
  onBeforeHide: [];
  onDelete: [index: number];
}>();
const baseImgViewSwiperRef =
  useTemplateRef<InstanceType<typeof BaseSwiperSlides>>('baseImgViewSwiperRef');
const { screen } = useQuasar();
const { t } = useLang();
const { appConfirm } = useBase();
const authenStore = useAuthenStore();
const { fethCdnData } = FileManagerService();
const slide = ref(0);
const items = ref<any[]>([]);
const leftArrowPressed = ref(false);
const rightArrowPressed = ref(false);
const loading = ref(true);

const slideOpts = ref<SlideOptions>({
  speed: 400,
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: false,
  pagination: false,
  initialSlide: selectedIndex,
  zoom: true,
});
onMounted(async () => {
  slide.value = selectedIndex;
  await setList();
  loading.value = false;
  if (allowKeyboard) {
    document.addEventListener('keydown', handleKeyDown);
  }
});
const fileZise = computed(() => (items.value ? items.value.length : 0));
const handleKeyDown = (event: any) => {
  if (event.key === 'ArrowLeft') {
    leftArrowPressed.value = true;
    rightArrowPressed.value = false;
    if (slide.value > 0) {
      onPrev();
    }
  } else if (event.key === 'ArrowRight') {
    leftArrowPressed.value = false;
    rightArrowPressed.value = true;
    if (slide.value < fileZise.value - 1) {
      onNext();
    }
  }
};
const setList = async () => {
  if (files && files.length > 0) {
    for (const f of files) {
      if (fetch) {
        const src = await fetchImage(f.filePath);
        if (src) {
          items.value.push(src);
        }
      } else {
        items.value.push(f.filePath);
      }
    }
  } else if (images && images.length > 0) {
    for (const img of images) {
      if (fetch) {
        const src = await fetchImage(img.image);
        if (src) {
          items.value.push(src);
        }
      } else {
        items.value.push(img.image);
      }
    }
  }

  return new Promise((resolve) => {
    resolve(true);
  });
};
const fetchImage = async (src: string) => {
  const res = await fethCdnData(src);
  if (res) {
    return new Promise((resolve) => {
      resolve(res);
    });
  } else {
    return new Promise((resolve) => {
      resolve(null);
    });
  }
};
const download = async () => {
  if (items.value.length > 0) {
    const f = items.value[slide.value];
    if (f) {
      downloadURI(f, generateimageFileName());
    }
  }
};
const deletePhoto = async () => {
  const confirm = await appConfirm(t('app.monogram'), t('base.deletePhotoConfirm'));
  if (!confirm) {
    return;
  }
  items.value.splice(slide.value, 1);
  emit('onDelete', slide.value);
  if (items.value.length == 0) {
    emit('onClose');
  }
};
const onSlideChange = (item: SwiperSlideChange) => {
  if (!loading.value && item) {
    slide.value = item.realIndex;
  }
};

const onNext = () => {
  if (baseImgViewSwiperRef.value) {
    baseImgViewSwiperRef.value.onNext();
  }
};
const onPrev = () => {
  if (baseImgViewSwiperRef.value) {
    baseImgViewSwiperRef.value.onPrev();
  }
};

const zoomIn = () => {
  if (baseImgViewSwiperRef.value) {
    baseImgViewSwiperRef.value.onZoomIn();
  }
};
const zoomOut = () => {
  if (baseImgViewSwiperRef.value) {
    baseImgViewSwiperRef.value.onZoomOut();
  }
};
const onClose = () => {
  emit('onClose');
};
</script>
<template>
  <!-- <q-dialog :model-value="modelValue" @hide="onClose" @before-hide="$emit('onBeforeHide')" :maximized="maximized" full-width full-height> -->
  <q-card :class="{ 'text-white': dark }" flat :dark>
    <slot name="toolbar">
      <q-toolbar>
        <template v-if="user && user.avatar?.thumbnail">
          <base-avatar :src="user.avatar.thumbnail" size="32px" />
        </template>

        <q-toolbar-title v-if="screen.gt.xs">
          {{ `${t('base.photo')} ${slide + 1}/${fileZise}` }}
        </q-toolbar-title>
        <span v-else class="q-ml-xs text-caption">
          {{ `${slide + 1}/${fileZise}` }}
        </span>

        <q-btn dense flat round :icon="biPlus" @click="zoomIn" />
        <q-btn dense flat round :icon="biDash" @click="zoomOut" />
        <template v-if="showArrow">
          <q-btn dense flat round :icon="biArrowLeft" :disable="slide == 0" @click="onPrev()" />
          <q-btn
            dense
            flat
            round
            :icon="biArrowRight"
            :disable="slide == fileZise - 1"
            @click="onNext()"
          />
        </template>
        <q-space />
        <q-btn flat round dense :icon="biThreeDots">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable @click="download">
                <q-item-section avatar>
                  <q-icon :name="biDownload" />
                </q-item-section>
                <q-item-section> {{ t('base.download') }}</q-item-section>
              </q-item>
              <template v-if="showDeleteImage && authenStore && authenStore.auth">
                <q-item v-close-popup clickable @click="deletePhoto">
                  <q-item-section avatar>
                    <q-icon :name="biTrash" />
                  </q-item-section>
                  <q-item-section> {{ t('base.delete') }}</q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn v-if="closeable" dense flat round :icon="biX" @click="onClose" />
      </q-toolbar>
    </slot>
    <div class="row items-center">
      <q-inner-loading v-if="loading" :showing="loading" label-class="text-white" />
      <base-swiper-slides
        ref="baseImgViewSwiperRef"
        :params="slideOpts"
        :style="{ height, width }"
        :class="{ 'bg-black': dark, 'bg-grey-2': !dark }"
        @on-slide-change="onSlideChange"
      >
        <swiper-slide v-for="(img, i) in items" :key="`base-img-view-${i}-${img}`">
          <div class="swiper-zoom-container">
            <q-img
              :style="{ maxWidth: width, maxHeight: height }"
              ratio="1"
              fit="scale-down"
              class="swiper-zoom-target"
              :src="img"
              :alt="`img-${i}`"
            />
          </div>
        </swiper-slide>
      </base-swiper-slides>
    </div>
  </q-card>
  <!-- </q-dialog> -->
</template>
<style lang="scss" scoped>
.slide-img {
  max-width: 960px;
}
</style>
