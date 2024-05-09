import { request } from '@/utils/request';

const vendorManagementgApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/hosView/getHadPushedProvList`,
      method: 'post',
      data: params,
    });
  },
  //集配商
  getListProvInfoBySubProv(params) {
    return request({
      url: `/hdiFusion/supplyRelation/listProvInfoBySubProv`,
      method: 'post',
      data: params,
    });
  },
  getUpdateIsEnable(params) {
    return request({
      url: `/hdiFusion/hosView/updateIsEnable`,
      method: 'post',
      data: params,
    });
  },
};

export default vendorManagementgApi;
