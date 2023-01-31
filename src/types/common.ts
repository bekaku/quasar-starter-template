/* eslint-disable @typescript-eslint/no-explicit-any */

// enum
export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}
export type IHrefTarget = '_blank' | '_parent' | '_self' | '_top';
// type
export interface NotifyOptions {
  icon?: string;
  caption?: string;
  avatar?: string;
  color?: string;
  textColor?: string;
  type?: 'positive' | 'negative' | 'warning' | 'info';
  timeout?: number;
  progress?: boolean;
  multiLine?: boolean;
  spinner?: boolean;
  html?: boolean;
  hideClose?: boolean;
  position?:
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center';
  actions?: any[];
}
export type IHttpStatus =
  | 'OK'
  | 'CREATED'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'BAD_REQUEST'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR';
export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type IThemeSettingOptions = 'dark' | 'light' | 'system' | 'realtime';
export type ITheme = 'dark' | 'light';
export type IResult =
  | '404'
  | '403'
  | '500'
  | '418'
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'empty';
export type IAlert =
  | 'is-primary'
  | 'is-link'
  | 'is-info'
  | 'is-success'
  | 'is-warning'
  | 'is-danger'
  | 'is-light';
// interface
export interface ILocales {
  name: string;
  iso: string;
  flag: string;
}
// export interface ILocales {
//   [key: string]: {
//     name: string;
//     iso: string;
//     flag: string;
//   };
// }
export interface LocaleOption {
  id: string;
  name: string;
}

export interface RequestType {
  API: string;
  baseURL?: string;
  method: IMethod;
  body?: any;
  contentType?: string;
}
export interface ApiResponse {
  response?: any;
  error?: any;
}
export interface ResponseMessage {
  status: IHttpStatus;
  message?: string;
  timestamp: string;
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
export interface AppException {
  status: string;
  message: string;
  errors?: string[];
  timestamp?: string;
}
export interface ServerException {
  status: number | string;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
export interface UseMetaOptions {
  additionalTitle?: string;
  manualSet?: boolean;
}
