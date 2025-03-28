<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biArrowUpRight } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import UserCard from 'src/components/user/UserCard.vue';
import UserItem from 'src/components/user/UserItem.vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`User | ${t('app.name')}`);
</script>

<template>
  <BasePage>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-md">
        <BaseTextHeader title="User list" />
        <BaseCard>
          <q-card-section>
            <UserItem
              :avatar="{
                src: 'https://cdn.quasar.dev/img/avatar1.jpg',
                size: '42px',
              }"
              name="John Doe"
              description="Software engineer"
            />
            <UserItem
              name="John Doe"
              description="Clickable"
              clickable
              :avatar="{
                src: 'https://cdn.quasar.dev/img/avatar2.jpg',
                size: '42px',
                badge: { color: 'negative', rounded: true },
              }"
            >
              <template #end>
                <BaseButton :icon="biArrowUpRight" label="Slot end" icon-size="18px" outline />
              </template>
            </UserItem>
            <UserItem
              :avatar="{
                src: 'https://cdn.quasar.dev/img/avatar3.jpg',
                size: '42px',
                badge: { color: 'positive', cssStyle: { top: '30px' } },
              }"
              name="John Doe"
              description="Software engineer"
            />
            <UserItem
              :avatar="{
                src: 'https://cdn.quasar.dev/img/avatar4.jpg',
                size: '42px',
                badge: { color: 'positive', text: 'new' },
              }"
              name="John Doe"
              description="Software engineer"
            />
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-6 q-pa-md">
        <BaseTextHeader title="User card" />
        <BaseCard>
          <UserCard
            flat
            cover-image="https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            :avatar="{
              src: 'https://i.pravatar.cc/450',
            }"
            name="Chanavee Bekaku"
            description="Software Engineer"
            height="125px"
            avatar-top="50px"
            avatar-size="58px"
            :description-style="{ marginTop: '5px' }"
          />
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
