<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useLang } from '@/composables/useLang';
import { useAppStore } from '@/stores/appStore';
import type { ICrudAction } from '@/types/common';
import { biArrowLeft, biFile, biPencil, biTrash } from '@quasar/extras/bootstrap-icons';
import { pascalToSnake } from 'src/utils/appUtil';
import { computed } from 'vue';
const {
  crudName,
  managePermission,
  byPassPermission = false,
  listPermission,
  icon = biFile,
  loading = false,
  showBack = true,
  showActionText = true,
  fullWidth = true,
  editButton = true,
  deleteButton = true,
  copyButton = false,
  buttonSize = 'md',
  crudAction,
} = defineProps<{
  crudName?: string | undefined;
  listPermission?: string[];
  managePermission?: string[];
  byPassPermission?: boolean;
  title?: string;
  icon?: string;
  loading?: boolean;
  showBack?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  crudAction?: ICrudAction;
  showActionText?: boolean;
  fullWidth?: boolean;
  editButton?: true;
  deleteButton?: true;
  copyButton?: boolean;
  buttonSize?: string;
}>();
defineEmits(['on-back', 'on-submit', 'on-delete']);
const { t } = useLang();
const appStore = useAppStore();
const isHaveManagePermission = computed(() => {
  if (byPassPermission) {
    return true;
  }
  return managePermission
    ? appStore.isHavePermission(managePermission)
    : crudName
      ? appStore.isHavePermission([`${pascalToSnake(crudName)}_manage`])
      : true;
});
const isHaveListPermission = computed(() => {
  if (byPassPermission) {
    return true;
  }
  return listPermission
    ? appStore.isHavePermission(listPermission)
    : crudName
      ? appStore.isHavePermission([`${pascalToSnake(crudName)}_list`])
      : true;
});
</script>
<template>
  <q-card flat bordered class="wee-container-responsive-center">
    <q-card-section>
      <slot name="crudFromToolbar">
        <q-toolbar>
          <BaseButton
            v-if="isHaveListPermission && showBack"
            @click="$emit('on-back')"
            flat
            round
            :icon="biArrowLeft"
          >
            <q-tooltip>
              {{ t('base.back') }}
            </q-tooltip>
          </BaseButton>
          <q-toolbar-title>
            <template v-if="crudAction && showActionText">
              {{
                crudAction === 'new'
                  ? t('base.addNew')
                  : crudAction === 'view'
                    ? t('base.edit')
                    : t('base.copy')
              }}
            </template>
            {{ title }}
          </q-toolbar-title>
          <slot name="toolbarAction">
            <q-icon size="md" :name="icon" />
          </slot>
        </q-toolbar>
      </slot>
    </q-card-section>
    <slot name="crudFrom">
      <q-form @submit="$emit('on-submit')" class="q-gutter-md">
        <slot name="crudFromContent" />

        <slot name="crudAction">
          <q-separator />
          <q-card-section align="center" class="q-gutter-sm">
            <BaseButton
              v-if="isHaveManagePermission && showEdit"
              unelevated
              :icon="biPencil"
              :label="t('base.save') + (crudAction === 'view' ? t('base.edit') : '')"
              type="submit"
              :loading="loading"
              color="primary"
            />
            <BaseButton
              v-if="crudAction === 'view' && isHaveManagePermission && showDelete"
              unelevated
              :icon="biTrash"
              :label="t('base.delete')"
              color="negative"
              :loading="loading"
              @click="$emit('on-delete')"
            />

            <BaseButton
              v-if="isHaveListPermission && showBack"
              :label="t('base.cancel')"
              @click="$emit('on-back')"
              flat
              class="q-ml-sm"
              :disable="loading"
            />
            <slot name="additionalCrudAction" />
          </q-card-section>
        </slot>
      </q-form>
    </slot>
  </q-card>
</template>
