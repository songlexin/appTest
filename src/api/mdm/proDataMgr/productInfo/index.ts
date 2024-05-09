import { request } from '../../../../utils/request';

//查询多表供应商产品数据表
export function listProvGoodsInfoVo(data) {
  return request({
    url: '/mdmService/provGoodsInfo/listVo',
    method: 'post',
    data,
  });
}

// 分页查询供应商产品
export function listProvGoodsInfoByPage(data) {
  return request({
    url: '/mdmService/provGoodsInfo/listVoPage',
    method: 'post',
    data,
  });
}

// 分页查询产品主数据
export function listMdmGoodsInfoByPage(data) {
  return request({
    url: '/mdmService/mdmGoodsInfo/listMdmGoodsInfoByPage',
    method: 'post',
    data,
  });
}

//产品申报
export function submitGoodsRegist(data) {
  return request({
    url: '/mdmService/goodsRegistBill/submitGoodsRegist',
    method: 'post',
    data,
  });
}

//获取供应商产品规格列表
export function listProvGoodsSpecsInfoByPage(data) {
  return request({
    url: '/mdmService/provGoodsSpecsInfo/listPage',
    method: 'post',
    data,
  });
}

//主数据添加到供应商产品
export function submitMdmGoodsToProv(data) {
  return request({
    url: '/mdmService/mdmGoodsInfo/submitMdmGoodsToProv',
    method: 'post',
    data,
  });
}

//获取供应商可添加主数据规格
export function listMdmGoodsSpecsByPage(data) {
  return request({
    url: '/mdmService/mdmGoodsSpecsInfo/listMdmGoodsSpecsByPage',
    method: 'post',
    data,
  });
}

//产品规格申报
export function submitGoodsSpecsRegist(data) {
  return request({
    url: '/mdmService/goodsRegistBill/submitGoodsSpecsRegist',
    method: 'post',
    data,
  });
}

//主数据规格添加到供应商规格
export function submitMdmSpecsToProv(data) {
  return request({
    url: '/mdmService/mdmGoodsSpecsInfo/submitMdmSpecsToProv',
    method: 'post',
    data,
  });
}
