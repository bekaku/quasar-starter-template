export type IPlatForm = 1 | 2 | 3; // 1=web, 2=ios, 3=android
export type IPermissionOperationType = 1 | 2 | 3; // 1=crud, 2=report, 3=other
export type ICompanyPostLevel = 1 | 2; //1: By organization hierarchy , 2: public all user can view all post
export type IResetPrizeType = 1 | 2 | 3; //1: 1 week, 2: 2 weeks, 3: 1 month
export type IDeLogPeriodType = 1 | 2; //1: week, 2: 1 month
export type FormQuestionType =
  | 'TITLE'
  | 'FREE_TEXT'
  | 'FREE_TEXT_SHORT'
  | 'ROW_COLUMN'
  | 'LINEAR_SCALE'
  | 'RADIO'
  | 'DATE'
  | 'TIME'
  | 'FILE'
  | 'YOUTUBE_LINK'
  | 'MAP_LAT_LNG'; //0: TITLE, 1: FREE_TEXT,2: FREE_TEXT, 3: ROW_COLUMN,4: LINEAR_SCALE,5: RADIO,6: DATE,7: TIME,8: FILE,9: YOUTUBE_LINK,10: MAP_LAT_LNG,
export type PostActionType =
  | 'LOVE_IT'
  | 'PRIZE_IT'
  | 'ADOPT_IT'
  | 'ACTION_IT'
  | 'SHARE_IT'
  | 'COMMENT_IT';
export type PostSortType = 'NEW_POST' | 'NEW_ACTIVITY' | 'TOP_POST';
export type CommentSortType = 'ALL_COMMENT' | 'NEW_COMMENT' | 'TOP_COMMENT';
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
  index?: number;
  id?: number;
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
  id?: number | null;
  email: string;
  username?: string | null;
  password?: string | null;
  token?: string;
  avatarFileId?: number;
  coverFileId?: number;
  avatar?: ImageDto | null;
  cover?: ImageDto | null;
  active: boolean;
  userData: UserDataDto | null;
  company?: CompanyDto | null;
  selectedRoles?: number[];
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
export interface UserChangePasswordRequest {
  userChangePasswordRequest: {
    password: string;
    newPassword: string;
    logoutAllDevice: boolean;
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
export interface AccessTokenDto {
  id: number;
  ipAddredd: string;
  hostName: string;
  agent: string;
  loginPlatform: number;
  activeNow: boolean;
  createdDate: string;
  lastestActive: string;
}
export interface IMenuPageItem {
  iconText?: string;
  color?: string;
  icon?: string;
  to?: string;
  title?: string;
  permission?: string;
  border?: boolean;
  noActiveLink?: boolean;
}
export interface IMenuPage extends IMenuPageItem {
  items?: IMenuPageItem[];
}
export interface IMenu {
  pages?: IMenuPage[];
  header?: string;
  border?: true;
}
export interface IAcl {
  menus: IMenu[];
  permissions: string[];
}

export interface Permission {
  id: number | null;
  code: string;
  remark?: string | null;
  description?: string | null;
  operationType: IPermissionOperationType;
  frontEnd?: boolean;
}
export interface PermissionRequest {
  [key: string]: Permission;
}

export interface IFormPostType {
  label: string;
  value: FormQuestionType;
  icon: string;
}
export interface Hashtag {
  id: number;
  name: string;
}
export interface PostReference {
  name: string;
  activity: string;
  activityIcon: string;
}
export interface PostData {
  id: number;
  pin: boolean;
  postDatetime: string;
  valid?: boolean;
  cardFormId?: number;
  companyChallengeId?: number;
  organizationId?: number;
  appUserId?: number;
  content: string;
  reference?: PostReference;
  gallery: ImageDto[];
  hashtag: Hashtag[];
}
export interface OgMeta {
  domain: string;
  url: string;
  title?: string;
  desc?: string;
  image?: string;
  imageAlt?: string;
}
