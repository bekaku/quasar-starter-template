<script setup lang="ts">
import {
  biCreditCard,
  biCurrencyDollar,
  biGraphUp,
  biMusicNote,
  biPeople,
} from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
import BaseAvatar from 'src/components/base/BaseAvatar.vue';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseDatePicker from 'src/components/base/BaseDatePicker.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTabs from 'src/components/base/BaseTabs.vue';
import ChartArea from 'src/components/chart/ChartArea.vue';
import ChartSparklines from 'src/components/chart/ChartSparklines.vue';
import SkeletonCard from 'src/components/skeleton/SkeletonCard.vue';
import { useTheme } from 'src/composables/useTheme';
import { useDevice } from 'src/composables/useDevice';
import type { ISeriresCategories } from 'src/types/chart';
import type { LabelValue } from 'src/types/common';
import { onMounted, ref } from 'vue';
useMeta({
  title: 'Index Page',
});
const { isSmallScreen } = useDevice();
const dateRangeStart = ref<string>('2025-01-01');
const dateRangeEnd = ref<string>('2025-02-15');
const toggleModel = ref<string>('overview');
const { isDark } = useTheme();
const showChart = ref<boolean>(false);
onMounted(() => {
  setTimeout(() => {
    showChart.value = true;
  }, 1500);
});
const statisticItems = ref<LabelValue<string>[]>([
  {
    label: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: biCurrencyDollar,
  },
  {
    label: 'Subscriptions',
    value: '+2350',
    description: '+180.1% from last month',
    icon: biPeople,
  },
  {
    label: 'Sales',
    value: '+12,234',
    description: '+19% from last month',
    icon: biCreditCard,
  },
  {
    label: 'Active Now',
    value: '+573',
    description: '+201 since last hour',
    icon: biGraphUp,
  },
]);
const recentSalseItems = ref<LabelValue<string>[]>([
  {
    label: 'Olivia Martin',
    value: '+$1,999.00',
    description: 'olivia.martin@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
  },
  {
    label: 'Jackson Lee',
    value: '+$39.00',
    description: 'jackson.lee@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar3.png',
  },
  {
    label: 'Isabella Nguyen',
    value: '+$299.00',
    description: 'isabella.nguyen@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar4.png',
  },
  {
    label: 'William Kim',
    value: '+$99.00',
    description: 'will@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png',
  },
  {
    label: 'Sofia Davis',
    value: '+$39.00',
    description: 'sofia.davis@email.com',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
  },
]);
const chartData: ISeriresCategories = {
  categories: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  series: [
    {
      name: 'Access',
      data: [32, 26, 57, 21, 8, 6, 14, 39, 10, 7, 9, 25],
    },
    {
      name: 'Post',
      data: [10, 8, 30, 21, 27, 10, 9, 40, 20, 10, 50, 12],
    },
    {
      name: 'Repost',
      data: [8, 10, 15, 21, 4, 15, 10, 50, 8, 0, 9, 25],
    },
    {
      name: 'Comment',
      data: [11, 20, 12, 14, 0, 10, 51, 22, 30, 10, 31, 11],
    },
    {
      name: 'Feel',
      data: [20, 10, 40, 16, 0, 5, 19, 1, 5, 0, 1, 4],
    },
    {
      name: 'Share',
      data: [1, 10, 11, 21, 17, 36, 51, 30, 15, 24, 56, 8],
    },
    {
      name: 'Read',
      data: [75, 38, 25, 70, 3, 2, 45, 35, 9, 6, 11, 24],
    },
    {
      name: 'Learn',
      data: [22, 0, 3, 2, 45, 11, 31, 20, 22, 10, 12, 21],
    },
    {
      name: 'Reward',
      data: [30, 1, 13, 1, 0, 0, 3, 0, 3, 0, 20, 15],
    },
  ],
};
const sparkLineItems = [
  {
    label: 'Revenue Status',
    description: '12.030',
    value: '27%',
    color: '#23d160',
    bg: 'green-1',
    series: [
      {
        name: 'status',
        data: [10000, 14000, 20000, 16000, 18000, 20000, 16000, 14500, 18000],
      },
    ],
    categories: ['status'],
  },
  {
    label: 'Page View',
    description: '5592',
    value: '12%',
    color: '#fb923c',
    bg: 'orange-1',
    series: [
      {
        name: 'view',
        data: [5000, 7500, 9000, 8500, 7000, 6000, 8000, 9500, 7200],
      },
    ],
    categories: ['view'],
  },
  {
    label: 'Bounce Rate',
    description: '55.56%',
    value: '22%',
    color: '#f87171',
    bg: 'red-1',
    series: [
      {
        name: 'rate',
        data: [28000, 25000, 27000, 24000, 23000, 26000, 25000, 22000, 20000],
      },
    ],
    categories: ['rate'],
  },
  {
    label: 'Product Sale Rate',
    description: '12.56%',
    value: '17%',
    color: '#8b5cf6',
    bg: 'purple-2',
    series: [
      {
        name: 'sale',
        data: [15000, 12000, 18000, 22000, 14000, 11000, 25000, 20000, 17000],
      },
    ],
    categories: ['sale'],
  },
];
</script>
<template>
  <BasePage scroll-event show-to-top>
    <BaseCard
      title="Dashboard"
      :bordered="false"
      flat
      sub-title="Top picks for you. Updated daily."
      :icon="biMusicNote"
    >
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-8" :class="{ 'q-pr-md': !isSmallScreen }">
            <BaseTabs
              v-model="toggleModel"
              :full-width="isSmallScreen"
              :items="[
                { label: 'Overview', value: 'overview' },
                { label: 'Analytics', value: 'analytics' },
                { label: 'Reports', value: 'reports' },
              ]"
              align="left"
            />
          </div>
          <div class="col-12 col-md-4" :class="{ 'q-pt-md': isSmallScreen }">
            <BaseDatePicker
              v-model:start="dateRangeStart"
              v-model:end="dateRangeEnd"
              :clearable="false"
              show-format-date
              label="Range"
              range
            >
              <template #after>
                <BaseButton label="Download" :color="isDark ? 'grey-9' : 'dark'" />
              </template>
            </BaseDatePicker>
          </div>
        </div>
      </q-card-section>

      <div class="row" :class="{ 'q-mb-md': isSmallScreen }">
        <div v-for="(item, index) in statisticItems" :key="index" class="col-12 col-md-3 " :class="{ 'q-pa-md': !isSmallScreen, 'q-px-md q-py-sm': isSmallScreen }">
          <BaseCard :flat="false" :margin="false">
            <q-item>
              <q-item-section>
                <q-item-label class="text-subtitle1"> {{ item.label }} </q-item-label>
                <q-item-label class="text-h5 text-weight-bold"> {{ item.value }} </q-item-label>
                <q-item-label caption class="text-caption">
                  {{ item.description }}
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-icon :name="item.icon" size="18px" />
              </q-item-section>
            </q-item>
          </BaseCard>
        </div>
      </div>
      <div class="q-px-md">
        <BaseCard>
          <div class="row">
            <!-- index < sparkLineItems.length - 1 ? '1px solid var(--color-zinc-200)' : 'none', -->
            <div
              v-for="(item, index) in sparkLineItems"
              :key="index"
              class="col-12 col-md-3"
              :style="{
                borderRight:
                  !isSmallScreen && (index < sparkLineItems.length - 1) ? '1px solid var(--color-zinc-200)' : 'none',
              }"
            >
              <q-item>
                <q-item-section>
                  <q-item-label> {{ item.label }} </q-item-label>
                  <q-item-label>
                    {{ item.description }}
                    <q-badge :color="item.bg" :style="{ color: item.color }">{{
                      item.value
                    }}</q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-no-ssr>
                    <ChartSparklines
                      style="width: 155px"
                      height="75"
                      :chart-id="`sparkline-area-${index}`"
                      :stroke-width="1"
                      strokestyle="smooth"
                      :colors="[item.color]"
                      :series="item.series"
                      :categories="item.categories"
                      :dark="isDark"
                    />
                  </q-no-ssr>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </BaseCard>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-px-md">
          <BaseCard title="Overview" :flat="false">
            <q-card-section>
              <SkeletonCard height="200px" v-if="!showChart" />
              <Transition>
                <q-no-ssr>
                  <ChartArea
                    v-if="showChart"
                    class="q-my-sm"
                    chart-id="chart-bar"
                    height="350"
                    type="bar"
                    :colors="['#64748B', '#94A3B8', '#CBD5E1']"
                    :series="chartData.series.slice(3, 6)"
                    :categories="chartData.categories"
                    strokestyle="smooth"
                    :label-rotate="!isSmallScreen ? 0 : -45"
                    :xaxis-tickamount="4"
                    :dark="isDark"
                  />
                </q-no-ssr>
              </Transition>
            </q-card-section>
          </BaseCard>
        </div>
        <div class="col-12 col-md-4 q-px-md">
          <BaseCard
            title="Recent Sales"
            sub-title="You made 265 sales this month."
            :flat="false"
            style="min-height: 480px"
          >
            <q-list>
              <q-item v-for="(item, index) in recentSalseItems" :key="index">
                <q-item-section avatar>
                  <BaseAvatar :src="item.avatar || '/images/no_picture_thumb.jpg'" size="40px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ item.label }} </q-item-label>
                  <q-item-label caption>
                    {{ item.description }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top class="text-h6 q-text-black text-weight-bold">
                  {{ item.value }}
                </q-item-section>
              </q-item>
            </q-list>
          </BaseCard>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>
<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
