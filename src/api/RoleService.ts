import { useAxios } from '@/composables/useAxios';
import type { Role } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();

  const findAllBackendRole = async (): Promise<Role[] | null> => {
    // return await callAxios<Role[]>({
    //   API: '/api/appRole/findAllBackend',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };

  const findAllSystemFrontend = async (): Promise<Role[] | null> => {
    // return await callAxios<Role[]>({
    //   API: '/api/appRole/findAllSystemFrontend',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const findAllByCompanyAndFrontend = async (
    companyId: number
  ): Promise<Role[] | null> => {
    // return await callAxios<Role[]>({
    //   API: `/api/appRole/findAllByCompanyAndFrontend?companyId=${companyId}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const findAllRoleByCompany = async (): Promise<Role[] | null> => {
    // return await callAxios<Role[] | null>({
    //   API: '/api/appRole/findAllByCompany',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const findAllByAuthAndFrontend = async (): Promise<Role[] | null> => {
    // return await callAxios<Role[]>({
    //   API: '/api/appRole/findAllByAuthAndFrontend',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };

  return {
    findAllBackendRole,
    findAllSystemFrontend,
    findAllByCompanyAndFrontend,
    findAllRoleByCompany,
    findAllByAuthAndFrontend,
  };
};
