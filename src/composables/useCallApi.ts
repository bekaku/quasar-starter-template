import { api } from 'boot/axios';
import { RequestType } from 'src/interface/common';
import userBase from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
export default () => {
  const { WeeToast, WeeLoader } = userBase();
  const { locale } = useLang();
  const token = '0000000009';
  // const reqHeader = () => {
  //   return {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //     'Accept-Apiclient': 'default',
  //     'Accept-Language': locale.value,
  //   };
  // };
  const useFetch = <T>(req: RequestType): Promise<T> => {
    return new Promise((resolve, reject) => {
      // api.defaults.headers = reqHeader();
      api.defaults.headers['Accept-Language'] = locale.value;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      console.log('api', api.defaults);

      api({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.message);
          WeeLoader(false);
          WeeToast(error.message, {
            multiLine: true,
            type: 'negative',
            timeout: 10 * 1000,
          });
        });

      // api
      //   .get(req.API)
      //   .then((response) => {
      //     resolve(response.data);
      //   })
      //   .catch((error) => {
      //     reject(error.message);
      //     WeeLoader(false);
      //     WeeToast(error.message, {
      //       multiLine: true,
      //       type: 'negative',
      //       timeout: 10 * 1000,
      //     });
      //   });
    });
  };
  return { useFetch };
};
