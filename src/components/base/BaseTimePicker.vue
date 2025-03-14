<script setup lang="ts">
import { biClock, biXCircleFill } from '@quasar/extras/bootstrap-icons';
import type { AppColor } from '@/types/common';
import { ref } from 'vue';
import { useLang } from 'src/composables/useLang';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
const {
  dense = true,
  disable = false,
  required = false,
  editMode = true,
} = defineProps<{
  label?: string;
  dense?: boolean;
  disable?: boolean;
  required?: boolean;
  color?: AppColor;
  editMode?: boolean;
}>();
const emit = defineEmits(['on-update']);
const modelValue = defineModel<string>();
const timeProxy = ref<any>(null);
const { t } = useLang();
const clear = () => {
  modelValue.value = '';
};
const onClosePicker = () => {
  if (timeProxy.value) {
    timeProxy.value.hide();
  }
  console.log('onClosePicker');
};
const onSelectd = (value: any) => {
  // onClosePicker();
  emit('on-update', value);
};
</script>
<template>
  <base-input
    v-if="editMode"
    v-model="modelValue"
    :required
    :label
    :disable="disable"
    outlined
    dense
    mask="time"
    :rules="['time']"
  >
    <template #append>
      <BaseButton :icon="biClock" flat dense class="cursor-pointer">
        <q-popup-proxy
          v-if="editMode"
          ref="timeProxy"
          transition-show="scale"
          transition-hide="scale"
          @hide="onClosePicker"
        >
          <q-time v-model="modelValue" @update:model-value="(value) => onSelectd(value)">
            <div class="row items-center justify-end">
              <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </BaseButton>
    </template>
    <template #after>
      <q-btn v-if="modelValue && editMode" flat round :icon="biXCircleFill" @click="clear" />
    </template>
    <template v-if="required && !modelValue && editMode && !disable" #hint>
      <span class="text-negative">
        {{ t('error.validateRequireChoose') }}
      </span>
    </template>
  </base-input>
  <q-field
    v-else
    :outlined="editMode"
    :borderless="!editMode"
    bottom-slots
    :label="label"
    stack-label
    :dense
    :disable="disable"
  >
    <template #prepend>
      <q-icon :name="biClock" :color />
    </template>
    <template #control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ modelValue }}
      </div>
    </template>
  </q-field>
</template>
