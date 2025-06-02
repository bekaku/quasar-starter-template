<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTransitionWrapper from 'src/components/base/BaseTransitionWrapper.vue';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Transitions | ${t('app.name')}`);
const fade = ref(false);
const slideLeft = ref(false);
const slideRight = ref(false);
const slideUp = ref(false);
const slideDown = ref(false);
const zoom = ref(false);
const bounce = ref(false);

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
</script>
<template>
  <BasePage :full="false">
    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Fade">
            <template #end>
                <BaseButton :label="fade ? 'Hide me' : ' Show me'" @click="fade = !fade" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="fade">
              <div v-if="fade" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Slide Left">
            <template #end>
                <BaseButton :label="slideLeft ? 'Hide me' : ' Show me'" @click="slideLeft = !slideLeft" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="slide-left">
              <div v-if="slideLeft" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Slide Right">
            <template #end>
                <BaseButton :label="slideRight ? 'Hide me' : ' Show me'" @click="slideRight = !slideRight" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="slide-right">
              <div v-if="slideRight" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Slide Up">
            <template #end>
                <BaseButton :label="slideUp ? 'Hide me' : ' Show me'" @click="slideUp = !slideUp" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="slide-up">
              <div v-if="slideUp" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Slide Down">
            <template #end>
                <BaseButton :label="slideDown ? 'Hide me' : ' Show me'" @click="slideDown = !slideDown" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="slide-down">
              <div v-if="slideDown" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Zoom">
            <template #end>
                <BaseButton :label="zoom ? 'Hide me' : ' Show me'" @click="zoom = !zoom" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="zoom">
              <div v-if="zoom" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
      <div class="col-12 col-md-4 q-pa-md">
        <BaseCard title="Bounce">
            <template #end>
                <BaseButton :label="bounce ? 'Hide me' : ' Show me'" @click="bounce = !bounce" />
            </template>
          <q-card-section>
            <BaseTransitionWrapper name="bounce">
              <div v-if="bounce" class="div text-h5 q-pa-md">{{ text }}</div>
            </BaseTransitionWrapper>
          </q-card-section>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>
<style lang="css" scoped>
.div{
    overflow: hidden !important;
}
</style>