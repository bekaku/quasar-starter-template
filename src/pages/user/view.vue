<template>
  <q-page padding>
    <crud-api-form
      :icon="biPerson"
      :title="t('model_user')"
      :crud-action="crudAction"
      :crud-name="crudName"
      :loading="loading"
      @on-back="onBack"
      @on-submit="onSubmit"
      @on-delete="onDelete"
    >
      <template #crudFromContent>
        <div class="row">
          <div v-if="entity.avatar" class="col-12 q-pa-md text-center">
            <q-avatar size="125px" class="shadow-5">
              <img :src="entity.avatar.thumbnail" all="user_img" />
            </q-avatar>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="100"
              v-model="entity.email"
              :label="t('model_user_email')"
              :rules="[required, requireEmail]"
            >
              <template #prepend>
                <q-icon :name="biEnvelope" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <q-input
              :readonly="loading"
              outlined
              counter
              maxlength="20"
              v-model="entity.username"
              :label="t('model_user_username')"
              :rules="[requireUsername]"
            >
              <template #prepend>
                <q-icon :name="biPerson" />
              </template>
            </q-input>
            <q-banner class="q-my-sm" :class="dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" dense>
              <template #avatar>
                <q-icon :name="biInfoCircle" color="primary" />
              </template>
              <p>
                {{
                  `${t('helper.username1')}, ${t('helper.username2')}, ${t(
                    'helper.username3',
                  )}, ${t('helper.username4')}, ${t('helper.username5')}`
                }}
              </p>
            </q-banner>
          </div>
          <div class="col-12 col-md-6 q-pa-md" v-if="crudAction != 'view'">
            <q-input
              :readonly="loading"
              outlined
              type="password"
              v-model="entity.password"
              :label="t('model_user_login_password')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biKey" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6 q-pa-md" v-if="crudAction == 'view'">
            <q-btn
              @click="showChangePasswordForm = true"
              flat
              color="primary"
              :icon="biKey"
              :label="t('base.changePassword')"
            />
          </div>

          <div class="col-12 col-md-6 q-pa-md">
            <form-togle :label="t('base.enable')" v-model="entity.active" />
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon :name="biPeople" size="sm" />
              {{ t('model_role') }}
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
              <q-scroll-area style="height: 250px">
                <q-list v-if="filteredList.length > 0" dense>
                  <q-item v-for="(p, index) in filteredList" :key="index" tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-model="entity.selectedRoles" :val="p.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ p.name ? p.name : 'unknown' }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-scroll-area>
            </q-card-section>
          </div>
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon color="positive" :name="biCheck" size="sm" />
              {{ t('userRoleSelected') }}
            </div>
            <q-card-section v-if="entity.selectedRoles">
              <q-scroll-area style="height: 250px">
                <q-list v-if="entity.selectedRoles.length > 0" dense>
                  <q-item v-for="(s, index) in entity.selectedRoles" :key="index" v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" :name="biCheck" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ findDisplayRoleById(s) }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn flat round color="negative" @click="removeRole(index)" :icon="biX" />
                    </q-item-section>
                  </q-item>
                </q-list>
                <template v-else>
                  <base-result status="empty" :description="t('userRoleNotFound')" />
                </template>
              </q-scroll-area>
            </q-card-section>
          </div>
        </div>
      </template>
    </crud-api-form>
    <change-password-form
      :dialog="showChangePasswordForm"
      :user-id="crudId"
      @on-close="showChangePasswordForm = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { useCrudForm } from '@/composables/useCrudForm';
import type { UserDto, Role } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import CrudApiForm from '@/components/base/CrudApiForm.vue';
import { useValidation } from '@/composables/useValidation';
import { useBase } from '@/composables/useBase';
import RoleService from '@/api/RoleService';
import {
  biPerson,
  biSearch,
  biEnvelope,
  biCheck,
  biX,
  biKey,
  biPeople,
  biInfoCircle,
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
const ChangePasswordForm = defineAsyncComponent(
  () => import('@/components/form/ChangePasswordForm.vue'),
);
const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));
const FormTogle = defineAsyncComponent(() => import('@/components/base/BaseToggle.vue'));
const { dark } = useQuasar();
const { t } = useLang();
const { required, requireEmail, requireUsername } = useValidation();
const { appLoading } = useBase();
const { findAllBackendRole } = RoleService();
const roles = ref<Role[]>([]);
const filterText = ref('');
const selectedAll = ref(false);
const {
  crudAction,
  onBack,
  loading,
  onSubmit,
  crudEntity,
  onDelete,
  preFectData,
  crudName,
  crudId,
} = useCrudForm<UserDto>(
  {
    crudName: 'AppUser',
    apiEndpoint: '/api',
    fectchDataOnLoad: false,
    backToPreviousPath: true,
  },
  {
    id: null,
    email: '',
    username: null,
    active: true,
    password: null,
    userData: null,
    selectedRoles: [],
  } as UserDto,
);
const entity = ref<UserDto>(crudEntity.value);
appLoading();
useAppMeta({
  additionalTitle: t('crudAction.' + crudAction.value),
});
onMounted(() => {
  onLoadData();
});
const onLoadData = async () => {
  const res = await findAllBackendRole();
  if (res) {
    roles.value = res;
  }
  await preFectData();
  entity.value = crudEntity.value;
  appLoading(false);
};
const filteredList = computed(() => {
  const list = roles.value;
  const search = filterText.value ? filterText.value.toLowerCase().trim() : null;
  if (!search) {
    return list;
  }
  return list.filter((c: Role) => c.name && c.name.toString().toLowerCase().includes(search));
});

const findDisplayRoleById = (id: number) => {
  const item = roles.value.find((p) => p.id === id);
  return item && item.name ? item.name : 'unknown';
};
const removeRole = (index: number) => {
  if (crudEntity.value && crudEntity.value.selectedRoles) {
    crudEntity.value.selectedRoles.splice(index, 1);
  }
};
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
  crudEntity.value.selectedRoles = [];
  if (val) {
    for (let i = 0; i < roles.value.length; i++) {
      const item = roles.value[i];
      if (item) {
        crudEntity.value.selectedRoles.push(item.id);
      }
    }
  }
};

// update user password
const showChangePasswordForm = ref(false);
</script>
