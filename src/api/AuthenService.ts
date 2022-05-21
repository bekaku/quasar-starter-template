import useCallApi from 'src/composables/useCallApi';
import {
  LoginRequest,
  AuthenticationResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from 'src/interface/models';
import { ResponseMessage } from 'src/interface/common';
export default () => {
  const { useFetch } = useCallApi();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<AuthenticationResponse> => {
    return await useFetch<AuthenticationResponse>({
      API: '/api/auth/login',
      method: 'POST',
      body: loginRequest,
    });
  };
  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage> => {
    return await useFetch<ResponseMessage>({
      API: '/api/auth/logout',
      method: 'POST',
      body: refreshToken,
    });
  };
  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    return await useFetch<RefreshTokenResponse>({
      API: '/api/auth/refreshToken',
      method: 'POST',
      body: refreshToken,
    });
  };

  return {
    singin,
    singoutToServer,
    refreshToken,
  };
};
