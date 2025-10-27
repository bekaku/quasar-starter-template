import { useAxios } from '@/composables/useAxios';
import type {
  UserDto,
  AppLocale,
  UserChangePasswordRequest,
  AccessTokenDto,
  UserPersonalEditRequest,
  ApiResponse,
} from '@/types/models';
import type { ResponseMessage } from '@/types/common';
import { userData, userListApi } from 'src/libs/data';
export default () => {
  const { callAxios } = useAxios();

    const findAll = async (q: string): Promise<ApiResponse<UserDto> | null> => {
      console.log('UserService.ts > findAll > ', `/api/appUser${q}`);
      // return await callAxios<ApiResponse<UserDto>>({
      //   API: `/api/appUser${q}`,
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
    //   API: '/api/appUser/currentUserData',
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
    //   API: `/api/appUser/updateUserAvatar?fileManagerId=${fileManagerId}`,
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
    //   API: `/api/appUser/updateUserCover?fileManagerId=${fileManagerId}`,
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
    //   API: `/api/appUser/updateDefaultLocale/?locale=${locale}`,
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
    //   API: '/api/appUser/selfUpdatePassword',
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
    //   API: `/api/appUser/updateUserPassword/${userId}`,
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
    //   API: `/api/appUser/updateUserPasswordByAdmin/${userId}`,
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
    //   API: `/api/appUser/currentAuthSession${q}`,
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
    //   API: '/api/appUser/updatePersonalData',
    //   method: 'PUT',
    //   body: {
    //     data: req,
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
  //     API: '/api/appUser/updatePersonalData',
  //     method: 'PUT',
  //     body: {
  //       data: req,
  //     },
  //   });
  // };
  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: '/api/appUser/updateEmail',
    //   method: 'PUT',
    //   body: {
    //     data: req,
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
