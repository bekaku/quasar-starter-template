<script setup lang="ts">
import type { FileManagerDto, ImageDto, UserProfileDto } from '@/types/models';
import BaseImageView from './BaseImageView.vue';
import { useDevice } from 'src/composables/useDevice';
const { showDeleteImage = false, maximized = true, fetch = false, showArrow = true, files = [], images = [], selectedIndex = 0 } = defineProps<{
    showDeleteImage?: boolean
    maximized?: boolean
    fetch?: boolean
    showArrow?: boolean
    user?: UserProfileDto
    files?: FileManagerDto[]
    images?: ImageDto[]
    selectedIndex?: number
}>();
const emit = defineEmits<{
    'on-close': []
    'on-before-hide': []
    'on-delete': [index: number]
}>()
const modelValue = defineModel<boolean>({ default: false });

const { isSmallScreen } = useDevice();
const onClose = () => {
    modelValue.value = false;
    emit('on-close');
};
</script>
<template>
    <q-dialog :model-value="modelValue" :maximized="maximized || isSmallScreen" full-width full-height @hide="onClose"
        @before-hide="$emit('on-before-hide')">
        <base-image-view :files :selected-index :show-delete-image :show-arrow :fetch="fetch" :images="images"
            @on-delete="(index: number) => $emit('on-delete', index)" @on-close="onClose" />
    </q-dialog>
</template>
<style lang="scss" scoped>
.slide-img {
    max-width: 960px;
}
</style>