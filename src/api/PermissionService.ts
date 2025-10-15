import { useAxios } from '@/composables/useAxios';
import type { IAcl, Permission, ApiResponse } from '@/types/models';
import { permissionListApi } from 'src/libs/data';
export default () => {
  const { callAxios } = useAxios();
  const userAcl = async (getMenuList = 0): Promise<IAcl | null> => {
    // return await callAxios<IAcl | null>({
    //   API: `/api/permission/userAcl?getMenuList=${getMenuList}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };

  const findAll = async (q: string): Promise<ApiResponse<Permission> | null> => {
    // return await callAxios<ApiResponse<Permission>>({
    //   API: `/api/permission${q}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(permissionListApi)
      }, 500);
    })
  };
  const findAllBackendPermission = async (): Promise<Permission[] | null> => {
    // return await callAxios<Permission[]>({
    //   API: '/api/permission/findAllBackendPermission',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const findAllFrontendPermission = async (): Promise<Permission[] | null> => {
    // return await callAxios<Permission[]>({
    //   API: '/api/permission/findAllFrontendPermission',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };

  return {
    findAll,
    userAcl,
    findAllBackendPermission,
    findAllFrontendPermission,
  };
};
