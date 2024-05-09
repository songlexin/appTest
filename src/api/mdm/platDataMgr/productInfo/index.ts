import { request } from '../../../../utils/request';

// 根据id更新产品审核单据
export function updateGoodsBillById(data) {
  return request({
    url: '/mdmService/goodsRegistBill/updateById',
    method: 'post',
    data,
  });
}

// 产品信息审核列表
export function listAuditBillByPage(data) {
  return request({
    url: '/mdmService/goodsRegistBill/listAuditBillByPage',
    method: 'post',
    data,
  });
}

// 产品信息详情
export function getGoodsRegistBillDetail(id, version) {
  return request({
    url: `/mdmService/goodsRegistBill/getGoodsRegistBillDetail/${id}/${version}`,
    method: 'get',
  });
}

//产品审核提交
export function handleAuditGoodsRegist(data) {
  return request({
    url: '/mdmService/goodsRegistBill/handleAuditGoodsRegist',
    method: 'post',
    data,
  });
}

// 产品信息审核列表
export function listAuditSpecsBillByPage(data) {
  return request({
    url: '/mdmService/goodsRegistBill/listAuditSpecsBillByPage',
    method: 'post',
    data,
  });
}

//供应商产品规格列表
export function listProvGoodsSpecByPage(data) {
  return request({
    url: '/mdmService/provGoodsSpecsInfo/listVoPage',
    method: 'post',
    data,
  });
}

//注册产品规格列表
export function listRegistGoodsSpec(data) {
  return request({
    url: '/mdmService/goodsSpecsRegist/list',
    method: 'post',
    data,
  });
}

//注册产品规格列表分页
export function listRegistGoodsSpecPage(data) {
  return request({
    url: '/mdmService/goodsSpecsRegist/listPage',
    method: 'post',
    data,
  });
}

//审核注册规格信息
export function handleAuditSpec(data) {
  return request({
    url: '/mdmService/goodsRegistBill/handleAuditSpecRegist',
    method: 'post',
    data,
  });
}
