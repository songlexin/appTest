import { request } from '@/utils/request';

const supplyRelationAuditApi = {
  auditSupplyRelation(data) {
    return request({
      url: '/hdiFusion/supplyRelation/auditSupplyRelation',
      method: 'post',
      data,
    });
  },
};

export default supplyRelationAuditApi;
