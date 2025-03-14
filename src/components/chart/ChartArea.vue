<script setup lang="ts">
import { useBase } from 'src/composables/useBase';
import { onMounted, onUnmounted, ref, useTemplateRef, watch, watchEffect } from 'vue';
import type {
  ChartMode,
  ChartPosition,
  ChartThemePalete,
  IChartSeries,
  Strokestyle,
} from '@/types/chart';

const {
  chartId = 'chartId',
  height = 'auto',
  width = 'auto',
  showLegend = true,
  legendUseSeriesColors = true,
  legendPosition = 'bottom',
  type = 'area',
  mode = 'light',
  palette = 'palette1',
  series = [],
  colors = [],
  dark = false,
  showDataLabels = false,
  labelRotate = 0,
  yaxisShow = true,
  yaxisTickamount = 5,
  xaxisTickamount = 0,
  xaxisDecimalsInFloat = 0,
  yaxisDecimalsInFloat = 0,
  categories,
  strokestyle = 'smooth',
  strokeWidth = 1,
  sparkline = false,
  annotationsYaxis = [],
  annotationsXaxis = [],
  minYVal = 0,
  maxYVal,
  showToolbar = false,
  zoom = false,
  horizontal = false,
  opacity = 1,
} = defineProps<{
  chartId?: string;
  height?: string;
  width?: string;
  labelunit?: string;
  showLegend?: boolean;
  legendUseSeriesColors?: boolean;
  legendPosition?: ChartPosition;
  type?: 'area' | 'bar' | 'line';
  mode?: ChartMode;
  palette?: ChartThemePalete;
  series?: IChartSeries[];
  colors?: string[];
  dark?: boolean;
  showDataLabels?: boolean;
  labelRotate?: number;
  yaxisShow?: boolean;
  yaxisTickamount?: number;
  xaxisTickamount?: number;
  xaxisDecimalsInFloat?: number;
  yaxisDecimalsInFloat?: number;
  categories: string[];
  strokestyle?: Strokestyle;
  strokeWidth?: number;
  sparkline?: boolean;
  annotationsYaxis?: any[];
  annotationsXaxis?: any[];
  minYVal?: number;
  maxYVal?: number;
  showToolbar?: boolean;
  zoom?: boolean;
  horizontal?: boolean;
  opacity?: number;
}>();
const { isDark } = useBase();
const chartSeries = ref(series);
const options = ref<any>();
const chartAreaRef = useTemplateRef<any>('chartAreaRef');
watchEffect(() => {
  if (series && series.length > 0) {
    chartSeries.value = series;
  }
});
onUnmounted(() => {
  options.value = undefined;
  chartSeries.value = [];
});

onMounted(() => {
  chartSetup();
});
const updateTheme = (dark: boolean) => {
  if (chartAreaRef.value) {
    chartAreaRef.value.updateOptions({
      theme: {
        mode: dark ? 'dark' : 'light',
      },
    });
  }
};
const chartSetup = () => {
  if (series.length > 0) {
    options.value = {
      chart: {
        id: chartId,
        background: 'transparent',
        width,
        height,
        type,
        toolbar: {
          show: showToolbar,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            customIcons: [],
          },
        },
        zoom: {
          enabled: zoom,
        },
        animations: {
          enabled: true,
          easing: 'easein', // linear, easeout, easein, easeinout, swing, bounce, elastic
          speed: 800,
        },
        sparkline: {
          enabled: sparkline,
        },
      },
      theme: {
        mode: isDark.value ? 'dark' : mode,
        palette,
      },
      plotOptions: {
        bar: {
          //   borderRadius: 4,
          //   borderRadiusApplication: "end",
          horizontal,
          // columnWidth: "55%",
          borderRadius: 3,
          borderRadiusApplication: 'end',
        },
      },
      colors: colors && colors.length > 0 ? colors : undefined,
      xaxis: {
        labels: {
          rotate: labelRotate,
        },
        categories,
        decimalsInFloat: xaxisDecimalsInFloat,
        tickAmount: xaxisTickamount > 0 ? xaxisTickamount : undefined,
      },
      yaxis: {
        show: yaxisShow,
        tickAmount: yaxisTickamount,
        decimalsInFloat: yaxisDecimalsInFloat,
        min: minYVal,
        // max: maxYVal != undefined ? maxYVal : undefined
      },
      annotations: {
        yaxis: annotationsYaxis,
        xaxis: annotationsXaxis,
      },
      stroke: {
        width: strokeWidth,
        curve: strokestyle,
      },
      fill: {
        opacity,
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
      grid: {
        borderColor: dark ? '#282829' : '#f0f0f0', // transparent
        // row: {
        //   colors: [dark ? '#353537' : '#e9ebec', 'transparent'], // takes an array which will be repeated on columns
        //   opacity: 0.2,
        // },
      },
      tooltip: {
        y: {
          formatter(val: any) {
            return val;
          },
        },
      },
      dataLabels: {
        enabled: showDataLabels,
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
    if (maxYVal != undefined) {
      options.value.yaxis.max = maxYVal;
    }

    // chart.value = new ApexCharts(
    //   document.querySelector('#' + chartId),
    //   options
    // );
    // chart.value.render();
  }
};
watch(isDark, (state) => {
  updateTheme(state);
});
</script>
<template>
  <q-no-ssr>
    <apexchart
      v-if="options"
      v-bind="$attrs"
      ref="chartAreaRef"
      :height="height"
      :type="type"
      :options="options"
      :series="chartSeries"
    />
  </q-no-ssr>
</template>
