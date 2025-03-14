import UserNotifyService from '@/api/UserNotifyService';
import { useCache } from '@/composables/useCache';
import { useNotificationStore } from '@/stores/notificationStore';
import type { NotifyFunctionType } from '@/types/models';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
export const useNotification = () => {
  const { findCountAllNotRead } = UserNotifyService();
  const { cacheNotifyCount } = useCache();
  const notificationStore = useNotificationStore();
  const { notify } = storeToRefs(notificationStore);
  const { setNotify } = notificationStore;
  onMounted(() => {
    // test
    notify.value.totalNotify = 999;
  })
  const resetBadgeCount = () => {
    notify.value.totalNotify = 0;
    // if (notify.value && notify.value.totalNotify > 0) {
    //   setLastNotify(notify.value.lastestId);
    //   notify.value.totalNotify = 0;
    // }
  };

  const notificationLink = (
    functionCode: NotifyFunctionType | undefined,
    functionId: number | undefined
  ): string | undefined => {
    if (functionCode && functionId) {
      if (
        functionCode == 'LIKE_POST' ||
        functionCode == 'SHARE' ||
        functionCode == 'COMMENT_POST'
      ) {
        return `/post/view/${functionId}`;
      } else if (
        functionCode == 'LIKE_COMMENT'
      ) {
        return `/comment/view/${functionId}`;
      } else if (functionCode == 'COMMENT_REPLY') {
        return `/comment/view/${functionId}?isReply=1`;
      }
    }
  };
  const fetchNotReadNotify = async () => {
    const res = await findCountAllNotRead(
      cacheNotifyCount.value && cacheNotifyCount.value.lastestId
        ? cacheNotifyCount.value.lastestId
        : 0
    );
    if (res && res.lastestId && res.totalNotify) {
      setNotify(res);
    }
  };
  return {
    notify,
    setNotify,
    resetBadgeCount,
    notificationLink,
    fetchNotReadNotify,
  };
};
