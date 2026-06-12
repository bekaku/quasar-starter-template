<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BasePage from '@/components/base/BasePage.vue';
import ExampleAutoScrollBottom from '@/components/example/virtual-scroller/ExampleAutoScrollBottom.vue';
import ExampleDynamicScroller from '@/components/example/virtual-scroller/ExampleDynamicScroller.vue';
import ExampleQuasarScroller from '@/components/example/virtual-scroller/ExampleQuasarScroller.vue';
import ExampleQuasarScroller2 from '@/components/example/virtual-scroller/ExampleQuasarScroller2.vue';
import ExampleRecycleScroller from '@/components/example/virtual-scroller/ExampleRecycleScroller.vue';
import ExampleVueUseScroller from '@/components/example/virtual-scroller/ExampleVueUseScroller.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Virtual scroller | ${t('app.name')}`);
</script>

<template>
  <BasePage :full="false">
    <ExampleAutoScrollBottom />
    <ExampleDynamicScroller />
    <ExampleRecycleScroller />
    <ExampleQuasarScroller />
    <ExampleQuasarScroller2 />
    <ExampleVueUseScroller />
  </BasePage>
</template>
