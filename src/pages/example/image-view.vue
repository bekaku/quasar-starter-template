<script setup lang="ts">
import FilesPreviewItem from '@/components/base/FilesPreviewItem.vue';
import FilesPreviewItemAlt from '@/components/base/FilesPreviewItemAlt.vue';
import BaseScrollArea from '@/components/base/BaseScrollArea.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import type { FileManagerDto } from '@/types/models';
import { computed, defineAsyncComponent, ref } from 'vue';
import FileView from '@/components/base/FileView.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
const PhotoView = defineAsyncComponent(() => import('@/components/base/PhotoView.vue'));
const PdfView = defineAsyncComponent(() => import('@/components/base/PdfView.vue'));
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Image View | ${t('app.name')}`);

const imageSelectIndex = ref<number>(0);
const showImageView = ref(false);
const imageItems = ref<FileManagerDto[]>([
  {
    id: 1,
    fileMime: 'image/jpeg',
    fileName: 'Img001.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 2,
    fileMime: 'image/jpeg',
    fileName: 'Img002.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 3,
    fileMime: 'image/jpeg',
    fileName: 'Img003.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 4,
    fileMime: 'image/jpeg',
    fileName: 'Img004.jpg',
    filePath:
      'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 5,
    fileMime: 'image/jpeg',
    fileName: 'Img005.jpg',
    filePath:
      'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 6,
    fileMime: 'image/jpeg',
    fileName: 'Img006.jpg',
    filePath:
      'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 7,
    fileMime: 'image/jpeg',
    fileName: 'Img007.jpg',
    filePath:
      'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 8,
    fileMime: 'image/jpeg',
    fileName: 'Img008.jpg',
    filePath:
      'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 9,
    fileMime: 'image/jpeg',
    fileName: 'Img009.jpg',
    filePath:
      'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 10,
    fileMime: 'image/jpeg',
    fileName: 'Img010.jpg',
    filePath:
      'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 11,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
  {
    id: 12,
    fileMime: 'image/jpeg',
    fileName: 'Img011.jpg',
    filePath:
      'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: true,
  },
]);

const showPdfView = ref(false);
const pdfSrc = ref<string>();
const pdfName = ref<string>();
const pdfItems = ref<FileManagerDto[]>([
  {
    id: 1,
    fileMime: 'application/pdf',
    fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
    filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    fileThumbnailPath: '',
    fileSize: '2 MB',
    isImage: false,
  },
]);

const showMixFiles = ref(false);
const fileMixImageSelectIndex = ref<number>(0);
const fileImageItemsForView = ref<FileManagerDto[]>([]);
const fileMixForView = ref<FileManagerDto>();
const mixItems = ref<FileManagerDto[]>(imageItems.value.concat(pdfItems.value));
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
                <files-preview-item
                  style="border-radius: 10px"
                  :item="item"
                  :index="i"
                  :show-delete="false"
                  show-tooltip
                  :use-thumbnail="false"
                  image-size="100%"
                  :show-name="false"
                  :show-size="false"
                  @on-click="onImgPreviewClick"
                >
                </files-preview-item>
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
    <photo-view
      v-if="showImageView"
      :show-dialog="showImageView"
      :files="imageItems"
      :selected-index="imageSelectIndex"
      :show-delete-image="false"
      :maximized="false"
      show-arrow
      @on-close="() => (showImageView = false)"
    >
    </photo-view>

    <pdf-view
      v-if="showPdfView && pdfSrc"
      :src="pdfSrc"
      v-model:show="showPdfView"
      :title="pdfName"
      @on-close="() => onClosePefView"
    ></pdf-view>

    <file-view
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
