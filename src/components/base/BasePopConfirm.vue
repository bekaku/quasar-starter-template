<script setup lang="ts">
/*
<base-pop-confirm
        :title="t('base.deleteConfirm')"
        confirm-color="negative"
        @onChange="$emit('resend-approve',$event)"
      >
      </base-pop-confirm>
*/
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import BaseButton from './BaseButton.vue';
import type { AppColor } from 'src/types/common';

const { t } = useLang();
const { isDark } = useBase();

const {
  dark = false,
  showConfirm = true,
  disableConfirm = false,
  showCancel = true,
  confirmColor = 'primary',
  cancelColor = 'primary',
  width = '250px',
} = defineProps<{
  title?: string;
  width?: string;
  showConfirm?: boolean;
  disableConfirm?: boolean;
  confirmColor?: AppColor;
  labelConfirm?: string;
  showCancel?: boolean;
  dark?: boolean;
  labelCancel?: string;
  cancelColor?: AppColor;
}>();

const emit = defineEmits<{
  onChange: [boolean];
  onOkay: [void];
  onCancel: [void];
}>();
const onChange = (status: boolean) => {
  emit('onChange', status);
  if (status) {
    emit('onOkay');
  } else {
    emit('onCancel');
  }
};
</script>
<template>
  <q-menu :style="{ width }" :dark="dark || isDark">
    <div class="q-pa-md">
      <div class="q-mb-md">
        <slot>
          {{ title }}
        </slot>
      </div>
      <div class="q-mb-md text-center">
        <BaseButton
          v-if="showConfirm"
          :color="confirmColor"
          :disable="disableConfirm"
          :label="labelConfirm ? labelConfirm : t('base.okay')"
          v-close-popup
          @click="onChange(true)"
        />
        <BaseButton
         v-if="showCancel"
          class="q-ml-sm"
          flat
          :color="cancelColor"
          :label="labelCancel ? labelCancel : t('base.cancel')"
          v-close-popup
            @click="onChange(false)"
        />
      </div>
      <slot name="bottom" />
    </div>
  </q-menu>
</template>
