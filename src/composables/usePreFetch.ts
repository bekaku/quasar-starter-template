import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import { LocaleKey } from 'src/utils/constant';
import { RequestType } from 'src/interface/common';
export default (ssrContext: any) => {
  const ck = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const useFetch = <T>(req: RequestType): Promise<T> => {
    return new Promise((resolve, reject) => {
      api.defaults.headers['Accept-Language'] = ck.get(LocaleKey);
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
        });
    });
  };

  return {
    useFetch,
  };
};
