<script setup lang="ts">
import { biX } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import { onMounted, ref } from 'vue';
import { additionalMenu } from '@/libs/navs';
import type { LabelValue } from '@/types/common';
import BaseDialog from '../base/BaseDialog.vue';
import BaseCommandPalette from '../base/BaseCommandPalette.vue';
import BaseButton from '../base/BaseButton.vue';
import { useAppStore } from 'src/stores/appStore';
const { drawers } = useAppStore();
const { t } = useLang();

const modelValue = defineModel<boolean>({ default: false });
const commandPaletteModel = ref<string>();
const loading = ref<boolean>(true);

const menuItems = ref<LabelValue<string>[]>([]);
const emit = defineEmits<{
  'on-click': [value: string];
}>();
onMounted(async () => {
  await onSetMenu();
  loading.value = false;
});

const onSetMenu = (): Promise<boolean> => {
  const initialMenuItems: LabelValue<any>[] = drawers.concat(additionalMenu);
  return new Promise((resolve) => {
    for (const menuLevel1 of initialMenuItems) {
      if (menuLevel1.children != undefined && menuLevel1.children.length > 0) {
        for (const p of menuLevel1.children) {
          if (p.children != undefined && p.children.length > 0) {
            const parentItem: LabelValue<string> = {
              ...p,
              label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
              children: [],
            };
            const childs: LabelValue<string>[] = [];
            for (const item of p.children) {
              childs.push({
                ...item,
                label:
                  item.label && item.translateLabel !== false ? t(item.label) : item.label || '',
                value: item.to,
              });
            }
            parentItem.children = childs;
            menuItems.value.push(parentItem);
          } else {
            menuItems.value.push({
              ...p,
              label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
              value: p.to,
            });
          }
        }
      }
    }
    resolve(true);
  });
};
const onClickItem = (val: string | undefined) => {
  if (val != undefined) {
    // appNavigateTo(val);
    // modelValue.value = false;
    emit('on-click', val);
  }
};
</script>
<template>
  <BaseDialog
    v-model="modelValue"
    :show-toolbar="false"
    :padding="false"
    dialog-style="width: 756px; max-width: 80vw;"
  >
    <BaseCommandPalette
      v-model="commandPaletteModel"
      :loading="loading"
      :bordered="false"
      class="q-pt-sm"
      :multiple="false"
      :items="menuItems"
      @on-click="onClickItem"
    >
      <template #inputAppend>
        <BaseButton round flat :icon="biX" @click="modelValue = false" />
      </template>
    </BaseCommandPalette>
  </BaseDialog>
</template>
