<template>
  <!-- :maximized="!$q.screen.gt.xs" -->
  <q-dialog
    :model-value="show"
    @hide="onClose"
    @before-hide="$emit('on-before-hide')"
    :maximized="maximized"
    full-width
    full-height
  >
    <q-card class="text-white" dark>
      <q-toolbar>
        <template v-if="user && user.avatar?.thumbnail">
          <base-avatar :src="user.avatar.thumbnail" size="32px" />
        </template>

        <q-toolbar-title v-if="screen.gt.xs">
          {{
            `${t('base.photo')} ${slide + 1}/${
              files.length > 0 ? files.length : images.length > 0 ? images.length : 0
            }`
          }}
        </q-toolbar-title>
        <span v-else class="q-ml-xs text-caption">
          {{
            `${slide + 1}/${
              files.length > 0 ? files.length : images.length > 0 ? images.length : 0
            }`
          }}
        </span>

        <q-btn dense flat round :icon="biPlus" @click="zoomIn" />
        <q-btn dense flat round :icon="biDash" @click="zoomOut" />
        <template v-if="showArrow">
          <q-btn
            dense
            flat
            round
            :icon="biArrowLeft"
            :disable="slide == 0"
            @click="slide = slide - 1"
          />
          <q-btn
            dense
            flat
            round
            :icon="biArrowRight"
            :disable="slide == fileZise - 1"
            @click="slide = slide + 1"
          />
        </template>
        <q-space />
        <q-btn flat round :icon="biThreeDotsVertical">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="download">
                <q-item-section avatar>
                  <q-icon :name="biDownload" />
                </q-item-section>
                <q-item-section> {{ t('base.download') }}</q-item-section>
              </q-item>
              <template v-if="showDeleteImage && authenStore && authenStore.auth">
                <q-item clickable v-close-popup @click="deletePhoto">
                  <q-item-section avatar>
                    <q-icon :name="biTrash" />
                  </q-item-section>
                  <q-item-section> {{ t('base.delete') }}</q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat round :icon="biX" @click="onClose" />
      </q-toolbar>

      <div class="row items-center">
        <v-zoomer-gallery
          style="width: 100%; height: 90vh; background-color: black; cursor: pointer"
          ref="vZoomerRef"
          :list="items"
          v-model="slide"
        />
        <q-inner-loading :showing="loading" label-class="text-white" />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, onMounted } from 'vue';
import { useLang } from '@/composables/useLang';
import type { FileManagerDto, ImageDto, UserProfileDto } from '@/types/models';
import {
  biX,
  biThreeDotsVertical,
  biDownload,
  biTrash,
  biPlus,
  biDash,
  biArrowLeft,
  biArrowRight,
} from '@quasar/extras/bootstrap-icons';
import { useAuthenStore } from '@/stores/authenStore';
import { useBase } from '@/composables/useBase';
import { downloadURI, generateimageFileName } from '@/utils/fileUtils';

import BaseAvatar from '@/components/base/BaseAvatar.vue';
import FileManagerService from '@/api/FileManagerService';
import { useQuasar } from 'quasar';

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
  showDeleteImage: {
    type: Boolean,
    default: false,
  },
  maximized: {
    type: Boolean,
    default: true,
  },
  fetch: {
    type: Boolean,
    default: false,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Object as PropType<UserProfileDto>,
    default: () => null,
  },
  files: {
    type: Array as PropType<FileManagerDto[]>,
    default: () => [],
  },
  images: {
    type: Array as PropType<ImageDto[]>,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
});
const { screen } = useQuasar();
const { fethCdnData } = FileManagerService();
const vZoomerRef = ref();
const authenStore = useAuthenStore();
const emit = defineEmits(['on-close', 'update:showDialog', 'on-before-hide', 'on:delete']);
const { t } = useLang();
const { appConfirm } = useBase();
// const fullscreen = ref(false);
const slide = ref(0);
// const items = ref<string[]>([]);
const items = ref<any[]>([]);
const leftArrowPressed = ref(false);
const rightArrowPressed = ref(false);
const loading = ref(true);
onMounted(async () => {
  slide.value = props.selectedIndex;
  await setList();
  loading.value = false;
  document.addEventListener('keydown', handleKeyDown);
});
const show = computed({
  get: () => props.showDialog,
  set: (val) => emit('update:showDialog', val),
});
const handleKeyDown = (event: any) => {
  if (event.key === 'ArrowLeft') {
    leftArrowPressed.value = true;
    rightArrowPressed.value = false;
    if (slide.value > 0) {
      slide.value--;
    }
  } else if (event.key === 'ArrowRight') {
    leftArrowPressed.value = false;
    rightArrowPressed.value = true;
    if (slide.value < fileZise.value - 1) {
      slide.value++;
    }
  }
};
const onClose = () => {
  show.value = false;
  emit('on-close');
};
const fileZise = computed(() =>
  props.files && props.files.length
    ? props.files.length
    : props.images && props.images.length
      ? props.images.length
      : 0,
);
const setList = async () => {
  const list = props.files;
  const images = props.images;
  if (list && list.length > 0) {
    for (const f of list) {
      if (props.fetch) {
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
      if (props.fetch) {
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
  emit('on:delete', slide.value);
};
const zoomIn = () => {
  if (vZoomerRef.value) {
    vZoomerRef.value.zoomIn();
  }
};
const zoomOut = () => {
  if (vZoomerRef.value) {
    vZoomerRef.value.zoomOut();
  }
};
</script>
<style lang="scss" scoped>
.slide-img {
  max-width: 960px;
}
</style>
