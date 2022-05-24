import useCallApi from 'src/composables/useCallApi';
import { UserDto } from 'src/interface/models';
import { ResponseMessage } from 'src/interface/common';
import {
  UserChangePasswordRequest,
  AccessTokenDto,
} from 'src/interface/models';
export default () => {
  const { useFetch } = useCallApi();
  const findCurrentUserData = async (): Promise<UserDto> => {
    return await useFetch<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage> => {
    return await useFetch<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage> => {
    return await useFetch<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (): Promise<AccessTokenDto[]> => {
    return await useFetch<AccessTokenDto[]>({
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
