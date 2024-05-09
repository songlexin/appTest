import { request } from '@/utils/request';

const incorruptAgrreementApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/agreement/getIncorruptAgrmt`,
      method: 'get',
      params,
    });
  },

  addTableList(data) {
    return request({
      url: `/hdiFusion/agreement/addIncorruptAgrmt`,
      method: 'post',
      data,
    });
  },

  editTableList(data) {
    return request({
      url: `/hdiFusion/agreement/modIncorruptAgrmt`,
      method: 'put',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: `/hdiFusion/agreement/delIncorruptAgrmt`,
      method: 'delete',
      params,
    });
  },
};

export default incorruptAgrreementApi;
