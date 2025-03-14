<script setup lang="ts">
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { computed } from 'vue';
import type { LabelValue, AppColor } from '@/types/common';
import { useAppStore } from '@/stores/appStore';

const { items, showSeparator = true } = defineProps<{
  items: LabelValue<any>[];
  showSeparator?: boolean;
  separatorIcon?: string;
  activeColor?: string;
  textColor?: AppColor;
}>();
const { t } = useLang();
const { isDark } = useBase();
const { getParam, getQuery } = useBase();
const appStore = useAppStore();
const canShow = (item: LabelValue<any>) => {
  if (item.permissions == undefined) {
    return true;
  }
  return appStore.isHavePermission(item.permissions);
};
const getItems = computed<LabelValue<any>[]>(() => {
  return items.filter((t) => canShow(t) === true);
});
const getLink = (item: LabelValue<any>) => {
  let link = item.to;
  if (link) {
    const params = item.params;
    if (params && params.length > 0) {
      for (const p of params) {
        const paramValue = getParam(p);
        if (paramValue) {
          link = link.replaceAll(`:${p}`, paramValue);
        }
      }
    }
    const queries = item.queries;
    if (queries && queries.length > 0) {
      for (const q of queries) {
        const queryValue = getQuery(q);
        if (queryValue) {
          link = link.replaceAll(`{${q}}`, queryValue);
        }
      }
    }
  }
  return link;
};
</script>
<template>
  <div v-if="getItems.length > 0" class="q-pa-md q-gutter-sm">
    <q-breadcrumbs :class="`text-${textColor}`" :active-color="isDark ? 'white' : activeColor">
      <template #separator>
        <template v-if="showSeparator">
          <q-icon v-if="separatorIcon" class="text-muted" :name="separatorIcon" />
          <template v-else> <span class="text-muted">/</span></template>
        </template>
      </template>
      <template v-for="(item, index) in getItems" :key="`breadcrumb-${index}-${item.to}`">
        <q-breadcrumbs-el
          :label="item.translateLabel ? (item.label ? t(item.label) : undefined) : item.label"
          :icon="item.icon"
          :to="getLink(item)"
          exact
          :class="{ 'under-line': item.to != undefined }"
        />
      </template>
      <slot name="extra" />
    </q-breadcrumbs>
  </div>
</template>
<style scoped lang="css">
.under-line:hover {
  text-decoration: underline;
}
</style>
