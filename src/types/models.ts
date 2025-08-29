import type { IconColor, ISsIcons, Date, ChatType, ChatMessageType } from '@/types/common';
export type IPlatForm = 1 | 2 | 3; // 1=web, 2=ios, 3=android
export type IPermissionOperationType = 1 | 2 | 3; // 1=crud, 2=report, 3=other
export type ICompanyPostLevel = 1 | 2; // 1: By organization hierarchy , 2: public all user can view all post
export type IResetPrizeType = 1 | 2 | 3; // 1: 1 week, 2: 2 weeks, 3: 1 month
export type IDeLogPeriodType = 1 | 2; // 1: week, 2: 1 month
export type AppLocale = 'th' | 'en';
export type LoginLogType = 'WEB' | 'IOS' | 'ANDROID';
export type NotifyFunctionType =
  | 'SYSTEM_ANNOUNMENT'
  | 'GENERAL'
  | 'LIKE_POST'
  | 'LIKE_COMMENT'
  | 'COMMENT_POST'
  | 'COMMENT_REPLY'
  | 'SHARE'
  | 'CHAT'
  ;
export type SearchType = 'POST' | 'PROFILE' | 'HASHTAG' | 'THEME';
export type PlatformType = 'WEB' | 'IOS' | 'ANDROID';
export type Axis = 'x' | 'y';
export type CommentSortType = 'ALL_COMMENT' | 'NEW_COMMENT' | 'TOP_COMMENT';
export type PostSortType = 'NEW_POST' | 'NEW_ACTIVITY' | 'TOP_POST';
export type PostActionType =
  | 'LOVE_IT'
  | 'PRIZE_IT'
  | 'ADOPT_IT'
  | 'ACTION_IT'
  | 'SHARE_IT'
  | 'COMMENT_IT';
export type FeedType =
  | 'POST'
  | 'SHARE'
  | 'LIKE'
  | 'PRIZE'
  | 'ADOPT'
  | 'ACTION'
  | 'COMMENT'
  | 'HASHTAG'
  | 'LEARN'
  ;
export type EmojiType = 'LIKE' | 'FIGHTING' | 'LAUGH' | 'WOW' | 'CARE' | 'SAD';
export interface Id {
  id: number | string | null
}
export interface ApiListResponse {
  totalPages: number
  totalElements: number
  last: boolean
}
export interface IApiListResponse<Type> extends ApiListResponse {
  dataList: Type[]
}

export interface IListResponse extends ApiListResponse {
  dataList: any[]
}
// export interface PermissionResponse extends IApiListResponse {
//   dataList: Permission[];
// }
export interface ImageDto {
  index?: number
  id?: number
  image: string
  thumbnail: string
}
export interface AuthenticationResponse {
  authenticationToken: string | null
  refreshToken: string | null
  expiresAt: Date
  email: string | null
  username?: string
  avatar: ImageDto
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
    emailOrUsername: string | null
    password: string | null
    loginFrom: LoginLogType
    deviceId?: string | null
  }
}
export interface RefreshTokenRequest {
  refreshToken: {
    refreshToken?: string | null
    fcmToken?: string | null
    email?: string | null
    fcmEnable?: boolean
  }
}
export interface UserChangePasswordRequest {
  userChangePasswordRequest: {
    password: string
    newPassword?: string
    logoutAllDevice: boolean
  }
}
export interface RefreshTokenResponse {
  userId?: number
  authenticationToken: string
  refreshToken: string
  expiresAt?: string
}
export interface FileManagerDto extends Id {
  fileMime: string
  fileName: string
  filePath: string
  fileThumbnailPath: string | null
  fileSize: string
  functionId?: number | null
  isImage?: boolean
  image?: boolean
  file?: any
  createdDate?: string
}
export interface AccessTokenDto extends Id {
  ipAddredd: string
  hostName: string
  agent: string
  loginFrom: LoginLogType
  activeNow: boolean
  createdDate: string
  lastestActive: string
}

export interface IMenuPageItem {
  iconText?: string
  color?: string
  icon?: string
  to?: string
  title?: string
  caption?: string
  titleI18n?: boolean
  permission?: string
  border?: boolean
  header?: string
  headerI18n?: boolean
  noActiveLink?: boolean
  userAcl?: boolean
  canShow?: boolean
  image?: string
  imageSize?: number
  fetchImage?: boolean
  isSsIcon?: boolean
  iconSsColor?: IconColor
  iconSize?: number
  iconColor?: string
  ssIcon?: ISsIcons
  translate?: boolean
  isAdmin?: boolean | undefined
  permissions?: string[]
}
export interface IMenuPage extends IMenuPageItem {
  items?: IMenuPageItem[]
}
export interface IMenu {
  pages?: IMenuPage[]
  header?: string
  border?: boolean
  translate?: boolean
}
export interface IAcl {
  menus: IMenu[]
  permissions: string[]
  frontendMenus: IMenu[]
  frontendPermissions: string[]
}

