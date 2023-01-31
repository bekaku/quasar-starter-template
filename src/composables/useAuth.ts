import { Cookies, LocalStorage } from 'quasar';
import {
  AppAuthDataKey,
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
} from 'src/utils/constant';
import { UserDto, RefreshTokenResponse } from '@/types/models';
import { useAuthenStore } from 'stores/authenStore';
import { useSSRContext } from 'vue';
import useBase from './useBase';
import { useLang } from './useLang';
import AuthenService from '@/api/AuthenService';
import { setAuthCookies } from 'src/utils/appUtil';
export default () => {
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const authenStore = useAuthenStore();
  const { WeeConfirm, WeeLoader } = useBase();
  const { t } = useLang();
  const { singoutToServer } = AuthenService();

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

  const signOut = async () => {
    if (!cookies) {
      return;
    }

    const conf = await WeeConfirm(t('app.monogram'), t('helper.logoutConfirm'));
    if (conf) {
      WeeLoader();
      await logoutToServer();
      WeeLoader(false);
      destroyAuthDataAndRedirect();
    }
    return;
  };
  const setAuthenticationCookies = (authResponse: RefreshTokenResponse) => {
    setAuthCookies(cookies, authResponse);
  };
  const logoutToServer = async () => {
    await singoutToServer({
      refreshToken: {
        refreshToken: getAuthCookieByKey(AppAuthRefeshTokenKey),
        email: authenStore.auth?.email,
      },
    });
  };

  const destroyAuthDataAndRedirect = (forceRedirectToLoginPage = true) => {
    cookies.remove(AppAuthTokenKey);
    cookies.remove(AppAuthRefeshTokenKey);
    cookies.remove(AppAuthTokenExpireKey);
    cookies.remove(AppAuthTokenCreatedKey);

    LocalStorage.remove(AppAuthDataKey);
    authenStore.logout();
    if (forceRedirectToLoginPage) {
      window.location.replace('/auth/login');
      // WeeGoTo('/auth/login', true);
    }
  };

  return {
    initAppAuthen,
    signOut,
    setAuthen,
    destroyAuthDataAndRedirect,
    setAuthenticationCookies,
    logoutToServer,
  };
};
