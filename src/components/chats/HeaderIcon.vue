<script setup lang="ts">
import { biChat } from '@quasar/extras/bootstrap-icons';
</script>

<template>
    <q-btn round dense flat to="/chats">
        <q-icon :name="biChat" />
        <q-badge color="negative" rounded text-color="white" floating>
            99+
        </q-badge>
    </q-btn>
</template>

<style scoped lang="scss"></style>
