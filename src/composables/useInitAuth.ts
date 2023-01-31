import { UserDto, RefreshTokenResponse } from '@/types/models';
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
  const { callAxios } = usePreFetch(ssrContext, redirect);

  const init = async (): Promise<UserDto | null> => {
    if (cookies && cookies.get(AppAuthTokenKey)) {
      const userData = await getAndSetCurrentUserData();
      console.log('useInitAuth/init/userData', userData);
      // await checkRefreshToken(userData);
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
    // const data = await useFetch<UserDto>({
    //   API: '/api/user/currentUserData',
    //   method: 'GET',
    // });
    // console.log('currentUserData', data);
    // return new Promise((resolve) => {
    //   resolve(data);
    // });
    return new Promise((resolve) => {
      resolve({
        id: 1,
        email: 'admin@mydomain.com',
        username: 'admin',
        avatarFileId: 30,
        avatar: {
          image: 'https://i.pravatar.cc/960',
          thumbnail: 'https://i.pravatar.cc/175',
        },
        active: true,
      });
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const refreshResponse = await callAxios<RefreshTokenResponse>({
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
