import useCallApi from 'src/composables/useCallApi';
import { UserDto } from 'src/interface/models';
export default () => {
  const { useFetch } = useCallApi();
  const findCurrentUserData = async () => {
    return await useFetch<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };

  return {
    findCurrentUserData,
  };
};
