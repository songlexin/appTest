export type Item = {
  title: string;
  value: string;
  hide?: boolean; //  true的时候隐藏
  spanNum?: Number; // 包含列的数量
  h?: any;
  customRender?: Function; // customRender方法
};
export type ShowControl = {
  backBtn?: boolean;
  recoderChangeBtn?: boolean;
  showTitlePrefixed?: boolean;
};
export type RecoderChangeCode = 'prev' | 'next';
export type FormDetailList = Item[];
