import { Cookies } from 'quasar';
import { AppAuthTokenKey } from 'src/utils/constant';
import { useSSRContext } from 'vue';
export default async (to: any, from: any, next: any) => {
  if (!process.env.SERVER) {
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
    const currentAuth = cookies ? cookies.get(AppAuthTokenKey) : null;
    console.log('CurrentAuth', currentAuth);
    console.log('from', from);
    console.log('to', to);
    if (currentAuth) {
      next();
    } else {
      next({
        path: '/auth',
        replace: true,
      });
    }
  } else {
    next();
  }
};
