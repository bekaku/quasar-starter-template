<script setup lang="ts" generic="T">
import { matKeyboardArrowRight } from '@quasar/extras/material-icons';
import { ref } from 'vue';
import type { LabelValue } from '@/types/common';
import BaseLabelValueItem from './BaseLabelValueItem.vue';

const {
  width = '100px',
  cover = false,
  anchor = 'bottom left',
  dense = true,
} = defineProps<{
  items: LabelValue<T>[];
  icon?: string;
  title?: string;
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
}>();
const open = defineModel<boolean>('open', { default: undefined });
const menuRef = ref<any>();
const emit = defineEmits<{
  'on-click': [val: T | undefined];
}>();
const onClick = (value: T | undefined) => {
  emit('on-click', value);
  if (menuRef.value) {
    menuRef.value.hide();
  }
};
const onHide = () => {
  if (open.value !== undefined) {
    open.value = false;
  }
};
</script>
<template>
  <q-menu
    ref="menuRef"
    v-bind="$attrs"
    v-model="open"
    class="q-py-sm"
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
          @on-click="onClick"
        >
          <template v-if="item.children && item.children.length > 0">
            <!-- Level 2 -->
            <q-item-section side>
              <q-icon :name="matKeyboardArrowRight" />
            </q-item-section>

            <q-menu anchor="top end" self="top start">
              <q-list :dense>
                <BaseLabelValueItem
                  v-for="(itemLevel2, indexLevel2) in item.children"
                  :key="`app-submenulevel2-${index}-${indexLevel2}`"
                  :item="itemLevel2"
                  :clickable="
                    item.value != undefined || (item.children && item.children.length > 0)
                  "
                  :dense
                  @on-click="onClick"
                >
                  <template v-if="itemLevel2.children && itemLevel2.children.length > 0">
                    <!-- Level 3 -->
                    <q-item-section side>
                      <q-icon :name="matKeyboardArrowRight" />
                    </q-item-section>
                    <q-menu anchor="top end" self="top start">
                      <q-list :dense>
                        <BaseLabelValueItem
                          v-for="(itemLevel3, indexLevel3) in itemLevel2.children"
                          :key="`app-submenulevel3-${index}-${indexLevel2}-${indexLevel3}`"
                          :clickable="
                            item.value != undefined || (item.children && item.children.length > 0)
                          "
                          :item="itemLevel3"
                          :dense
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
</template>
<style scoped></style>
