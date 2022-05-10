/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}
export interface LocaleOption {
  id: string;
  name: string;
}

export interface ApiResponse {
  response?: any;
  error?: any;
}
export interface DefaultAxiosInstance {
  Accept: string;
  //   baseURL: string;
  'Content-Type': string;
  'X-language': string;
  'Code-Version': number;
  'X-Api-Client': string;
  Authorization?: string;
}
export interface UserCredentialPicture {
  path: string;
  x: string;
  xx: string;
  xxx: string;
}
export interface UserCredential {
  id: number | string;
  username: string;
  email: string;
  rolesText?: string;
  status: boolean;
  picture: UserCredentialPicture;
  userRoles?: string[];
  apiKey: string;
}
export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface RequestType {
  API: string;
  baseURL?: string;
  method: IMethod;
  body?: any;
}
