<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import ChartArea from 'src/components/chart/ChartArea.vue';
import ChartPie from 'src/components/chart/ChartPie.vue';
import ChartRadar from 'src/components/chart/ChartRadar.vue';
import ChartRadial from 'src/components/chart/ChartRadial.vue';
import ChartSparklines from 'src/components/chart/ChartSparklines.vue';
import { useBase } from 'src/composables/useBase';
import type { ISeriresCategories } from 'src/types/chart';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Charts | ${t('app.name')}`);
const { isDark } = useBase();
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
      data: [1, 0, 2, 4, 0, 0, 1, 2, 0, 0, 1, 11],
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
const chartData2: ISeriresCategories = {
  categories: ['January', 'February', 'March', 'April', 'May', 'June'],
  series: [
    {
      name: 'Access',
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: 'Post',
      data: [20, 30, 40, 80, 20, 80],
    },
    {
      name: 'Repost',
      data: [44, 76, 78, 13, 43, 10],
    },
  ],
};

const appleStockPrices: ISeriresCategories = {
  categories: ['AAPL'],
  series: [
    {
      name: 'AAPL',
      data: [
        1382.54, 1285.23, 1688.76, 1090.12, 1307.65, 1285.98, 1309.34, 1311.56, 1393.24, 1300.87,
        1188.98, 1091.45, 1193.67, 1335.23, 1302.87, 1370.98, 1103.34, 1295.78, 817.34, 1395.87,
      ],
    },
  ],
};

const simpleSeries: number[] = [44, 55, 41, 37, 22, 43, 21];
const simpleCategories: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
</script>
<template>
  <BasePage>
    <BaseCard class="q-my-md" title="Radial">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartRadial
                chart-id="radial-1"
                :series="simpleSeries.slice(0, 3)"
                :categories="simpleCategories.slice(0, 3)"
                legend-position="right"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartRadial
                chart-id="radial-2"
                height="250"
                val-unit="%"
                :colors="['#8D6E63']"
                :series="simpleSeries.slice(0, 1)"
                :categories="simpleCategories.slice(0, 1)"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartRadial
                chart-id="radial-3"
                semi
                stoke-line-cap="square"
                :start-angle="-90"
                :end-angle="90"
                :colors="['#647C64']"
                :series="simpleSeries.slice(1, 2)"
                :categories="simpleCategories.slice(1, 2)"
                :show-legend="false"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartRadial
                chart-id="radial-4"
                val-unit="%"
                :colors="['#8E8CD8']"
                :start-angle="-180"
                :end-angle="360"
                :show-legend="false"
                :grid-padding="{
                  bottom: -100,
                }"
                :series="simpleSeries.slice(2, 3)"
                :categories="simpleCategories.slice(2, 3)"
              />
            </q-no-ssr>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard class="q-my-md" title="Sparklines">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartSparklines
                height="100"
                chart-id="sparkline-area"
                :stroke-width="1"
                strokestyle="smooth"
                :colors="['#9E9E9E']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartSparklines
                height="100"
                chart-id="sparkline-area-2"
                :stroke-width="1"
                strokestyle="straight"
                :colors="['#607D8B']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartSparklines
                height="100"
                chart-id="sparkline-line"
                type="line"
                :stroke-width="3"
                :colors="['#607D8B']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-3 q-pa-sm">
            <q-no-ssr>
              <ChartSparklines
                height="100"
                chart-id="sparkline-bar"
                type="bar"
                :stroke-width="1"
                :colors="['#8D6E63']"
                :series="appleStockPrices.series"
                :categories="appleStockPrices.categories"
              />
            </q-no-ssr>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard class="q-my-md" title="Radar">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6">
            <q-no-ssr>
              <ChartRadar
                chart-id="chart-radar"
                height="350"
                :markers="3"
                :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
                :series="chartData2.series"
                :categories="chartData2.categories"
              />
            </q-no-ssr>
          </div>
          <div class="col-12 col-md-6">
            <q-no-ssr>
              <ChartRadar
                chart-id="chart-radar-2"
                height="350"
                :markers="0"
                show-data-labels
                :colors="['#4E342E']"
                :grid-colors="!isDark ? ['#f8f8f8', '#fff'] : ['#383a42', '#717886']"
                :series="chartData2.series.slice(0, 1)"
                :categories="chartData2.categories"
              />
            </q-no-ssr>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard title="Area">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-sm">
          <q-no-ssr>
            <ChartArea
              class="q-my-sm"
              chart-id="chart-area"
              height="350"
              palette="palette1"
              type="area"
              :stroke-width="2"
              :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
              :series="chartData.series.slice(0, 3)"
              :categories="chartData.categories"
              strokestyle="smooth"
              :label-rotate="-45"
              show-toolbar
              zoom
            />
          </q-no-ssr>
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <q-no-ssr>
            <ChartArea
              class="q-my-sm"
              chart-id="chart-area-2"
              height="350"
              type="area"
              :stroke-width="2"
              :colors="['#8D6E63', '#9E9E9E', '#607D8B']"
              :series="chartData.series.slice(0, 3)"
              :categories="chartData.categories"
              strokestyle="straight"
              :xaxis-tickamount="3"
            />
          </q-no-ssr>
        </div>
      </div>
    </BaseCard>
    <BaseCard class="q-my-md" title="Line">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-sm">
          <q-no-ssr>
            <ChartArea
              class="q-my-sm"
              chart-id="chart-line"
              height="350"
              palette="palette1"
              type="line"
              :series="chartData.series.slice(6, 9)"
              :categories="chartData.categories"
              strokestyle="straight"
              :label-rotate="-45"
              :stroke-width="3"
            />
          </q-no-ssr>
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <q-no-ssr>
            <ChartArea
              class="q-my-sm"
              chart-id="chart-line-2"
              height="350"
              palette="palette8"
              type="line"
              :series="chartData.series.slice(6, 9)"
              :categories="chartData.categories"
              strokestyle="smooth"
              :xaxis-tickamount="3"
              :stroke-width="3"
            />
          </q-no-ssr>
        </div>
      </div>
    </BaseCard>
    <BaseCard class="q-my-md" title="Bar">
      <q-no-ssr>
        <ChartArea
          class="q-my-sm"
          chart-id="chart-bar"
          height="350"
          palette="palette3"
          type="bar"
          :colors="['#64748B', '#94A3B8', '#CBD5E1']"
          :series="chartData.series.slice(3, 6)"
          :categories="chartData.categories"
          strokestyle="smooth"
          :label-rotate="-45"
        />
        <div class="row">
          <div class="col-12 col-md-6">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-bar-simple"
              height="350"
              palette="palette3"
              type="bar"
              :opacity="0.3"
              :series="chartData.series.slice(0, 1)"
              :categories="chartData.categories"
              strokestyle="smooth"
              :label-rotate="-90"
            />
          </div>
          <div class="col-12 col-md-6">
            <ChartArea
              class="q-my-sm"
              chart-id="chart-bar-horizontal"
              height="350"
              palette="palette4"
              type="bar"
              horizontal
              :series="chartData.series.slice(0, 1)"
              :categories="chartData.categories"
              strokestyle="smooth"
            />
          </div>
        </div>
      </q-no-ssr>
    </BaseCard>

    <BaseCard class="q-my-md" title="Pie/Donuts">
      <div class="row">
        <div class="col-12 col-md-6">
          <q-no-ssr>
            <ChartPie
              class="q-my-sm"
              chart-id="chart-pine"
              height="350"
              palette="palette1"
              type="pie"
              :series="simpleSeries"
              :categories="simpleCategories"
            />
          </q-no-ssr>
        </div>
        <div class="col-12 col-md-6">
          <q-no-ssr>
            <ChartPie
              class="q-my-sm"
              chart-id="chart-donut"
              height="350"
              palette="palette5"
              type="donut"
              :colors="[
                '#FFB900',
                '#E74856',
                '#0078D7',
                '#0099BC',
                '#7A7574',
                '#00CC6A',
                '#8E8CD8',
              ]"
              :series="simpleSeries"
              :categories="simpleCategories"
            />
          </q-no-ssr>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>
