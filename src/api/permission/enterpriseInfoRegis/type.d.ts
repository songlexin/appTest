declare namespace API {
  type UpdateDateEnterpriseInfo = {
    anotherName: string; // 企业简称
    address: string; // 详细地址
    contactWay: string; // 联系方式
    email: string; // 邮箱
    legal: string; // 企业法人
    cname?: string;
    linkman: string; // 联系人
    basCompanyReplenishVo: {
      businessAccount: string; //开户账号
      businessBank: string; //开户行
    };
    companyRegistBizscopeVos: string[];
  };
}
