import type { CacheDateAndKey } from '@/types/common';
import type {
  NotificationCount,
  SearchItem,
} from '@/types/models';
import { isObjectEmpty } from '@/utils/appUtil';
import {
  AppAuthRefeshTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthTokenExpireKey,
  AppAuthTokenKey,
  CacheDateCheckKey,
  CacheKey,
  FcmSettingKey,
  FcmTokenKey,
  LatestSyncActiveStatusKey,
  NotifyKey,
  SearchHistoryKey,
} from '@/libs/constant';
import { getDateNow, getMonthNow, getYearNow } from '@/utils/dateUtil';
import { useStorage } from '@vueuse/core';
export const useCache = () => {
  const SearchHistoryList = useStorage(
    SearchHistoryKey,
    [] as SearchItem[]
  );
  const cacheKeyCheckList = useStorage(
    CacheDateCheckKey,
    [] as CacheDateAndKey[]
  );
  const cacheYearAvailables = useStorage(
    CacheKey.YEAR_AVAILABLE,
    [] as number[]
  );

  const latestSyncActiveStatus = useStorage(LatestSyncActiveStatusKey, 0);
  const fcmSetting = useStorage(FcmSettingKey, true as boolean);
  const fcmToken = useStorage(FcmTokenKey, null as string | null | undefined);
  const refeshTokenKey = useStorage<string | null>(AppAuthRefeshTokenKey, null);
  const authTokenKey = useStorage<string | null>(AppAuthTokenKey, null);
  const authTokenExpireKey = useStorage<string | null>(
    AppAuthTokenExpireKey,
    null
  );
  const authTokenCreatedKey = useStorage<string | null>(
    AppAuthTokenCreatedKey,
    null
  );
  const cacheNotifyCount = useStorage(NotifyKey, {} as NotificationCount);

  const findByKey = (k: string): CacheDateAndKey | undefined => {
    if (cacheKeyCheckList.value && cacheKeyCheckList.value.length > 0) {
      return cacheKeyCheckList.value.find((e: CacheDateAndKey) => e.key == k);
    }
    return undefined;
  };
  const findIndexByKey = (k: string): number => {
    if (!cacheKeyCheckList.value) {
      return -1;
    }
    return cacheKeyCheckList.value.findIndex(
      (e: CacheDateAndKey) => e.key == k
    );
  };

  const onRemoveKey = (k: string): void => {
    const index = findIndexByKey(k);
    if (index >= 0) {
      cacheKeyCheckList.value.splice(index, 1);
    }
  };
  const onAddNewKey = (k: string): void => {
    const item = findByKey(k);
    if (!cacheKeyCheckList.value) {
      cacheKeyCheckList.value = [];
    }
    if (!item) {
      const d = getDateNow();
      cacheKeyCheckList.value.push({
        key: k,
        date: d.toLocaleDateString(),
      });
    }
  };
  const onUpdateKey = (
    k: string,
    period: 'DAY' | 'MONTH' | 'YEAR' = 'DAY'
  ): void => {
    onRemoveKey(k);
    if (period == 'DAY') {
      onAddNewKey(k);
    } else if (period == 'MONTH') {
      onAddNewMonthKey(k);
    } else if (period == 'YEAR') {
      onAddNewYearKey(k);
    }
  };
  const canFecthToServerToday = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }

    const d = getDateNow();
    return item.date != d.toLocaleDateString();
  };
  const canFecthToServerMonth = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }
    const m = getMonthNow();
    return item.date != m;
  };
  const onAddNewMonthKey = (k: string): void => {
    const item = findByKey(k);
    if (!item) {
      cacheKeyCheckList.value.push({
        key: k,
        date: getMonthNow(),
      });
    }
  };
  const canFecthToServerYear = (k: string): boolean => {
    const item = findByKey(k);
    if (!item) {
      return true;
    }
    const y = getYearNow();
    return item.date != y;
  };
  const onAddNewYearKey = (k: string): void => {
    const item = findByKey(k);
    if (!item) {
      cacheKeyCheckList.value.push({
        key: k,
        date: getYearNow(),
      });
    }
  };
  const destroyCache = () => {
    cacheKeyCheckList.value = null;
    cacheYearAvailables.value = null;
  };

  const logoutClear = () => {
    cacheNotifyCount.value = null;
    destroyCache();
  };

  const fetchFromCacheToday = (key: string, cache: any) => {
    const canFetchToServer = canFecthToServerToday(key);
    return !canFetchToServer && cache && !isObjectEmpty(cache);
  };
  const fetchFromCacheMonth = (key: string, cache: any) => {
    const canFetchToServer = canFecthToServerMonth(key);
    return !canFetchToServer && cache && !isObjectEmpty(cache);
  };
  const fetchFromCacheList = (canFetchToServer: boolean, cache: any) => {
    return !canFetchToServer && cache && cache.length > 0;
  };
  return {
    findByKey,
    onAddNewKey,
    onUpdateKey,
    destroyCache,
    canFecthToServerToday,
    canFecthToServerYear,
    cacheYearAvailables,
    fcmSetting,
    fcmToken,
    refeshTokenKey,
    authTokenKey,
    authTokenExpireKey,
    authTokenCreatedKey,
    cacheNotifyCount,
    logoutClear,
    SearchHistoryList,
    fetchFromCacheToday,
    fetchFromCacheList,
    canFecthToServerMonth,
    fetchFromCacheMonth,
    latestSyncActiveStatus
  };
};
