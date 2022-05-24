<template>
  <q-card square flat class="bg-transparent q-pl-lg">
    <q-card-section>
      <div class="text-h6">{{ t('page.settingsPublicProfile') }}</div>
      <q-separator />
    </q-card-section>

    <q-card-section>
      <q-card>
        <!-- style="
            height: 150px;
            background: url(/social-cover-01.jpg) no-repeat;
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          " -->
        <q-card-section class="text-white bg-primary" style="height: 100px">
          <q-avatar
            size="100px"
            class="shadow-10 absolute-bottom"
            style="top: 20px; left: 25px"
          >
            <q-img
              spinner-color="white"
              :src="authenStore.auth?.avatar?.image"
              style="height: 100px; max-width: 100px"
            />
            <q-btn
              @click="onOpenCropper"
              flat
              round
              class="absolute"
              :icon="biPencilFill"
            >
              <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
            </q-btn>
          </q-avatar>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>

  <image-cropper
    :title="t('cropAvatar')"
    :dialog="dialog"
    @on-close="dialog = false"
    @on-okay="onOkay"
  />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useMeta } from 'quasar';
import { useAuthenStore } from 'stores/authenStore';
import { biPencilFill } from '@quasar/extras/bootstrap-icons';
import FileManagerService from 'src/api/FileManagerService';
import UserService from 'src/api/UserService';
import useBase from '@/composables/useBase';
const icons = {
  biPencilFill,
};
export default defineComponent({
  components: {
    ImageCropper: defineAsyncComponent(
      () => import('@/components/ImageCropper.vue')
    ),
  },
  setup() {
    const { t } = useLang();
    const { WeeLoader } = useBase();
    useMeta({
      title: t('page.settingsPublicProfile'),
    });
    const { uploadApi } = FileManagerService();
    const { updateUserAvatar } = UserService();
    const authenStore = useAuthenStore();
    const dialog = ref(false);

    const onOkay = async (f: any) => {
      WeeLoader();
      const response = await uploadApi(f);

      if (response && authenStore.auth) {
        //update avatar id to user
        await updateUserAvatar(response.id);
        //update user data in pinia store
        const authItem = authenStore.auth;
        if (authItem.avatar) {
          authItem.avatar.thumbnail = response.fileThumbnailPath;
          authItem.avatar.image = response.filePath;
        }
      }
      WeeLoader(false);
    };
    const onOpenCropper = () => {
      dialog.value = true;
    };
    return {
      t,
      authenStore,
      dialog,
      onOkay,
      onOpenCropper,
      ...icons,
    };
  },
});
</script>
