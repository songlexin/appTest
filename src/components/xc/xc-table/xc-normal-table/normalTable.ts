export type IType =
  | 'input-num'
  | 'input'
  | 'radio'
  | 'select'
  | 'datepicker'
  | 'timepicker'
  | 'slot';
export type FormSearch = {
  formName: string;
  formLabel: string;
  formType?: IType;
  formTypeOption?: Array<any>;
  placeholderTxt?: string;
  disabled?: boolean;
  fieldNames?: any;
};
export type TableType = {
  queryData?: Array<any>;
  columns: Array<any>;
  pagination?: object;
  rowKey: any;
  orderBy?: any;
};
export type FormSearchList = FormSearch[];
