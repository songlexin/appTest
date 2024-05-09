import { App } from 'vue';
import { isObject } from './is';

import BigNumber from 'bignumber.js';
import { formKeys } from '@/enums';

export function getRate(val: any, rm: number = 2): string {
  const x = new BigNumber(val);
  const percent = x.toNumber() * 100;

  return val ? `${percent.toFixed(rm)}%` : '';
}

export function getFormKey(appUrl: string): string {
  if (appUrl) {
    let href = appUrl.replace('#', `http://${window.location.host}`);
    const url = new URL(href);
    const key = url.pathname.substring(1); // 输出 'path/name'
    return formKeys[key];
  } else {
    return '';
  }
}

/**
 *
 * byte to size
 * formatBytes(1024);       // 1 KB
 * formatBytes('1024');     // 1 KB
 * formatBytes(1234);       // 1.21 KB
 * formatBytes(1234, 3);    // 1.205 KB
 * @param {number} bytes file size
 */
export function formatSizeUnits(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export const withInstall = <T>(component: any, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};
