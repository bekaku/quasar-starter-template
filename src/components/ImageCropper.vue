<template>
  <q-dialog
    v-model="show"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="min-width: 80%" flat bordered>
      <q-bar>
        <q-icon :name="biCrop" />
        <div>{{ title || '' }}</div>

        <q-space />
        <q-btn
          dense
          flat
          :icon="!maximizedToggle ? biFullscreen : biFullscreenExit"
          @click="maximizedToggle = !maximizedToggle"
        >
          <q-tooltip>{{
            !maximizedToggle ? t('maximize') : t('minimize')
          }}</q-tooltip>
        </q-btn>

        <q-btn dense flat :icon="biXSquare" @click="onClose">
          <q-tooltip>{{ t('base.close') }}</q-tooltip>
        </q-btn>
      </q-bar>
      <div class="row">
        <div class="col-12 col-md-5">
          <q-card-section>
            <q-file
              filled
              bottom-slots
              v-model="originalimagFile"
              :label="t('base.chooseFile')"
              counter
              max-files="1"
              accept=".jpg, .png, image/*"
              :max-file-size="1048576 * 10"
              @rejected="onRejected"
              @update:model-value="onFileAdded"
            >
              <template v-slot:prepend>
                <q-icon :name="biFileImage" />
              </template>
              <template v-slot:hint>
                {{
                  t('error.filesValidationSizeAndType', {
                    size: 10,
                    extension: '.jpg, .png',
                  })
                }}
              </template>
            </q-file>
          </q-card-section>
          <template v-if="originalimagFile">
            <q-card-section class="text-center">
              <q-avatar rounded size="275px" class="shadow-5">
                <div
                  class="cropper-img-preview"
                  style="overflow: hidden; width: 275px; height: 275px"
                ></div>
              </q-avatar>
            </q-card-section>
            <q-card-section class="q-gutter-sm text-center">
              <q-avatar size="128px" class="shadow-5">
                <div
                  class="cropper-img-preview"
                  style="overflow: hidden; width: 128px; height: 128px"
                ></div>
              </q-avatar>
              <q-avatar size="64px" class="shadow-5">
                <div
                  class="cropper-img-preview"
                  style="overflow: hidden; width: 64px; height: 64px"
                ></div>
              </q-avatar>
              <q-avatar size="32px" class="shadow-5">
                <div
                  class="cropper-img-preview"
                  style="overflow: hidden; width: 32px; height: 32px"
                ></div>
              </q-avatar>
            </q-card-section>

            <div class="q-pa-md">
              <q-btn
                :icon="biCheck"
                :label="t('base.okay')"
                class="full-width"
                color="positive"
                unelevated
                :loading="loading"
                @click="onOkay"
              />
            </div>
          </template>
        </div>
        <div class="col-12 col-md-7">
          <q-card-section>
            <div :class="!$q.dark.isActive ? 'bg-grey-1' : 'bg-grey-10'">
              <img
                ref="canvasImg"
                style="display: block; max-width: 100%; height: 550px"
                alt=""
              />
            </div>
          </q-card-section>
          <q-card-section v-if="originalimagFile" class="q-gutter-sm">
            <!--                                <q-btn dense label="Drag" flat @click="cropper.setDragMode('move')"/>-->
            <q-btn
              :icon="biZoomIn"
              dense
              :label="t('zoomIn')"
              flat
              @click="cropper.zoom(0.1)"
            />
            <q-btn
              :icon="biZoomOut"
              dense
              :label="t('zoomOut')"
              flat
              @click="cropper.zoom(-0.1)"
            />

            <q-btn
              :label="t('rotateLeft')"
              dense
              :icon="biArrowCounterclockwise"
              flat
              @click="cropper.rotate(-45)"
            />
            <q-btn
              :label="t('rotateRight')"
              dense
              :icon="biArrowClockwise"
              flat
              @click="cropper.rotate(45)"
            />

            <q-btn
              :label="t('flipHorizontal')"
              dense
              :icon="biArrowLeftRight"
              flat
              @click="flipHorizontal"
            />
            <q-btn
              :label="t('flipVorizontal')"
              dense
              :icon="biArrowsCollapse"
              flat
              @click="flipVertical"
            />
          </q-card-section>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { useLang } from 'src/composables/useLang';
