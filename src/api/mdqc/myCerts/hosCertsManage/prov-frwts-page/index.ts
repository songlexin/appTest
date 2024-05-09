// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosProvFrwtsApi = {
  hosProvFrwtsListPage(data) {
    return request({
      url: `/hdiFusion/certManage/hosProvFrwtsListPage`,
      method: 'post',
      data,
    });
  },
};
export default hosProvFrwtsApi;
