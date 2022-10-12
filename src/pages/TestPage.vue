<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page padding>
        <q-card square flat class="bg-transparent">
          <q-card-section>
            <q-btn @click="onOpenCropper" label="Open"> </q-btn>
          </q-card-section>
        </q-card>

        <image-cropper
          title="Test"
          :dialog="dialog"
          @on-close="dialog = false"
          @on-okay="onOkay"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMeta } from 'quasar';
import ImageCropper from 'src/components/ImageCropper.vue';
useMeta({
  title: 'Test Page',
});
const dialog = ref(false);

const onOkay = async (blobFile: any) => {
  console.log('onOkay', blobFile);
};
const onOpenCropper = () => {
  dialog.value = true;
};
</script>
