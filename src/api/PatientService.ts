import useAxios from 'src/composables/useAxios';
import { UserDto } from '@/types/models';
import { ResponseMessage } from '@/types/common';
import { UserChangePasswordRequest, AccessTokenDto } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();
  const findAllPatien = async (page:number,recordPerpage:number ): Promise<UserDto[]> => {
    return await callAxios<UserDto[]>({
      API: `/api/patient/findAll?page=${page}&perpage=${recordPerpage}`,
      method: 'GET',
    });
  };

  return {
    findAllPatien,
  };
};
