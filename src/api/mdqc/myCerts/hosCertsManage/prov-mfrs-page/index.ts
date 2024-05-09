// 医院-厂商管理-证照管理
import { request } from '@/utils/request';
const hosPushedProvApi = {
  hosPushedProvCertificatePage(data) {
    return request({
      url: `/hdiFusion/certManage/hosPushedProvCertificatePage`,
      method: 'post',
      data,
    });
  },
  getPushedProvCertificateById(data) {
    return request({
      url: `/hdiFusion/certManage/getPushedProvCertificateById`,
      method: 'post',
      data,
    });
  },
};
export default hosPushedProvApi;
