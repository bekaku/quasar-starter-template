import { useAxios } from '@/composables/useAxios';
import type {
  UserDto,
  AppLocale,
  UserChangePasswordRequest,
  AccessTokenDto,
  UserPersonalEditRequest,
  IApiListResponse,
} from '@/types/models';
import type { ResponseMessage } from '@/types/common';
import { userData, userListApi } from 'src/libs/data';
export default () => {
  const { callAxios } = useAxios();

    const findAll = async (q: string): Promise<IApiListResponse<UserDto> | null> => {
      console.log('UserService.ts > findAll > ', `/api/user${q}`);
      // return await callAxios<IApiListResponse<UserDto>>({
      //   API: `/api/user${q}`,
      //   method: 'GET',
      // });
      return new Promise((resovle) => {
        setTimeout(() => {
          resovle(userListApi)
        }, 500);
      })
    };
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    // return await callAxios<UserDto>({
    //   API: '/api/user/currentUserData',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(userData)
      }, 500);
    })
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
    //   method: 'PUT',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/user/updateUserCover?fileManagerId=${fileManagerId}`,
    //   method: 'PUT',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    // return await callAxios<UserDto>({
    //   API: `/api/user/updateDefaultLocale/?locale=${locale}`,
    //   method: 'PUT',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: '/api/user/selfUpdatePassword',
    //   method: 'PUT',
    //   body: req,
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/user/updateUserPassword/${userId}`,
    //   method: 'PUT',
    //   body: req,
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const updateUserPasswordByAdmin = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/user/updateUserPasswordByAdmin/${userId}`,
    //   method: 'PUT',
    //   body: req,
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    // return await callAxios<AccessTokenDto[]>({
    //   API: `/api/user/currentAuthSession${q}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle([])
      }, 500);
    })
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: '/api/user/updatePersonalData',
    //   method: 'PUT',
    //   body: {
    //     user: req,
    //   },
    // });
    console.log('updatePersonalData', req);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1500);
    })
  };
  // const updatePersonalData = async (
  //   req: UserPersonalEditRequest
  // ): Promise<ResponseMessage | null> => {
  //   return await callAxios<ResponseMessage>({
  //     API: '/api/user/updatePersonalData',
  //     method: 'PUT',
  //     body: {
  //       user: req,
  //     },
  //   });
  // };
  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: '/api/user/updateEmail',
    //   method: 'PUT',
    //   body: {
    //     user: req,
    //   },
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  return {
    findCurrentUserData,
    updateUserAvatar,
    updateUserCover,
    selfUpdatePassword,
    currentAuthSession,
    updateUserPassword,
    updateDefaultLocale,
    updatePersonalData,
    updateEmail,
    updateUserPasswordByAdmin,
    findAll
  };
};
