import { boot } from 'quasar/wrappers';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    // if (to.matched.some((record) => record.meta.requireAuth)) {
    //   console.log('requireAuth');
    //   next('/auth');
    // } else {
    //   next();
    // }
    next();
  });
});
