  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { Geolocation } from '@capacitor/geolocation';
  import { biGeoAlt, biPinMap } from '@quasar/extras/bootstrap-icons';
  import { useLang } from '@/composables/useLang';
  import BaseGoogleMapEmbed from '@/components/base/BaseGoogleMapEmbed.vue';
  
  const { preview = false, previewSrc } = defineProps<{
    title?: string | undefined
    previewSrc?: string | undefined | null
    preview?: boolean | undefined
    height?: number | undefined
    zoom?: number | undefined
  }>();
  const { t } = useLang();
  const modelValue = defineModel<string | undefined>();
  onMounted(() => {
    if (!modelValue.value && !preview) {
      setCurrentPosition();
    } else if (previewSrc) {
      modelValue.value = previewSrc;
    }
  });
  const setCurrentPosition = async () => {
    const geo = await Geolocation.getCurrentPosition();
    if (geo && geo.coords) {
      modelValue.value = geo.coords.latitude + ',' + geo.coords.longitude;
    }
  };
  </script>
  <template>
    <div v-bind="$attrs">
      <slot name="top" />
      <q-input
        v-if="!preview"
        readonly
        bottom-slots
        v-model="modelValue"
        :label="title ? title :t('base.coordinates')"
      >
        <template #before>
          <q-icon :name="biPinMap" />
        </template>
  
        <template #append>
          <q-btn
            flat
            dense
            :icon="biGeoAlt"
            @click="setCurrentPosition"
          >
            <q-tooltip>
              {{ t('base.reCoordinatesSet') }}
            </q-tooltip>
          </q-btn>
          <slot name="side" />
        </template>
      </q-input>
      <div v-if="modelValue">
        <BaseGoogleMapEmbed :lat-long="modelValue" :height="height" :zoom="zoom" />
      </div>
    </div>
  </template>