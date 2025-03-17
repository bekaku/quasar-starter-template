<script setup lang="ts">
/*
  <base-dialog
  v-if="modelValue"
    v-model="modelValue"
    title="post"
    @on-close="onClose"
    :persistent="false"
    transition-show="fade"
    transition-hide="fade"
    dialog-style="width: 756px; max-width: 80vw;"
  >
  </base-dialog>
*/
import {
  biArrowsAngleContract,
  biArrowsAngleExpand,
  biFile,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { ref } from 'vue';
import Ellipsis from './Ellipsis.vue';
import { useDevice } from 'src/composables/useDevice';

const {
  persistent = false,
  fullWidth = false,
  fullHeight = false,
  maximized = false,
  icon = biFile,
  transitionShow = 'fade', // fade, slide-down
  transitionHide = 'fade',
  canMaximized = false,
  autoClose = true,
  showToolbar = true,
  padding = true,
} = defineProps<{
  persistent?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  maximized?: boolean;
  canMaximized?: boolean;
  icon?: string;
  title?: string | undefined;
  transitionShow?: string;
  transitionHide?: string;
  width?: string;
  maxWidth?: string;
  dialogStyle?: string;
  autoClose?: boolean;
  showToolbar?: boolean;
  padding?: boolean;
}>();

const modelValue = defineModel<boolean>({ default: false });
const emit = defineEmits(['on-close', 'on-hide', 'on-before-hide']);
const { t } = useLang();
const { isDark } = useBase();
const { isSmallScreen } = useDevice();
const maximizeModel = ref(maximized);
const onClose = () => {
  emit('on-close');
  onCloseModel();
};
const onHide = () => {
  emit('on-hide');
  onCloseModel();
};
const onCloseModel = () => {
  if (autoClose) {
    modelValue.value = false;
  }
};
</script>
<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    :maximized="maximizeModel || (isSmallScreen && fullHeight && fullHeight)"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :full-width="fullWidth"
    :full-height="fullHeight"
    @hide="onHide"
    @before-hide="$emit('on-before-hide')"
  >
    <q-card v-bind="$attrs" :style="dialogStyle">
      <slot name="toolBar">
        <q-bar
          v-if="showToolbar"
          class="q-py-lg"
          :class="{ 'bg-grey-2': !isDark, 'bg-dark-900': isDark }"
        >
          <slot name="icon">
            <q-icon v-if="icon" :name="icon" />
          </slot>

          <div>
            <slot name="title">
              <Ellipsis v-if="title" :lines="1">
                {{ title }}
              </Ellipsis>
            </slot>
          </div>
          <q-space />
          <slot name="toolbarAction">
            <q-btn
              v-if="canMaximized"
              round
              flat
              :icon="!maximizeModel ? biArrowsAngleExpand : biArrowsAngleContract"
              @click="maximizeModel = !maximizeModel"
            >
              <q-tooltip>{{ !maximizeModel ? t('base.maximize') : t('base.minimize') }}</q-tooltip>
            </q-btn>
            <q-btn round flat :icon="biX" @click="onClose">
              <q-tooltip>{{ t('base.close') }}</q-tooltip>
            </q-btn>
          </slot>
        </q-bar>
      </slot>
      <div :class="{ 'q-pa-md': padding }">
        <slot />
      </div>
    </q-card>
  </q-dialog>
</template>
