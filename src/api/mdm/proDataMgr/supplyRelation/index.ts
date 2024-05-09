import { request } from '../../../../utils/request';

export function listSupplyRelationVo(data) {
  return request({
    url: '/mdmService/supplyRelation/listVo',
    method: 'post',
    data,
  });
}
// 供货关系列表分页
export function listSupplyRelationVoPage(data) {
  return request({
    url: '/mdmService/supplyRelation/listVoPage',
    method: 'post',
    data,
  });
}
// 供货关系列表分页---融合
export function listSupplyRelationVoPageWithFusion(data) {
  return request({
    url: '/hdiFusion/supplyRelation/listVoPage',
    method: 'post',
    data,
  });
}

// 获取二级商的医院信息
export function listHosInfoBySubProv(data) {
  return request({
    url: '/mdmService/supplyRelation/listHosInfoBySubProv',
    method: 'post',
    data,
  });
}

// 获取二级商的一级商信息
export function listProvInfoBySubProv(data) {
  return request({
    url: '/mdmService/supplyRelation/listProvInfoBySubProv',
    method: 'post',
    data,
  });
}

// 查询企业列表
export function getCompanyInfoList(data) {
  return request({
    url: '/mdmService/mdmCompany/list',
    method: 'post',
    data,
  });
}
// 查询企业列表---融合
export function getCompanyInfoListWithFusion(data) {
  return request(
    {
      url: '/platformService/basic/company/list',
      method: 'post',
      data,
    },
    { isLoading: false },
  );
}
// 供货关系申请
export function submitSupplyRelation(data) {
  return request({
    url: '/mdmService/supplyRelation/submitSupplyRelation',
    method: 'post',
    data,
  });
}
// 供货关系申请---融合
export function submitSupplyRelationWithFusion(data) {
  return request({
    url: '/hdiFusion/supplyRelation/submitSupplyRelation',
    method: 'post',
    data,
  });
}

//供货关系编辑
export function editSupplyRelation(data) {
  return request({
    url: '/mdmService/supplyRelation/updateById',
    method: 'post',
    data,
  });
}

//供货关系审核
export function auditSupplyRelation(data) {
  return request({
    url: '/mdmService/supplyRelation/auditSupplyRelation',
    method: 'post',
    data,
  });
}
