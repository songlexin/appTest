import { request } from '@/utils/request';

const legalPersonAuthorizationLetterApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/attorney/getFrwts`,
      method: 'get',
      params,
    });
  },

  addTableList(data) {
    return request({
      url: `/hdiFusion/attorney/addFrwts`,
      method: 'post',
      data,
    });
  },

  editTableList(data) {
    return request({
      url: `/hdiFusion/attorney/modFrwts`,
      method: 'put',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: `/hdiFusion/attorney/delFrwts`,
      method: 'delete',
      params,
    });
  },
};

export default legalPersonAuthorizationLetterApi;
