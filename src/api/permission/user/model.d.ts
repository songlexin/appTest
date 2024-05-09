declare namespace API {
  type UserListPageResultItem = {
    id: string;
    userCode: string;
    cname: string;
    tel: string;
    deptId: string;
    deptName: string;
    roleId?: any;
    roleName?: any;
    enableFlag: number;
    lastLoginDatetime: string;
    ip: string;
  };

  /** 获取用户列表结果 */
  type UserListPageResult = {
    code: number;
    data: {
      pageNum: number;
      pageSize: number;
      total: number;
      data: UserListPageResultItem[];
    };
  };

  /** 创建用户参数 */
  type CreateUserParams = {
    departmentId: number;
    name: string;
    username: string;
    roles: number[];
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
  };

  /** 管理员用户详情 */
  type AdminUserInfo = {
    createTime: string;
    updateTime: string;
    id: number;
    departmentId: number;
    name: string;
    username: string;
    password: string;
    psalt: string;
    nickName: string;
    headImg: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    roles: string[];
    departmentName: string;
  };

  /** 更新管理员用户参数 */
  type UpdateAdminInfoParams = {
    departmentId: number;
    name: string;
    username: string;
    roles: number[];
    nickName: string;
    email: string;
    phone: string;
    remark: string;
    status: number;
    id: number;
  };

  /** 更新管理员密码 */
  type UpdateAdminUserPassword = {
    userId: number;
    password: string;
  };
}
