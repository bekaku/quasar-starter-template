import AuthenService from '@/api/AuthenService';
import {
  AppAuthRefeshTokenKey,
  AppAuthTokenKey,
  ExpireCookieDays
} from '@/libs/constant';
import type { RefreshTokenResponse, UserDto } from '@/types/models';
import { addDateByDays } from '@/utils/dateUtil';
import { Cookies } from 'quasar';
import { useAuthenStore } from 'stores/authenStore';
import { useSSRContext } from 'vue';
import { useBase } from './useBase';
import { useCache } from './useCache';
import { useCookie } from './useCookie';
import { useLang } from './useLang';
export const useAuth = () => {
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const authenStore = useAuthenStore();
  const { appConfirm, appLoading, isDevMode, appNavigateTo } = useBase();
  const { t } = useLang();
  const { singoutToServer } = AuthenService();
  const { logoutClear } = useCache();
  const { setCookie, removeCookie } = useCookie();
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

    const conf = await appConfirm(t('app.monogram'), t('helper.logoutConfirm'));
    if (conf) {
      appLoading();
      const token = getAuthCookieByKey(AppAuthRefeshTokenKey);
      const email = authenStore.auth?.email;
      await logoutToServer(token, email);
      appLoading(false);
      destroyAuthDataAndRedirect();
    }
  };
  const setAuthenticationCookies = (authResponse: RefreshTokenResponse) => {
    setAuthCookies(cookies, authResponse, !isDevMode());
  };
  const setAuthCookies = (
    cookies: any,
    authResponse: RefreshTokenResponse,
    secure: boolean = false
  ) => {
    if (cookies) {
      setCookie(AppAuthTokenKey, authResponse.authenticationToken, 'Lax', secure, addDateByDays(ExpireCookieDays));
      setCookie(AppAuthRefeshTokenKey, authResponse.refreshToken, 'Strict', secure, addDateByDays(ExpireCookieDays));
    }
  };
  const logoutToServer = async (
    token: string | null,
    mail: string | undefined
  ) => {
    if (!token || !mail) {
      return new Promise((resolve) => {
        resolve(true);
      });
    }

    await singoutToServer({
      refreshToken: {
        refreshToken: token,
        email: mail,
      },
    });
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  const destroyAuthData = () => {
    return new Promise((resolve) => {
      if (cookies) {
        removeCookie(AppAuthTokenKey);
        removeCookie(AppAuthRefeshTokenKey);
      }
      logoutClear();
      resolve(true);
    });
  };
  const destroyAuthDataAndRedirect = async (
    forceRedirectToLoginPage = true
  ) => {
    await destroyAuthData();
    authenStore.logout();
    if (forceRedirectToLoginPage) {
      // window.location.replace('/auth/login');
      // window.location.replace('/');
      appNavigateTo('/auth/login', true);
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
