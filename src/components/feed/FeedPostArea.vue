<template>
  <q-card flat bordered>
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar size="48px" class="shadow-5">
            <q-img
              :src="authenStore.loginedAvatar"
              spinner-color="white"
              no-native-menu
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            style="padding: 15px; border-radius: 25px"
            class="cursor-pointer"
            :class="
              $q.dark.isActive
                ? 'wee-main-bg-color-theme-dark text-white'
                : 'bg-grey-3'
            "
            >{{ t('dSologan') }}</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-btn
            class="text-capitalize"
            :icon="biPencil"
            color="primary"
            label="Post it!"
            unelevated
            rounded
          />
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        class="text-capitalize"
        color="info"
        flat
        :icon="biCardImage"
        label="Photo"
      />
      <q-separator vertical />
      <q-btn
        class="text-capitalize"
        color="green"
        flat
        :icon="biPlayBtn"
        label="Video"
      />
      <q-separator vertical />
      <q-btn
        class="text-capitalize"
        color="orange"
        flat
        :icon="biPencilSquare"
        label="Write article"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from 'stores/authenStore';
import {
  biPencil,
  biCardImage,
  biPlayBtn,
  biPencilSquare,
} from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
const authenStore = useAuthenStore();
</script>
