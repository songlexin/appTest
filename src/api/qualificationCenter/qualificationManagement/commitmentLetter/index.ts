import { request } from '@/utils/request';

const commitmentLetterApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/commitment/getCns`,
      method: 'get',
      params,
    });
  },

  addTableList(data) {
    return request({
      url: `/hdiFusion/commitment/addCns`,
      method: 'post',
      data,
    });
  },

  editTableList(data) {
    return request({
      url: `/hdiFusion/commitment/modCns`,
      method: 'put',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: `/hdiFusion/commitment/provCns/delCns`,
      method: 'delete',
      params,
    });
  },
};

export default commitmentLetterApi;
