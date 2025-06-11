<script setup lang="ts">
import BaseTabs from '@/components/base/BaseTabs.vue';
import type { LabelValue } from '@/types/common';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { useRbac } from 'src/composables/useRbac';
import { computed } from 'vue';
const {
  dense = true,
  items,
  align = 'left',
  defaultTab = false,
  rounded = false,
} = defineProps<{
  items: LabelValue<any>[];
  dense?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  defaultTab?: boolean;
  rounded?: boolean;
}>();
const { screen } = useQuasar();
const { t } = useLang();
const { getParam } = useBase();
const { hasPermission } = useRbac();
const getLink = (item: LabelValue<any>) => {
  let link = item.to;
  const params = item.params;
  if (link && params && params.length > 0) {
    for (const p of params) {
      const paramValue = getParam(p);
      if (paramValue) {
        link = link.replaceAll(`:${p}`, paramValue);
      }
    }
  }
  return link;
};
const canShow = (item: LabelValue<any>) => {
  if (item.rbac == undefined) {
    return true;
  }
  return hasPermission(item.rbac);
};
const getItems = computed<LabelValue<any>[]>(() => {
  return items.filter((t) => canShow(t) === true);
});
</script>
<template>
  <div v-if="getItems.length > 0" :class="{ 'limit-tabs': !screen.gt.xs }">
    <BaseTabs
      :items="items"
      :dense="dense"
      :filter-acl="false"
      :align
      :rounded
      :default-tab="defaultTab"
    >
      <template v-for="(item, index) in getItems" :key="`${index}-${item.label}`">
        <q-route-tab
          :icon="item.icon"
          :label="item.translateLabel ? (item.label ? t(item.label) : undefined) : item.label"
          :to="getLink(item)"
          :disable="item.disable"
          class="tab-content-wrapper"
        />
      </template>
    </BaseTabs>
  </div>
</template>
<style scoped lang="scss">
.limit-tabs {
  max-width: 100vw;
}
</style>
