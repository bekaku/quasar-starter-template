<script setup lang="ts">
import type { AppColor } from '@/types/common';
import { useLang } from 'src/composables/useLang';
import { computed, ref } from 'vue';
const {
  autoClose = true,
  dateList = [],
  minDate,
  maxDate,
  range = false,
} = defineProps<{
  autoClose?: boolean;
  label?: string;
  minDate?: string | undefined; // yyy-mm-dd 2022-06-16
  maxDate?: string | undefined; // yyy-mm-dd 2022-06-16
  dateList?: string[];
  color?: AppColor | undefined;
  range?: boolean;
  title?: string | undefined;
  subtitle?: string | undefined;
}>();
const modelValue = defineModel<string | undefined | null>({ default: null });
const start = defineModel<string | undefined | null>('start', { default: null });
const end = defineModel<string | undefined | null>('end', { default: null });
const modelValueRange = ref<any>({ from: start.value, to: end.value });

const dateProxy = ref<any>(null);
const emit = defineEmits(['on-update', 'on-update-range', 'on-close']);
const limitDates = dateList?.map((item: any) => {
  return item.replaceAll('-', '/');
});

const { t, locale } = useLang();
const datePickerLocale = computed(() =>
  locale.value
    ? {
        days: t('date.days').split('_'),
        daysShort: t('date.dayShorts').split('_'),
        months: t('date.months').split('_'),
        monthsShort: t('date.monthShorts').split('_'),
        firstDayOfWeek: 1,
      }
    : undefined,
);
const options = (date: string) => {
  if (minDate && maxDate) {
    return date >= minDate.replaceAll('-', '/') && date <= maxDate.replaceAll('-', '/');
  } else if (minDate) {
    return date >= minDate.replaceAll('-', '/');
  } else if (maxDate) {
    return date <= maxDate.replaceAll('-', '/');
  }

  return true;
};
const onDateSelect = (value: any) => {
  if (dateProxy.value && autoClose) {
    dateProxy.value.hide();
  }
  emit('on-update', value);
};
const onDateRangeSelect = (value: any) => {
  if (value) {
    start.value = value?.from ? value.from : null;
    end.value = value?.to ? value.to : null;
  }
  emit('on-update-range', value);
};
const onClose = () => {
  emit('on-close');
};
</script>
<template>
  <template v-if="!range">
    <q-date
      v-model="modelValue"
      :title
      :subtitle
      mask="YYYY-MM-DD"
      :color
      today-btn
      :first-day-of-week="0"
      :locale="datePickerLocale"
      :options="dateList.length > 0 ? limitDates : options"
      @update:model-value="onDateSelect"
    >
      <div class="row items-center justify-end">
        <q-btn v-close-popup :label="t('base.close')" :color flat @click="onClose" />
      </div>
    </q-date>
  </template>
  <template v-else>
    <q-date
      v-model="modelValueRange"
      range
      :title
      :subtitle
      mask="YYYY-MM-DD"
      :color
      today-btn
      :first-day-of-week="0"
      :locale="datePickerLocale"
      :options="dateList.length > 0 ? limitDates : options"
      @update:model-value="onDateRangeSelect"
    >
      <div class="row items-center justify-end">
        <q-btn v-close-popup :label="t('base.close')" :color flat @click="onClose" />
      </div>
    </q-date>
  </template>
</template>
