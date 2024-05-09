import { request } from './../../utils/request';
/**
 * @description 获取系统配置
 * @param {LoginParams} data
 * @returns
 */
// 科室公共树
export function getOrgsTree(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/ui/listPubOrgsTreeWithCache`,
    method: 'post',
    data,
  });
}
// 医院列表
export function getHos(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/ui/listHosDropdown/${data}`,
    method: 'get',
    data,
  });
}
// 供应商列表
export function getProv(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/ui/listProvDropdown/${data}`,
    method: 'get',
    data,
  });
}
// 用户列表
export function getUser(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/ui/listUserDropdown/${data}`,
    method: 'get',
    data,
  });
}

// 医院注册
export function hosRegist(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/insertHosRegistInfo`,
    method: 'post',
    data,
  });
}
// 医院审核列表
export function getRegHosList(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/listPage`,
    method: 'post',
    data,
  });
}
// 医院审核驳回
export function rejectRegHos(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/updateById`,
    method: 'post',
    data,
  });
}
// 医院审核通过
export function passRegHos(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/checkHosRegistInfo`,
    method: 'post',
    data,
  });
}
