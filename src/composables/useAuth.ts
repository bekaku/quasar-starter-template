import { Cookies, LocalStorage, date } from 'quasar';
import {
  AppAuthDataKey,
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  ExpireCookieDays,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
} from 'src/utils/constant';
import { RefreshTokenResponse, UserDto } from 'src/interface/models';
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
  const { singoutToServer, refreshToken } = AuthenService();

  const initAppAuthen = (): void => {
    // setAuthen(currentAuth());
  };
  const getAuthCookieByKey = (key: string): string | null => {
    if (!cookies) {
      return null;
    }
    return cookies.get(key) || null;
  };

  const setAuthen = (auth: UserDto | null) => {
    if (auth != null) {
      authenStore.setAuthen(auth);
    }
  };
  const setAuthCookies = (authResponse: RefreshTokenResponse) => {
    cookies.set(AppAuthTokenKey, authResponse.authenticationToken, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthRefeshTokenKey, authResponse.refreshToken, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthTokenExpireKey, authResponse.expiresAt, {
      expires: addDateByDays(ExpireCookieDays),
      path: '/',
    });

    cookies.set(AppAuthTokenCreatedKey, Date.now().toString(), {
      expires: addDateByDays(ExpireCookieDays),
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
          refreshToken: getAuthCookieByKey(AppAuthRefeshTokenKey),
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
        WeeLoader();
        const refreshResponse = await refreshToken({
          refreshToken: {
            refreshToken: getAuthCookieByKey(AppAuthRefeshTokenKey),
            email: authenStore.auth?.email,
          },
        });
        if (refreshResponse.authenticationToken) {
          setAuthCookies(refreshResponse);
        }
        WeeLoader(false);
      }
    }
  };

  const destroyAuthDataAndRedirect = (forceRedirectToLoginPage = true) => {
    cookies.remove(AppAuthTokenKey);
    cookies.remove(AppAuthRefeshTokenKey);
    cookies.remove(AppAuthTokenExpireKey);
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
    setAuthCookies,
  };
};
