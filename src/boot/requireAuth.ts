import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
// TODO cannot use external file import in boot file >  https://github.com/quasarframework/quasar/issues/17365
import { AppAuthTokenKey } from '@/libs/constant';
export default boot(({ router, ssrContext, store, redirect }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  router.beforeEach((to, from, next) => {
    // console.log('requireAuth >to ', to);
    if (to.meta.requireAuth === true) {
      if (cookies.get(AppAuthTokenKey)) {
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

    // if (to.matched.some((record) => record.meta.requireAuth)) {
    //   if (cookies.get(AppAuthTokenKey)) {
    //     next();
    //   } else {
    //     next({
    //       path: '/auth',
    //       replace: true,
    //     });
    //   }
    // } else {
    //   next();
    // }
  });
});
