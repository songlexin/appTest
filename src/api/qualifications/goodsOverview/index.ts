import { request } from '@/utils/request';

// 查询产品列表
export function getGoodsList(data) {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/queryGoodsInfoView`,
    method: 'post',
    data,
  });
}
// 查询医院列表
export function getHosProvList(data) {
  return request({
    url: `/hdiFusion/supplyRelation/getSupplyHosList`,
    method: 'post',
    data,
  });
}
// 查询医院列表
export function getBasProvInfoList(data) {
  return request({
    url: `/hdiFusion/supplyRelation/listVo`,
    method: 'post',
    data,
  });
}
// 查询图片
export function qryHosGoodsImage(id: string) {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/hosGoodsImage?id=${encodeURIComponent(id)}`,
    method: 'get',
  });
}
// 保存图片
export function addHosGoodsImage(params) {
  return request({
    url: `hdiFusion/supplyProvHosGoods/hosGoodsImage/add`,
    method: 'post',
    data: params,
  });
}
// 更新图片
export function updateHosGoodsImage(params) {
  return request({
    url: `hdiFusion/supplyProvHosGoods/modGoodsImage`,
    method: 'post',
    data: params,
  });
}

// 保存图片
export function delHosGoodsImage(params) {
  return request({
    url: `hdiFusion/supplyProvHosGoods/delGoodsImage`,
    method: 'post',
    data: params,
  });
}

// 查询goodsCertUrls
export function getGoodsCertUrls({ goodsId }, params) {
  return request({
    url: `/hdiFusion/viewJxsqs/goodsCertUrls/${goodsId}`,
    method: 'get',
    params,
  });
}
// 查询goodsCertUrls
export function getTrackingChain({ spdGoodsCode }) {
  return request({
    url: `/hdiFusion/viewJxsqs/getTrackingChain/${spdGoodsCode}`,
    method: 'get',
  });
}
// 查询sqs医院
export function getSqsHos(sqsIds) {
  sqsIds = Array.from(sqsIds);
  return request({
    url: `/hdiFusion/viewJxsqs/getSqsHos`,
    method: 'post',
    data: sqsIds,
  });
}

// 查询goodsProvCertInfo
export function goodsProvCertInfo(data: { goodsId: string; provIdInfoList: any }) {
  return request({
    url: `/hdiFusion/viewJxsqs/goodsProvCertInfo`,
    method: 'post',
    data,
  });
}
