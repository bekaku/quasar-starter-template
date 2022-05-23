export type IPlatForm = 1 | 2 | 3; // 1=web, 2=ios, 3=android
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface ImageDto {
  image: string;
  thumbnail: string;
}
export interface CompanyDto {
  id: number;
  name: string;
  nameEn?: string;
  address?: string;
  mobileNo?: string;
  faxNo?: string;
  numberOfUser?: string;
  startDate?: string;
  expireDate?: string;
  needVerifyPost?: string;
  companyLogo?: ImageDto;
  resetPrizePeriod: number;
  deLogPeriod: number;
  postLevel: number;
  upgradeLevelMonthCheck: number;
  upgradeCriteriaCheck: number;
  companyTypeId: number;
}

export interface AuthenticationResponse {
  authenticationToken: string | null;
  refreshToken: string | null;
  expiresAt: string;
  email: string | null;
  username?: string;
  avatar: ImageDto;
  company?: CompanyDto;
}
export interface UserDataDto {
  id: number;
  acumulatePrize: number;
  employeeId?: string;
  fullName?: string;
  onlyReviewOrganization?: boolean;
  priceQuota?: number;
  reviewPost: boolean;
  reviewUser: boolean;
  specialPriceQuota: number;
  companySelected?: number;
}
export interface UserDto {
  id: number;
  email: string;
  username?: string;
  token?: string;
  avatarFileId?: number;
  avatar?: ImageDto;
  active: boolean;
  userData?: UserDataDto;
  company?: CompanyDto;
}

// export interface LoginParamRequest {
//   [key: string]: {
//     email: string | null;
//     password: string | null;
//     loginForm: IPlatForm;
//   };
// }
export interface LoginRequest {
  user: {
    email: string | null;
    password: string | null;
    loginForm: IPlatForm;
  };
}
export interface RefreshTokenRequest {
  refreshToken: {
    refreshToken?: string | null;
    email?: string | null;
  };
}
export interface RefreshTokenResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: string;
}
export interface FileManagerDto {
  id: number;
  fileMime: string;
  fileName: string;
  filePath: string;
  fileThumbnailPath: string;
  fileSize: string;
}
