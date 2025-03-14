import { AppAuthRefeshTokenKey, LocaleKey } from '@/libs/constant';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { boot } from 'quasar/wrappers';
// TODO cannot use external file import in boot file >  https://github.com/quasarframework/quasar/issues/17365
import { Cookies } from 'quasar';
// import { canRefreshToken } from '@/utils/JwtUtil';
import { useAuthenStore } from '@/stores/authenStore';
// import { getTokenStatus } from '@/utils/jwtUtil';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  // baseURL: process.env.NODE_ENV == 'development' ? 'http://192.168.7.249:8080' : 'https://api.example.com',
  baseURL: process.env.APP_BASE_API || '',
  withCredentials: false,
  timeout: process.env.APP_API_TIME_OUT ? +process.env.APP_API_TIME_OUT : 3 * 60000, // 60000 = 1 minute, 0 = no timeout
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept-Apiclient': process.env.APP_API_CLIENT
    // 'Accept-Language': DefaultLocale,
  },
  validateStatus: status => status < 400 // Resolve only if the status code is less than 400
  // validateStatus: (status) => status <= 500 // Resolve only if the status code is less than 500
});


// for multiple requests
let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export default boot(({ app, redirect, ssrContext, store }) => {
  const authenStore = useAuthenStore(store);
  // Check if interceptors are already set up
  const isServer = process.env.SERVER;
  if (!isServer) {
    api.interceptors.request.use(async (config) => {
      // const ck = isServer ? Cookies.parseSSR(ssrContext) : Cookies;
      // const jwtKey = ck.get(AppAuthTokenKey);
      config.headers['Accept-Language'] = Cookies.get(LocaleKey);
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
    api.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      const originalRequest = error.config;
      // const ck = isServer ? Cookies.parseSSR(ssrContext) : Cookies;
      const refreshToken = Cookies.get(AppAuthRefeshTokenKey);
      if (refreshToken && error.response && error.response.status === 403 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            console.warn('isRefreshing > failedQueue.push', originalRequest.url);
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return api(originalRequest);
          }).catch((err) => {
            return Promise.reject(err);
          });
        }

        // TODO
        // const currentToken = Cookies.get(AppAuthTokenKey);
        // if (currentToken) {
        //   const currentExpireStatus = await getTokenStatus(currentToken);
        //   console.log('try new call currentExpireStatus', 'currentToken', currentToken, currentExpireStatus);
        //   if (currentExpireStatus && currentExpireStatus == 'VALID') {
        //     originalRequest.headers['Authorization'] = 'Bearer ' + currentToken;
        //     return api(originalRequest);
        //   }
        // }

        originalRequest._retry = true;
        isRefreshing = true;

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          console.warn('/api/auth/refreshToken', refreshToken);

          api.defaults.baseURL = process.env.APP_BASE_API || '';
          api.defaults.responseType = 'json';
          api.defaults.headers['Content-Type'] = 'application/json';
          api.post('/api/auth/refreshToken', {
            refreshToken: {
              refreshToken
            }
          })
            .then(async ({ data }) => {
              console.warn('/api/auth/refreshToken then', data);
              // if (data && data.refreshToken && data.authenticationToken) {
              await authenStore.setRefreshTokenCookie(undefined, data);
              originalRequest.headers.Authorization = 'Bearer ' + data.authenticationToken;
              processQueue(null, data.authenticationToken);
              console.warn('/api/auth/refreshToken end');
              resolve(api(originalRequest));
            })
            .catch((errRefesh) => {
              isRefreshing = false;
              console.warn('/api/auth/refreshToken catch', errRefesh);
              processQueue(errRefesh, null);
              if (errRefesh?.response && errRefesh?.response?.status) {
                if (errRefesh.response.status == 401) {
                  console.warn('GOTO LoginPage');
                  redirect({ path: '/auth/login' });
                }
              }
              resolve(errRefesh);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    });
  }
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };

