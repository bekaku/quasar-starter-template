import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { useLang } from '@/composables/useLang';
import type { AppException, RequestType, ResponseMessage } from '@/types/common';
import { isAppException, isServerException, isServerResponseMessage } from '@/utils/appUtil';
import { AppAuthTokenKey } from '@/libs/constant';
import { formatRelativeFromNow } from '@/utils/dateUtil';
import { biX } from '@quasar/extras/bootstrap-icons';
import type { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import { useSSRContext } from 'vue';

export const useAxios = () => {
  const { canSyncActiveStatusToServer } = useDevice();
  const { appToast, appLoading, isDevMode } = useBase();
  const { locale } = useLang();
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  // const reqHeader = () => {
  //   return {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //     'Accept-Apiclient': 'default',
  //     'Accept-Language': locale.value,
  //   };
  // };
  const validateServerResponse = <T>(res: T): Promise<T | null> => {
    if (!res) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    if (isAppException(res) || isServerException(res)) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    return new Promise((resolve) => {
      resolve(res);
    });
  };
  const notifyMessage = (response: AppException): void => {
    appLoading(false);
    appToast(
      `<strong>${response.message}</strong><br> ${response.errors?.join(
        '<br>'
      )}`,
      {
        multiLine: true,
        html: true,
        type: 'negative',
        timeout: 0,
        position: 'bottom-left',
        caption: formatRelativeFromNow(
          response.timestamp,
          locale.value as string
        ) || '',
        actions: [{ icon: biX, color: 'white' }]
      }
    );
  };
  const notifyServerMessage = (response: ResponseMessage): void => {
    if (!response.message) {
      return;
    }
    appLoading(false);
    appToast(response.message, {
      multiLine: true,
      html: true,
      type:
        response.status == 'OK' || response.status == 'CREATED'
          ? 'positive'
          : 'negative',
      timeout:
        response.status == 'OK' || response.status == 'CREATED'
          ? 3 * 1000
          : 10 * 1000,
      position: 'bottom-left',
      caption: formatRelativeFromNow(
        response.timestamp,
        locale.value as string
      ) || '',
      actions: [{ icon: biX, color: 'white' }]
    });
  };
  // const callAxiosV2 = async <T>(req: RequestType): Promise<T | null> => {
  //   return new Promise(async (resolve, reject) => {
  //     callAxios<T>(req)
  //       .then(async (response) => {
  //         const finalResponse = await validateServerResponse<T>(response);
  //         resolve(finalResponse);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };
  const callAxios = async <T>(req: RequestType): Promise<T | null> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      callAxiosProcess<T>(req)
        .then(async (response) => {
          if (response.status != 401 && response.status != 403) {
            exeptionNotify(response);
          }
          const finalResponse = await validateServerResponse<T>(response.data);
          resolve(finalResponse);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  // const callAxios = async <T>(req: RequestType): Promise<any> => {
  //   return new Promise(async (resolve, reject) => {
  //     callAxiosProcess<T>(req)
  //       .then((response) => {
  //         if (response.status != 401 && response.status != 403) {
  //           exeptionNotify(response);
  //         }
  //         resolve(response.data as T);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };
  const exeptionNotify = <T>(response: AxiosResponse<T>) => {
    if (response && response.data) {
      if (isAppException(response.data)) {
        notifyMessage(response.data);
      } else if (isServerResponseMessage(response.data)) {
        notifyServerMessage(response.data);
      }
    }
  };
  const callAxiosFile = async <T>(req: RequestType): Promise<any> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      callAxiosProcess<T>(req, false)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const callAxiosProcess = async <T>(req: RequestType, devLog: boolean = true): Promise<AxiosResponse<T>> => {
    const canSyncOnlineStatus = await canSyncActiveStatusToServer();
    return new Promise((resolve, reject) => {
      api.defaults.headers.Authorization = `Bearer ${cookies.get(AppAuthTokenKey)}`;
      // console.log('useAxios > callAxios :', req);
      if (req.baseURL != undefined) {
        api.defaults.baseURL = req.baseURL;
      } else {
        api.defaults.baseURL = process.env.APP_BASE_API || '';
      }

      if (req.contentType) {
        api.defaults.headers['Content-Type'] = req.contentType;
      } else {
        api.defaults.headers['Content-Type'] = 'application/json';
      }
      if (req.responseType) {
        api.defaults.responseType = req.responseType;
      } else {
        api.defaults.responseType = 'json';
      }

      api.defaults.headers['X-Sync-Active'] = canSyncOnlineStatus ? '1' : '0';
      api({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined
      }).then((response) => {
        if (isDevMode() && devLog) {
          console.log(`api ${api.defaults.baseURL}${req.API}`, response);
        }
        resolve(response as AxiosResponse<T>);
      }).catch((error) => {
        // if (isDevMode()) {
        //   console.error(`api ${api.defaults.baseURL}${req.API}`, error);
        // }
        appLoading(false);
        if (error?.response) {
          if (error.response.status != 401 && error.response.status != 403) {
            const responseData = error?.response?.data;
            if (responseData) {
              exeptionNotify(error?.response);
            }
          }
        }
        reject(error);
      });
    });
  };
  return { callAxios, validateServerResponse, callAxiosFile, callAxiosProcess };
};
