import { UserDto, RefreshTokenResponse } from 'src/interface/models';
import usePreFetch from 'src/composables/usePreFetch';
import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthRefeshTokenKey,
  autoRefeshTokenDays,
} from 'src/utils/constant';
import { Cookies, date } from 'quasar';
import { setAuthCookies } from 'src/utils/appUtil';
export default (ssrContext: any, redirect: any) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const { useFetch } = usePreFetch(ssrContext, redirect);
  const init = async (): Promise<UserDto | null> => {
    if (cookies && cookies.get(AppAuthTokenKey)) {
      const userData = await getAndSetCurrentUserData();
      await checkRefreshToken(userData);
      // redirect if require deference path home
      return new Promise((resolve) => {
        resolve(userData);
      });
    }
    return new Promise((resolve) => {
      resolve(null);
    });
  };
  const getAndSetCurrentUserData = async (): Promise<UserDto> => {
    const data = await useFetch<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
    return new Promise((resolve) => {
      resolve(data);
    });
  };
  const checkRefreshToken = async (userData: UserDto) => {
    if (!cookies) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    const createdDateCk = cookies.get(AppAuthTokenCreatedKey);
    if (createdDateCk) {
      const createdDate = new Date(parseInt(createdDateCk));

      const createdTokenDate = date.formatDate(createdDate, 'YYYY-MM-DD');
      const currentDate = date.formatDate(new Date(), 'YYYY-MM-DD');
      const diff = date.getDateDiff(currentDate, createdTokenDate, 'days');

      // force refesh token if diff greater than 7 days
      if (diff >= autoRefeshTokenDays) {
        const refreshResponse = await useFetch<RefreshTokenResponse>({
          API: '/api/auth/refreshToken',
          method: 'POST',
          body: {
            refreshToken: {
              refreshToken: cookies.get(AppAuthRefeshTokenKey),
              email: userData.email,
            },
          },
        });

        if (refreshResponse.authenticationToken) {
          setAuthCookies(cookies, refreshResponse);
        }
      }
    }
  };
  return { init };
};
