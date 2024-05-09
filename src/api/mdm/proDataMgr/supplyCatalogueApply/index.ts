import { request } from '../../../../utils/request';

export function list4GoodsKindTree(data) {
  return request({
    url: '/mdmService/mcmsGoodsKind/list4GoodsKindTree',
    method: 'post',
    data,
  });
}

// 分页查询供货申请单Page
export function listSupplyApplyBillByPage(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/listBillVoByPage',
    method: 'post',
    data,
  });
}

// 提交供货申请
export function submitSupplyApplyBill(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/submitSupplyApplyBill',
    method: 'post',
    data,
  });
}

// 根绝单号id查询单据详情
export function getSupplyApplyBillDetailById(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/getSupplyApplyBillDetailById',
    method: 'post',
    data,
  });
}

// 关闭申请单据
export function closeSupplyApplyBill(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/closeSupplyApplyBill',
    method: 'post',
    data,
  });
}

//申请单据审核（进院供应商审核和医院审核）
export function auditSupplyApplyBill(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/auditSupplyApplyBill',
    method: 'post',
    data,
  });
}

//申请单据驳回
export function rejectSupplyApplyBill(data) {
  return request({
    url: '/mdmService/supplyApplyBillMain/rejectSupplyApplyBill',
    method: 'post',
    data,
  });
}
