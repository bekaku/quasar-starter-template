<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue';
</script>

<template>
    <Suspense>
        <template #default>
            <slot />
        </template>
        <template #fallback>
            <slot name="fallback">
                <div class="text-center">
                    <BaseSpinner />
                </div>
            </slot>
        </template>
    </Suspense>
</template>