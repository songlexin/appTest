// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosCertAlertApi = {
  hosCertWarningListPage(data) {
    return request({
      url: `/hdiFusion/certManage/hosCertWarningListPage`,
      method: 'post',
      data,
    });
  },
};
export default hosCertAlertApi;
