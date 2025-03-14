/* eslint-disable ts/no-unused-vars */
import { boot } from 'quasar/wrappers';
import { CropperCanvas, CropperImage, CropperShade, CropperHandle, CropperSelection, CropperGrid, CropperCrosshair, CropperViewer } from 'cropperjs';
// eslint-disable-next-line unused-imports/no-unused-vars
export default boot(({ app }) => {
  CropperCanvas.$define();
  CropperImage.$define();
  CropperShade.$define();
  CropperHandle.$define();
  CropperSelection.$define();
  CropperGrid.$define();
  CropperCrosshair.$define();
  CropperViewer.$define();
});
