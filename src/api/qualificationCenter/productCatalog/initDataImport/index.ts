import { request } from '@/utils/request';

const initDataImportApi = {
  getTableList(data) {
    return request({
      url: '/hdiFusion/import/goods/queryInitialImport',
      method: 'post',
      data,
    });
  },

  // 初始数据导入
  uploadData(data, params) {
    return request(
      {
        url: '/hdiFusion/import/goods/importExcelBeginGoods',
        method: 'post',
        data,
        params,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 3600000,
      },
      {
        isGetDataDirectly: false,
        isLoading: true,
      },
    );
  },

  addTableList(data) {
    return request({
      url: '/hdiFusion/agreement/addIncorruptAgrmt',
      method: 'post',
      data,
    });
  },

  editTableList(data) {
    return request({
      url: '/hdiFusion/agreement/modIncorruptAgrmt',
      method: 'put',
      data,
    });
  },

  deleteTableList(params) {
    return request({
      url: '/hdiFusion/agreement/delIncorruptAgrmt',
      method: 'delete',
      params,
    });
  },
};

export default initDataImportApi;
