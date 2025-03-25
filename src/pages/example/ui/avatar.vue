<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseAvatarGroup from '@/components/base/BaseAvatarGroup.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import { biArrowUpRight } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import UserItem from 'src/components/user/UserItem.vue';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Avatar | ${t('app.name')}`);
const authenStore = useAuthenStore();
const items = ref<string[]>([
  'https://cdn.quasar.dev/img/avatar1.jpg',
  'https://cdn.quasar.dev/img/avatar2.jpg',
  'https://cdn.quasar.dev/img/avatar3.jpg',
  'https://cdn.quasar.dev/img/avatar4.jpg',
  'https://cdn.quasar.dev/img/avatar5.jpg',
  'https://cdn.quasar.dev/img/avatar6.jpg',
  'https://cdn.quasar.dev/img/avatar7.jpg',
  'https://cdn.quasar.dev/img/avatar8.jpg',
]);
const getTooltipBy = (index: number) => {
  return items.value[index];
};
</script>

<template>
  <BasePage :full="false">
    <BaseCard title="Avatar" hover>
      <q-card-section>
        <div class="text-3xl">
          Hey there! I've heard about Vue. Any cool tips for getting started?
        </div>
        <div class="row q-pa-md q-gutter-md">
          <base-avatar
            v-if="authenStore.auth?.avatar?.image"
            :src="authenStore.auth?.avatar?.image"
            fetch-image
          />
          <base-avatar src="https://cdn.quasar.dev/img/avatar2.jpg" size="64px" />

          <base-avatar rounded src="https://cdn.quasar.dev/img/avatar1.jpg" size="64px" />

          <base-avatar square src="https://cdn.quasar.dev/img/avatar3.jpg" size="64px" />
          <!-- <div style="border: 4px solid #23d160;border-radius: 50%;">
                          <base-avatar src="https://cdn.quasar.dev/img/avatar6.jpg" size="120px" />
                      </div> -->
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar6.jpg"
            bordered
            bordered-color="#23d160"
            bordered-width="4px"
            size="64px"
            class="shadow-10"
          />
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar4.jpg"
            size="64px"
            :badge="{ color: 'primary', text: 'new' }"
          />
          <base-avatar
            src="https://cdn.quasar.dev/img/avatar5.jpg"
            bordered
            size="42px"
            :badge="{
              color: 'positive',
              rounded: true,
              transparent: true,
              cssClass: 'absolute-top-right',
              cssStyle: { top: '2px' },
            }"
          />
        </div>

        <div class="row q-gutter-x-xl">
          <base-avatar-group :items="items" :limit="5" size="42px">
            <template #extra="{ index }">
              <q-tooltip>
                {{ getTooltipBy(index) }}
              </q-tooltip>
            </template>
          </base-avatar-group>
          <base-avatar-group :items="items" :limit="5" size="42px" boder-color="#00a0dc" />
        </div>
      </q-card-section>
    </BaseCard>
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseCard title="User list">
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
              <BaseButton flat :icon="biArrowUpRight" label="Slot end" light />
            </template>
          </UserItem>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
