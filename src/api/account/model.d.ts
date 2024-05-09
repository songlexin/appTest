declare namespace API {
  type Menu = {
    createTime: Date;
    updateTime: Date;
    id: string;
    menuCode: string;
    pcode: string;
    cname: string;
    path: string;
    perms: string;
    /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */
    menuType: 0 | 1 | 2;
    iconCls: string;
    ordinal: number;
    directory: string;
    keepalive: boolean;
    isShow: boolean;
    meta: string;
    menuId: string;
    visibleFlag: string | null | undefined;
  };

  type PermMenu = {
    menus: Menu[];
    perms: string[];
  };

  type UserInfo = {
    uxid: string;
    cname: string;
    mgrRangeId: string;
    mgrRangeName: string;
    mgrBranchName: string;
    mgrBranchId: string;
    mgrCorpId: string;
    mgrCorpKind: string;
    mgrCorpName: string;
    branchId: string;
    branchName: string;
    corpCode: string;
    corpId: string;
    corpName: string;
    orgId: string;
    orgName: string;
    userLoginCode: string;
  };
}
