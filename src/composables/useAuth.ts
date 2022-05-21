import { Cookies, LocalStorage, date } from 'quasar';
import {
  AppAuthDataKey,
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
} from 'src/utils/constant';
import { AuthenticationResponse } from 'src/interface/models';
import { useAuthenStore } from 'stores/authenStore';
import { addDateByDays } from 'src/utils/dateUtil';
import { useSSRContext } from 'vue';
import useBase from './useBase';
import { useLang } from './useLang';
import AuthenService from '@/api/AuthenService';
export default () => {
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const authenStore = useAuthenStore();
  const { WeeConfirm, WeeLoader } = useBase();
  const { t } = useLang();
  const { singoutToServer } = AuthenService();

  const initAppAuthen = (): void => {
    setAuthen(currentAuth());
  };
  const currentTokenKey = (): string | null => {
    if (!cookies) {
      return null;
    }
    return cookies.get(AppAuthTokenKey) || null;
  };
  const currentAuth = (): AuthenticationResponse | null => {
    if (!cookies) {
      return null;
    }
    const auth = LocalStorage.getItem(AppAuthDataKey);
    const tokenKey = currentTokenKey();
    if (auth && tokenKey) {
      const authJson = JSON.parse(auth.toString());
      authJson.authenticationToken = tokenKey;
      return authJson;
    }
    return null;
  };

  const setAuthen = (
    auth: AuthenticationResponse | null,
    fromLogined = false
  ) => {
    if (auth != null && cookies && auth.authenticationToken != null) {
      //set token key to cookie for prefetch on SSR mode
      if (fromLogined) {
        setTokenCookies(auth.authenticationToken);
        //set user data to localStorage
        setAuthDataLocalStorage(auth);
      }

      authenStore.setAuthen(auth);
    }
  };
  const setAuthDataLocalStorage = (auth: AuthenticationResponse) => {
    auth.authenticationToken = null;
    LocalStorage.set(AppAuthDataKey, JSON.stringify(auth));
  };

  const setTokenCookies = (key: string) => {
    cookies.set(AppAuthTokenKey, key, {
      expires: addDateByDays(365),
      path: '/',
    });

    cookies.set(AppAuthTokenCreatedKey, Date.now().toString(), {
      expires: addDateByDays(365),
      path: '/',
    });
  };

  const signOut = async () => {
    if (!cookies) {
      return;
    }

    const conf = await WeeConfirm(t('app.monogram'), t('helper.logoutConfirm'));
    if (conf) {
      WeeLoader();
      await singoutToServer({
        refreshToken: {
          refreshToken: authenStore.auth?.refreshToken,
          email: authenStore.auth?.email,
        },
      });
      WeeLoader(false);
      destroyAuthDataAndRedirect();
    }
    return;
  };
  const checkRefreshToken = async () => {
    if (!cookies) {
      return;
    }
    const createdDateCk = cookies.get(AppAuthTokenCreatedKey);

    if (createdDateCk) {
      const createdDate = new Date(parseInt(createdDateCk));

      const createdTokenDate = date.formatDate(createdDate, 'YYYY-MM-DD');
      const currentDate = date.formatDate(new Date(), 'YYYY-MM-DD');
      const diff = date.getDateDiff(currentDate, createdTokenDate, 'days');

      // force refesh token if diff greater than 7 days
      if (diff > 7) {
        console.log('Refesh token');
      }
    }
  };

  const destroyAuthDataAndRedirect = (forceRedirectToLoginPage = true) => {
    cookies.remove(AppAuthTokenKey);
    cookies.remove(AppAuthTokenCreatedKey);
    LocalStorage.remove(AppAuthDataKey);
    authenStore.logout();
    if (forceRedirectToLoginPage) {
      window.location.replace('');
    }
  };

  return {
    initAppAuthen,
    signOut,
    setAuthen,
    destroyAuthDataAndRedirect,
    checkRefreshToken,
  };
};
