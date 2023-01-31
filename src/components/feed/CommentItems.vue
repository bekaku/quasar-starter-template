<template>
  <q-list>
    <comment-item />
    <comment-item style="padding-left: 10%" />
  </q-list>
  <q-btn label="Load more comments..." class="text-capitalize q-ma-sm" flat />
</template>

<script setup lang="ts">
import CommentItem from 'src/components/feed/CommentItem.vue';
</script>
