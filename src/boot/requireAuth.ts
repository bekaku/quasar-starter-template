import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import { AppAuthTokenKey } from 'src/utils/constant';
export default boot(({ router, ssrContext }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (cookies.get(AppAuthTokenKey)) {
        next();
      } else {
        // next('/auth');
        next({
          path: '/auth',
          replace: true,
        });
      }
    } else {
      next();
    }
  });
});
