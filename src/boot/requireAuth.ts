import { defineBoot } from '#q-app'
import { Cookies } from 'quasar';
// TODO cannot use external file import in boot file >  https://github.com/quasarframework/quasar/issues/17365
import { AppAuthTokenKey } from '@/libs/constant';
export default defineBoot(({ router, ssrContext, store, redirect }) => {
  const cookies = import.meta.env.QUASAR_SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  router.beforeEach((to, from) => {
    // console.log('requireAuth >to ', to);
    if (to.meta.requireAuth === true) {
      if (cookies.get(AppAuthTokenKey)) {
        return true;
      } else {
        return {
          path: '/auth/login',
          query: { continue: to.fullPath && to.fullPath !== '/' ? encodeURIComponent(to.fullPath) : '' },
          replace: true
        };
      }
    } else {
      return true;
    }
  });
});
