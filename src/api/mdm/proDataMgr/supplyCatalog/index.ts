import { request } from '@/utils/request';

//供货目录产品列表
export function getGoodsList(data) {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/getProvHosGoodsPage`,
    method: 'post',
    data,
  });
}

//供货目录停用启用
export function statusFlag(data) {
  return request({
    url: `/mdmService/supplyProvHosGoods/updateById`,
    method: 'post',
    data,
  });
}

// 医院客户目录查询
export function hosCustomerList(data) {
  return request({
    url: `/hdiFusion/supplyRelation/listHosInfoVoPage`,
    method: 'post',
    data,
  });
}
//厂商客户目录查询
export function firmCustomerList(data) {
  return request({
    url: `/mdmService/supplyRelation/listProvInfoVoPage`,
    method: 'post',
    data,
  });
}

//供货关系审核查询列表
export function suppluRelationList(data) {
  return request({
    url: '/mdmService/supplyRelation/listVoPage',
    method: 'post',
    data,
  });
}

//获取待变更商品详情
export function getChangeGoodsInfo(data) {
  return request({
    url: '/hdiFusion/goodsAuditBill/getChangeGoodsInfo',
    method: 'post',
    data,
  });
}

//提交变更医院商品
export function submitGoodsChangeInfos(data) {
  return request({
    url: '/hdiFusion/goodsAuditBill/submitGoodsChangeInfos',
    method: 'post',
    data,
  });
}

//获取编辑商品详情
export function getEditGoodsInfo(data) {
  return request({
    url: '/hdiFusion/goodsAuditBill/getEditGoodsInfo',
    method: 'post',
    data,
  });
}

//获取编辑商品详情
export function editProvHosGoodsInfo(data) {
  return request({
    url: '/hdiFusion/goodsAuditBill/editProvHosGoodsInfo',
    method: 'post',
    data,
  });
}
