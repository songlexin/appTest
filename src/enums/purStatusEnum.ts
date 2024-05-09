export const PUR_STATUS_OPTIONS = [
  { value: 30, label: '待确认', type: 'red' },
  { value: 40, label: '待配送', type: 'orange' },
  { value: 50, label: '部分待配送', type: 'blue' },
  { value: 60, label: '已完成', type: 'green' },
  { value: 70, label: '已关闭', type: 'red' },
];

export const purStatusName = (tbStatus) => {
  let op = PUR_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const purStatusType = (tbStatus) => {
  let op = PUR_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const RESEND_STATUS_OPTIONS = [
  { value: 1, label: '待补送', type: 'orange' },
  { value: 0, label: '无需补送', type: 'blue' },
  { value: 2, label: '已补送', type: 'green' },
];

export const resendStatusName = (tbStatus) => {
  let op = RESEND_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const resendStatusType = (tbStatus) => {
  let op = RESEND_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const SEND_STATUS_OPTIONS = [
  { value: 0, label: '待配送', type: 'orange' },
  { value: 1, label: '部分配送', type: 'blue' },
  { value: 2, label: '已完成', type: 'green' },
];

export const sendStatusName = (tbStatus) => {
  let op = SEND_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const sendStatusType = (tbStatus) => {
  let op = SEND_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const DEL_STATUS_OPTIONS = [
  { value: 6, label: '待确认', type: 'blue' },
  { value: 10, label: '待确认', type: 'blue' },
  { value: 15, label: '已驳回', type: 'gray' },
  { value: 20, label: '待验收', type: 'red' },
  { value: 24, label: '已完成', type: 'green' },
  { value: 25, label: '已完成', type: 'green' },
  { value: 30, label: '已完成', type: 'green' },
  { value: 40, label: '已完成', type: 'green' },
  { value: 55, label: '重新配送', type: 'gray' },
  { value: 61, label: '已作废', type: 'gray' },
];

export const delStatusName = (tbStatus) => {
  let op = DEL_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const delStatusType = (tbStatus) => {
  let op = DEL_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const GOODS_STATUS_OPTIONS = [
  { value: 1, label: 'Excel导入', type: 'blue' },
  { value: 2, label: '页面新增', type: 'orange' },
  { value: 3, label: '数据清洗', type: 'green' },
  { value: 4, label: 'JDE导入', type: 'blue' },
  { value: 5, label: '资质无忧导入', type: 'blue' },
  { value: 6, label: '初始数据导入', type: 'blue' },
  { value: 8, label: '平台库导入', type: 'blue' },
  { value: 9, label: '平台库初始导入', type: 'green' },
];

export const goodsStatusName = (tbStatus) => {
  let op = GOODS_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const goodsStatusType = (tbStatus) => {
  let op = GOODS_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const AUDIT_STATUS_OPTIONS = [
  { value: 0, label: '待审核', type: 'blue' },
  { value: 1, label: '初审通过', type: 'green' },
  { value: 2, label: '初审失败', type: 'red' },
];

export const auditStatusName = (tbStatus) => {
  let op = AUDIT_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const auditStatusType = (tbStatus) => {
  let op = AUDIT_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};
export const GOODS_INFOR_STATUS = [
  { value: 0, label: '初始', type: 'blue' },
  { value: 10, label: '待审核', type: 'blue' },
  { value: 20, label: '审核中', type: 'orange' },
  { value: 30, label: '已通过', type: 'green' },
  { value: 5, label: '已驳回', type: 'red' },
];

export const goodsStatusAuditName = (tbStatus) => {
  let op = GOODS_INFOR_STATUS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const goodsStatusAuditType = (tbStatus) => {
  let op = GOODS_INFOR_STATUS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};

export const pushStatusName = (tbStatus) => {
  let op = REG_PUSH_STATUS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const pushStatusType = (tbStatus) => {
  let op = REG_PUSH_STATUS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};
export const REG_PUSH_STATUS = [
  { value: '0', label: '未推送', type: 'orange' },
  { value: '1', label: '已推送', type: 'green' },
];

export const synStatusName = (synStatus) => {
  let op = REG_SYN_STATUS.find((item) => item.value == synStatus);
  return op ? op.label : '-';
};

export const synStatusType = (synStatus) => {
  let op = REG_SYN_STATUS.find((item) => item.value == synStatus);
  return op ? op.type : '-';
};
export const REG_SYN_STATUS = [
  { value: 0, label: '未同步', type: 'orange' },
  { value: 1, label: '已同步', type: 'green' },
];

export const importStatusName = (synStatus) => {
  let op = REG_IMPORT_STATUS.find((item) => item.value == synStatus);
  return op ? op.label : '-';
};

export const importStatusType = (synStatus) => {
  let op = REG_IMPORT_STATUS.find((item) => item.value == synStatus);
  return op ? op.type : '-';
};
export const REG_IMPORT_STATUS = [
  { value: '0', label: '导入成功', type: 'green' },
  { value: '1', label: '导入失败', type: 'red' },
];

export const PLAT_STATUS_OPTIONS = [
  { value: 10, label: '待确认', type: 'red' },
  { value: 20, label: '待配送', type: 'orange' },
  // { value: 50, label: '部分待配送', type: 'blue' },
  { value: 30, label: '已完成', type: 'green' },
  { value: 70, label: '已关闭', type: 'red' },
];

export const platStatusName = (tbStatus) => {
  let op = PLAT_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.label : '-';
};

export const platStatusType = (tbStatus) => {
  let op = PLAT_STATUS_OPTIONS.find((item) => item.value == tbStatus);
  return op ? op.type : '-';
};
