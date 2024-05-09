import { Storage } from '@/utils/Storage';
import { USER_INFO } from '@/enums/cacheEnum';

/**
 * 获取当前登录用户
 */
export const getLoginUser = () => {
  return Storage.get(USER_INFO);
};

/**
 * 获取当前登录用户ID
 */
export const getUserId = () => {
  const loginUser = getLoginUser();
  return loginUser ? loginUser.uxid : '';
};

/**
 * 获取当前登录用户管理范围ID
 */
export const getRangeId = () => {
  const loginUser = getLoginUser();
  return loginUser ? loginUser.mgrRangeId : '';
};

/**
 * 获取当前登录用户管理范围ID
 */
export const getProvId = () => {
  const loginUser = getLoginUser();
  return loginUser ? loginUser.mgrCorpId : '';
};

/**
 * 获取当前运行项目（授权项目）
 */
export const getRunProject = () => {
  const projectCode = import.meta.env.VUE_APP_CODE;
  const idx = projectCode?.lastIndexOf('.');
  return projectCode?.substring(0, idx);
};
