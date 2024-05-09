import { request } from '@/utils/request';
export const getHosGoodsForDiList = (data: any) => {
  return request({
    url: '/hdiFusion/supplyProvHosGoods/getHosGoodsForDiList',
    method: 'post',
    data,
  });
};
export const getProvList = (data) => {
  console.log('111');
  return request({
    url: '/hdiFusion/supplyRelation/listVo',
    method: 'post',
    data,
  });
};

export const queryProvHos = (data) => {
  return request({
    url: `/hdiFusion/userHos/listByUserId2?userId=${data.userId}`,
    method: 'get',
    data,
  });
};

export const expGoodsDi = (data) => {
  return request({
    url: '/hdiFusion/supplyProvHosGoods/expGoodsDi',
    method: 'POST',
    data,
    responseType: 'blob',
  });
};
export const impGoodsDi = (data) => {
  return request({
    url: '/hdiFusion/supplyProvHosGoods/impGoodsDi',
    method: 'post',
    data,
  });
};
export const getGoodsAndPackageInfo = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/getGoodsinfoAndDiLst`,
    method: 'post',
    data,
  });
};

export const deleteById = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/deleteById`,
    method: 'post',
    data,
  });
};
export const getGoodsDIById = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/getPackageById`,
    method: 'post',
    data,
  });
};

export const getHosGoodsInfoById = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/getHosGoodsInfoById`,
    method: 'post',
    data,
  });
};

export const addBasGoodsPackage = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/add`,
    method: 'post',
    data,
  });
};
export const updateBasGoodsPackage = (data) => {
  return request({
    url: `/hdiFusion/supplyProvHosGoods/update`,
    method: 'post',
    data,
  });
};

//导入
export const uploadData = (data) => {
  return request(
    {
      url: '/hdiFusion/supplyProvHosGoods/impGoodsDi',
      method: 'post',
      data,
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 3600000,
    },
    {
      isGetDataDirectly: false,
      isLoading: true,
    },
  );
};
