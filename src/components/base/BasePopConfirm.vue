<template>
  <q-menu :style="{ width }" :dark="dark || isDark">
    <div class="q-pa-md">
      <div class="q-mb-md">
        <slot>
          {{ title }}
        </slot>
      </div>
      <div class="q-mb-md text-center">
        <q-btn
          v-if="showConfirm"
          no-caps
          :color="confirmColor"
          :disable="disableConfirm"
          :label="labelConfirm ? labelConfirm : t('base.okay')"
          @click="onChange(true)"
          push
          v-close-popup
        />
        <q-btn
          v-if="showCancel"
          no-caps
          @click="onChange(false)"
          class="q-ml-sm"
          flat
          :color="cancelColor"
          :label="labelCancel ? labelCancel : t('base.cancel')"
          v-close-popup
        />
      </div>
      <slot name="bottom" />
    </div>
  </q-menu>
</template>

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

const { t } = useLang();
const { isDark } = useBase();

withDefaults(
  defineProps<{
    title?: string;
    width?: string;
    showConfirm?: boolean;
    disableConfirm?: boolean;
    confirmColor?: string;
    labelConfirm?: string;
    showCancel?: boolean;
    dark?: boolean;
    labelCancel?: string;
    cancelColor?: string;
  }>(),
  {
    dark: false,
    showConfirm: true,
    disableConfirm: false,
    showCancel: true,
    confirmColor: 'primary',
    cancelColor: 'primary',
    width: '250px',
  },
);
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

<style scoped></style>
