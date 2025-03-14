<template>
  <q-item
    v-bind="$attrs"
    :to="item.to"
    clickable
    :dense
    :active-class="item.noActiveLink ? 'q-item-no-link-highlighting' : 'active-menu-link'"
    :class="
      item.to == getCurrentPath(false) ? 'text-primary' : $q.dark.isActive ? darkText : lightText
    "
  >
    <q-item-section side>
      <q-icon
        :name="item.icon"
        :class="item.to == getCurrentPath(false) ? 'text-primary' : 'q-text-black'"
        :size="iconSize"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ item?.translate !== false ? t(`${item.title}`) : item.title }}
      </q-item-label>
      <q-item-label v-if="item?.caption" caption lines="1">
        {{ item.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { IMenuPageItem } from '@/types/models';
import { useQuasar } from 'quasar';

const {
  item,
  darkText = 'text-white',
  lightText = 'text-black',
  dense = false,
  iconSize = 'sm',
} = defineProps<{
  item: IMenuPageItem;
  darkText?: string | undefined;
  lightText?: string | undefined;
  iconSize?: string;
  dense?: boolean;
}>();
const $q = useQuasar();
const { t } = useLang();
const { getCurrentPath } = useBase();
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
