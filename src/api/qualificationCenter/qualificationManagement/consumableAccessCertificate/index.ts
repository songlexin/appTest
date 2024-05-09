import { request } from '@/utils/request';

const consumableAccessCertificateApi = {
  getTableList(params) {
    return request({
      url: `/hdiFusion/access/listByPage`,
      method: 'post',
      data: params,
    });
  },

  addTableList(data) {
    return request({
      url: `/hdiFusion/access/add`,
      method: 'post',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: `/hdiFusion/access/delCert`,
      method: 'delete',
      params,
    });
  },
  editTableList(data) {
    return request({
      url: `/hdiFusion/access/edit`,
      method: 'put',
      data,
    });
  },
  //编辑的时候获取产品数据
  getListGoods(params) {
    return request({
      url: `/hdiFusion/access/listGoods`,
      method: 'get',
      params,
    });
  },
};

export default consumableAccessCertificateApi;
