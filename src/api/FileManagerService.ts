import useAxios from 'src/composables/useAxios';
import { FileManagerDto } from '@/types/models';
import { FILES_UPLOAD_ATT, FILES_DIRECTORY_ID_ATT } from 'src/utils/constant';
export default () => {
  const { callAxios } = useAxios();
  const uploadApi = async (
    file: any,
    fileDirectoryId = 0
  ): Promise<FileManagerDto> => {
    const postData = new FormData();
    postData.append(FILES_UPLOAD_ATT, file);
    postData.append(FILES_DIRECTORY_ID_ATT, fileDirectoryId.toString());

    return await callAxios<FileManagerDto>({
      API: '/api/fileManager/uploadApi',
      method: 'POST',
      body: postData,
    });
  };

  return {
    uploadApi,
  };
};
