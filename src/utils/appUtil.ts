import { AppException, ResponseMessage } from 'src/interface/common';
import { RefreshTokenResponse } from 'src/interface/models';
import { addDateByDays } from 'src/utils/dateUtil';
import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  ExpireCookieDays,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
} from 'src/utils/constant';
export const isNumber = (value: string | number): boolean => {
  return value != null && value !== '' && !isNaN(Number(value.toString()));
};
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const isAppException = (obj: any): obj is AppException => {
  return (
    obj.status !== undefined &&
    obj.message !== undefined &&
    obj.errors !== undefined
  );
};
export const isServerResponseMessage = (obj: any): obj is ResponseMessage => {
  return obj.status !== undefined && obj.message !== undefined;
};

export const setAuthCookies = (
  cookies: any,
  authResponse: RefreshTokenResponse
) => {
  if (cookies) {
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
  }
};
