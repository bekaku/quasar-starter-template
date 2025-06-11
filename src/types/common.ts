import type { AvatarProps, RBACProps } from './props';

// enum
export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export enum CrudListDataType {
  TEXT,
  HTML,
  IMAGE,
  AVATAR,
  STATUS,
  DATE,
  DATE_TIME,
  LINKABLE,
  BASE_TOOL,
  NUMBER_FORMAT,
  ICON,
  FUNCTION,
}
// type
export type Date = string;
export type SearchOperation = ':' | '>' | '>=' | '<' | '<=' | '=' | '!=';
export interface ChoosePhotoItem {
  webPath?: string;
  file?: File;
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
export type ILanguge = 'en' | 'th';
export type ICrudAction = 'new' | 'view' | 'copy' | 'edit';
export type GenerateLinkType = 'post' | 'profile';
export type EmojiSet = 'native' | 'apple' | 'facebook' | 'google' | 'twitter';
export type IResult =
  | '400'
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
export type IHrefTarget = '_blank' | '_parent' | '_self' | '_top';
export type IconColor = 'grey' | 'color' | 'white' | 'outline';
export type ISsIcons =
  | 'action'
  | 'action_2'
  | 'add'
  | 'admin'
  | 'avatar'
  | 'adopt'
  | 'avatar'
  | 'block'
  | 'celebrate'
  | 'chat'
  | 'checkin'
  | 'comment'
  | 'company'
  | 'd_act'
  | 'd_engage'
  | 'd_keep'
  | 'd_learn'
  | 'd_use'
  | 'emoji_care'
  | 'emoji_fighting'
  | 'emoji_laugh'
  | 'emoji_learner'
  | 'emoji_learner_2'
  | 'emoji_like'
  | 'emoji_love'
  | 'emoji_sad'
  | 'emoji_wow'
  | 'empty_box'
  | 'engage'
  | 'follow_post'
  | 'help'
  | 'home'
  | 'inprogress'
  | 'like'
  | 'notification'
  | 'order'
  | 'order_command'
  | 'order_recive'
  | 'overdue'
  | 'post'
  | 'pre_emoji'
  | 'prize'
  | 'prize_2'
  | 'prize_3'
  | 'prize_4'
  | 'prize_grey'
  | 'report'
  | 'reward_trade'
  | 'sad_man'
  | 'search'
  | 'share'
  | 'tag'
  | 'team_leader'
  | 'team_member'
  | 'theme'
  | 'theme_leader'
  | 'tick'
  ;
export type JwtStatus = 'VALID' | 'EXPIRED' | 'NO_EXPIRATION_TIME' | 'INVALID';
export type MDPreviewTheme = 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis';
export type MDCodeTheme =
  'atom'
  | 'a11y'
  | 'github'
  | 'gradient'
  | 'kimbie'
  | 'paraiso'
  | 'qtcreator'
  | 'stackoverflow';

export type AppColor = 'primary' | 'secondary' | 'accent' | 'dark' | 'positive' | 'negative' | 'info' | 'warning' | 'black' | 'white' | 'light'
  | 'red' | 'red-1' | 'red-2' | 'red-3' | 'red-4' | 'red-5' | 'red-6' | 'red-7' | 'red-8' | 'red-9' | 'red-10' | 'red-11' | 'red-12' | 'red-13' | 'red-14'
  | 'pink' | 'pink-1' | 'pink-2' | 'pink-3' | 'pink-4' | 'pink-5' | 'pink-6' | 'pink-7' | 'pink-8' | 'pink-9' | 'pink-10' | 'pink-11' | 'pink-12' | 'pink-13' | 'pink-14'
  | 'purple' | 'purple-1' | 'purple-2' | 'purple-3' | 'purple-4' | 'purple-5' | 'purple-6' | 'purple-7' | 'purple-8' | 'purple-9' | 'purple-10' | 'purple-11' | 'purple-12' | 'purple-13' | 'purple-14'
  | 'deep-purple' | 'deep-purple-1' | 'deep-purple-2' | 'deep-purple-3' | 'deep-purple-4' | 'deep-purple-5' | 'deep-purple-6' | 'deep-purple-7' | 'deep-purple-8' | 'deep-purple-9' | 'deep-purple-10' | 'deep-purple-11' | 'deep-purple-12' | 'deep-purple-13' | 'deep-purple-14'
  | 'indigo' | 'indigo-1' | 'indigo-2' | 'indigo-3' | 'indigo-4' | 'indigo-5' | 'indigo-6' | 'indigo-7' | 'indigo-8' | 'indigo-9' | 'indigo-10' | 'indigo-11' | 'indigo-12' | 'indigo-13' | 'indigo-14'
  | 'blue' | 'blue-1' | 'blue-2' | 'blue-3' | 'blue-4' | 'blue-5' | 'blue-6' | 'blue-7' | 'blue-8' | 'blue-9' | 'blue-10' | 'blue-11' | 'blue-12' | 'blue-13' | 'blue-14'
  | 'light-blue' | 'light-blue-1' | 'light-blue-2' | 'light-blue-3' | 'light-blue-4' | 'light-blue-5' | 'light-blue-6' | 'light-blue-7' | 'light-blue-8' | 'light-blue-9' | 'light-blue-10' | 'light-blue-11' | 'light-blue-12' | 'light-blue-13' | 'light-blue-14'
  | 'cyan' | 'cyan-1' | 'cyan-2' | 'cyan-3' | 'cyan-4' | 'cyan-5' | 'cyan-6' | 'cyan-7' | 'cyan-8' | 'cyan-9' | 'cyan-10' | 'cyan-11' | 'cyan-12' | 'cyan-13' | 'cyan-14'
  | 'teal' | 'teal-1' | 'teal-2' | 'teal-3' | 'teal-4' | 'teal-5' | 'teal-6' | 'teal-7' | 'teal-8' | 'teal-9' | 'teal-10' | 'teal-11' | 'teal-12' | 'teal-13' | 'teal-14'
  | 'green' | 'green-1' | 'green-2' | 'green-3' | 'green-4' | 'green-5' | 'green-6' | 'green-7' | 'green-8' | 'green-9' | 'green-10' | 'green-11' | 'green-12' | 'green-13' | 'green-14'
  | 'light-green' | 'light-green-1' | 'light-green-2' | 'light-green-3' | 'light-green-4' | 'light-green-5' | 'light-green-6' | 'light-green-7' | 'light-green-8' | 'light-green-9' | 'light-green-10' | 'light-green-11' | 'light-green-12' | 'light-green-13' | 'light-green-14'
  | 'lime' | 'lime-1' | 'lime-2' | 'lime-3' | 'lime-4' | 'lime-5' | 'lime-6' | 'lime-7' | 'lime-8' | 'lime-9' | 'lime-10' | 'lime-11' | 'lime-12' | 'lime-13' | 'lime-14'
  | 'yellow' | 'yellow-1' | 'yellow-2' | 'yellow-3' | 'yellow-4' | 'yellow-5' | 'yellow-6' | 'yellow-7' | 'yellow-8' | 'yellow-9' | 'yellow-10' | 'yellow-11' | 'yellow-12' | 'yellow-13' | 'yellow-14'
  | 'amber' | 'amber-1' | 'amber-2' | 'amber-3' | 'amber-4' | 'amber-5' | 'amber-6' | 'amber-7' | 'amber-8' | 'amber-9' | 'amber-10' | 'amber-11' | 'amber-12' | 'amber-13' | 'amber-14'
  | 'orange' | 'orange-1' | 'orange-2' | 'orange-3' | 'orange-4' | 'orange-5' | 'orange-6' | 'orange-7' | 'orange-8' | 'orange-9' | 'orange-10' | 'orange-11' | 'orange-12' | 'orange-13' | 'orange-14'
  | 'deep-orange' | 'deep-orange-1' | 'deep-orange-2' | 'deep-orange-3' | 'deep-orange-4' | 'deep-orange-5' | 'deep-orange-6' | 'deep-orange-7' | 'deep-orange-8' | 'deep-orange-9' | 'deep-orange-10' | 'deep-orange-11' | 'deep-orange-12' | 'deep-orange-13' | 'deep-orange-14'
  | 'brown' | 'brown-1' | 'brown-2' | 'brown-3' | 'brown-4' | 'brown-5' | 'brown-6' | 'brown-7' | 'brown-8' | 'brown-9' | 'brown-10' | 'brown-11' | 'brown-12' | 'brown-13' | 'brown-14'
  | 'grey' | 'grey-1' | 'grey-2' | 'grey-3' | 'grey-4' | 'grey-5' | 'grey-6' | 'grey-7' | 'grey-8' | 'grey-9' | 'grey-10' | 'grey-11' | 'grey-12' | 'grey-13' | 'grey-14'
  | 'blue-grey' | 'blue-grey-1' | 'blue-grey-2' | 'blue-grey-3' | 'blue-grey-4' | 'blue-grey-5' | 'blue-grey-6' | 'blue-grey-7' | 'blue-grey-8' | 'blue-grey-9' | 'blue-grey-10' | 'blue-grey-11' | 'blue-grey-12' | 'blue-grey-13' | 'blue-grey-14';

export type ChatSettingType =
  'NOTIFICATION'
  | 'PIN'
  | 'FAVORITE'
  | 'LEAVE'
  | 'UPDATE_READ_ALL'
  | 'CLEAR_NEW_MESSAGE_NUMBER'
  | 'CLEAR_NEW_MESSAGE_NUMBER_ONLY'
  | 'UPDATE_DATA'
  ;
export type ChatType = 'PERSONAL' | 'GROUP';
export type ChatMessageType = 'MEDIA' | 'TEXT' | 'IMAGE' | 'FILE' | 'INVITE' | 'LEAVE' | 'LOCATION';
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
export interface IThemeItem {
  key: ITheme;
  text: string;
  icon: string;
}
export interface RequestType {
  API: string;
  baseURL?: string | undefined;
  method: IMethod;
  body?: any;
  contentType?: string;
  responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';
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
export type ISortModeType = 'asc' | 'desc';
export interface ISort {
  mode?: ISortModeType;
  column?: string;
}
export interface ISortMode {
  label: string;
  value: ISortModeType;
}
export interface ILabelValue {
  label: string;
  value: string | number | boolean;
}
export interface LabelValue<Type> {
  // avatar?: string;
  // avatarSize?: string;
  avatar?: AvatarProps;
  border?: boolean;
  children?: LabelValue<Type>[]
  color?: string;
  disable?: boolean;
  description?: string | undefined;
  fetch?: boolean;
  icon?: string | undefined;
  iconSize?: string;
  label?: string;
  noActiveLink?: boolean;
  rbac?: RBACProps;
  params?: string[];
  queries?: string[];
  to?: string;
  translateLabel?: boolean;
  value?: Type | undefined;
  onHandle?: (...params: any[] | []) => void;
}
export interface ITextValue {
  text: string;
  value: number | string;
}
export interface IPagination {
  current: number;
  itemsPerPage: number;
  totalPages: number;
  totalElements?: number;
  last?: boolean;
  perPageList: ITextValue[];
}
export interface CrudListApiOptions {
  apiEndpoint?: string;
  crudName?: string;
  actionList?: string;
  actionDelete?: string;
  actionPost?: string;
  actionPut?: string;
  actionGetOne?: string;
  additionalUri?: string;
  defaultSort?: ISort;
  defaultSorts?: ISort[];
  itemsPerPage?: number;
  fetchListOnload?: boolean;
  pageAble?: boolean;
  pageStartZero?: boolean;
  sortAble?: boolean;
  concatList?: boolean;
}
export interface ICrudListApiOptions extends CrudListApiOptions {
  urlEndpoint: string;
  reverseList?: boolean;
  addUnshift?: boolean;
  preventResetListReload?: boolean;
}
export interface CrudFormApiOptions {
  apiEndpoint?: string;
  crudName?: string;
  fetchDataLink?: string;
  backLink?: string;
  backToPreviousPath?: boolean;
  actionList?: string;
  actionPost?: string;
  actionPut?: string;
  actionDelete?: string;
  basePath?: string;
  fectchDataOnLoad?: boolean;
  autoPageTitle?: boolean;
  preventRedirectToList?: boolean;
  requestEntityName?: string;
  methodPutIncludeId?: boolean;
}
export type ResponseDataType = 'arraybuffer' | 'blob' | 'json' | 'download' | 'axiosresponse';
export type FileType = 'pdf' | 'msexcel' | 'msword' | 'mspowerpoint' | 'image' | 'zip' | 'unknown';
export type IAlign = 'center' | 'left' | 'right';
export type ChatHistoryTab = 'ALL' | 'GROUP' | 'FAVORITE';
export enum ICrudListHeaderOptionSearchType {
  TEXT,
  NUMBER,
  BOOLEAN,
  DATE,
  DATETIME,
  OPTIONS,
}
export interface ICrudListHeaderOption {
  searchable?: boolean;
  fillable?: boolean;
  sortable?: boolean;
  external?: boolean; // LINKABLE
  editButton?: boolean; // BASE_TOOL
  deleteButton?: boolean; // BASE_TOOL
  copyButton?: boolean; // BASE_TOOL
  square?: boolean; // AVATAR,
  rounded?: boolean; // AVATAR,
  size?: string; // AVATAR 45px,
  // body td
  style?: string; // 'height: auto; width: 100px' for IMAGE,
  classes?: string;
  // header th:
  headerStyle?: string;
  headerClasses?: string;
  align?: IAlign; // 'center', center left right
  searchType?: ICrudListHeaderOptionSearchType;
  searchModel?: any;
  searchColunm?: string;
  sortColunm?: string;
  searchOperation?: SearchOperation;
  searchOperationReadonly?: boolean;
  maxWidth?: string;// 250px
  toolTip?: boolean;
  func?: any;
  trueIcon?: string;
  falseIcon?: string;
  clickable?: boolean;
  selectOption?: {
    items: LabelValue<any>[]
    multiple?: boolean
  };
}
export interface ICrudListHeader {
  column?: string;
  field?: any;
  label: string;
  translateLabel?: boolean
  type: CrudListDataType;
  options: ICrudListHeaderOption;
}
export interface UseMetaOptions {
  additionalTitle?: string;
  manualSet?: boolean;
}
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
  | 'bottom-left'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center';
  actions?: any[];
}
export interface RequestDto {
  [key: string]: any;
}
export interface IFile {
  type: string;
  size: number;
  icon: string;
  name?: string;
  filePath?: string | null;
}
export interface ServerException {
  status: number | string;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}
export interface CacheDateAndKey {
  key: string;
  date: string | number;
}
export interface SlideAutoplay {
  delay: number;
}

export interface SlideZoom {
  maxRatio: number;
}

export interface SlidePaginationy {
  hideOnClick?: boolean;
  enabled?: boolean;
  dynamicBullets?: boolean;
}
export interface SwiperSlideChange {
  activeIndex: number
  realIndex: number
}
export type SlidePaginationType = 'progressbar' | 'bullets' | 'fraction' | 'custom';
export type SlideDirectionType = 'horizontal' | 'vertical';
export type SlideEffectType = 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards';
export interface SlideOptions {
  autoplay?: boolean | SlideAutoplay;
  breakpoints?: any;
  centeredSlides?: boolean;
  allowTouchMove?: boolean;
  direction?: SlideDirectionType;
  effect?: SlideEffectType;
  freeMode?: boolean;
  initialSlide?: number;
  keyboard?: boolean;
  lazy?: boolean;
  loop?: boolean;
  modules?: SlideModule[];
  navigation?: boolean;
  navigationType?: boolean;
  navigationCustom?: boolean;
  pagination?: boolean | SlidePaginationy;
  paginationClickable?: boolean;
  paginationType?: SlidePaginationType;
  paginationDynamic?: boolean;
  scrollbar?: boolean;
  style?: any | object;
  speed?: number;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  slidesPerGroup?: number;
  thumbs?: boolean;
  updateOnWindowResize?: boolean;
  zoom?: boolean | SlideZoom;
  gridRows?: number;
  grabCursor?: boolean;
}
export type SlideModule =
  | 'Autoplay'
  | 'Keyboard'
  | 'Scrollbar'
  | 'Zoom'
  | 'Navigation';
export interface Country {
  code: CountryCode;
  no: number;
  name: string;
}
export interface Breadcrumb {
  label: string;
  translateLabel?: boolean;
  icon?: string;
  to?: string;
  params?: string[];
  queries?: string[];
  permissions?: string[];
  frontend?: boolean;
}
export interface RefeshTokenStatus {
  status: boolean;
  fourceLogout: boolean;
  token?: string;
}
export interface ForgotPasswordRequest {
  email: string;
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface VirtualScrollerUpdate {
  viewStartIndex: number;
  viewEndIndex: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
  isScrollingToTop: boolean;
}

export interface VueMoneyConFig {
  decimal: string
  separator: string
  prefix: string
  suffix: string
  precision: number
  masked: boolean
  nullValue: string
  reverseFill: boolean
}
export type CountryCode =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';