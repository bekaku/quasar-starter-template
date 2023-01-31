import { AppException, ResponseMessage, ServerException } from '@/types/common';
import { RefreshTokenResponse } from '@/types/models';
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
export const isServerException = (obj: any): obj is ServerException => {
  return (
    obj.status !== undefined &&
    obj.message !== undefined &&
    obj.error !== undefined &&
    obj.timestamp !== undefined &&
    obj.path !== undefined
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
export const catchUrlFromText = (inputText: string) => {
  return inputText.match(/\bhttps?:\/\/\S+/gi);
};
export const urlify = (inputText: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return inputText.replace(urlRegex, (url) => {
    return (
      '<a class="app-text-link text-primary" href="' +
      url +
      '" target="_blank">' +
      url +
      '</a>'
    );
  });
};

export const roundDecimal = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
};
