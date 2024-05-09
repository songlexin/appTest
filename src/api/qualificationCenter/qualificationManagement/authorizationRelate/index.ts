import { request } from '@/utils/request';

// 生产厂家
export const querySearchMfrsAsync = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/getMfrs`,
    method: 'post',
    data,
  });
};
// 医院下拉
export const getHosProvList = (data) => {
  // 医院下拉
  return request({
    url: `/hdiFusion/supplyRelation/getSupplyHosList`,
    method: 'post',
    data,
  });
};
// 适用医院
export const querySearchHosAsync = (queryString) => {
  return request({
    url: `/hdiFusion/provJxsqs/getHos/${queryString}`,
    method: 'get',
  });
};
// 查询列表
export const getRelationList = (data) => {
  return request({
    url: `/hdiFusion/provJxsqs/listManageGoodsInfo`,
    method: 'post',
    data,
  });
};

// 查询goodsCertUrls
export function getGoodsCertUrls(data) {
  return request({
    url: `/hdiFusion/provJxsqs/goodsCertUrls`,
    method: 'post',
    data,
  });
}
// 查询goodsCertUrls
export function getTrackingChain(data) {
  return request({
    url: `/hdiFusion/provJxsqs/getTrackingChain`,
    method: 'post',
    data,
  });
}
// 查询sqs医院
export function getSqsHos(sqsIds) {
  sqsIds = Array.from(sqsIds);
  return request({
    url: `/hdiFusion/provJxsqs/getSqsHos`,
    method: 'post',
    data: sqsIds,
  });
}

// 查询goodsProvCertInfo
export function goodsProvCertInfo(data: { goodsId: string; provIdInfoList: any }) {
  return request({
    url: `/hdiFusion/provJxsqs/goodsProvCertInfo`,
    method: 'post',
    data,
  });
}

//导出
export function getExcelByMdm(data) {
  return request({
    url: `/hdiFusion/provJxsqs/getExcel`,
    method: 'post',
    data,
    responseType: 'blob',
    timeout: 3600000,
  });
}
