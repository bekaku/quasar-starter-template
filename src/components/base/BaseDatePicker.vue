<script setup lang="ts">
import { biCalendarWeek, biXCircleFill } from '@quasar/extras/bootstrap-icons';
import { FORMAT_DATE5 } from 'src/utils/dateUtil';
import type { AppColor } from '@/types/common';
import { convertDateFormatToThai } from '@/utils/dateUtil';
import { ref } from 'vue';
import { useLang } from 'src/composables/useLang';
import { useBase } from 'src/composables/useBase';
import BaseDate from './BaseDate.vue';
const {
  autoClose = true,
  dateList = [],
  dense = true,
  disable = false,
  required = false,
  editMode = true,
  minDate,
  maxDate,
  range = false,
  showFormatDate = false,
  clearable = false,
  formatDateText = FORMAT_DATE5,
} = defineProps<{
  autoClose?: boolean;
  label?: string;
  minDate?: string; // yyy-mm-dd 2022-06-16
  maxDate?: string; // yyy-mm-dd 2022-06-16
  dateList?: string[];
  dense?: boolean;
  disable?: boolean;
  required?: boolean;
  color?: AppColor;
  editMode?: boolean;
  range?: boolean;
  showFormatDate?: boolean;
  clearable?: boolean;
  formatDateText?: string;
  title?: string;
  subtitle?: string;
}>();
const modelValue = defineModel<string | undefined | null>({ default: null });
const start = defineModel<string | undefined | null>('start', { default: null });
const end = defineModel<string | undefined | null>('end', { default: null });
const modelValueRange = ref<any>({ from: start.value, to: end.value });
const { appFormatDate } = useBase();

const dateProxy = ref<any>(null);
const dateRangeProxy = ref<any>(null);
const emit = defineEmits(['on-update', 'on-update-range']);

const { t } = useLang();
const clear = () => {
  modelValue.value = '';
  start.value = '';
  end.value = '';
  modelValueRange.value = null;
};
const onDateSelect = (value: any) => {
  if (dateProxy.value && autoClose) {
    dateProxy.value.hide();
  }
  emit('on-update', value);
};
const onDateRangeSelect = (value: any) => {
  emit('on-update-range', value);
};
// const onOpenPicker = () => {
//   if (dateProxy.value) {
//     dateProxy.value.show();
//   }
// }
const getFormarText = (dateString: string | undefined | null) => {
  if (!dateString) {
    return;
  }
  return appFormatDate(dateString, formatDateText);
};
</script>
<template>
  <q-field
    v-bind="$attrs"
    :outlined="editMode"
    :borderless="!editMode"
    bottom-slots
    :label="label"
    stack-label
    :dense
    :disable="disable"
    class="cursor-pointer"
  >
    <template #label>
      <slot name="label">
        {{ label }} <template v-if="required"><span class="text-negative">*</span></template>
      </slot>
    </template>
    <template v-if="!range">
      <q-popup-proxy
        v-if="editMode"
        ref="dateProxy"
        transition-show="scale"
        transition-hide="scale"
      >
        <BaseDate
          v-model="modelValue"
          :title
          :subtitle
          :min-date
          :max-date
          :date-list
          :color
          @on-update="onDateSelect"
        />
      </q-popup-proxy>
    </template>
    <template v-else>
      <q-popup-proxy
        v-if="editMode"
        ref="dateRangeProxy"
        transition-show="scale"
        transition-hide="scale"
      >
        <BaseDate
          v-model:start="start"
          v-model:end="end"
          :title
          :subtitle
          range
          :color
          @on-update-range="onDateRangeSelect"
        />
      </q-popup-proxy>
    </template>
    <template #control>
      <div class="self-center full-width no-outline" tabindex="0">
        <template v-if="!showFormatDate">
          {{
            !range
              ? convertDateFormatToThai(modelValue)
              : `${start ? convertDateFormatToThai(start) : ''}-${
                  end ? convertDateFormatToThai(end) : ''
                }`
          }}
        </template>
        <template v-else>
          {{
            !range
              ? getFormarText(modelValue)
              : `${start ? getFormarText(start) : ''} - ${end ? getFormarText(end) : ''}`
          }}
        </template>
      </div>
    </template>
    <template #prepend>
      <q-icon :name="biCalendarWeek" :color />
    </template>
    <template #after>
      <slot name="after">
        <q-btn
          v-if="clearable && (modelValue || (start && end)) && editMode"
          flat
          round
          :icon="biXCircleFill"
          @click="clear"
        />
      </slot>
    </template>
    <template v-if="required && !modelValue && editMode && !disable" #hint>
      <span class="text-negative">
        {{ t('error.validateRequireChoose') }}
      </span>
    </template>
  </q-field>
</template>
