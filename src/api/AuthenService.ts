import { useAxios } from '@/composables/useAxios';
import type {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/models';
import type { AppException, ForgotPasswordRequest, ResponseMessage, } from '@/types/common';
import type { AxiosResponse } from 'axios';
import { authenResponse } from 'src/libs/data';
export default () => {
  const { callAxios, callAxiosProcess } = useAxios();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse | null> => {
    // return await callAxios<RefreshTokenResponse>({
    //   API: '/api/auth/login',
    //   method: 'POST',
    //   body: loginRequest,
    // });
    console.log('AuthenService.ts > singin', loginRequest);

    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(authenResponse)
      }, 500);
    })
  };
  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: '/api/auth/logout',
    //   method: 'POST',
    //   body: refreshToken,
    // });
    console.log('AuthenService.ts > singoutToServer', refreshToken);
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          status: 'OK',
          timestamp: '2025-03-14 13:30'
        })
      }, 500);
    })
  };
  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse | null> => {
    // return await callAxios<RefreshTokenResponse>({
    //   API: '/api/auth/refreshToken',
    //   method: 'POST',
    //   body: refreshToken,
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
    //   API: `/api/user/removeAccessTokenSession?id=${id}`,
    //   method: 'DELETE',
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
  // Forgot password
  const requestVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
    // return await callAxiosProcess<ResponseMessage | AppException>({
    //   API: '/api/auth/requestVerifyCodeToResetPwd',
    //   method: 'POST',
    //   body: {
    //     forgotPasswordRequest: req
    //   },
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const sendVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
    // return await callAxiosProcess<ResponseMessage | AppException>({
    //   API: '/api/auth/sendVerifyCodeToResetPwd',
    //   method: 'POST',
    //   body: {
    //     forgotPasswordRequest: req
    //   },
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  const resetPassword = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
    // return await callAxiosProcess<ResponseMessage | AppException>({
    //   API: '/api/auth/resetPassword',
    //   method: 'POST',
    //   body: {
    //     forgotPasswordRequest: req
    //   },
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };
  return {
    singin,
    singoutToServer,
    refreshToken,
    removeAccessTokenSession,
    requestVerifyCodeToResetPwd,
    sendVerifyCodeToResetPwd,
    resetPassword
  };
};
