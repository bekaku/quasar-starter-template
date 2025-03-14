<script setup lang="ts">
import UserService from '@/api/UserService';
import { useAppMeta } from '@/composables/useAppMeta';
import { AppAuthTokenKey } from '@/libs/constant';
import { getTokenStatus } from '@/utils/jwtUtil';
import { Cookies } from 'quasar';
import { onBeforeUnmount, onMounted, ref } from 'vue';

useAppMeta({
  additionalTitle: 'Test Page',
});
const { findCurrentUserData } = UserService();
const src = ref(
  'http://localhost:8080/cdn/images/202211/145_1668642842865_fe718909cb0d4bd88e17c8568fe12e2f.jpg',
);
const interVal = ref();
const interVal2 = ref();
const interVal3 = ref();
const interVal4 = ref();
const interVal5 = ref();
const timeout = 500;
const totalRequest = 20;
const test = ref<boolean>(false);
onMounted(async () => {
  console.log('onMounted');
});

const start = () => {
  // interVal.value = setInterval(fetchData, timeout);
  // interVal2.value = setInterval(fetchData, timeout);
  // interVal3.value = setInterval(fetchData, timeout);
  // interVal4.value = setInterval(fetchData, timeout);
  // interVal5.value = setInterval(fetchData, timeout);
  for (let i = 0; i < totalRequest; i++) {
    fetchData();
  }
};
const stop = () => {
  if (interVal.value) {
    clearInterval(interVal.value);
    interVal.value = null;
  }
  if (interVal2.value) {
    clearInterval(interVal2.value);
    interVal2.value = null;
  }
  if (interVal3.value) {
    clearInterval(interVal3.value);
    interVal3.value = null;
  }
  if (interVal4.value) {
    clearInterval(interVal4.value);
    interVal4.value = null;
  }
  if (interVal5.value) {
    clearInterval(interVal5.value);
    interVal5.value = null;
  }
};
const fetchData = async () => {
  const res = await findCurrentUserData();
  console.log('res', res);
};
const testJwt = async () => {
  const currentToken = Cookies.get(AppAuthTokenKey);
  if (currentToken) {
    const currentExpireStatus = await getTokenStatus(currentToken);
    console.log('currentExpireStatus', 'currentToken', currentToken, currentExpireStatus);
  }
};
</script>
<template>
  <div class="q-pa-md">
    <q-card flat bordered class="wee-container-responsive-center">
      <q-card-section>
        <q-btn @click="fetchData()"> Fetch</q-btn>

        <q-btn @click="start()"> start</q-btn>
        <q-btn @click="stop()" color="negative"> stop</q-btn>

        <q-btn @click="testJwt()" color="blue"> JWT TEST</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>
