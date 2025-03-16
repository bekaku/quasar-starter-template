<script lang="ts" setup>
import type { ChartMode, ChartPosition, ChartThemePalete, Strokestyle } from '@/types/chart';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
const {
  chartId = 'chart-pie-id',
  height = 'auto',
  width = 'auto',
  showLegend = true,
  legendUseSeriesColors = true,
  legendPosition = 'bottom',
  type = 'pie',
  mode = 'light',
  palette = 'palette1',
  series,
  colors,
  showDataLabels = true,
  categories,
  strokestyle = 'smooth',
  strokeWidth = 1,
  dark=false,
} = defineProps<{
  chartId?: string;
  height?: string;
  width?: string;
  labelunit?: string;
  showLegend?: boolean;
  legendUseSeriesColors?: boolean;
  legendPosition?: ChartPosition;
  type?: 'pie' | 'donut';
  mode?: ChartMode;
  palette?: ChartThemePalete;
  series: number[];
  colors?: string[];
  dark?: boolean;
  showDataLabels?: boolean;
  labelRotate?: number;
  categories: string[];
  strokestyle?: Strokestyle;
  strokeWidth?: number;
}>();

// const { dark: isDark } = useQuasar();
const chartSeries = ref(series);
const options = ref<any>();
const chartPieRef = useTemplateRef<any>('chartPieRef');
// watchEffect(() => {
//   if (series && series.length > 0) {
//     chartSeries.value = series;
//   }
// });
onUnmounted(() => {
  options.value = undefined;
  chartSeries.value = [];
});

onMounted(() => {
  chartSetup();
});
const updateTheme = (darkMode: boolean) => {
  if (chartPieRef.value) {
    chartPieRef.value.updateOptions({
      theme: {
        mode: darkMode ? 'dark' : 'light',
      },
    });
  }
};
// watch(() => isDark.isActive, (state) => {
//   updateTheme(state);
// });
const chartSetup = () => {
  if (series.length > 0) {
    options.value = {
      // series: series.value,
      // series: series,
      chart: {
        id: chartId,
        background: 'transparent',
        width,
        height,
        type,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800,
        },
      },
      theme: {
        mode: dark ? 'dark' : mode,
        palette,
      },
      plotOptions: {},
      colors: colors && colors.length > 0 ? colors : undefined,
      labels: categories,
      stroke: {
        width: strokeWidth,
        curve: strokestyle,
      },
      fill: {
        opacity: 1,
        type: 'gradient',
      },
      legend: {
        show: showLegend,
        position: legendPosition, // whether to position legends in 1 of 4
        // direction - top, bottom, left, right
        horizontalAlign: 'center', // when position top/bottom, you can
        // specify whether to align legends
        // left, right or center
        verticalAlign: 'middle',
        labels: {
          colors: '#8E8E93',
          useSeriesColors: legendUseSeriesColors,
        },
      },
      dataLabels: {
        enabled: showDataLabels,
      },
      responsive: [],
    };
  }
};
</script>
<template>
  <q-no-ssr>
    <apexchart
      v-if="options"
      v-bind="$attrs"
      ref="chartPieRef"
      :height="height"
      :type="type"
      :options="options"
      :series="chartSeries"
    />
  </q-no-ssr>
</template>
