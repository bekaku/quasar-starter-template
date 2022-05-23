import useCallApi from 'src/composables/useCallApi';
import { UserDto } from 'src/interface/models';
import { ResponseMessage } from 'src/interface/common';
export default () => {
  const { useFetch } = useCallApi();
  const findCurrentUserData = async () => {
    return await useFetch<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (fileManagerId: number) => {
    return await useFetch<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };

  return {
    findCurrentUserData,
    updateUserAvatar,
  };
};
