<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biCode } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import BasePage from 'src/components/base/BasePage.vue';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Blang page | ${t('app.name')}`);
const items = ref<any[]>([]);

const generateItems = () => {
  let count = items.value.length;
  for (let i = 0; i < 40; i++) {
    count++;
    items.value.push({
      id: count,
      label: 'Option ' + count,
    });
  }
};
generateItems();
const nextPage = (index: number, done: any) => {
  setTimeout(() => {
    generateItems();
    if (done != undefined) {
      done();
    }
  }, 500);
};
</script>
<template>
  <BasePage scroll-event show-to-top>
    <BaseCard title="Infinite scroll">
      <template #end>
        <BaseButton
          href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/infinite-scroll.vue"
          target="_blank"
          :icon="biCode"
          flat
          round
        >
          <q-tooltip>View Source</q-tooltip>
        </BaseButton>
      </template>
      <BaseInfiniteScroll @on-infinite="nextPage">
        <q-list dense>
          <q-item v-for="(item, index) in items" :key="item.id" clickable>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
            <q-item-section side>
              <q-chip> #{{ index }} </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </BaseInfiniteScroll>
    </BaseCard>
  </BasePage>
</template>
