<template>
  <div :class="screen.gt.sm ? 'q-mx-md' : ''">
    <q-scroll-area :style="{ height: 90 + 'vh', width: FeedSectionWidth + 'px' }">
      <BaseCard :style="{ width: `${FeedSectionWidth}px` }">
        <UserCard
          v-if="authenStore.auth"
          :avatar="{
            src: authenStore.auth?.avatar?.image,
          }"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          description="Software Engineer"
          height="100px"
          avatar-top="35px"
          avatar-size="65px"
          :description-style="{ marginTop: '5px' }"
        />
      </BaseCard>
      <section-saved-post v-if="screen.gt.sm" />
      <section-followwing-tag v-if="screen.gt.sm" class="q-mt-md" />
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import SectionFollowwingTag from '@/components/feed/SectionFollowwingTag.vue';
import SectionSavedPost from '@/components/feed/SectionSavedPost.vue';
import { useAuthenStore } from '@/stores/authenStore';
import { FeedSectionWidth } from '@/libs/constant';
import { useQuasar } from 'quasar';
import BaseCard from '../base/BaseCard.vue';
import UserCard from '../user/UserCard.vue';
const authenStore = useAuthenStore();
const { screen } = useQuasar();
</script>
