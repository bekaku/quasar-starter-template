<script setup lang="ts">
import FilesPreviewItem from '@/components/base/BaseFilesPreviewItem.vue';
import FilesPreviewItemAlt from '@/components/base/BaseFilesPreviewItemAlt.vue';
import BaseScrollArea from '@/components/base/BaseScrollArea.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import type { FileManagerDto } from '@/types/models';
import { computed, defineAsyncComponent, ref } from 'vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import BaseImageView from 'src/components/base/BaseImageView.vue';
import { useTheme } from 'src/composables/useTheme';
import BasePdfView from '@/components/base/BasePdfView.vue';
import { imageItemsData, pdfItemsData } from 'src/libs/data';
import BaseButton from 'src/components/base/BaseButton.vue';
import { biCode } from '@quasar/extras/bootstrap-icons';
const BaseImageViewDialog = defineAsyncComponent(
  () => import('@/components/base/BaseImageViewDialog.vue'),
);
const BasePdfViewDialog = defineAsyncComponent(
  () => import('@/components/base/BasePdfViewDialog.vue'),
);
const BaseFileViewDialog = defineAsyncComponent(
  () => import('@/components/base/BaseFileViewDialog.vue'),
);
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Image View | ${t('app.name')}`);

const { isDark } = useTheme();
const imageSelectIndex = ref<number>(0);
const showImageView = ref(false);
const imageItems = ref<FileManagerDto[]>([...imageItemsData]);

const showPdfView = ref(false);
const pdfSrc = ref<string>();
const pdfName = ref<string>();
const pdfItems = ref<FileManagerDto[]>([...pdfItemsData]);

const showMixFiles = ref(false);
const fileMixImageSelectIndex = ref<number>(0);
const fileImageItemsForView = ref<FileManagerDto[]>([]);
const fileMixForView = ref<FileManagerDto>();
const mixItems = ref<FileManagerDto[]>([...imageItemsData, ...pdfItemsData]);
const onImgPreviewClick = async (index: number) => {
  console.log('onImgPreviewClick', index);
  imageSelectIndex.value = index;
  showImageView.value = true;
};
const onPdfPreviewClick = async (index: number) => {
  console.log('onPdfPreviewClick', index);
  const item = pdfItems.value[index];
  if (item) {
    pdfSrc.value = item.filePath;
    pdfName.value = item.fileName;
    showPdfView.value = true;
  }
};
const onImgPreviewClose = () => {
  imageSelectIndex.value = 0;
  showImageView.value = false;
};
const onDeleteImage = (index: number) => {
  console.log('onDeleteImage', index);
};
const onClosePefView = () => {
  pdfSrc.value = undefined;
  pdfName.value = undefined;
  showPdfView.value = false;
};

const onMixPreviewClick = async (index: number) => {
  console.log('onMixPreviewClick', index);
  showMixFiles.value = false;
  fileMixImageSelectIndex.value = 0;
  fileImageItemsForView.value = [];
  const file = mixItems.value[index];
  if (file) {
    if (file.isImage) {
      await setImagesFileView(file);
    }
    fileMixForView.value = file;
    showMixFiles.value = true;
  }
};
const getImageItems = computed(() => mixItems.value.filter((f) => f.isImage));
const setImagesFileView = (file: FileManagerDto) => {
  return new Promise((resolve) => {
    const index = getImageItems.value.findIndex((t) => t.id == file.id);
    if (index >= 0) {
      const list = getImageItems.value;
      for (const f of list) {
        if (f) {
          fileImageItemsForView.value.push(f);
        }
      }
      fileMixImageSelectIndex.value = index;
    }
    resolve(true);
  });
};
</script>

<template>
  <BasePage padding>
    <BaseCard title="Image Only">
      <template #end>
        <BaseButton
          href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/image-view.vue"
          target="_blank"
          :icon="biCode"
          flat
          round
        >
          <q-tooltip>View Source</q-tooltip>
        </BaseButton>
      </template>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6">
            <q-item-label header>Grid</q-item-label>
            <div class="row">
              <div
                class="col-4 col-md-3 q-pa-xs"
                v-for="(item, i) in imageItems"
                :key="`img-${i}-${item.fileName}`"
              >
              <div style="overflow: hidden;" class="rounded">
                <files-preview-item
                  :item="item"
                  :index="i"
                  :show-delete="false"
                  show-tooltip
                  hover-zoom
                  class="rounded"
                  :use-thumbnail="false"
                  :show-name="false"
                  :show-size="false"
                  @on-click="onImgPreviewClick"
                >
                </files-preview-item>
                   </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 q-px-md">
            <q-item-label header>List</q-item-label>
            <base-scroll-area height="310px">
              <files-preview-item-alt
                v-for="(itemAlt, iAlt) in imageItems"
                :key="`img-${iAlt}-${itemAlt.fileName}`"
                :item="itemAlt"
                :index="iAlt"
                clickable
                dense
                :show-delete="true"
                show-name
                show-size
                @on-click="onImgPreviewClick"
              >
              </files-preview-item-alt>
            </base-scroll-area>
          </div>
        </div>
      </q-card-section>
    </BaseCard>

    <BaseTextHeader title="Image Slide" />
    <BaseCard>
      <q-card-section>
        <q-no-ssr>
          <base-image-view
            :files="imageItems"
            :selected-index="imageSelectIndex"
            :dark="isDark"
            :show-delete-image="false"
            show-arrow
            height="350px"
            :closeable="false"
          />
        </q-no-ssr>
      </q-card-section>
    </BaseCard>

    <BaseCard title="Pdf View">
      <q-card-section>
        <div class="text-h6 q-mb-md">Pdf View</div>
        <div class="row">
          <div
            class="col-4 col-md-2 q-pa-xs"
            v-for="(pdf, pdfIndex) in pdfItems"
            :key="`impdfg-${pdfIndex}-${pdf.id}`"
          >
            <files-preview-item
              style="border-radius: 10px"
              :item="pdf"
              :index="pdfIndex"
              :show-delete="false"
              show-tooltip
              show-name
              show-size
              @on-click="onPdfPreviewClick"
            >
            </files-preview-item>
          </div>
        </div>
        <BaseTextHeader title="Pdf inline display" />
        <q-card flat bordered>
          <base-pdf-view
            src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            :closeable="false"
            title="compressed.tracemonkey-pldi-09.pdf"
          />
        </q-card>
      </q-card-section>
    </BaseCard>

    <BaseCard title="Mix item View">
      <q-card-section>
        <div class="row">
          <div
            class="col-4 col-md-2 q-pa-xs"
            v-for="(m, mIndex) in mixItems"
            :key="`impdfg-${mIndex}-${m.fileName}`"
          >
            <files-preview-item
              style="border-radius: 10px"
              :item="m"
              :index="mIndex"
              :show-delete="false"
              show-tooltip
              show-name
              show-size
              image-size="100%"
              :linesName="2"
              @on-click="onMixPreviewClick"
            >
            </files-preview-item>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <base-image-view-dialog
      v-if="showImageView"
      v-model="showImageView"
      :files="imageItems"
      :selected-index="imageSelectIndex"
      :show-delete-image="true"
      :maximized="false"
      show-arrow
      @on-delete="onDeleteImage"
      @on-close="onImgPreviewClose"
    />

    <base-pdf-view-dialog
      v-if="showPdfView && pdfSrc"
      v-model="showPdfView"
      :src="pdfSrc"
      :title="pdfName"
      @on-close="() => onClosePefView"
    />

    <BaseFileViewDialog
      v-if="showMixFiles && fileMixForView"
      :item="fileMixForView"
      :image-list="fileImageItemsForView"
      :select-index="fileMixImageSelectIndex"
      title="Images"
      :show-arrow="true"
      v-model:show="showMixFiles"
    />
  </BasePage>
</template>
