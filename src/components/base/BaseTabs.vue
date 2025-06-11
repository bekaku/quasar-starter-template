<script setup lang="ts">
import type { AppColor, LabelValue } from '@/types/common';
import { useQuasar } from 'quasar';
import { useLang } from 'src/composables/useLang';
import { useRbac } from 'src/composables/useRbac';
import { computed } from 'vue';
const {
  animated = true,
  dense = true,
  items,
  activeColor = 'primary',
  textColor,
  bgColor,
  useTabPanels = false,
  defaultTab = false,
  filterAcl = true,
  rounded = true,
  keepAlive = false,
  fullWidth = true,
} = defineProps<{
  activeColor?: AppColor;
  align?: 'left' | 'center' | 'right' | 'justify';
  animated?: boolean;
  bgColor?: AppColor;
  dense?: boolean;
  items: LabelValue<any>[];
  textColor?: AppColor;
  useTabPanels?: boolean;
  defaultTab?: boolean;
  filterAcl?: boolean;
  rounded?: boolean;
  keepAlive?: boolean;
  fullWidth?: boolean;
}>();
const { screen } = useQuasar();
const { t } = useLang();
const modelValue = defineModel<string | undefined>();
const { hasPermission } = useRbac();
const emit = defineEmits<{
  'on-change': [any];
}>();
const canShow = (item: LabelValue<any>) => {
  if (item.rbac == undefined) {
    return true;
  }
  return hasPermission(item.rbac);
};
const getItems = computed<LabelValue<any>[]>(() => {
  return filterAcl ? items.filter((t) => canShow(t) === true) : items;
});
const getCssClass = computed<string>(() => {
  // if (!textColor && !bgColor) {
  //   return '';
  // }

  return `${textColor ? 'text-' + textColor : ''} ${bgColor ? 'bg-' + bgColor : ''} ${!fullWidth ? 'limit-width' : ''}`;
});
const onChange = (event: any) => {
  emit('on-change', event);
};
</script>
<template>
  <div v-if="getItems.length > 0" :class="{ 'limit-tabs': !screen.gt.xs }">
    <q-tabs
      v-bind="$attrs"
      v-model="modelValue"
      :align
      :dense="dense"
      no-caps
      inline-label
      outside-arrows
      mobile-arrows
      :active-color="defaultTab ? (!textColor ? activeColor : undefined) : undefined"
      :class="getCssClass"
      :active-class="!defaultTab ? 'btn-toggle-on-class' : undefined"
      :indicator-color="!defaultTab ? 'transparent' : undefined"
      :content-class="
        !defaultTab ? `${rounded ? 'rounded' : ''} tabs-content-wrapper q-gutter-x-xs` : undefined
      "
      @update:model-value="onChange"
    >
      <slot>
        <template v-for="(item, index) in getItems" :key="`${index}-${item.value}`">
          <q-tab
            :icon="item.icon"
            :label="item.translateLabel ? (item.label ? t(item.label) : undefined) : item.label"
            :name="item.value"
            :disable="item.disable"
            class="tab-content-wrapper"
          >
            <slot name="app-tab" v-bind="{ item }" />
          </q-tab>
        </template>
      </slot>
    </q-tabs>
    <slot name="tabPanels">
      <q-tab-panels v-if="useTabPanels" v-model="modelValue" :animated :keep-alive>
        <q-tab-panel
          v-for="(itemPanel, index) in getItems"
          :key="`tab-panel-${index}-${itemPanel.value}`"
          :name="itemPanel.value"
        >
          <slot :name="itemPanel.value" />
        </q-tab-panel>
      </q-tab-panels>
    </slot>
  </div>
</template>
<style scoped lang="scss">
.limit-tabs {
  max-width: 100vw;
}
.limit-width {
  width: fit-content !important;
}
</style>
