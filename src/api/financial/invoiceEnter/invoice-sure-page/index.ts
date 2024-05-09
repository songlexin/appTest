import { request } from '@/utils/request';
const invoiceSureApi = {
  getAttachList(id, hosVersion) {
    return request({
      url: `/hdiFusion/fusionInvoice/getAttachment/${id}/${hosVersion}`,
      method: 'get',
    });
  },
  getInvoice(data) {
    return request({
      url: `/hdiFusion/fusionInvoice/listVoPage`,
      method: 'post',
      data,
    });
  },
  getInvoiceInfo(id, hosVersion) {
    return request({
      url: `/hdiFusion/fusionInvoice/getBillHead/${id}/${hosVersion}`,
      method: 'get',
    });
  },
  getGoodListById(data) {
    return request({
      url: `/hdiFusion/fusionInvoice/listDetSheetPage`,
      method: 'post',
      data,
    });
  },
  // 修改发票状态
  checkSheet(data) {
    return request({
      url: `/hdiFusion/fusionInvoice/invoiceUpdateStatus`,
      method: 'post',
      data,
    });
  },
  deleteInvoice(id) {
    return request({
      url: ` /hdiOrder/mcmsInvoice/deleteById/${id}`,
      method: 'delete',
    });
  },
  exportSureDetail(data) {
    return request({
      url: `/hdiFusion/fusionInvoice/exportInvoiceDetail/${data.invoiceId}/${data.hosVersion}`,
      method: 'get',
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};
export default invoiceSureApi;
