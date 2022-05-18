import { boot } from 'quasar/wrappers';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // if (to.matched.some((record) => record.meta.requireAuth)) {
    //   console.log('requireAuth');
    //   next('/auth');
    // } else {
    //   next();
    // }

    next();
  });
});
