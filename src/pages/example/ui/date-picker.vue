<script setup lang="ts">
import BaseDatePicker from '@/components/base/BaseDatePicker.vue';
import BaseDate from '@/components/base/BaseDate.vue';
import BaseTimePicker from '@/components/base/BaseTimePicker.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { FORMAT_DATE14, getCurrentDateByFormat } from '@/utils/dateUtil';
import { ref } from 'vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Date time Picker | ${t('app.name')}`);
const d = ref(getCurrentDateByFormat(FORMAT_DATE14));
const pickTime = ref<string>('');
const dateRangeStart = ref<string>('2025-01-01');
const dateRangeEnd = ref<string>('2025-02-15');
const onUpdate = (v: string) => {
  console.log('onUpdate', v);
};
const onUpdateTime = (v: string) => {
  console.log('onUpdateTime', v);
};
const onUpdateDateRange = (v: string) => {
  console.log('onUpdateDateRange', v);
};
</script>

<template>
  <BasePage>
    <BaseCard title="Date time picker">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <BaseDatePicker
              v-model="d"
              label="Select Date"
              :auto-close="false"
              required
              @on-update="onUpdate"
            />
          </div>

          <div class="col-12 col-md-6 q-pa-md">
            <BaseDatePicker
              v-model:start="dateRangeStart"
              v-model:end="dateRangeEnd"
              color="warning"
              show-format-date
              label="Range"
              range
              @on-update-range="onUpdateDateRange"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseDate
              title="Inline"
              :subtitle="d"
              v-model="d"
              :auto-close="false"
              required
              @on-update="onUpdate"
            />

            <BaseDate
              title="Inline range"
              :subtitle="`${dateRangeStart} - ${dateRangeEnd}`"
              class="q-ml-md"
              v-model:start="dateRangeStart"
              v-model:end="dateRangeEnd"
              range
              @on-update="onUpdate"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseTimePicker
              v-model="pickTime"
              label="Select time"
              required
              @on-update="onUpdateTime"
            />
          </div>
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
