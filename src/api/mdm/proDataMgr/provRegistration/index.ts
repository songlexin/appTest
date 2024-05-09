import { request } from '../../../../utils/request';

//注册证维护列表
export function listVoPage(data) {
  return request({
    // url: `/mdmService/provRegistrationInfo/listVoPage`,
    url: `/hdiFusion/mcmsRegistration/listVoPage`,
    method: 'post',
    data,
  });
}

//注册证导出
//导出
export function getExcel(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getExcel`,
    method: 'post',
    data,
    responseType: 'blob',
    timeout: 3600000,
  });
}

// 从医院产品里搜索厂家名称
export function getMfrsByHosId(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getMfrsByHosId`,
    method: 'post',
    data,
  });
}

//新增医院注册证信息
export function insertHosRegistration(url, data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/${url}`,
    method: 'post',
    data,
  });
}

//根据注册证id获取供应商注册证信息
export function getProvCertById(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getProvCertById`,
    method: 'post',
    data,
  });
}

//根据注册证id获取医院注册证信息
export function getHosCertById(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getHosCertById`,
    method: 'post',
    data,
  });
}

//根据供应商注册证id获取医院关联产品列表
export function getHosCertGoodsById(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getHosCertGoodsById`,
    method: 'post',
    data,
  });
}

//供应商注册证关联医院产品
export function getMfrsProductList(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getMfrsProductList`,
    method: 'post',
    data,
  });
}

//添加医院产品注册证的产品
export function addHosCertGood(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/addHosCertGood`,
    method: 'post',
    data,
  });
}

//删除医院产品注册证的产品
export function delHosCertGood(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/delHosCertGood`,
    method: 'post',
    data,
  });
}

//批量删除医院产品注册证的产品
export function batchDelHosCertGood(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/batchDelHosCertGood`,
    method: 'post',
    data,
  });
}

//删除医院产品注册证
export function delReg(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/delReg`,
    method: 'post',
    data,
  });
}

//删除医院产品注册证
export function disableOrEnable(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/disableOrEnable`,
    method: 'post',
    data,
  });
}

//查看医院产品注册证变更
export function getLogSubs(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/getLogSubs`,
    method: 'post',
    data,
  });
}
//同步医院产品注册证变更
export function synReg(data) {
  return request({
    url: `/hdiFusion/mcmsRegistration/synReg`,
    method: 'post',
    data,
  });
}

export function relateHosGoodsOnProvRegistration(data) {
  return request({
    url: `/mdmService/mcmsRegistrationInfo/relateHosGoodsOnProvRegistration`,
    method: 'post',
    data,
  });
}
export function getHosGoodsByRegistrationId(data) {
  return request({
    url: `/mdmService/supplyProvHosGoods/getHosGoodsByRegistrationId`,
    method: 'post',
    data,
  });
}
//新增供应商注册证信息
export function insertProvRegistration(data) {
  return request({
    url: `/mdmService/provRegistrationInfo/insertProvRegistration`,
    method: 'post',
    data,
  });
}
export function getProvRegInfoById(id) {
  return request({
    url: `/mdmService/provRegistrationInfo/getProvRegInfoById/${id}`,
    method: 'get',
  });
}
export function updateProvRegistration(data) {
  return request({
    url: `/mdmService/provRegistrationInfo/updateProvRegistration`,
    method: 'post',
    data,
  });
}
