import { defineBoot } from '#q-app'
import { CropperCanvas, CropperImage, CropperShade, CropperHandle, CropperSelection, CropperGrid, CropperCrosshair, CropperViewer } from 'cropperjs';
// eslint-disable-next-line unused-imports/no-unused-vars
export default defineBoot(({ app }) => {
  CropperCanvas.$define();
  CropperImage.$define();
  CropperShade.$define();
  CropperHandle.$define();
  CropperSelection.$define();
  CropperGrid.$define();
  CropperCrosshair.$define();
  CropperViewer.$define();
});
