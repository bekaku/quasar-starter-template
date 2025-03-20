<script setup lang="ts">
import type { ChartMode, ChartPosition, ChartThemePalete } from '@/types/chart';
import { useTheme } from 'src/composables/useTheme';
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';
interface GridPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
const {
  chartId = 'chart-radial-id',
  height = 'auto',
  width = '100%',
  mode = 'light',
  palette = 'palette1',
  series,
  colors,
  categories,
  gridPadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  showLegend = true,
  legendUseSeriesColors = true,
  legendFloating = false,
  legendOffsetX = 0,
  legendOffsetY = 0,
  legendPosition = 'bottom',
  showDataLabels = true,
  dataLabelsSize = '14px',
  dataValueSize = '18px',
  showDataLabelsName = true,
  showDataLabelsValue = true,
  dataLabelsValueOfsetY = 0,
  startAngle = 0,
  endAngle = 360,
  stokeLineCap = 'round',
  semi = false,
  hollowBg = true,
  hollowSize = '55%',
  trackBackgroud = '#f0f0f0',
  trackBackgroudDark = '#383a42',
  fillType = 'gradient',
  valUnit,
  dark = false,
} = defineProps<{
  chartId?: string;
  height?: string;
  width?: string;
  showLegend?: boolean;
  legendUseSeriesColors?: boolean;
  legendOffsetX?: number;
  legendOffsetY?: number;
  legendFloating?: boolean;
  showDataLabels?: boolean;
  showDataLabelsName?: boolean;
  showDataLabelsValue?: boolean;
  dataLabelsSize?: string;
  dataValueSize?: string;
  dataLabelsValueOfsetY?: number;
  legendPosition?: ChartPosition;
  labelunit?: string;
  stokeLineCap?: 'round' | 'square' | 'butt';
  fillType?: 'fill' | 'gradient';
  endAngle?: number;
  startAngle?: number;
  mode?: ChartMode;
  palette?: ChartThemePalete;
  series: number[];
  colors?: string[];
  categories: string[];
  gridPadding?: GridPadding;
  semi?: boolean;
  hollowBg?: boolean;
  hollowSize?: string;
  valUnit?: string;
  trackBackgroud?: string;
  trackBackgroudDark?: string;
  dark?: boolean;
}>();
const chartSeries = ref(series);
const options = ref<any>();
  const { isDark } = useTheme();
const chartRadialRef = useTemplateRef<any>('chartRadialRef');
const watchTimeout = ref<any>();
// watchEffect(() => {
//   if (series && series.length > 0) {
//     chartSeries.value = series;
//   }
// });
onUnmounted(() => {
  options.value = undefined;
  chartSeries.value = [];
  if (watchTimeout.value) {
    clearTimeout(watchTimeout.value);
    watchTimeout.value = undefined;
  }
});

onMounted(() => {
  chartSetup();
});
const updateTheme = (darkMode: boolean) => {
  if (chartRadialRef.value) {
    chartRadialRef.value.updateOptions({
      theme: {
        mode: darkMode ? 'dark' : 'light',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            background: darkMode ? 'transparent' : '#fff',
            dropShadow: {
              enabled: !semi && !darkMode,
            },
          },
          track: {
            background: !darkMode ? trackBackgroud : trackBackgroudDark,
          },
          dataLabels: {
            value: {
              color: darkMode ? '#fff' : '#000',
            },
          },
        },
      },
    });
  }
};
watch(isDark, (state) => {
  watchTimeout.value = setTimeout(() => {
    updateTheme(state);
  }, 50);
});
const chartSetup = () => {
  if (series.length > 0) {
    options.value = {
      // series: series.value,
      chart: {
        id: chartId,
        background: 'transparent',
        width,
        height,
        type: 'radialBar',
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800,
        },
        // sparkline: {
        //   enabled: sparkline || semi,
        // },
        // offsetY: semi ? -20 : 0,
      },
      theme: {
        mode: dark ? 'dark' : mode,
        palette,
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle,
          endAngle,
          hollow: {
            margin: 0,
            size: hollowSize,
            background: mode === 'dark' || !hollowBg || semi ? 'transparent' : '#fff',
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 3,
              opacity: 0.15,
            },
          },
          track: {
            background: dark ? trackBackgroudDark : trackBackgroud,
            strokeWidth: '100%',
            margin: 2, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },

          dataLabels: {
            show: showDataLabels,
            name: {
              offsetY: semi ? -30 : 0,
              show: showDataLabelsName,
              // color: dark ? '#fff' : '#000',
              fontSize: dataLabelsSize,
              fontWeight: 400,
            },
            value: {
              show: showDataLabelsValue,
              offsetY: dataLabelsValueOfsetY > 0 ? dataLabelsValueOfsetY : semi ? -20 : 5,
              formatter(val: any) {
                return val + (valUnit || '');
              },
              // color: dark ? '#fff' : '#000',
              fontSize: dataValueSize,
            },
          },
        },
      },
      colors: colors && colors.length > 0 ? colors : undefined,
      stroke: {
        // lineCap: semi ? 'butt' : stokeLineCap,
        lineCap: stokeLineCap,
      },
      fill: {
        type: fillType, // fill, gradient
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      labels: categories,
      legend: {
        show: showLegend,
        floating: legendFloating,
        fontSize: '16px',
        offsetX: legendOffsetX,
        offsetY: legendOffsetY,
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
      grid: {
        padding: gridPadding,
      },
      tooltip: {
        y: {
          formatter(val: any) {
            return val;
          },
        },
      },
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     chart: {
        //       width: 200,
        //     },
        //     legend: {
        //       position: 'bottom',
        //     },
        //   },
        // },
      ],
    };
    // chart.value = new ApexCharts(
    //   document.querySelector('#' + chartId),
    //   options
    // );
    // chart.value.render();
  }
};
</script>
<template>
  <q-no-ssr>
    <apexchart
      v-if="options"
      v-bind="$attrs"
      ref="chartRadialRef"
      :height="height"
      type="radialBar"
      :options="options"
      :series="chartSeries"
    />
  </q-no-ssr>
</template>
