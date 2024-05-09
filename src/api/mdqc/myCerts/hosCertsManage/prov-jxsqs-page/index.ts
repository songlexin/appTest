// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosProvJxsqsApi = {
  hosProvJxsqsListPage(data) {
    return request({
      url: `/hdiFusion/certManage/hosProvJxsqsListPage`,
      method: 'post',
      data,
    });
  },
};
export default hosProvJxsqsApi;
