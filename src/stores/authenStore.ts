/* eslint-disable no-async-promise-executor */
import type { RefeshTokenStatus } from '@/types/common';
import type { RefreshTokenResponse, UserDto } from '@/types/models';
import { isEmptyVal } from '@/utils/appUtil';
import {
  AppAuthRefeshTokenKey,
  AppAuthTokenKey,
  ExpireCookieDays,
  LocaleKey
} from '@/libs/constant';
import { addDateByDays } from '@/utils/dateUtil';
import { canRefreshToken } from '@/utils/jwtUtil';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { computed, ref } from 'vue';

export const useAuthenStore = defineStore('authenStore', () => {
  const auth = ref<UserDto>();
  const refreshTokenTimeout = ref<any>();
  const refreshTokenTimeoutNo = ref(0);
  const sessionExpired = ref(false);
  const devMode = process.env.NODE_ENV == 'development';
  const tokenKey = computed(() => auth.value?.token);
  const loginedCover = computed(() => auth.value?.cover?.image);
  const loginedAvatar = computed(() => auth.value?.avatar?.image);
  const loginedDisplay = computed(() => auth.value?.username
    ? auth.value?.username
    : auth.value?.email);


  const refreshToken = async (ssrContext: any | undefined = undefined): Promise<RefeshTokenStatus> => {
    return new Promise(async (resolve /* reject */) => {
      const isServerMode = process.env.SERVER;
      if (devMode) {
        console.log('refreshToken SERVER mode ', isServerMode);
      }
      const ck: any = isServerMode && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      if (ck) {
        const authTokenKey = ck.get(AppAuthTokenKey);
        if (!isEmptyVal(authTokenKey)) {
          const refreshIt = await canRefreshToken(authTokenKey, devMode, 'authenStore > refreshToken');
          // const refreshIt = true;
          if (refreshIt) {
            const refreshRes = await refreshTokenProcess(ssrContext);
            if (refreshRes && refreshRes.status) {
              if (!isServerMode) {
                await startRefreshTokenTimer();
              }
            }
            resolve(refreshRes);
          }
        }
      }
      resolve({
        status: true,
        fourceLogout: false
      });
    });
  };

  const refreshTokenProcess = async (ssrContext: any): Promise<RefeshTokenStatus> => {
    return new Promise(async (resolve /* reject */) => {
      const ck: any = process.env.SERVER && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      const refreshTokenKey = ck.get(AppAuthRefeshTokenKey);
      // const deviceId = ck.get(SucureDeviceIdAtt);
      // if (isServerMode) {
      //   if (deviceId || refreshTokenKey) {
      //     api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${deviceId ? deviceId : refreshTokenKey};`;
      //   }
      // }
      api.defaults.headers.Authorization = `Bearer ${ck.get(AppAuthTokenKey)}`;
      api.defaults.baseURL = process.env.APP_BASE_API || '';
      api.defaults.headers['Content-Type'] = 'application/json';
      api.defaults.responseType = 'json';
      api.defaults.headers['Accept-Language'] = ck.get(LocaleKey);

      api({
        method: 'POST',
        url: '/api/auth/refreshToken',
        data: {
          refreshToken: {
            refreshToken: refreshTokenKey
          }
        }
      }).then(async (response) => {
        if (devMode) {
          console.log(`api ${api.defaults.baseURL}/api/auth/refreshToken`, response.status);
        }
        if (response && response.status == 200 && response.data && response.data.refreshToken && response.data.authenticationToken) {
          await setRefreshTokenCookie(ssrContext, response.data);
          sessionExpired.value = false;
          resolve({
            status: true,
            token: response.data.authenticationToken,
            fourceLogout: false
          });
        } else {
          resolve({
            status: false,
            fourceLogout: false
          });
        }
      }).catch((error) => {
        if (devMode) {
          console.log(`api ${api.defaults.baseURL}/api/auth/refreshToken`, error?.response?.status);
        }
        const errResponse = error?.response;
        let fourceLogout = false;
        if (errResponse && errResponse.status == 403) {
          sessionExpired.value = true;
          fourceLogout = true;
        }
        resolve({
          status: false,
          fourceLogout
        });
      });
    });
  };

  const setRefreshTokenCookie = async (ssrContext: any, responseData: RefreshTokenResponse) => {
    return new Promise(async (resolve /* reject */) => {
      const ck: any = process.env.SERVER && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      const isDevMode = process.env.NODE_ENV == 'development';
      // if (isServerMode) {
      //   ck.set(SucureDeviceIdAtt, response.data.refreshToken, {
      //     expires: addDateByDays(ExpireCookieDays),
      //     path: '/',
      //     domain: isDevMode ? undefined : AppDomain,
      //     secure: true,
      //     httpOnly: true,
      //     sameSite: 'None'
      //   });
      // }
      ck.set(AppAuthRefeshTokenKey, responseData.refreshToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: isDevMode ? undefined : AppDomain,
        secure: !isDevMode,
        sameSite: 'Strict'
      });

      ck.set(AppAuthTokenKey, responseData.authenticationToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: isDevMode ? undefined : AppDomain,
        secure: !isDevMode,
        sameSite: 'Lax'
      });

      resolve(true);
    });
  };
  const startRefreshTokenTimer = (ssrContext: any | undefined = undefined) => {
    return new Promise((resove) => resove(true));
  };
  const stopAndRestartRefreshTokenTimer = async () => {
    stopRefreshTokenTimer();
    await refreshToken();
    return new Promise(async (resolve /* reject */) => {
      resolve(true);
    });
  };
  const stopRefreshTokenTimer = () => {
    if (refreshTokenTimeout.value) {
      clearTimeout(refreshTokenTimeout.value);
      refreshTokenTimeout.value = null;
    }
  };

  const setAuthen = (item: UserDto) => {
    auth.value = item;
  };
  const logout = () => {
    auth.value = undefined;
  };
  const methods = {
    logout,
    setAuthen,
    stopRefreshTokenTimer,
    stopAndRestartRefreshTokenTimer,
    startRefreshTokenTimer,
    setRefreshTokenCookie,
    refreshTokenProcess,
    refreshToken

  };

  return {
    auth,
    refreshTokenTimeoutNo,
    sessionExpired,
    tokenKey,
    loginedCover,
    loginedAvatar,
    loginedDisplay,
    ...methods
  };
});
