import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import { LocaleKey, AppAuthTokenKey } from 'src/utils/constant';
import { RequestType } from 'src/interface/common';
import { isAppException } from 'src/utils/appUtil';
import { useExceptionStore } from 'src/stores/exceptionStore';
export default (ssrContext: any, redirect: any) => {
  const ck = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const exceptionStore = useExceptionStore();
  const useFetch = <T>(req: RequestType): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (api.defaults.headers != null) {
        api.defaults.headers.common['Accept-Language'] = ck.get(LocaleKey);
        api.defaults.headers.common.Authorization = `Bearer ${ck.get(
          AppAuthTokenKey
        )}`;
      }
      // api.defaults.headers['Accept-Language'] = ck.get(LocaleKey);
      api({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          if (isAppException(response.data)) {
            exceptionStore.setException(response.data);
            redirect({
              name: 'ErrorPage',
              params: {
                code: response.data.status,
                message: response.data.message,
              },
            });
            // redirect({
            //   path: `/error?code=${response.data.status}&message=${response.data.message}`,
            // });
            // redirect({ path: '/error' })
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.message);
          exceptionStore.setException({
            status: error.code,
            message: error.message,
          });
          redirect({
            name: 'ErrorPage',
            params: { code: error.code, message: error.message },
          });
        });
    });
  };

  return {
    useFetch,
  };
};
