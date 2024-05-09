import { request } from '@/utils/request';
const invoiceEnterApi = {
  getGoodsList(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listGoodsPage`,
      method: 'post',
      data,
    });
  },
  getHosList(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listHos`,
      method: 'post',
      data,
    });
  },
  listHosExcludeOld(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listHosExcludeOld`,
      method: 'post',
      data,
    });
  },
  getBranchList(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listBranch`,
      method: 'post',
      data,
    });
  },
  //上游供应商
  provUpList(data) {
    return request({
      url: `/hdiFusion/supplyRelation/getSubProvList`,
      method: 'post',
      data,
    });
  },
  //   查询批次
  getGoodsBatchList(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listGoodsBatchPage`,
      method: 'post',
      data,
    });
  },
  // 查询暂存
  getCacheData(data) {
    return request({
      url: `/hdiOrder/mcmsOutBalance/getCacheTotal`,
      method: 'post',
      data,
    });
  },
  // 添加暂存
  saveCache(data) {
    return request({
      url: `/hdiOrder/mcmsOutBalance/saveCacheBatch`,
      method: 'post',
      data,
    });
  },
  // 查询暂存信息
  getCacheByHos(data) {
    return request({
      url: `/hdiOrder/mcmsOutBalance/listCacheVO`,
      method: 'post',
      data,
    });
  },
  //提交暂存信息
  submitCache(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/submitCache`,
      method: 'post',
      data,
    });
  },
  //文件上传
  uploadData(data) {
    return request(
      {
        url: '/platformService/upload/v2',
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 3600000,
      },
      {
        isGetDataDirectly: false,
        isLoading: true,
      },
    );
  },
  // 移除暂存
  deleteCache(id) {
    return request({
      url: `/hdiOrder/mcmsOutBalance/deleteCache/${id}`,
      method: 'delete',
    });
  },
};
export default invoiceEnterApi;
