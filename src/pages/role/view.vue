<template>
  <q-page padding>
    <crud-api-form
      :icon="biPeople"
      :title="t('model_role')"
      :crud-action="crudAction"
      :crud-name="crudName"
      :loading="loading"
      @on-back="onBack"
      @on-submit="onSubmit"
      @on-delete="onDelete"
    >
      <template #crudFromContent>
        <div class="row">
          <div class="col-12 q-pa-md">
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="125"
              v-model="crudEntity.name"
              :label="t('model_role_name')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biPeople" />
              </template>
            </q-input>
          </div>

          <!-- <div class="col-12 col-md-6 q-pa-md">
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="125"
              v-model="crudEntity.nameEn"
              :label="t('model_role_name_en')"
            >
              <template v-slot:prepend>
                <q-icon :name="biPeople" />
              </template>
            </q-input>
          </div> -->
          <div class="col-12 col-md-6 q-pa-md">
            <form-togle :label="t('base.enable')" v-model="crudEntity.active" />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <form-togle :label="t('model_permission_frontEnd')" v-model="crudEntity.frontEnd" />
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon :name="biShieldLock" size="sm" color="negative" />
              {{ t('model_permission') }}
            </div>
            <q-card-section>
              <q-input rounded filled outlined v-model="filterText" :label="t('base.search')">
                <template #prepend>
                  <q-checkbox v-model="selectedAll" @click="onCheckedAll">
                    <q-tooltip>
                      {{ !selectedAll ? t('base.selectAll') : t('base.deselectAll') }}
                    </q-tooltip>
                  </q-checkbox>
                </template>
                <template #append>
                  <q-icon :name="biSearch" />
                </template>
              </q-input>

              <q-scroll-area style="height: 450px">
                <q-list v-if="filteredList.length > 0" dense>
                  <q-item-label header>{{ t('crudPermission') }}</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(p, index) in filteredCrudList" :key="index" tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="p.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ p.description ? p.description : 'unknown' }}</q-item-label>
                      <q-item-label caption>
                        {{ p.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item-label header>{{ t('reportPermission') }}</q-item-label>
                  <q-separator spaced />
                  <q-item
                    v-for="(r, index) in filteredReportList"
                    :key="index"
                    tag="label"
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="r.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ r.description ? r.description : 'unknown' }}</q-item-label>
                      <q-item-label caption>
                        {{ r.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item-label header>{{ t('otherPermission') }}</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(o, index) in filteredOtherList" :key="index" tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="o.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ o.description ? o.description : 'unknown' }}</q-item-label>
                      <q-item-label caption>
                        {{ o.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item-label header>Frontend</q-item-label>
                  <q-separator spaced />
                  <q-item
                    v-for="(f, index) in filteredFrontendList"
                    :key="index"
                    tag="label"
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="f.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ f.description ? f.description : 'unknown' }}</q-item-label>
                      <q-item-label caption>
                        {{ f.code }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <template v-else>
                  <base-result status="empty" :description="t('error.dataNotfound')" />
                </template>
              </q-scroll-area>
            </q-card-section>
          </div>
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon color="positive" :name="biShieldCheck" size="sm" />
              {{ t('permissionGrant') }}
            </div>
            <q-card-section>
              <q-scroll-area style="height: 450px">
                <q-list v-if="crudEntity.selectdPermissions.length > 0" dense>
                  <q-item v-for="(s, index) in crudEntity.selectdPermissions" :key="index" v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" :name="biCheck" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ findDisplayPermissionById(s) }}</q-item-label>
                      <q-item-label caption>{{ findCodePermissionById(s) }} </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        flat
                        round
                        color="negative"
                        @click="removePermission(index)"
                        :icon="biX"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
                <template v-else>
                  <base-result
                    status="empty"
                    icon-size="55px"
                    :description="t('permissionNotFound')"
                  />
                </template>
              </q-scroll-area>
            </q-card-section>
          </div>
        </div>
      </template>
    </crud-api-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, defineAsyncComponent } from 'vue';
import { useLang } from '@/composables/useLang';
import { useCrudForm } from '@/composables/useCrudForm';
import type { Role, Permission } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import CrudApiForm from '@/components/base/CrudApiForm.vue';
import { useValidation } from '@/composables/useValidation';
import PermissionService from '@/api/PermissionService';
import { useBase } from '@/composables/useBase';
import FormTogle from '@/components/base/BaseToggle.vue';
import {
  biPeople,
  biCheck,
  biX,
  biSearch,
  biShieldLock,
  biShieldCheck,
} from '@quasar/extras/bootstrap-icons';
const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));
const { t } = useLang();
const { required } = useValidation();
const { appLoading } = useBase();
const { findAllBackendPermission, findAllFrontendPermission } = PermissionService();
const permissions = ref<Permission[]>([]);
const filterText = ref('');
const selectedAll = ref(false);

const entity: Role = {
  id: null,
  name: '',
  nameEn: null,
  active: true,
  frontEnd: false,
  companySelected: 0,
  selectdPermissions: [],
};
const { crudAction, onBack, loading, onSubmit, crudEntity, onDelete, preFectData, crudName } =
  useCrudForm<Role>(
    {
      crudName: 'AppRole',
      apiEndpoint: '/api',
      fectchDataOnLoad: false,
      backToPreviousPath: true,
    },
    entity,
  );
appLoading();
useAppMeta({
  additionalTitle: t('crudAction.' + crudAction.value),
});
onMounted(() => {
  onLoadData();
});
const onLoadData = async () => {
  const response = await findAllBackendPermission();
  if (response) {
    permissions.value = response;
  }

  const frontends = await findAllFrontendPermission();
  if (frontends) {
    permissions.value.push(...frontends);
  }

  await preFectData();
  appLoading(false);
};

const filteredList = computed(() => {
  const list = permissions.value;
  const search = filterText.value ? filterText.value.toLowerCase().trim() : null;
  if (!search) {
    return list;
  }
  return list.filter(
    (c: Permission) => c.description && c.description.toString().toLowerCase().includes(search),
  );
});

const filteredCrudList = computed(() =>
  filteredList.value.filter((c: Permission) => c.operationType === 1 && !c.frontEnd),
);
const filteredReportList = computed(() =>
  filteredList.value.filter((c: Permission) => c.operationType === 2 && !c.frontEnd),
);
const filteredOtherList = computed(() =>
  filteredList.value.filter((c: Permission) => c.operationType === 3 && !c.frontEnd),
);
const filteredFrontendList = computed(() =>
  filteredList.value.filter((c: Permission) => c.frontEnd),
);

const findDisplayPermissionById = (id: number) => {
  const item = permissions.value.find((p) => p.id === id);
  return item && item.description ? item.description : 'unknown';
};
const findCodePermissionById = (id: number) => {
  const item = permissions.value.find((p) => p.id === id);
  return item && item.code ? item.code : 'unknown';
};
const removePermission = (index: number) => {
  if (crudEntity.value && crudEntity.value.selectdPermissions) {
    crudEntity.value.selectdPermissions.splice(index, 1);
  }
};
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
  crudEntity.value.selectdPermissions = [];
  if (val) {
    for (let i = 0; i < permissions.value.length; i++) {
      const item = permissions.value[i];
      if (item) {
        crudEntity.value.selectdPermissions.push(item.id);
      }
    }
  }
};
</script>
