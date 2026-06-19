/* @vite-ignore */
import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { defineBoot } from '#q-app'

export default defineBoot(({ app }) => {
  app.component('pdf-vue', VuePDF);
});
export { usePDF };
