// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosProvRegistrationApi = {
  hosProvRegListPage(data) {
    return request({
      url: `/hdiFusion/certManage/hosProvRegListPage`,
      method: 'post',
      data,
    });
  },
};
export default hosProvRegistrationApi;
