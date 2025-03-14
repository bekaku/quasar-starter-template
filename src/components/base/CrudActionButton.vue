<template>
  <div v-if="isHaveManagePermission || isHaveViewPermission">
    <q-btn
      v-if="editButton && (isHaveManagePermission || isHaveViewPermission)"
      @click="$emit('on-item-click')"
      color="primary"
      :icon="isHaveManagePermission ? biPencil : biEye"
      flat
      round
    >
      <q-tooltip>
        {{ t('base.edit') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      v-if="copyButton && isHaveManagePermission"
      @click="$emit('on-item-copy')"
      color="primary"
      class="q-ml-sm"
      :icon="biClipboard"
      flat
      round
    >
      <q-tooltip>
        {{ t('base.copy') }}
      </q-tooltip>
    </q-btn>
    <q-btn
      v-if="deleteButton && isHaveManagePermission"
      @click="$emit('on-item-delete')"
      color="negative"
      class="q-ml-sm"
      :icon="biTrash"
      flat
      round
    >
      <q-tooltip class="bg-negative">
        {{ t('base.delete') }}
      </q-tooltip>
    </q-btn>
    <slot name="additionalBtn" />
  </div>
</template>
<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { biClipboard, biEye, biPencil, biTrash } from '@quasar/extras/bootstrap-icons';

withDefaults(
  defineProps<{
    isHaveManagePermission: boolean;
    isHaveViewPermission: boolean;
    editButton?: boolean;
    copyButton?: boolean;
    deleteButton?: boolean;
  }>(),
  {
    editButton: true,
    copyButton: true,
    deleteButton: true,
  },
);
const { t } = useLang();
defineEmits(['on-item-click', 'on-item-copy', 'on-item-delete']);
</script>
<style scoped lang="scss"></style>
