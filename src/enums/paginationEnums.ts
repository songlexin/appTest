// 表格-分页
export const PAGE_OBJ = {
  current: 1,
  pageSize: 50,
  total: 0,
  simple: false,
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: true, //是否可以快速跳转至某页
  showSizeChanger: true, //是否可以快速跳转至某页
  showTotal: (total) => `共 ${total} 条`,
  pageSizeOptions: ['20', '50', '100', '200'], // 嘉兴市第一医院需求，去掉10，新增200
};
