import { request } from '@/utils/request';
const reportIndexApi = {
  //配送单数量
  getOrderQty(data) {
    return request({
      url: `/hdiFusion/portal/data/center/order/qty`,
      method: 'post',
      data,
    });
  },
  //配送金额（元）
  getAmount(data) {
    return request({
      url: `/hdiFusion/portal/data/center/order/amount`,
      method: 'POST',
      data,
    });
  },
  //配送耗材数量
  getQty(data) {
    return request({
      url: `/hdiFusion/portal/data/center/goods/qty`,
      method: 'post',
      data,
    });
  },
};
export default reportIndexApi;
