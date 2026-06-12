<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import BasePage from '@/components/base/BasePage.vue';
import BaseButton from '@/components/base/BaseButton.vue';
</script>
<template>
  <BasePage>
    <BaseCard title="Signup page">
      <template #end>
        <BaseButton label="Back" to="/auth/login" />
      </template>
      <q-card-section>
        <div class="row q-gutter-lg">
          This is Signup page.
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
