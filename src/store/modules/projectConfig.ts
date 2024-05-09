import { defineStore } from 'pinia';
// import darkThemeCss from 'ant-design-vue/dist/antd.dark.css?raw';
import { ConfigProvider } from 'ant-design-vue';
import type { Theme } from 'ant-design-vue/es/config-provider/';
import { store } from '@/store';
import { THEME_KEY } from '@/enums/cacheEnum';
import type { TableProps } from 'ant-design-vue/es/table/Table';
import { Storage } from '@/utils/Storage';
import { setThemeColor, getThemeConfBykey, themesKeys } from '@/theme/setColor';
// const styleDom = document.createElement('style');
// styleDom.dataset.type = 'theme-dark';
// document.head.appendChild(styleDom);

/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 */

/** 主题色 */
export type ThemeName = 'light' | 'dark' | 'realDark';
export type { Theme };
type SizeType = NonNullable<TableProps['size']>;

export type ThemeState = {
  navTheme: ThemeName; // theme for nav menu
  primaryColor: string; // '#F5222D', // primary color of ant design
  layout: 'bothmenu' | 'topmenu' | 'sidemenu'; // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid' | 'Fixed'; // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false; // sticky header
  fixSiderbar: false; // sticky siderbar
  colorWeak: false;
  menu: {
    locale: true;
  };
  title: string;
  pwa: false;
  iconfontUrl: string;
  size: SizeType;
  isHome: boolean;
  isMessage: boolean;
  prefixCls: string;
  themeId: string;
  // production: import.meta.env.NODE_ENV === 'production' && import.meta.env.VUE_APP_PREVIEW !== 'true'
};

export const defaultConfig: ThemeState = {
  navTheme: 'light', // theme for nav menu
  primaryColor: '#0F998D', // '#F5222D', // primary color of ant design OF998D
  layout: 'bothmenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'spd3-platform',
  pwa: false,
  iconfontUrl: '',
  size: 'small',
  isHome: false,
  isMessage: false,
  prefixCls: 'ant',
  themeId: 'cyan',
  // production: import.meta.env.NODE_ENV === 'production' && import.meta.env.VUE_APP_PREVIEW !== 'true',
};

const setRealDarkTheme = (navTheme?: ThemeName) => {
  if (navTheme === 'realDark') {
    document.documentElement.classList.add('dark');
    // styleDom.textContent = darkThemeCss;
  } else {
    document.documentElement.classList.remove('dark');
    // styleDom.textContent = '';
  }
};

let localThemeConfig: Partial<ThemeState> = {};
try {
  localThemeConfig = JSON.parse(Storage.get(THEME_KEY, '{}'));
  const { navTheme } = localThemeConfig;
  navTheme && setRealDarkTheme(navTheme);
} catch {
  localThemeConfig = {};
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    ...defaultConfig,
    ...localThemeConfig,
  }),
  getters: {
    getNavTheme(): ThemeName {
      return this.navTheme;
    },
  },
  actions: {
    setTheme(theme: Partial<ThemeState>) {
      for (const key in theme) {
        this[key] = theme[key];
      }
      // document.documentElement.style.setProperty(key, nextTheme[key]);
      setRealDarkTheme(theme.navTheme);
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
    setPrefixCls(prefixCls: string) {
      this.$state.prefixCls = prefixCls;
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },

    /** antdv自带的改变主题颜色方法，但可以配置的颜色很有限，仅6种 */
    // 自带的 修改变量--primary 等
    fillColorByTheme(theme: Theme) {
      this.primaryColor = theme.primaryColor ?? this.primaryColor;
      ConfigProvider.config({
        theme,
      });
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
    updateColor() {
      this.fillColorByTheme({
        primaryColor: this.primaryColor,
      });
      setThemeColor(this.primaryColor);
    },
    // 根据key去修改
    setThemeByKey(themeId: string) {
      this.themeId = themeId;
      if (!themesKeys.includes(themeId)) {
        Storage.set(THEME_KEY, JSON.stringify(this.$state));
        this.updateColor();
        console.error(`非法主题key:${themeId}`);
        return;
      }
      const themeConfig = getThemeConfBykey(themeId);
      this.primaryColor = themeConfig?.value ?? this.primaryColor;
      this.updateColor();
      Storage.set(THEME_KEY, JSON.stringify(this.$state));
    },
  },
});

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store);
}
