<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService';
import UserService from '@/api/UserService';
import SettingPersonal from '@/components/settings/SettingPersonal.vue';
import UserCard from '@/components/user/UserCard.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { biPencilFill } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import SettingLayout from 'src/components/settings/SettingLayout.vue';
import { useAuthenStore } from 'stores/authenStore';
import { defineAsyncComponent, ref } from 'vue';
const BaseImageCropperDialog = defineAsyncComponent(
  () => import('@/components/base/BaseImageCropperDialog.vue'),
);
useAppMeta();
const { t } = useLang();
const { appLoading } = useBase();
const { uploadApi } = FileManagerService();
const { updateUserAvatar, updateUserCover } = UserService();
const authenStore = useAuthenStore();
const dialog = ref(false);
const dialogCover = ref(false);
const coverPreviewImage = ref<string | undefined>(undefined);
const onOkay = async (f: any) => {
  appLoading();
  const response = await uploadApi(f);
  if (response && authenStore.auth && response.id) {
    // update avatar id to user
    await updateUserAvatar(response.id);
    // update user data in pinia store
    const authItem = authenStore.auth;
    if (authItem.avatar) {
      authItem.avatar.thumbnail = response.fileThumbnailPath;
      authItem.avatar.image = response.filePath;
    }
  }
  appLoading(false);
};
const onOpenCropper = () => {
  dialog.value = true;
};
const onOpenCropperCover = () => {
  dialogCover.value = true;
};
const onUploadCover = async (f: any) => {
  appLoading();
  const response = await uploadApi(f);
  if (response && authenStore.auth && response.id) {
    await updateUserCover(response.id);
    const authItem = authenStore.auth;
    authItem.cover = {
      thumbnail: response.fileThumbnailPath,
      image: response.filePath,
    };
  }
  appLoading(false);
};
const onCoverCropClose = () => {
  console.log('onCoverCropClose');
  coverPreviewImage.value = undefined;
  dialogCover.value = false;
};
</script>
<template>
  <SettingLayout>
    <template #content>
      <BaseCard>
        <UserCard
          v-if="authenStore.auth"
          :avatar-image="authenStore.auth?.avatar?.image"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          :description="t('app.name')"
          height="250px"
          avatar-top="110px"
          description-style="margin-top:35px"
        >
          <template #extra>
            <div class="text-white absolute-right q-pa-md">
              <BaseButton
                round
                unelevated
                color="pink"
                :icon="biPencilFill"
                @click="onOpenCropperCover"
              >
                <q-tooltip>{{ t('base.changeCover') }}</q-tooltip>
              </BaseButton>
            </div>
            <div class="text-white absolute-center">
              <div class="absolute-bottom" style="top: 55px">
                <BaseButton round :icon="biPencilFill" color="pink" @click="onOpenCropper">
                  <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                </BaseButton>
              </div>
            </div>
          </template>
        </UserCard>
      </BaseCard>
      <SettingPersonal />
    </template>

    <BaseImageCropperDialog
      v-if="dialog"
      v-model="dialog"
      :title="t('cropAvatar')"
      @on-submit="onOkay"
      @on-close="dialog = false"
    />
    <BaseImageCropperDialog
      v-if="dialogCover"
      v-model="dialogCover"
      :title="t('base.changeCover')"
      :ratio="16 / 9"
      @on-close="onCoverCropClose"
      @on-submit="onUploadCover"
    >
      <template #preview>
        <UserCard
          v-if="authenStore.auth && coverPreviewImage"
          :avatar-image="authenStore.auth?.avatar?.image"
          :cover-image="coverPreviewImage"
          :name="authenStore.loginedDisplay"
          :description="t('app.name')"
          height="250px"
          avatar-top="110px"
          avatar-flat
          flat
          description-style="margin-top:35px"
        />
      </template>
    </BaseImageCropperDialog>
  </SettingLayout>
</template>
