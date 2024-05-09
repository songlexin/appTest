// 产品管理=状态
export const SYNC_KIND_TYPES = [
  {
    label: '上传',
    value: 'up',
  },
  {
    label: '下载',
    value: 'down',
  },
];
// 状态
export const SITE_STATUS = [
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 0,
  },
];
export const RUN_STATUS_OBJ = {
  '0': '运行中',
  '1': '停机',
};
// 主体类型0:医院;1:供应商;2:实体仓
export const SUBJECT_KIND = [
  {
    label: '医院',
    value: 0,
  },
  {
    label: '供应商',
    value: 1,
  },
  {
    label: '实体仓',
    value: 2,
  },
];
// 取值方式
export const VALUE_TYPE = [
  { value: 0, label: '固定列表' },
  { value: 1, label: '函数获取' },
  { value: 2, label: '通配符' },
];

export const VALUE_TYPE_OBJ = {
  '0': '固定列表',
  '1': '函数获取',
  '2': '通配符',
};
