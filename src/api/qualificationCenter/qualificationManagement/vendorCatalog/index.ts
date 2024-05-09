import { request } from '@/utils/request';

const vendorCatalogApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/mfrprov/getMfrsProvInfoPush`,
      method: 'post',
      data: params,
    });
  },
  //新增基本信息
  addTableList(data, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/addMfrsProvInfoPush?pushRole=${pushRole}`,
      method: 'post',
      data,
    });
  },
  editTableList(data) {
    return request({
      url: `/hdiFusion/mfrprov/updateMfrsProvPush`,
      method: 'post',
      data,
    });
  },
  getUpdateIsEnable(data) {
    return request({
      url: `/hdiFusion/mfrprov/updateIsEnable`,
      method: 'post',
      data,
    });
  },

  getMfrsProvFusionVO(data) {
    return request({
      url: `/hdiFusion/mfrprov/getMfrsProvFusionVO`,
      method: 'post',
      data,
    });
  },
  //新增证照
  getAddMfrsProvCerts(params, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/addMfrsProvCerts?pushRole=${pushRole}`,
      method: 'post',
      data: params,
    });
  },

  //证照类型
  getDictValueByDictEname(data) {
    return request({
      url: `/hdiFusion/myInfo/companyInfo/sys/dict/getDictValueByDictEname`,
      method: 'post',
      data,
    });
  },
  //编辑证照
  editUpdateMfrsProvCerts(data, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/updateMfrsProvCerts?pushRole=${pushRole}`,
      method: 'post',
      data,
    });
  },
  //删除单张照片
  getDeleteImage(data, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/deleteImage?pushRole=${pushRole}`,
      method: 'post',
      data,
    });
  },
  // 新增单张照片
  getAddImage(data, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/addImage?pushRole=${pushRole}`,
      method: 'post',
      data,
    });
  },

  getDeleteCerts(params, pushRole) {
    return request({
      url: `/hdiFusion/mfrprov/deleteCerts?pushRole=${pushRole}`,
      method: 'post',
      data: params,
    });
  },
  //推送
  getaddMfrsProvPush(params) {
    return request({
      url: `/hdiFusion/mfrprov/addMfrsProvPush`,
      method: 'post',
      data: params,
    });
  },
};

export default vendorCatalogApi;
