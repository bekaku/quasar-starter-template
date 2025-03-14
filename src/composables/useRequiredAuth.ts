import { useAppStore } from '@/stores/appStore';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useBase } from './useBase';
export const useRequiredAuth = () => {
  const { appGoto } = useBase();
  const route = useRoute();
  const appStore = useAppStore();
  watchEffect(async () => {
    const pageMeta = (route?.meta)
    if (pageMeta != undefined) {
      if (pageMeta?.requireAuth === true) {
        const permissions = pageMeta?.permission;
        const state = await appStore.isHavePermissionLazy(permissions as string[])
        if (!state) {
          appGoto('/error?code=401');
        }
      }
    }
  })
};
