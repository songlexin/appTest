import { request } from '@/utils/request';

export const getHosProvList = (data) => {
  // 医院下拉
  return request({
    url: `/hdiFusion/supplyRelation/getSupplyHosList`,
    method: 'post',
    data,
  });
};
// 授权给单位
export const authorizationUnit = (params) => {
  return request({
    url: `/hdiFusion/provJxsqs/checkJxsqs`,
    method: 'get',
    params,
  });
};
// 查询授权单位，包括厂商、供应商
export const getProvInfo = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/getProvInfo`,
    method: 'post',
    data,
  });
};
// 删除
export const deleteRow = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/deleteJxsqs`,
    method: 'post',
    data,
  });
};
// 查询列表
export const getManageJxsqsList = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/getManageJxsqsList`,
    method: 'post',
    data,
  });
};
// 经销授权书产品列表
export const getJxsqsGoodsInfo = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/getJxsqsGoodsInfo`,
    method: 'post',
    data,
  });
};
// 编辑删除品种列表
export function deleteEditRow(data) {
  return request({
    url: `/hdiFusion/provJxsqs/deleteJxsqsGoods`,
    method: 'post',
    data,
  });
}
// 获取当前授权书供应商的商品
export function getGoodsInfos(data) {
  return request({
    url: `/hdiFusion/provJxsqs/getGoodsInfos`,
    method: 'post',
    data,
  });
}

// 产品添加弹框确定
export function addJxsqsGoods(data) {
  return request({
    url: `/hdiFusion/provJxsqs/addJxsqsGoods`,
    method: 'post',
    data,
  });
}
// 编辑保存
export function updateJxsqs(data) {
  return request({
    url: `/hdiFusion/provJxsqs/updateJxsqs`,
    method: 'post',
    data,
  });
}
export function addBaseJxsqs(data) {
  return request({
    url: `/hdiFusion/provJxsqs/addBaseJxsqs`,
    method: 'post',
    data,
  });
}
export function addSonJxsqs(data) {
  return request({
    url: `/hdiFusion/provJxsqs/addSonJxsqs`,
    method: 'post',
    data,
  });
}
export function addParentJxsqs(data) {
  return request({
    url: `/hdiFusion/provJxsqs/addParentJxsqs`,
    method: 'post',
    data,
  });
}
