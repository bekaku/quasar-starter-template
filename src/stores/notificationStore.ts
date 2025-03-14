import { defineStore } from 'pinia';
import type { NotificationCount } from '@/types/models';
import { useCache } from '@/composables/useCache';
import { ref } from 'vue';
export const useNotificationStore = defineStore('notificationStore', () => {
  const { cacheNotifyCount } = useCache();
  const notify = ref<NotificationCount>({
    lastestId: 0,
    totalNotify: 0,
  });
  const setNotify = (n: NotificationCount) => {
    notify.value.totalNotify = n.totalNotify;
    notify.value.lastestId = n.lastestId;
  };
  const setLastNotify = (n: number) => {
    cacheNotifyCount.value.lastestId = n;
  };
  return {
    notify,
    setNotify,
    setLastNotify,
  };
});
