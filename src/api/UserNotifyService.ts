import type {
  RefreshTokenRequest,
  NotificationCount,
  NotificationDto,
} from '@/types/models';
import { useAxios } from '@/composables/useAxios';
export default () => {
  const { callAxios } = useAxios();
  const updateFcmSetting = async (
    refreshToken: RefreshTokenRequest
  ): Promise<void> => {
    // await callAxios<void>({
    //   API: '/api/userNotify/updateFcmSetting',
    //   method: 'PUT',
    //   body: refreshToken,
    // });
  };
  const refreshFcmToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<void> => {
    // await callAxios<void>({
    //   API: '/api/userNotify/refreshFcmToken',
    //   method: 'PUT',
    //   body: refreshToken,
    // });
  };

  const findAllByUser = async (
    page: number,
    size: number
  ): Promise<NotificationDto[] | null> => {
    // return await callAxios<NotificationDto[]>({
    //   API: `/api/userNotify/findAllByUser?page=${page}&size=${size}`,
    //   method: 'GET',
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1500);
    });
  };
  const findCountAllNotRead = async (
    lastNOtifyId: number
  ): Promise<NotificationCount | null> => {
    // return await callAxios<NotificationCount>({
    //   API: `/api/userNotify/findCountAllNotRead?lastestNotifyId=${lastNOtifyId}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const updateReadNotify = async (notifyId: number): Promise<void | null> => {
    // return await callAxios<void>({
    //   API: `/api/userNotify/updateReadNotify/${notifyId}`,
    //   method: 'PUT',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const updateReadNotifyAll = async (): Promise<void | null> => {
    // return await callAxios<void>({
    //   API: '/api/userNotify/updateReadNotifyAll',
    //   method: 'PUT',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  return {
    updateFcmSetting,
    refreshFcmToken,
    findAllByUser,
    findCountAllNotRead,
    updateReadNotify,
    updateReadNotifyAll,
  };
};
