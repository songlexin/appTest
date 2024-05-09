import { request } from '@/utils/request';

const salesRepApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/representative/getSalesReps`,
      method: 'get',
      params,
    });
  },

  addTableList(data) {
    return request({
      url: `/hdiFusion/representative/addSalesRep`,
      method: 'post',
      data,
    });
  },

  editTableList(data) {
    return request({
      url: `/hdiFusion/representative/modSalesRep`,
      method: 'put',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: `/hdiFusion/representative/delSalesRep`,
      method: 'delete',
      params,
    });
  },
};

export default salesRepApi;
