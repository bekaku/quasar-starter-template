/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
// custom module
// declare module 'emoji-mart-vue-fast';
// declare module 'vue-i18n/index';
declare module 'vue-zoomer';
declare module 'd3-org-chart';
declare module 'vue3-apexcharts/src/vue3-apexcharts';
declare module 'vue-virtual-scroller';
