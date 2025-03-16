<script setup lang="ts">
import BaseImage from '@/components/base/BaseImage.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { getImgUrlFromFile } from '@/utils/fileUtil';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseImageCropper from 'src/components/base/BaseImageCropper.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseRadio from 'src/components/base/BaseRadio.vue';
import type { LabelValue } from 'src/types/common';
import { defineAsyncComponent, ref } from 'vue';
const BaseImageCropperDialog = defineAsyncComponent(
  () => import('@/components/base/BaseImageCropperDialog.vue'),
);
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Image Cropper | ${t('app.name')}`);
const showImageCroper = ref(false);
const cropedUrl = ref<string | undefined>('/images/no_picture.jpg');
const cropedFile = ref<any>();

const ratioSelected = ref<number>(1);
const ratioOptions: LabelValue<number>[] = [
  { label: '1', value: 1 },
  { label: '4/3', value: 4 / 3 },
  { label: '16/9', value: 16 / 9 },
];
const onCloseImageCropper = () => {
  showImageCroper.value = false;
};
const onDeleteFile = () => {
  cropedUrl.value = undefined;
  cropedFile.value = undefined;
};
const onCropImage = async (f: any) => {
  console.log('onCropImage', f);
  const imageUrl = await getImgUrlFromFile(f);
  if (imageUrl) {
    cropedUrl.value = imageUrl;
  }
  cropedFile.value = f;
};

const onCropImageEnd = (imageUrl: string) => {
  console.log('onCropImageEnd');
};
</script>

<template>
  <BasePage>
    <BaseCard title="Image Cropper" sub-title="Ratio">
      <BaseRadio v-model="ratioSelected" :items="ratioOptions" />
      <q-no-ssr>
        <BaseImageCropper
          initial-src="/images/no_picture.jpg"
          :ratio="ratioSelected"
          @on-close="onCloseImageCropper"
          @on-submit="onCropImage"
        />
      </q-no-ssr>
    </BaseCard>
    <BaseCard title="Image Cropper dialog">
      <q-card-section>
        <BaseButton :label="t('cropAvatar')" @click="showImageCroper = true" />
      </q-card-section>
      <q-card-section>
        <div v-if="cropedUrl" class="row q-gutter-md">
          <base-image :src="cropedUrl" :ratio="1" alt="1" style="height: 250px; max-width: 250px" />

          <base-image
            :src="cropedUrl"
            :ratio="4 / 3"
            alt="4/3"
            style="height: 250px; max-width: 250px"
          />

          <base-image
            :src="cropedUrl"
            :ratio="16 / 9"
            alt="16/9"
            style="height: 250px; max-width: 250px"
          />

          <base-image :src="cropedUrl" fit="cover" alt="contain">
            <div class="full-width">cover</div>
          </base-image>

          <base-image :src="cropedUrl" fit="contain" alt="contain">
            <div>contain</div>
          </base-image>

          <base-image :src="cropedUrl" fit="fill" alt="fill">
            <div>fill</div>
          </base-image>

          <base-image :src="cropedUrl" fit="scale-down" image-bg>
            <div>scale-down</div>
          </base-image>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseImageCropperDialog
      v-if="showImageCroper"
      v-model="showImageCroper"
      :title="t('cropAvatar')"
      @on-close="onCloseImageCropper"
      @on-submit="onCropImage"
      @on-cropend="onCropImageEnd"
    />
  </BasePage>
</template>
