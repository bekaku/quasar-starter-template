<template>
  <q-item>
    <q-item-section avatar top>
      <q-avatar size="36px">
        <q-img :src="AvatarPlaceHolder128" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">
        <span class="cursor-pointer text-weight-bold">Chanavee Bekaku</span>
        <span class="text-muted text-caption q-ml-sm">June 28 at 8:40 PM</span>
      </q-item-label>
      <q-item-label>
        <div
          :class="
            $q.dark.isActive
              ? 'text-grey-1 bg-grey-10'
              : 'text-grey-9 bg-grey-2'
          "
          class="q-pa-md"
          style="border-radius: 15px"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-item-label>
      <q-item-label lines="1">
        <div class="row q-my-sm">
          <div class="q-pr-sm">
            <app-link label="Love it" class="text-caption" />
            <span class="q-mx-sm">
              <q-icon :name="biHeart" />
              <span class="text-caption text-muted q-ml-xs">1.9k</span>
            </span>
          </div>
          <q-separator vertical />
          <div class="q-pl-sm">
            <app-link label="Reply it" class="text-caption" />
            <span class="q-mx-sm">
              <span class="text-caption text-muted q-ml-xs">1.9k</span>
            </span>
          </div>
        </div>
      </q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-btn dense :icon="biThreeDots" size="sm" flat round />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { AvatarPlaceHolder128 } from 'src/utils/constant';
import { biHeart, biThreeDots } from '@quasar/extras/bootstrap-icons';
import AppLink from 'src/components/base/AppLink.vue';
</script>
