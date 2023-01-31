<template>
  <div :class="$q.screen.gt.sm ? 'q-mx-md' : ''">
    <q-scroll-area
      :style="{ height: 90 + 'vh', width: FeedSectionWidth + 'px' }"
    >
      <q-card
        flat
        bordered
        class="q-mb-md"
        :style="{ width: `${FeedSectionWidth}px` }"
      >
        <profile-card
          :avatar-image="authenStore.loginedAvatar"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          description="Software Engineer"
          height="100px"
          avatar-top="35px"
          avatar-size="65px"
          descriptionStyle="margin-top:5px"
          show-medal
        />
      </q-card>
      <section-saved-post v-if="$q.screen.gt.sm" />
      <section-followwing-tag v-if="$q.screen.gt.sm" class="q-mt-md" />
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from '@/components/feed/ProfileCard.vue';
import SectionSavedPost from '@/components/feed/SectionSavedPost.vue';
import SectionFollowwingTag from '@/components/feed/SectionFollowwingTag.vue';
import { useAuthenStore } from 'stores/authenStore';
import { FeedSectionWidth } from 'src/utils/constant';
const authenStore = useAuthenStore();
</script>
