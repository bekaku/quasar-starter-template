import useCallApi from 'src/composables/useCallApi';
import { FileManagerDto } from 'src/interface/models';
import { FILES_UPLOAD_ATT, FILES_DIRECTORY_ID_ATT } from 'src/utils/constant';
export default () => {
  const { useFetch } = useCallApi();
  const uploadApi = async (
    file: any,
    fileDirectoryId = 0
  ): Promise<FileManagerDto> => {
    const postData = new FormData();
    postData.append(FILES_UPLOAD_ATT, file);
    postData.append(FILES_DIRECTORY_ID_ATT, fileDirectoryId.toString());

    return await useFetch<FileManagerDto>({
      API: '/api/fileManager/uploadApi',
      method: 'POST',
      body: postData,
    });
  };

  return {
    uploadApi,
  };
};
