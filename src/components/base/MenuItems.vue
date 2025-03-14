<template>
  <q-list v-bind="$attrs" padding>
    <slot name="before" />
    <template v-if="menuItems.length > 0">
      <template v-for="(item, index) in menuItems" :key="`parent-${index}`">
        <q-separator v-if="item.border" />
        <template v-if="item.header">
          <q-item-label header>
            {{ item?.translate !== false ? t(`${item.header}`) : item.header }}
          </q-item-label>
        </template>
        <template v-if="item.pages && item.pages.length > 0">
          <template
            v-for="(page, pageIndex) in item.pages"
            :key="`parent-${index}-page-${pageIndex}`"
          >
            <template v-if="!page.items">
              <menu-item :dark-text="darkText" :light-text="lightText" :item="page" />
            </template>
            <template v-else>
              <q-expansion-item
                :icon="page.icon"
                :label="page?.translate !== false ? t(`${page.title}`) : page.title"
                :default-opened="checkExpansionChildActive(currentUrlPath, page.items)"
                :expand-icon="mdiChevronRight"
                :expanded-icon="mdiChevronDown"
                expand-icon-class="text-muted"
                :dense
              >
                <template #header>
                  <q-item-section avatar>
                    <q-icon :name="page.icon" :size="iconSize" />
                  </q-item-section>

                  <q-item-section>
                    {{ page?.translate !== false ? t(`${page.title}`) : page.title }}
                  </q-item-section>
                </template>
                <q-list class="q-pl-sm">
                  <menu-item
                    v-for="(pageItem, pageItemIndex) in page.items"
                    :key="`parent-${index}-page-${pageIndex}-sub-${pageItemIndex}`"
                    :light-text="lightText"
                    :dark-text="darkText"
                    :item="pageItem"
                  />
                </q-list>
              </q-expansion-item>
            </template>
          </template>
        </template>
      </template>
    </template>
    <slot name="after" />
  </q-list>
</template>

<script setup lang="ts">
import MenuItem from '@/components/base/MenuItem.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { IMenu } from '@/types/models';
import { checkExpansionChildActive } from '@/utils/appUtil';
import { mdiChevronDown, mdiChevronRight } from '@quasar/extras/mdi-v7';
import { computed } from 'vue';

const {
  menuItems,
  dense = false,
  iconSize = 'sm',
} = defineProps<{
  menuItems: IMenu[];
  darkText?: string;
  lightText?: string;
  dark?: boolean;
  iconSize?: string;
  dense?: boolean;
}>();
const { t } = useLang();
const { getCurrentPath } = useBase();
const currentUrlPath = computed(() => getCurrentPath(false));
</script>
<style lang="sass">
.active-menu-link
  color: $primary

.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0, 0, 0, .24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      text-decoration: underline
</style>
