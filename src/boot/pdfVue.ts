/* @vite-ignore */
import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  app.component('pdf-vue', VuePDF);
});
export { usePDF };
