<script setup lang="ts">
import { biCopy, biEye, biFloppy, biPencil, biTrash } from '@quasar/extras/bootstrap-icons'
import { useLang } from 'src/composables/useLang';
import { appPreventDefult } from 'src/utils/appUtil';
import type { ICrudAction } from '@/types/common'
import BaseButton from './BaseButton.vue';
import BaseTooltip from './BaseTooltip.vue';

const {
  size = '12px',
  viewButton = true,
  editButton = true,
  copyButton = true,
  deleteButton = true,
  button = false,
  loading=false
} = defineProps<{
  isHaveManagePermission?: boolean
  isHaveViewPermission?: boolean
  viewButton?: boolean
  editButton?: boolean
  copyButton?: boolean
  deleteButton?: boolean
  size?: string
  button?: boolean
  crudAction?: ICrudAction
  loading?: boolean
}>()
const emit = defineEmits<{
  'on-item-click': [type: ICrudAction]
  'on-item-copy': []
  'on-item-delete': []
}>()
const { t } = useLang()
const onEditBtnBaseClick = (event: any, type: ICrudAction) => {
  appPreventDefult(event)
  emit('on-item-click', type)
}
const onEditBtnClick = (event: any, type: ICrudAction) => {
  onEditBtnBaseClick(event, type)
}
const onCopy = (event: any) => {
  appPreventDefult(event)
  emit('on-item-copy')
}
const onDelete = (event: any) => {
  appPreventDefult(event)
  emit('on-item-delete')
}
</script>
<template>
  <div
    v-if="isHaveManagePermission || isHaveViewPermission"
    :class="{ 'q-gutter-xs': !button, 'q-gutter-md': button }"
  >
    <BaseButton
      v-if="viewButton && isHaveViewPermission"
      :loading
      :icon="biEye"
      flat
      dense
      round
      :size="size"
      @click="onEditBtnBaseClick($event, 'view')"
    >
      <BaseTooltip v-if="!button">
        {{ t('base.view') }}
      </BaseTooltip>
    </BaseButton>
    <template v-if="editButton && isHaveManagePermission">
      <template v-if="!button">
        <BaseButton
          :icon="biPencil"
          flat
          dense
          round
          :size="size"
          type="button"
          @click="onEditBtnClick($event, 'edit')"
        >
          <BaseTooltip>
            {{ t('base.edit') }}
          </BaseTooltip>
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton
          v-if="crudAction === 'view'"
          :loading
          :icon="biPencil"
          :unelevated="button"
          color="primary"
          :outline="false"
          :size="size"
          :label="t('base.edit')"
          type="button"
          @click="onEditBtnClick($event, 'edit')"
        />
        <BaseButton
          v-else
          :loading
          :icon="biFloppy"
          unelevated
          color="positive"
          :size="size"
          :label="
            crudAction == 'edit' || crudAction == 'new' || crudAction == 'copy'
              ? t('base.save')
              : ''
          "
          type="submit"
        >
          <BaseTooltip v-if="!button">
            {{ t('base.edit') }}
          </BaseTooltip>
        </BaseButton>
      </template>
    </template>

    <BaseButton
      v-if="copyButton && isHaveManagePermission"
      :loading
      :icon="biCopy"
      :flat="!button"
      :dense="!button"
      :size="size"
      :outline="button"
      :label="!button || crudAction == undefined ? undefined : t('base.copy')"
      @click="onCopy"
    >
      <BaseTooltip v-if="!button">
        {{ t('base.copy') }}
      </BaseTooltip>
    </BaseButton>
    <BaseButton
      v-if="deleteButton && isHaveManagePermission && crudAction !== 'copy' && crudAction !== 'new'"
      color="negative"
      :loading
      :icon="biTrash"
      :flat="!button"
      :outline="false"
      :outline-color="!button ? undefined : 'negative'"
      :dense="!button"
      :round="!button"
      :size="size"
      :label="!button || crudAction == undefined ? undefined : t('base.delete')"
      @click="onDelete"
    >
      <BaseTooltip v-if="!button" color="negative">
        {{ t('base.delete') }}
      </BaseTooltip>
    </BaseButton>
    <slot name="additionalBtn" />
  </div>
</template>
