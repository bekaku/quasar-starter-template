<template>
  <q-page padding>
    <crud-api-form
      :icon="biShieldCheck"
      :title="t('model_permission')"
      :crud-name="crudName"
      :crud-action="crudAction"
      :loading="loading"
      @on-back="onBack"
      @on-submit="onSubmit"
      @on-delete="onDelete"
    >
      <template #crudFromContent>
        <!-- <q-form @submit="onSubmit" class="q-gutter-md"> -->
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <!-- :rules="[(val) => require(val)]" -->
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="125"
              v-model="crudEntity.code"
              :label="t('model_permission_name')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biShieldCheck" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="255"
              v-model="crudEntity.remark"
              :label="t('model_permission_description')"
            >
              <template #prepend>
                <q-icon :name="biPencil" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <form-togle useLabelTitle label="Frontend" v-model="crudEntity.frontEnd" />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <div class="q-px-sm">Permission type</div>
            <q-radio v-model="crudEntity.operationType" :val="1" label="Crud" />
            <q-radio v-model="crudEntity.operationType" :val="2" label="Report" />
            <q-radio v-model="crudEntity.operationType" :val="3" label="Other" />
          </div>
        </div>

        <!-- <q-separator />
          <q-card-actions align="center">
            <q-btn
              unelevated
              icon="mdi-content-save"
              :label="t('base.save')"
              type="submit"
              color="primary"
            />
            <q-btn
              :label="t('base.cancel')"
              @click="onBack"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-card-actions> -->
        <!-- </q-form> -->
      </template>
    </crud-api-form>
  </q-page>
</template>

<script setup lang="ts">
// import { onMounted } from 'vue';
import CrudApiForm from '@/components/base/CrudApiForm.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useCrudForm } from '@/composables/useCrudForm';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import type { Permission } from '@/types/models';
import { biPencil, biShieldCheck } from '@quasar/extras/bootstrap-icons';
import { defineAsyncComponent } from 'vue';
const FormTogle = defineAsyncComponent(() => import('@/components/base/BaseToggle.vue'));
const { t } = useLang();
const { required } = useValidation();
const entity: Permission = {
  id: null,
  code: '',
  remark: null,
  description: null,
  operationType: 1,
  frontEnd: false,
};
const { crudAction, onBack, loading, onSubmit, crudEntity, onDelete, crudName } =
  useCrudForm<Permission>(
    {
      crudName: 'permission',
      apiEndpoint: '/api',
      fectchDataOnLoad: true,
      backToPreviousPath: true,
    },
    entity,
  );

useAppMeta({
  additionalTitle: t('crudAction.' + crudAction.value),
});
</script>
