import { boot } from 'quasar/wrappers';
import VueZoomer from 'vue-zoomer'
export default boot(({ app }) => {
  app.use(VueZoomer);
});
