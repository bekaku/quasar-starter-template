
import type { ITheme, IThemeItem } from '@/types/common';
import { biMoon, biSun } from '@quasar/extras/bootstrap-icons';
import { Cookies, useQuasar } from 'quasar';
import { ThemeKey } from 'src/libs/constant';
import { addDateByDays } from 'src/utils/dateUtil';
import { computed, useSSRContext } from 'vue';
import { useAppConfig } from './useAppConfig';

export const useTheme = () => {
    const availableThemes: IThemeItem[] = [
        { key: 'light', text: 'theme.light', icon: biSun },
        { key: 'dark', text: 'theme.dark', icon: biMoon },
        // { key: 'system', text: 'theme.systemTheme', icon: biLaptop },
        // { key: 'realtime', text: 'theme.realtimeTheme', icon: biClock },
    ];
    const { dark } = useQuasar();
    const { isProduction } = useAppConfig();
    const ssrContext = process.env.SERVER ? useSSRContext() : null;
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
    const isDark = computed<boolean>(() => dark.isActive);

    const currentTheme = computed(() => cookies.get(ThemeKey) || 'light')
    const onSetTheme = (theme: ITheme) => {
        dark.set(theme === 'dark');
        setThemeCookie(theme);
    }
    const setThemeCookie = (theme: ITheme) => {
        cookies.set(ThemeKey, theme, {
            // maxAge: 60 * 60 * 24 * 365 * 5,
            expires: addDateByDays(365),
            path: '/',
            secure: isProduction(),
            sameSite: 'Strict'
        });
    };
    const initialQuasarDark = () => {
        const darkMode = currentTheme.value === 'dark';
        dark.set(darkMode);
        setThemeCookie(currentTheme.value as ITheme);
    }
    return {
        onSetTheme,
        initialQuasarDark,
        dark,
        isDark,
        availableThemes,
        currentTheme
    };
};
