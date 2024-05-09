// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosProvCnsApi = {
  hosProvCnsListPage(data) {
    return request({
      url: `/hdiFusion/certManage/hosProvCnsListPage`,
      method: 'post',
      data,
    });
  },
};
export default hosProvCnsApi;
