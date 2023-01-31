import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { DefaultApiCLient } from 'src/utils/constant';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
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
  baseURL: process.env.API,
  withCredentials: false,
  timeout: process.env.TIME_OUT ? +process.env.TIME_OUT : 3 * 60000, // 60000 = 1 minute, 0 = no timeout
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept-Apiclient': process.env.API_CLIENT || DefaultApiCLient,
    // 'Accept-Language': DefaultLocale,
  },
  validateStatus: (status) => status <= 500,
});
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  /*
  api.interceptors.request.use(
    (config) => {
      // const ck = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
      // const token = '000000000000000000000';
      // config.headers.Authorization = `bearer ${token}`;
      // config.headers['Accept-Language'] = ck.get(LocaleKey);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
*/

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
