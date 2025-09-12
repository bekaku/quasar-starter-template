import type { DeviceInfo } from '@capacitor/device';
import { Device } from '@capacitor/device';
import { computed, ref } from 'vue';
import { useCache } from './useCache';
import { getCurrentTimestamp, getDateDiffMinutes } from '@/utils/dateUtil';
import { useAppStore } from '@/stores/appStore';
import { useQuasar } from 'quasar';
export const useDevice = () => {
  const deviceId = ref();
  const { latestSyncActiveStatus } = useCache();
  const appStore = useAppStore();
  const { screen } = useQuasar();

  const isScreenMobile = computed(() => screen.lt.sm) // xs only
  const isScreenTablet = computed(() => screen.sm || screen.md) // sm, md
  const isScreenDesktop = computed(() => screen.gt.md) // lg, xl
  const isScreenMobileOrTablet = computed(() => isScreenMobile.value || isScreenTablet.value)
  const isSmallScreen = computed(() => {
    return screen.sm || screen.xs;
  })
  const getDeviceInfo = async (): Promise<DeviceInfo> => {
    const info = await Device.getInfo();
    return new Promise((resolve) => {
      resolve(info);
    });
  };
  const isMobileOrTablet = async (): Promise<boolean> => {
    const info = await getDeviceInfo();
    return new Promise((resolve) => {
      resolve(info.operatingSystem == 'android' || info.operatingSystem == 'ios');
    });
  };

  const getDeviceId = async (): Promise<string | undefined> => {
    const ID = await Device.getId();
    return new Promise((resolve) => {
      deviceId.value = ID ? ID.identifier : undefined;
      resolve(ID ? ID.identifier : undefined);
    });
  };
  const isWeb = async (): Promise<boolean> => {
    const info = await Device.getInfo();
    return new Promise((resolve) => {
      resolve(info.platform == 'web');
    });
  };
  const canSyncActiveStatusToServer = (): Promise<boolean> => {
    return new Promise(resolve => {
      const currentTimeTamp = getCurrentTimestamp();
      let diffminutes;
      if (latestSyncActiveStatus.value > 0) {
        diffminutes = getDateDiffMinutes(
          latestSyncActiveStatus.value,
          currentTimeTamp
        );
      } else {
        latestSyncActiveStatus.value = currentTimeTamp;
        resolve(true);
      }
      if (diffminutes != undefined && diffminutes >= 5) {
        latestSyncActiveStatus.value = currentTimeTamp;
        resolve(true);
      }
      resolve(false);
    });
  };
  const setSysncActiveStatus = () => {
    latestSyncActiveStatus.value = getCurrentTimestamp();
  };

  const initialDevice = () => {
    isMobileOrTablet().then((result) => {
      appStore.setMobileOrTablet(result);
    });
  }

  return {
    getDeviceInfo,
    isWeb,
    getDeviceId,
    deviceId,
    canSyncActiveStatusToServer,
    setSysncActiveStatus,
    isMobileOrTablet,
    initialDevice,
    isSmallScreen, isScreenMobile, isScreenTablet, isScreenDesktop, isScreenMobileOrTablet
  };
};
