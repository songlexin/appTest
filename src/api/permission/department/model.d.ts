declare namespace API {
  type DeptListPageResultItem = {
    id: string;
    pid: string;
    code: string;
    cname: string;
    shortPinyin: string;
    address: string;
    contactWay?: any;
    remark: string;
    flag: string;
    createTime?: any;
    createUser?: any;
  };

  /** 获取用户列表结果 */
  type DeptListPageResult = {
    code: number;
    data: {
      pageNum: number;
      pageSize: number;
      total: number;
      data: DeptListPageResultItem[];
    };
  };

  /** 创建用户参数 */
  type CreateDeptParams = {
    cname: string;
    pid: string;
  };
  /** 更新用户参数 */
  type UpdateDeptParams = CreateDeptParams & {
    id: string;
  };
}
