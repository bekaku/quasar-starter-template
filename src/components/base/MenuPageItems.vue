<template>
  <q-list v-if="menuItems != undefined && menuItems.length > 0">
    <template v-for="(item, index) in menuItems" :key="`base-meny-${index}`">
      <template v-if="item.canShow">
        <q-separator v-if="item.border" />
        <q-item-label v-else-if="item.header" header>
          {{ item.headerI18n && item.header ? t(item.header) : item.header }}
        </q-item-label>
        <q-item
          v-else
          clickable
          v-ripple
          :to="item.to ? item.to : undefined"
          active-class="q-item-no-link-highlighting"
          :class="
            item.to == getCurrentPath(false)
              ? 'text-primary'
              : $q.dark.isActive
                ? 'text-white'
                : 'text-black'
          "
        >
          <q-item-section avatar>
            <template v-if="item.image">
              <!-- <q-avatar :size="item.imageSize ? `${item.imageSize}px` : '25px'">
                <q-img :src="item.image" />
              </q-avatar> -->
              <base-avatar
                :src="item.image"
                :fetch-image="item.fetchImage === true"
                :size="item.imageSize + 'px' ? item.imageSize + 'px' : '25px'"
              />
            </template>
            <q-icon
              v-else
              :name="item.icon"
              :style="item.iconSize ? `font-size:${item.iconSize}px` : undefined"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label :lines="1">
              {{ item.titleI18n && item.title ? t(item.title) : item.title }}
            </q-item-label>
            <q-item-label v-if="item.caption" :lines="1" caption>
              {{ item.caption }}
            </q-item-label>
          </q-item-section>
          <q-tooltip>
            {{ item.titleI18n && item.title ? t(item.title) : item.title }}
          </q-tooltip>
        </q-item>
      </template>
    </template>
  </q-list>
</template>

<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { IMenuPageItem } from '@/types/models';
import { useQuasar } from 'quasar';
import { defineAsyncComponent } from 'vue';

defineProps<{
  menuItems?: IMenuPageItem[];
}>();
const $q = useQuasar();
const { t } = useLang();
const { getCurrentPath } = useBase();
</script>
