import { request } from '@/utils/request';
const orderConfirmationApi = {
  // 分页查询列表
  queryhdiOrderPage(data) {
    return request({
      url: '/hdiFusion/bill/purchase/page',
      method: 'post',
      data,
    });
  },
  // 列表详情
  getByIdDetail(data) {
    return request({
      url: `/hdiFusion/bill/purchase/detail/page`,
      method: 'post',
      data,
    });
  },
  // 详情通过
  submitEnsureOne(data) {
    return request({
      url: `/hdiFusion/bill/purchase/ensure`,
      method: 'post',
      data,
    });
  },
};
export default orderConfirmationApi;
