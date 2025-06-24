<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BasePage from 'src/components/base/BasePage.vue';
import ExampleAutoScrollBottom from 'src/components/example/virtual-scroller/ExampleAutoScrollBottom.vue';
import ExampleDynamicScroller from 'src/components/example/virtual-scroller/ExampleDynamicScroller.vue';
import ExampleQuasarScroller from 'src/components/example/virtual-scroller/ExampleQuasarScroller.vue';
import ExampleQuasarScroller2 from 'src/components/example/virtual-scroller/ExampleQuasarScroller2.vue';
import ExampleRecycleScroller from 'src/components/example/virtual-scroller/ExampleRecycleScroller.vue';
import ExampleVueUseScroller from 'src/components/example/virtual-scroller/ExampleVueUseScroller.vue';
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
