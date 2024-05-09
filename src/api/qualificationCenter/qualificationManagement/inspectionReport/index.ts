import { request } from '@/utils/request';

const inspectionReportApi = {
  getTableList(params) {
    return request({
      url: '/hdiFusion/inspection/listReport',
      method: 'get',
      params,
    });
  },

  addTableList(data) {
    return request({
      url: '/hdiFusion/inspection/addReport',
      method: 'post',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: '/hdiFusion/inspection/delReportGoods',
      method: 'delete',
      params,
    });
  },

  getAttachment(params) {
    return request({
      url: '/hdiFusion/inspection/inspectionReport/getReportAttachment',
      method: 'get',
      params,
    });
  },
};

export default inspectionReportApi;
