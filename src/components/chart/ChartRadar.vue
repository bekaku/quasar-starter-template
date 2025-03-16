<script setup lang="ts">
import { useBase } from 'src/composables/useBase';
import { onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
import type { ChartMode, ChartPosition, ChartThemePalete, IChartSeries } from '@/types/chart';
import { useQuasar } from 'quasar';
interface GridPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
const {
  chartId = 'chart-radar-id',
  height = '350',
  width = 'auto',
  showLegend = true,
  mode = 'light',
  palette = 'palette1',
  series,
  colors,
  showDataLabels = false,
  categories,
  yaxisShow = false,
  yaxisTickamount = 5,
  xaxisTickamount = 0,
  gridPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  labelRotate,
  gridColors,
  yaxisMax,
  yaxisMin,
  markers = 0,
  strokeWidth = 2,
  opacity = 0.2,
} = defineProps<{
  chartId?: string;
  height?: string;
  width?: string;
  labelunit?: string;
  showLegend?: boolean;
  legendUseSeriesColors?: boolean;
  legendPosition?: ChartPosition;
  mode?: ChartMode;
  palette?: ChartThemePalete;
  series: IChartSeries[];
  colors?: string[];
  showDataLabels?: boolean;
  labelRotate?: number;
  categories: string[];
  yaxisShow?: boolean;
  yaxisTickamount?: number;
  xaxisTickamount?: number;
  gridPadding?: GridPadding;
  yaxisMax?: number;
  yaxisMin?: number;
  markers?: number;
  strokeWidth?: number;
  gridColors?: string[];
  opacity?: number;
}>();
const chartSeries = ref(series);
const options = ref<any>();
  const { dark: isDark } = useQuasar();

const chartRadarRef = useTemplateRef<any>('chartRadarRef');
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
const updateTheme = (dark: boolean) => {
  if (options.value) {
    if (chartRadarRef.value) {
      chartRadarRef.value.updateOptions({
        theme: {
          mode: dark ? 'dark' : 'light',
        },
        plotOptions: {
          radar: {
            polygons: {
              fill: {
                colors: gridColors,
              },
            },
          },
        },
      });
    }
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
        type: 'radar',
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
      },
      theme: {
        mode: isDark.isActive ? 'dark' : mode,
        palette,
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              colors: gridColors,
            },
          },
        },
      },
      colors: colors && colors.length > 0 ? colors : undefined,
      xaxis: {
        labels: {
          rotate: labelRotate,
        },
        categories,
        tickAmount: xaxisTickamount > 0 ? xaxisTickamount : undefined,
      },
      yaxis: {
        show: yaxisShow,
        tickAmount: yaxisTickamount,
        max: yaxisMax,
        min: yaxisMin,
      },
      dataLabels: {
        enabled: showDataLabels,
      },
      stroke: {
        width: strokeWidth,
      },
      fill: {
        opacity,
      },
      markers: {
        size: markers,
      },
      legend: {
        show: showLegend,
      },
      grid: {
        padding: gridPadding,
      },
    };
  }
};
</script>
<template>
  <q-no-ssr>
    <apexchart
      v-if="options"
      v-bind="$attrs"
      ref="chartRadarRef"
      :height="height"
      type="radar"
      :options="options"
      :series="chartSeries"
    />
  </q-no-ssr>
</template>
