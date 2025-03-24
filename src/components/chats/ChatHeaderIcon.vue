<script setup lang="ts">
import { biChat } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import ChatNotificationList from './ChatNotificationList.vue';
const { screen } = useQuasar();
</script>

<template>
  <q-btn v-if="!screen.gt.xs" round dense flat to="/example/chats">
    <q-icon :name="biChat" />
    <q-badge color="negative" rounded text-color="white" floating> 99+ </q-badge>
  </q-btn>
  <q-btn v-else round dense flat>
    <q-icon :name="biChat" />
    <q-badge color="negative" rounded text-color="white" floating> 99+ </q-badge>

    <q-menu style="width: 350px">
      <ChatNotificationList />
    </q-menu>
  </q-btn>
</template>

<style scoped lang="scss"></style>
