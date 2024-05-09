import { request } from '@/utils/request';

//分页获取导入任务列表
export function queryImportTasksLst(data) {
  return request({
    url: '/mdmService/importGoodsData/queryImportTasksLst',
    method: 'post',
    data,
  });
}

//产品导入上传excel文件
export function uploadData(data, params) {
  return request(
    {
      url: '/mdmService/importGoodsData/excel',
      method: 'post',
      data,
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 3600000,
    },
    {
      isGetDataDirectly: false,
      isLoading: true,
    },
  );
}

//获取任务导入产品详情
export function getImportGoodsVoList(data) {
  return request({
    url: '/mdmService/importGoodsData/getImportGoodsVoList',
    method: 'post',
    data,
  });
}

//分页获取导入产品详情明细
export function getImportGoodsVoListPage(data) {
  return request({
    url: '/mdmService/importGoodsData/getImportGoodsVoListPage',
    method: 'post',
    data,
  });
}

//分页获取导入核对厂家明细
export function listTaskMfrsVoPage(data) {
  return request({
    url: '/mdmService/importGoodsData/listTaskMfrsVoPage',
    method: 'post',
    data,
  });
}

//分页获取导入核对产品明细
export function listTaskGoodsVoPage(data) {
  return request({
    url: '/mdmService/importGoodsData/listTaskGoodsVoPage',
    method: 'post',
    data,
  });
}

//分页获取导入产品详情明细
export function submitImportDataTask(data) {
  return request({
    url: '/mdmService/importGoodsData/submitImportDataTask',
    method: 'post',
    data,
  });
}

//变更校验注册人任务状态
export function handleTaskMfrsData(data) {
  return request({
    url: '/mdmService/importGoodsData/handleTaskMfrsData',
    method: 'post',
    data,
  });
}

//变更校验产品任务状态
export function handleTaskGoodsData(data) {
  return request({
    url: '/mdmService/importGoodsData/handleTaskGoodsData',
    method: 'post',
    data,
  });
}

//变更校验产品任务状态
export function handleTaskSpecsData(data) {
  return request({
    url: '/mdmService/importGoodsData/handleTaskSpecsData',
    method: 'post',
    data,
  });
}

//匹配ES企业名称
export function searchEs4CompanyData(data) {
  return request({
    url: '/searchService/mdmEsMatch/searchEs4CompanyData',
    method: 'post',
    data,
  });
}

//注册人匹配ES企业信息确定
export function handleMfrsMatchEsCompany(importTaskMfrsId, data) {
  return request({
    url: `/mdmService/importGoodsData/handleMfrsMatchEsCompany/${importTaskMfrsId}`,
    method: 'post',
    data,
  });
}
//匹配ES产品名称
export function searchEs4GoodsData(data) {
  return request({
    url: '/searchService/mdmEsMatch/searchEs4GoodsData',
    method: 'post',
    data,
  });
}

//注册人匹配ES产品信息确定
export function handleGoodsMatchEsGoods(importTaskGoodsId, data) {
  return request({
    url: `/mdmService/importGoodsData/handleGoodsMatchEsGoods/${importTaskGoodsId}`,
    method: 'post',
    data,
  });
}

//匹配ES产品规格名称
export function searchEs4GoodsSpecData(data) {
  return request({
    url: '/searchService/mdmEsMatch/searchEs4GoodsSpecData',
    method: 'post',
    data,
  });
}

//注册人匹配ES企业信息确定
export function handleSpecsMatchEsGoods(importTaskOriGoodsId, data) {
  return request({
    url: `/mdmService/importGoodsData/handleSpecsMatchEsGoods/${importTaskOriGoodsId}`,
    method: 'post',
    data,
  });
}
