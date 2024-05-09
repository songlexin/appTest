import { request } from '@/utils/request';
//根据医院id获取医院版本号
export function getHosVersion(hosId) {
  return request({
    url: `/platformService/basic/company/getHosVersion/${hosId}`,
    method: 'get',
  });
}

//获取任务导入明细列表
export function getGoodsInfoHandleList(data) {
  return request({
    url: '/hdiFusion/import/goods/getGoodsHandleInfos',
    method: 'post',
    data,
  });
}
//根据导入任务id获取导入明细
export function getImportGoodsVoList(data) {
  return request({
    url: '/hdiFusion/import/goods/getImportGoodsVoList',
    method: 'post',
    data,
  });
}

//根据企业id获取企业信息
export function getCompanyInfoById(data) {
  return request({
    url: '/hdiFusion/import/goods/queryImportTasksLst',
    method: 'post',
    data,
  });
}

//获取医院带量类别
export function getHosSysDict(params) {
  return request({
    url: '/hdiFusion/import/goods/getHosSysDict',
    method: 'get',
    params,
  });
}

//获取医院产品分类 ：1 耗材分类 2 财务分类
export function list4tree(data) {
  return request({
    url: '/hdiFusion/import/goods/list4GoodsKindTree',
    method: 'post',
    data,
  });
}

//新增单个产品到mongodb (详情页面保存和直接提交请求)
export function addGoodsHandleInfos(data, params) {
  return request({
    url: '/hdiFusion/import/goods/addGoodsHandleInfos',
    method: 'post',
    data,
    params,
  });
}

//产品新增页面批量保存明细到mongodb
export function batchSaveGoodsHandleInfos(data, params) {
  return request({
    url: '/hdiFusion/import/goods/batchSaveGoodsHandleInfos',
    method: 'post',
    data,
    params,
  });
}

//未创建导入任务的产品导入：页面新增产品和平台库产品两种方式已导入mongodb的数据
export function creatHandleGoodsTask(data) {
  return request({
    url: '/hdiFusion/import/goods/creatHandleGoodsTask',
    method: 'post',
    data,
  });
}

//
export function getHandleImportDataProgress(data) {
  return request({
    url: '/hdiFusion/import/goods/getHandleImportDataProgress',
    method: 'post',
    data,
  });
}

//新增单个产品到mongodb (处理从失败任务中，导入失败的明细，编辑明细后提交方法，再次往系统导入)
export function importCurrentGoods(data) {
  return request({
    url: '/hdiFusion/import/goods/importCurrentGoods',
    method: 'post',
    data,
  });
}

//批量新增产品到mongodb
export function importMultiGoods(data) {
  return request({
    url: '/hdiFusion/import/goods/importMultiGoods',
    method: 'post',
    data,
  });
}

//产品新增商品名称查询列表
export function getGoodsInfoList(data) {
  return request({
    url: '/hdiFusion/import/goods/getGoodsInfoList',
    method: 'post',
    data,
  });
}
