import type { AppColor, IHrefTarget } from './common';

export interface AvatarProps {
    src?: string | undefined;
    spinnerColor?: string;
    color?: string;
    imgBg?: string;
    ratio?: number;
    size?: string;
    square?: boolean;
    rounded?: boolean;
    fetch?: boolean;
    bordered?: boolean;
    borderedColor?: string;
    borderedWidth?: string;
    alt?: string;
    badge?: BadgeProps
}
export interface BadgeProps {
    color?: AppColor;
    floating?: boolean
    rounded?: boolean
    transparent?: boolean
    text?: string
    cssClass?: string
    cssStyle?: {
        [key: string]: string | number
    }
}
export interface ButtonProps {
    align?: 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly';
    color?: AppColor;
    count?: number;
    disable?: boolean;
    dense?: boolean;
    flat?: boolean;
    full?: boolean;
    glossy?: boolean;
    href?: string;
    icon?: string;
    iconSize?: string;
    iconRight?: string;
    label?: string | undefined;
    light?: boolean;
    loading?: boolean;
    noCaps?: boolean;
    outline?: boolean;
    outlineColor?: AppColor | undefined;
    push?: boolean;
    round?: boolean;
    rounded?: boolean;
    size?: string;
    square?: boolean;
    stack?: boolean;
    textColor?: AppColor;
    to?: string;
    target?: IHrefTarget;
    type?: 'button' | 'a' | 'submit' | 'reset';
    unelevated?: boolean;
    textCapitalize?: boolean;
    dark?: boolean;
}