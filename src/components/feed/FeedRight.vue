<template>
  <div class="q-mx-md">
    <q-scroll-area
      :style="{ height: 90 + 'vh', width: FeedSectionWidth + 'px' }"
    >
      <section-recent-prized />
      <section-leaderboard />
      <section-recommend-themes class="q-mt-md" />
      <section-hash-tag-trends class="q-mt-md" />
      <section-today-most-view class="q-mt-md" />
      <site-link />
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import SiteLink from '@/components/SiteLink.vue';
import SectionLeaderboard from '@/components/feed/SectionLeaderboard.vue';
import SectionRecommendThemes from '@/components/feed/SectionRecommendThemes.vue';
import SectionHashTagTrends from '@/components/feed/SectionHashTagTrends.vue';
import SectionTodayMostView from '@/components/feed/SectionTodayMostView.vue';
import SectionRecentPrized from '@/components/feed/SectionRecentPrized.vue';
import { FeedSectionWidth } from 'src/utils/constant';
</script>
