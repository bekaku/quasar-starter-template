<script setup lang="ts" generic="T">
import { checkExpansionChildActiveAlt } from '@/utils/appUtil';
import { mdiChevronDown, mdiChevronRight } from '@quasar/extras/mdi-v7';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { computed } from 'vue';
import type { LabelValue } from '@/types/common';
import BaseMenuItem from './BaseMenuItem.vue';

const {
  items,
  iconSize = '20px',
  dense = true,
  expanAll = false
} = defineProps<{
  items: LabelValue<T>[];
  darkText?: string;
  lightText?: string;
  dark?: boolean;
  iconSize?: string;
  dense?: boolean;
  expanAll?: boolean
}>();
const { t } = useLang();
const { getCurrentPath } = useBase();
const currentUrlPath = computed(() => getCurrentPath(false));
</script>
<template>
  <q-list v-bind="$attrs" padding>
    <slot name="before" />
    <template v-if="items && items.length > 0">
      <template v-for="(item, index) in items" :key="`parent-${index}`">
        <q-separator v-if="item.border" />
        <template v-if="item.children && item.children.length > 0">
          <template v-if="item.label">
            <q-item-label header class="q-pa-none text-subtitle2 q-pl-md q-mt-md q-pb-xs">
              {{ item?.translateLabel !== false ? t(`${item.label}`) : item.label }}
            </q-item-label>
          </template>
          <template
            v-for="(page, pageIndex) in item.children"
            :key="`parent-${index}-page-${pageIndex}`"
          >
            <template v-if="!page.children">
              <BaseMenuItem :dark-text="darkText" :light-text="lightText" :dense :item="page">
                <template #end="{ item: menuItem }">
                  <slot name="end" v-bind="{ menuItem }" />
                </template>
              </BaseMenuItem>
            </template>
            <template v-else>
              <q-expansion-item
                :icon="page.icon"
                :label="page?.translateLabel !== false ? t(`${page.label}`) : page.label"
                :default-opened="expanAll || checkExpansionChildActiveAlt(currentUrlPath, page.children)"
                :expand-icon="mdiChevronRight"
                :expanded-icon="mdiChevronDown"
                expand-icon-class="text-muted"
                :dense
                class="parent-defult"
              >
                <template #header>
                  <q-item-section avatar>
                    <q-icon :name="page.icon" :size="iconSize" />
                  </q-item-section>

                  <q-item-section>
                    {{ page?.translateLabel !== false ? t(`${page.label}`) : page.label }}
                  </q-item-section>
                </template>
                <q-list class="q-pl-sm">
                  <div class="parent-menu-border">
                    <BaseMenuItem
                      v-for="(pageItem, pageItemIndex) in page.children"
                      :key="`parent-${index}-page-${pageIndex}-sub-${pageItemIndex}`"
                      :light-text="lightText"
                      :dark-text="darkText"
                      :dense
                      :item="pageItem"
                      icon-size="18px"
                    >
                      <template #end="{ item: menuItem }">
                        <slot name="end" v-bind="{ menuItem }" />
                      </template>
                    </BaseMenuItem>
                  </div>
                </q-list>
              </q-expansion-item>
            </template>
          </template>
        </template>
        <template v-else>
          <BaseMenuItem :dark-text="darkText" :light-text="lightText" :dense :item="item">
            <template #end="{ item: menuItem }">
              <slot name="end" v-bind="{ menuItem }" />
            </template>
          </BaseMenuItem>
        </template>
      </template>
    </template>
    <slot name="after" />
  </q-list>
</template>
<style lang="scss">
.parent-menu-border {
  border-left: 1px solid var(--app-main-border-color);
}

.default-nav {
  padding: 10px;
  border-radius: 10px;
}
</style>
