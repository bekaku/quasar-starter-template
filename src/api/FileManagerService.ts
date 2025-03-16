import { useAxios } from '@/composables/useAxios';
import type { FileManagerDto } from '@/types/models';
import type { ResponseDataType, ResponseMessage } from '@/types/common';
import { FILES_DIRECTORY_ID_ATT, FILES_UPLOAD_ATT } from '@/libs/constant';
import {
  downloadFromArrayBuffer,
  generateFileNameByExtesnsion,
  getBlobFromAxiosResponse,
  getFileNameFromAxiosResponse,
  getFileExtension,
  getFileNameFromResponse
} from '@/utils/fileUtil';

export default () => {
  const cdnBaseApi = process.env.APP_BASE_CDN_API || ''
  const { callAxios, callAxiosFile } = useAxios();
  const uploadApi = async (
    file: any,
    fileDirectoryId = 0,
    resizeImage = true
  ): Promise<FileManagerDto | null> => {
    const postData = new FormData();
    // postData.append(FILES_UPLOAD_ATT, file);
    // postData.append(FILES_DIRECTORY_ID_ATT, fileDirectoryId.toString());
    // postData.append('resizeImage', resizeImage ? '1' : '0');
    // return await callAxios<FileManagerDto>({
    //   API: '/api/fileManager/uploadApi',
    //   method: 'POST',
    //   body: postData,
    //   baseURL: cdnBaseApi || '',
    //   contentType: 'multipart/form-data'
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const deleteFileApi = async (fileId: number): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/fileManager/deleteFileApi/${fileId}`,
    //   method: 'DELETE',
    //   baseURL: cdnBaseApi
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/fileManager/updateUserAvatar?fileManagerId=${fileManagerId}`,
    //   method: 'PUT',
    //   baseURL: cdnBaseApi
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/fileManager/updateUserCover?fileManagerId=${fileManagerId}`,
    //   method: 'PUT',
    //   baseURL: cdnBaseApi
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  // const fethCdnData = async (
  //   path: string
  // ): Promise<any> => {
  //   const cdnBase = cdnBaseApi;
  //   const src = cdnBase ? path.replace(cdnBase, '') : path;
  //   return await callAxiosFile<any>({
  //     API: src,
  //     baseURL: cdnBaseApi,
  //     method: 'GET',
  //     responseType: 'arraybuffer'
  //   });
  // };
  const fethCdnData = async (
    path: string,
    responseDataType: ResponseDataType = 'blob'
  ): Promise<any> => {
    const cdnBase = cdnBaseApi;
    const src = cdnBase ? path.replace(cdnBase, '') : path;
    const response = await callAxiosFile<any>({
      API: src,
      baseURL: cdnBaseApi,
      method: 'GET',
      responseType: 'arraybuffer'
    });
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve /* reject */) => {
      if (response.data) {
        if (responseDataType == 'blob') {
          const imageUrlObject = await getBlobFromAxiosResponse(response);
          resolve(imageUrlObject);
        } else if (responseDataType == 'arraybuffer') {
          resolve(response.data);
        } else if (responseDataType == 'download') {
          const contentType = response.headers['content-type'];
          const fileName = getFileNameFromResponse(response);
          downloadFromArrayBuffer(response.data, fileName, contentType);
          // const name = 'Test.'
          resolve(response.data);
        } else if (responseDataType == 'axiosresponse') {
          resolve(response);
        }
      }
    });
  };
  const downloadCdnData = async (
    path: string,
    downloadFileName?: string
  ): Promise<any> => {
    const response = await fethCdnData(path, 'axiosresponse');
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve /* reject */) => {
      if (response.data) {
        const contentType = response.headers['content-type'];
        // const contentDisposition = response.headers['content-disposition'];
        let fileName = await getFileNameFromAxiosResponse(response);

        if (!fileName) {
          const fileExtension = getFileExtension(contentType);
          fileName = generateFileNameByExtesnsion(fileExtension, downloadFileName);
        }
        if (fileName) {
          downloadFromArrayBuffer(response.data, fileName, contentType);
        }
        resolve(response.data);
      }

      resolve(null);
    });
  };
  return {
    uploadApi,
    updateUserAvatar,
    updateUserCover,
    deleteFileApi,
    fethCdnData,
    downloadCdnData
  };
};
