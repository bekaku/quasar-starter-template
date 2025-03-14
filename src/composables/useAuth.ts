import { Cookies } from 'quasar';
import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
  ExpireCookieDays,
} from '@/libs/constant';
import type { UserDto, RefreshTokenResponse } from '@/types/models';
import { useAuthenStore } from 'stores/authenStore';
import { useSSRContext } from 'vue';
import { useBase } from './useBase';
import { useLang } from './useLang';
import AuthenService from '@/api/AuthenService';
import { useCache } from './useCache';
import { addDateByDays } from '@/utils/dateUtil';
export const useAuth = () => {
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const authenStore = useAuthenStore();
  const { appConfirm, appLoading, isDevMode, appGoto } = useBase();
  const { t } = useLang();
  const { singoutToServer } = AuthenService();
  const { logoutClear } = useCache();
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
      cookies.set(AppAuthTokenKey, authResponse.authenticationToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: secure ? AppDomain : null,
        secure,
        sameSite: 'Lax'
      });

      cookies.set(AppAuthRefeshTokenKey, authResponse.refreshToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: secure ? AppDomain : null,
        secure,
        sameSite: 'Strict'
      });

      cookies.set(AppAuthTokenExpireKey, authResponse.expiresAt, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: secure ? AppDomain : null,
        secure,
        sameSite: 'Strict'
      });

      cookies.set(AppAuthTokenCreatedKey, Date.now().toString(), {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        // domain: secure ? AppDomain : null,
        secure,
        sameSite: 'Strict'
      });
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
        cookies.remove(AppAuthTokenKey, { path: '/' });
        cookies.remove(AppAuthRefeshTokenKey, { path: '/' });
        cookies.remove(AppAuthTokenExpireKey, { path: '/' });
        cookies.remove(AppAuthTokenCreatedKey, { path: '/' });
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
      window.location.replace('/auth/login');
      window.location.replace('/');
      // appGoto('/auth/login', true);
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
