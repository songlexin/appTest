import { request } from '@/utils/request';
const followSetApi = {
  // 分页查询列表
  queryOperationPkg(data) {
    return request({
      url: '/hdiFusion/bill/operation/getAllOperationPkg',
      method: 'post',
      data,
    });
  },
  // 列表详情
  getByIdDetail(data) {
    return request({
      url: `/hdiFusion/bill/operation/getOperationPkgDetail`,
      method: 'post',
      data,
    });
  },
};
export default followSetApi;