export interface OgMeta {
  domain: string
  url: string
  title?: string
  desc?: string
  image?: string
  imageAlt?: string
}
export interface NameIdDto extends Id {
  name: string
}
export interface OptionItems {
  label: string
  value: string | number | boolean
  description?: string
}
export interface ChartSeries {
  name: string
  data: number[]
  type?: string | null
}
export interface ChartDataXy {
  x: number | string
  y: number
}
export interface ChartSeriesTypeVo {
  name: string
  type: string
  data: ChartDataXy[]
}
export interface ChartAnotationPointMarkerVo {
  size: number
}
export interface ChartAnotationPointLabelVo {
  borderColor: string
  offsetY: number
  offsetX: number
  text: string
}
export interface ChartAnotationPointVo {
  x: number | string
  y: number | string
  marker: ChartAnotationPointMarkerVo
  label: ChartAnotationPointLabelVo
}
export interface SeriresCategories {
  series: ChartSeries[]
  categories: string[]
  max?: number
  orgName?: string
}
export interface ISearch {
  searchId: number
  searchResult: string
  searchType: SearchType
  avatar: ImageDto | null
  cover: ImageDto | null
  userRefDto: UserProfileDto | null
}
export interface NotificationDto extends Id {
  functionCode: NotifyFunctionType
  functionId: number
  readStatus: boolean
  message: string
  createdDate: string
  fromUser: UserProfileDto | null
}
export interface NotificationCount {
  lastestId: number
  totalNotify: number
}
export interface UserPersonalEditRequest {
  fullName?: string
  email?: string
  username?: string
  mobilePhone?: string
  positionName?: string
  teamLeaderName?: string
  initialConfig?: boolean
  autoFollowUser?: boolean
}
export interface AppVersionDto {
  codeVersion: number
  fourceUpdate: boolean
  puaseUpdate: boolean
  appVersionIos: string | null
  appVersionAndroid: string | null
}
export interface IMenuItem extends Id {
  title: string
  description?: string
  i18n?: boolean
  link?: string
  external?: boolean
  itemDetail?: boolean
  icon?: string
  iconType?: 'ion' | 'bootstrap'
}
export interface SearchItem {
  q?: string
  post: boolean
  hashTag: boolean
  profile: boolean
  theme: boolean
}
export interface IAxisItem {
  label: string
  value: Axis
}

export interface Permission extends Id {
  code: string
  remark?: string | null
  description?: string | null
  operationType: IPermissionOperationType
  frontEnd?: boolean
}
export interface PermissionRequest {
  [key: string]: Permission
}
export interface Role extends Id {
  name: string
  nameEn?: string | null
  active: boolean
  frontEnd: boolean
  selectdPermissions: number[]
  companySelected: number | null
}
export interface UserDto extends Id {
  email: string
  username?: string | null
  password?: string | null
  token?: string | null
  fcmToken?: string | null
  avatar?: ImageDto | null
  cover?: ImageDto | null
  active: boolean
  selectedRoles?: number[]
  defaultLocale?: AppLocale
  permissions?: string[] | undefined
  name?: string
}
export interface UserProfileDto extends Id {
  id: number
  username: string
  fullName: string
  avatar: ImageDto | null
  cover: ImageDto | null
}


export interface Hashtag {
  id: number
  name: string
}
export interface PostReference {
  name: string
  activity: string
  activityIcon: string
}
export interface PostData {
  id: number
  pin: boolean
  postDatetime: string
  valid?: boolean
  cardFormId?: number
  companyChallengeId?: number
  organizationId?: number
  appUserId?: number
  content: string
  reference?: PostReference
  gallery: FileManagerDto[]
  hashtag: Hashtag[]
}
export interface GroupChatMemberDto extends Id {
  favorite: boolean
  muteNotify: boolean
  pin: boolean
  online?: boolean
  joinDate: string
  offDate?: string
  member: UserProfileDto
}

export interface GroupChatDto extends Id {
  dtoAvatar?: ImageDto | null
  chatType: ChatType
  groupName?: string | null
  latestMessage?: string | null
  latestUpdate?: string | null
  latestMessageType?: ChatMessageType | null
  totalNewMessage: number
  totalMembers?: number
  pin: boolean
  favorite: boolean
  muteNotify: boolean
  online: boolean
  memberItems?: GroupChatMemberDto[]
  totalImages?: number
  totalFile?: number
}

export interface GroupChatRequest {
  fileAvatarSelectId?: number | null | undefined
  chatType: ChatType
  groupName: string | null
  newMemberUserIds: number[]
  deleteAvatar?: boolean | undefined
  newAvatar?: ImageDto | undefined
  avatarPreview?: string | undefined
}
export interface GroupChatFileDto extends Id {
  fileManager?: FileManagerDto | null | undefined
}

export interface EmojiCountDto {
  total: number
  emojiType: EmojiType
}
export interface GroupChatMsgDto extends Id {
  groupId?: number | undefined
  chatMsg?: string | undefined | null
  msgDateTime: string
  readCount: number
  unsend?: boolean | undefined
  sent: boolean
  sendUser?: UserDto | undefined
  files?: GroupChatFileDto[] | undefined |null
  liked?: boolean | undefined
  onlyLabel?: boolean | undefined
  emojiType?: EmojiType | null | undefined
  reactionEngage?: EmojiCountDto[] | undefined
  dtoReplyTo?: GroupChatMsgDto | null | undefined
  chatMessageType?: ChatMessageType | undefined
}
export interface GroupChatMsgRequest {
  chatMessageType?: ChatMessageType | undefined | null
  chatMsg?: string | null
  fileIds?: number[]
  shareMessageIds?: number[]
  replyToId?: number | null
}