import useBase from '@/composables/useBase';
import {
  biFullscreen,
  biXSquare,
  biCrop,
  biZoomIn,
  biZoomOut,
  biArrowClockwise,
  biArrowCounterclockwise,
  biArrowsCollapse,
  biArrowLeftRight,
  biCheck,
  biFileImage,
  biFullscreenExit,
} from '@quasar/extras/bootstrap-icons';
const icons = {
  biFullscreen,
  biXSquare,
  biCrop,
  biZoomIn,
  biZoomOut,
  biArrowClockwise,
  biArrowCounterclockwise,
  biArrowsCollapse,
  biArrowLeftRight,
  biCheck,
  biFileImage,
  biFullscreenExit,
};
export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
  emits: ['on-close', 'on-okay'],
  setup(props, { emit }) {
    const { t } = useLang();
    const { WeeToast } = useBase();
    const canvasImg = ref(null); // ref to <canvas ref="canvasImg" width="120" height="100"></canvas>
    const cropper = ref(null);
    const originalimagFile = ref(null);
    const horizontalScale = ref(1);
    const verticalScale = ref(1);
    const show = ref(false);
    const maximizedToggle = ref(false);
    const loading = ref(false);

    const onClose = () => {
      clearCropper();
      originalimagFile.value = null;
      emit('on-close');
      maximizedToggle.value = false;
    };
    const clearCropper = () => {
      if (cropper.value) {
        cropper.value.clear();
        cropper.value.destroy();
      }
    };
    const onInitCroper = () => {
      clearCropper();
      const options = {
        aspectRatio: 1,
        preview: '.cropper-img-preview',
        ready: function (/*e*/) {
          /* */
        },
        cropstart: function (/*e*/) {
          /* */
        },
        cropmove: function (/*e*/) {
          /* */
        },
        cropend: function (/*e*/) {
          /* */
        },
        crop: function (/*e*/) {
          /* */
        },
        zoom: function (/*e*/) {
          /* */
        },
      };
      cropper.value = new Cropper(canvasImg.value, options);
    };
    const onFileAdded = (file) => {
      if (file) {
        // originalimagFile.value = files[0];
        if (/^image\/\w+/.test(originalimagFile.value.type)) {
          canvasImg.value.src = URL.createObjectURL(originalimagFile.value);
          onInitCroper();
        } else {
          WeeToast('Please choose an image file.', { type: 'negative' });
        }
      }
    };

    const flipHorizontal = () => {
      if (cropper.value) {
        verticalScale.value = verticalScale.value * -1;
        cropper.value.scaleX(verticalScale.value);
      }
    };
    const flipVertical = (/*e*/) => {
      if (cropper.value) {
        horizontalScale.value = horizontalScale.value * -1;
        cropper.value.scaleY(horizontalScale.value);
      }
    };
    const blobToFile = (blob, originalFile) => {
      return new Promise((resolve) => {
        const file = new File([blob], originalFile.name, {
          lastModified: originalFile.lastModified,
          type: originalFile.type,
        });
        resolve(file);
      });
    };
    const onOkay = () => {
      if (cropper.value && cropper.value.cropped) {
        loading.value = true;
        cropper.value.getCroppedCanvas().toBlob(async (blob) => {
          const f = await blobToFile(blob, originalimagFile.value);
          loading.value = false;
          emit('on-okay', f);
          onClose();
        }, 'image/jpeg'); // image/png, image/jpeg
      }
    };
    const onRejected = (rejectedEntries) => {
      WeeToast(
        t('error.filesValidationFmt', { total: rejectedEntries.length }),
        { type: 'negative' }
      );
    };
    /*
    watchEffect(() => {
      show.value = props.dialog;
      console.log('watchEffect', props.url);
      // if (props.dialog && props.url) {

      //   onFileUrlChange(props.url);
      // }
    });
    */
    watch(
      () => props.dialog,
      (dialog) => {
        show.value = dialog;
      }
    );
    return {
      ...icons,
      t,
      canvasImg,
      onOkay,
      onInitCroper,
      originalimagFile,
      cropper,
      flipVertical,
      flipHorizontal,
      onFileAdded,
      show,
      onClose,
      onRejected,
      maximizedToggle,
      loading,
    };
  },
});
</script>
