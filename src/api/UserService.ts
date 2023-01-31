import useAxios from 'src/composables/useAxios';
import { UserDto } from '@/types/models';
import { ResponseMessage } from '@/types/common';
import { UserChangePasswordRequest, AccessTokenDto } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();
  const findCurrentUserData = async (): Promise<UserDto> => {
    return await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (): Promise<AccessTokenDto[]> => {
    return await callAxios<AccessTokenDto[]>({
      API: '/api/user/currentAuthSession',
      method: 'GET',
    });
  };

  return {
    findCurrentUserData,
    updateUserAvatar,
    selfUpdatePassword,
    currentAuthSession,
  };
};
