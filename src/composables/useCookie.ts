import { Cookies } from 'quasar';
import { AppAuthCuurentUserKey, AppAuthRefeshTokenKey, AppAuthTokenKey, ExpireCookieDays } from 'src/libs/constant';
import type { CookieItem } from 'src/types/common';
import type { RefreshTokenResponse } from 'src/types/models';
import { addDateByDays } from 'src/utils/dateUtil';
import { useSSRContext } from 'vue';
export const useCookie = () => {
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    const cookies = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;

    const setCookie = (key: string, value: string, sameSite: 'Strict' | 'Lax' | 'None', secure: boolean | undefined = false, expiresAt?: number | Date | string, path?: string, domain?: string) => {
        cookies.set(key, value, {
            // maxAge: 60 * 60 * 24 * 365 * 5,
            expires: expiresAt || addDateByDays(ExpireCookieDays),
            path: path || '/',
            secure,
            sameSite,
            domain: domain || ''
        });
    };

    const getCookie = (key: string) => {
        return cookies.get(key)
    }
    const getAllCookes = () => {
        return cookies.getAll()
    }

    const isSetCookie = (key: string) => {
        return cookies.has(key)
    }
    const removeCookie = (key: string, path?: string) => {
        cookies.remove(key, { path: path || '/' });
    }

    const getAllJwtCookies = (): CookieItem[] => {
        const cookies = getAllCookes();
        return Object.entries(cookies)
            .filter(([key]) => key.startsWith(`${AppAuthTokenKey}_`))
            .map(([key, value]) => ({ key, value, userId: key.replace(`${AppAuthTokenKey}_`, '') }));
    };
    const getCurrentUserToken = (): RefreshTokenResponse | null => {
        const currentUID = getCookie(AppAuthCuurentUserKey);
        if (!currentUID) {
            return null;
        }
        const jwt = getCookie(`${AppAuthRefeshTokenKey}_${currentUID}`);
        const refreshKey = getCookie(`${AppAuthTokenKey}_${currentUID}`);
        if (!jwt || !refreshKey) {
            return null;
        }
        return {
            userId: Number.parseInt(currentUID),
            authenticationToken: jwt,
            refreshToken: refreshKey,
        }
    };
    return {
        setCookie,
        getCookie,
        getAllCookes,
        isSetCookie,
        removeCookie,
        getAllJwtCookies,
        getCurrentUserToken
    }
}