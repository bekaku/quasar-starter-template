<script setup lang="ts">
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import SkeletonItem from '@/components/skeleton/SkeletonItem.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useAxios } from '@/composables/useAxios';
import { useLang } from '@/composables/useLang';
import type { IApiListResponse, Permission } from '@/types/models';
import { biCode, biExclamationCircleFill } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import { ref } from 'vue';

const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Use axios | ${t('app.name')}`);

const { callAxios } = useAxios();
const reponseApiItem = ref<IApiListResponse<Permission> | null>(null);
const reaponseApiLoading = ref<boolean>(false);

const reponseListItems = ref<Permission[] | null>(null);
const reponseListLoading = ref<boolean>(false);

const reponseObject = ref<Permission | null>(null);
const reponseObjectLoading = ref<boolean>(false);

const responseError = ref<any>();
const responseErrorLoading = ref<boolean>(false);

const fetchResponseApi = async () => {
  reaponseApiLoading.value = true;
  reponseApiItem.value = await callAxios<IApiListResponse<Permission>>({
    API: '/api/permission?page=0&size=10&sort=code,asc',
    method: 'GET',
  });
  reaponseApiLoading.value = false;
};
const fetchResponseList = async () => {
  reponseListLoading.value = true;
  reponseListItems.value = await callAxios<Permission[]>({
    API: '/api/permission/findAllBackendPermission',
    method: 'GET',
  });
  reponseListLoading.value = false;
};
const fetchResponseObject = async () => {
  reponseObjectLoading.value = true;
  reponseObject.value = await callAxios<Permission>({
    API: '/api/permission/1',
    method: 'GET',
  });
  reponseObjectLoading.value = false;
};
const fetchError = async () => {
  /* alternative
    try {
        await callAxios<Permission[]>({
            API: '/api/permission/notfound_url',
            method: 'GET',
        });
    } catch (error) {
        responseError.value = JSON.stringify(error);
        console.warn('use-axios > fetchError', error)
    }
    */

  responseErrorLoading.value = true;
  callAxios<Permission[]>({
    API: '/api/permission/notfound_url',
    method: 'GET',
  })
    .then((response) => {
      console.log('use-axios > fetch OK', response);
    })
    .catch((error) => {
      responseError.value = JSON.stringify(error);
      console.warn('use-axios > fetchError > catch', error);
    })
    .finally(() => {
      console.log('use-axios > fetchError > finally');
      responseErrorLoading.value = false;
    });
};
/* 
// DELETE 
csont deleteResponse:ResponseMessage = await callAxios<ResponseMessage>({
    API: `/api/permission/${id}`,
    method: 'DELETE',
});

// POST
csont postResponse:Permission = await callAxios<Permission>({
    API: '/api/permission',
    method: 'POST',
    body: {
        permission: {
            code: 'Test',
            description: 'Test'
        }
    },
});
// PUT
csont putResponse:Permission = await callAxios<Permission>({
    API: `/api/permission/${id}`,
    method: 'PUT',
    body: {
        permission: {
            id: 1,
            code: 'Test',
            description: 'Test'
        }
    },
});
*/
</script>

<template>
  <BasePage>
    <BaseCard title="useAxios">
      <template #end>
        <q-item-section side>
          <BaseButton
            href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/composables/use-axios.vue"
            target="_blank"
            :icon="biCode"
            flat
            round
          >
          <BaseTooltip>View Source</BaseTooltip>
        </BaseButton>
        </q-item-section>
      </template>
      <q-card-section>
        <BaseAlert
          type="is-warning"
          :icon="biExclamationCircleFill"
          message="You need to work with your API, you can use my Java Springboot REST API from the link https://github.com/bekaku/java-spring-boot-starter"
          :closeable="false"
        />
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <BaseCard flat>
              <q-card-section class="q-gutter-y-md">
                <BaseButton outline label="Fetch response API" @click="fetchResponseApi" />
                <SkeletonItem v-if="reaponseApiLoading" show-header :items="5" />
                <div
                  v-else
                  style="max-height: 250px; overflow: auto"
                  class="bg-black text-light-green-13"
                >
                  <pre>
                                {{ reponseApiItem }}
                            </pre
                  >
                </div>
              </q-card-section>
            </BaseCard>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseCard flat>
              <q-card-section class="q-gutter-y-md">
                <BaseButton outline label="Fetch response LIST" @click="fetchResponseList" />
                <SkeletonItem v-if="reponseListLoading" show-header :items="5" />
                <div
                  v-else
                  style="max-height: 250px; overflow: auto"
                  class="bg-black text-light-green-13"
                >
                  <pre>
                                {{ reponseListItems }}
                            </pre
                  >
                </div>
              </q-card-section>
            </BaseCard>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseCard flat>
              <q-card-section class="q-gutter-y-md">
                <BaseButton outline label="Fetch response Object" @click="fetchResponseObject" />
                <SkeletonItem v-if="reponseObjectLoading" show-header :items="5" />
                <div
                  v-else
                  style="max-height: 250px; overflow: auto"
                  class="bg-black text-light-green-13"
                >
                  <pre>
                                {{ reponseObject }}
                            </pre
                  >
                </div>
              </q-card-section>
            </BaseCard>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseCard flat>
              <q-card-section class="q-gutter-y-md">
                <BaseButton
                  color="negative"
                  outline
                  label="Fetch ERROR handling"
                  @click="fetchError"
                />

                <SkeletonItem v-if="responseErrorLoading" show-header :items="5" />
                <div v-else style="overflow: auto" class="bg-black text-red">
                  <pre>
                                        {{ JSON.stringify(responseError) }}
                                    </pre
                  >
                </div>
              </q-card-section>
            </BaseCard>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
