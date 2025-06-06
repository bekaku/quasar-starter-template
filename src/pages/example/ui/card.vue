<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biMusicNote, biPlusCircle, biSearch } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Card | ${t('app.name')}`);
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>

<template>
  <BasePage>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Simple">
          <template #end>
            <div class="row q-gutter-sm">
              <BaseButton :icon="biSearch" round flat />
              <BaseButton :icon="biPlusCircle" round flat />
            </div>
          </template>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Hover" subtitle="This is subtitle" :icon="biMusicNote" hover>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Flat" flat>
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Borderless" flat :bordered="false">
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard title="Actions">
          <q-card-section>
            {{ lorem }}
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <BaseCard>
          <img src="https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
