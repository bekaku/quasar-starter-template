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
import { ref, onMounted } from 'vue';
import { useMeta } from 'quasar';
import ImageCropper from 'src/components/ImageCropper.vue';
import PatientService from '@/api/PatientService';
import { UserDto } from '@/types/models';
useMeta({
  title: 'Test Page',
});
const { findAllPatien } = PatientService();

const dialog = ref(false);
const items = ref<UserDto[]>([]);
const currentPage = ref(1);
const perpage = ref(10);
const onOkay = async (blobFile: any) => {
  console.log('onOkay', blobFile);
};
const onOpenCropper = () => {
  dialog.value = true;
};
onMounted(() => {
  fetchAll();
});

const fetchAll = async () => {
  const response = await findAllPatien(currentPage.value, perpage.value);
  console.log('findAllPatien', response);
  if (response) {
    items.value = response;
  }
};
</script>
