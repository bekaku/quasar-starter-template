<template>
  <q-card square flat class="bg-transparent">
    <q-card-section>
      <div class="text-h6">{{ t('page.settingsPublicProfile') }}</div>
      <q-separator />
    </q-card-section>

    <q-card-section>
      <q-card>
        <q-card-section
          class="text-white"
          style="
            height: 150px;
            background: url(https://cdn.pixabay.com/photo/2021/07/11/10/39/fantasy-6403406_960_720.jpg)
              no-repeat fixed;
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          "
        >
          <q-avatar
            size="100px"
            class="shadow-10 absolute-bottom"
            style="top: 80px; left: 25px"
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
    :url="imageUrl"
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
    const authenStore = useAuthenStore();
    const dialog = ref(false);

    const onOkay = async (blobFile: any) => {
      WeeLoader();
      const response = await uploadApi(blobFile);
      console.log('uploadApi', response);
      WeeLoader(false);
    };
    const imageUrl = ref<string>('');
    const onOpenCropper = () => {
      imageUrl.value =
        'https://cdn.pixabay.com/photo/2022/03/28/14/37/boy-7097685_960_720.jpg';
      dialog.value = true;
    };
    return {
      t,
      authenStore,
      dialog,
      onOkay,
      onOpenCropper,
      imageUrl,
      ...icons,
    };
  },
});
</script>
