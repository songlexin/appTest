import axios, { type AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { showToast } from 'vant';
import { ACCESS_TOKEN_KEY } from '@/enums';

export interface RequestOptions {
  isShowToast?: boolean; // 接口请求失败，是否轻提示
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  if (config.headers) {
    if (token) {
      config.headers['token'] = token;
      config.headers['X-App-Code'] = import.meta.env.VITE_APP_CODE;
    }
  }
  return config;
});

export const request = async <
  T = { code: string | number; data: any; msg?: string; [key: string]: any },
>(
  config: AxiosRequestConfig,
  options: RequestOptions = {
    isShowToast: true,
  },
): Promise<T> => {
  try {
    const { isShowToast } = options;
    const res: AxiosResponse = await service.request(config);
    if (res.data?.code != 0 && isShowToast) {
      showToast(res.data?.msg);
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
