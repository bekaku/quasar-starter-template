<script setup lang="ts" generic="T">
import type { AppColor, LabelValue } from '@/types/common';
import { biThreeDots } from '@quasar/extras/bootstrap-icons';
import { matKeyboardArrowRight } from '@quasar/extras/material-icons';
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseLabelValueItem from './BaseLabelValueItem.vue';
import BaseTooltip from './BaseTooltip.vue';

const {
  width = '100px',
  cover = false,
  anchor = 'bottom left',
  dense = true,
  icon = biThreeDots,
  emptyBody = false,
  flat = true,
  round = false,
  color = 'light',
  light = false,
} = defineProps<{
  items: LabelValue<T>[];
  icon?: string;
  label?: string;
  width?: string;
  cover?: boolean;
  dense?: boolean;
  iconSize?: string;
  avatarSize?: string;
  anchor?:
    | 'top middle'
    | 'top left'
    | 'top right'
    | 'top start'
    | 'top end'
    | 'center left'
    | 'center middle'
    | 'center right'
    | 'center start'
    | 'center end'
    | 'bottom left'
    | 'bottom middle'
    | 'bottom right'
    | 'bottom start'
    | 'bottom end'
    | undefined;
  self?: any;
  emptyBody?: boolean;
  flat?: boolean;
  round?: boolean;
  tooltip?: string;
  color?: AppColor;
  light?: boolean | undefined;
}>();
const open = defineModel<boolean>('open', { default: undefined });
const menuRef = ref<any>();
const emit = defineEmits<{
  'on-click': [val: T | undefined];
  'on-hide': [];
}>();
const onClick = (calbackItem: LabelValue<T> | undefined) => {
  if (calbackItem?.onHandle != undefined) {
    calbackItem.onHandle();
  }
  const value = calbackItem?.value;
  emit('on-click', value);
  if (menuRef.value) {
    menuRef.value.hide();
  }
};
const onHide = () => {
  emit('on-hide');
  if (open.value !== undefined) {
    open.value = false;
  }
};
</script>
<template>
  <div v-bind="$attrs" class="cursor-pointer holder inline-block">
    <slot>
      <BaseButton v-if="!emptyBody" :icon="icon" :flat :round :label :color :light>
        <BaseTooltip v-if="tooltip">
          {{ tooltip }}
        </BaseTooltip>
      </BaseButton>
    </slot>
    <q-menu
      ref="menuRef"
      v-model="open"
      class="q-py-xs q-px-xs"
      :style="{ minWidth: width }"
      :cover
      :anchor
      @hide="onHide"
    >
      <q-list>
        <template v-for="(item, index) in items" :key="`app-menu-${item.value}-${index}`">
          <BaseLabelValueItem
            :item="item"
            :dense
            :clickable="item.value != undefined || (item.children && item.children.length > 0)"
            rounded
            @on-click="onClick"
          >
            <template v-if="item.children && item.children.length > 0">
              <!-- Level 2 -->
              <q-item-section side>
                <q-icon :name="matKeyboardArrowRight" />
              </q-item-section>

              <q-menu anchor="top end" self="top start" class="q-py-xs q-px-xs">
                <q-list :dense>
                  <BaseLabelValueItem
                    v-for="(itemLevel2, indexLevel2) in item.children"
                    :key="`app-submenulevel2-${index}-${indexLevel2}`"
                    :item="itemLevel2"
                    :clickable="
                      item.value != undefined || (item.children && item.children.length > 0)
                    "
                    :dense
                    rounded
                    @on-click="onClick"
                  >
                    <template v-if="itemLevel2.children && itemLevel2.children.length > 0">
                      <!-- Level 3 -->
                      <q-item-section side>
                        <q-icon :name="matKeyboardArrowRight" />
                      </q-item-section>
                      <q-menu anchor="top end" self="top start" class="q-py-xs q-px-xs">
                        <q-list :dense>
                          <BaseLabelValueItem
                            v-for="(itemLevel3, indexLevel3) in itemLevel2.children"
                            :key="`app-submenulevel3-${index}-${indexLevel2}-${indexLevel3}`"
                            :clickable="
                              item.value != undefined || (item.children && item.children.length > 0)
                            "
                            :item="itemLevel3"
                            :dense
                            rounded
                            @on-click="onClick"
                          />
                        </q-list>
                      </q-menu>
                    </template>
                  </BaseLabelValueItem>
                </q-list>
              </q-menu>
            </template>
          </BaseLabelValueItem>
          <q-separator v-if="item.border == true" />
        </template>
      </q-list>
    </q-menu>
  </div>
</template>
<style scoped lang="scss">
.holder {
  width: fit-content;
}
</style>
