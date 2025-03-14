<script setup lang="ts">
import {
    biEnvelope,
    biPerson,
    biShieldLock,
} from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from '@/types/common';
import BaseMenuItems from '../base/BaseMenuItems.vue';
import BasePage from '../base/BasePage.vue';
const navs: LabelValue<any>[] = [
    {
        label: '',
        children: [
            {
                icon: biPerson,
                translateLabel: true,
                label: 'page.settingsPublicProfile',
                to: '/settings',
                noActiveLink: true
            }
        ]
    },
    {
        label: 'Access',
        translateLabel: false,
        border: true,
        children: [
            {
                icon: biShieldLock,
                translateLabel: true,
                label: 'page.settingsSecurity',
                to: '/settings/security',
                noActiveLink: true
            },
            {
                icon: biEnvelope,
                translateLabel: true,
                label: 'contactInfo',
                to: '/settings/emails',
                noActiveLink: true
            }
        ]
    },
];
</script>
<template>
    <BasePage v-bind="$attrs">
        <div class="row">
            <div class="col-12 col-md-4 q-px-md">
                <BaseMenuItems :items="navs" />
            </div>

            <div class="col-12 col-md-8">
                <slot name="content" />
            </div>
        </div>
        <slot />
    </BasePage>
</template>