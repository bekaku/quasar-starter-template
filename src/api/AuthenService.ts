// import useAxios from 'src/composables/useAxios';
import {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/models';
import { ResponseMessage } from '@/types/common';
export default () => {
  // const { callAxios } = useAxios();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse> => {
    // return await callAxios<RefreshTokenResponse>({
    //   API: '/api/auth/login',
    //   method: 'POST',
    //   body: loginRequest,
    // });
    console.log('singin', loginRequest);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          authenticationToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNWFhNDEzZS05Mzc0LTRmZTktOTM0Yi1mYmRiYTQ5OWVlNWUiLCJpYXQiOjE2NTM0NDY3MzksImV4cCI6MTY4NDk4MjczOX0.mGosG2ZZrlj7qZQaZAAQ788r11WbVYZvZ4sI7L0G4wA',
          expiresAt: '2023-05-25T02:45:39.725+00:00',
          refreshToken: 'a5aa413e-9374-4fe9-934b-fbdba499ee5e',
        });
      }, 1500);
    });
  };
  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage> => {
    console.log('singoutToServer', refreshToken);
    // return await useFetch<ResponseMessage>({
    //   API: '/api/auth/logout',
    //   method: 'POST',
    //   body: refreshToken,
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'OK',
          message: 'Logout successful',
          timestamp: '2022-05-25 10:30:45',
        });
      }, 1500);
    });
  };
  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    // return await useFetch<RefreshTokenResponse>({
    //   API: '/api/auth/refreshToken',
    //   method: 'POST',
    //   body: refreshToken,
    // });

    console.log('refreshToken', refreshToken);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          authenticationToken:
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhNWFhNDEzZS05Mzc0LTRmZTktOTM0Yi1mYmRiYTQ5OWVlNWUiLCJpYXQiOjE2NTM0NDY3MzksImV4cCI6MTY4NDk4MjczOX0.mGosG2ZZrlj7qZQaZAAQ788r11WbVYZvZ4sI7L0G4wA',
          expiresAt: '2023-05-25T02:45:39.725+00:00',
          refreshToken: 'a5aa413e-9374-4fe9-934b-fbdba499ee5e',
        });
      }, 1500);
    });
  };
  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage> => {
    // return await useFetch<ResponseMessage>({
    //   API: `/api/auth/removeAccessTokenSession?id=${id}`,
    //   method: 'DELETE',
    // });
    console.log('removeAccessTokenSession', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'OK',
          message: 'removeAccessTokenSession successful',
          timestamp: '2022-05-25 10:30:45',
        });
      }, 1500);
    });
  };

  return {
    singin,
    singoutToServer,
    refreshToken,
    removeAccessTokenSession,
  };
};
