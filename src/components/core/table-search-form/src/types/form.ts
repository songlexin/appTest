import type { RowProps } from 'ant-design-vue';
import type { NamePath, RuleObject } from 'ant-design-vue/es/form/interface';
import type { FormItemProps } from 'ant-design-vue/es/form/FormItem';
import type { Component, VNode } from 'vue';
import type { ButtonProps as AntdButtonProps } from '@/components/basic/button';
import type { ColEx, ComponentMapType, innerLabelComponentProps } from './component';
// import type { TableActionType } from '/@/components/Table/src/types/table'
import type { TableSearchFormInstance } from '../table-search-form';
import type { TableSearchFormType } from '../hooks';
import type { TableActionType } from '@/components/core/dynamic-table';

export type { RowProps };

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

/** 获取所有字段名 */
export type GetFieldKeys<T> = Exclude<keyof T, symbol | number>;

export interface RenderCallbackParams<T = string> {
  schema: FormItemSchema<T>;
  formModel: T extends string ? Recordable : Record<GetFieldKeys<T>, any>;
  field: T extends string ? string : GetFieldKeys<T>;
  values: any;
  /** 动态表单实例 */
  formInstance: TableSearchFormType;
  /** 动态表格实例 */
  tableInstance?: TableActionType;
  /** 动态表格rowKey */
  tableRowKey?: Key;
  /** 作用域插槽数据 */
  slotData?: Recordable;
}
/** 自定义VNode渲染器 */
export type CustomRenderFn<T = any> = (
  renderCallbackParams: RenderCallbackParams<T>,
) => VNode | VNode[] | string;

export interface ButtonProps extends AntdButtonProps {
  text?: string;
}

/* 表单操作类型接口 */
export interface FormActionType {
  formModel?: Recordable;
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => any;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => Promise<void>;
  setTableSearchFormProps: (formProps: Partial<FormItemSchema>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormItemSchema,
    prefixField: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: TableSearchFormInstance) => void;

/** 表单项 */
export interface FormItemSchema<T = string> {
  /** 字段名 */
  field: T extends string ? string : GetFieldKeys<T>;
  // 内部值更改触发的事件名称, default change
  changeEvent?: string;
  /** 绑定到v-model的变量名 Default value */
  valueField?: string;
  /** 标签名称 */
  label?: string | ((v: RenderCallbackParams<T>) => string);
  // Auxiliary text
  subLabel?: string;
  // Help text on the right side of the text
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams<T>) => string | string[]);
  // BaseHelp component props
  helpComponentProps?: Partial<HelpComponentProps>;
  // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  labelWidth?: string | number;
  realLabelWidth?: string;
  // 禁用掉LabelWidth, and manually set labelCol and wrapperCol by yourself
  disabledLabelWidth?: boolean;
  /* 搜索表单限定组件，禁用自定义组件 */
  /** 表单项对应的组件，eg: Input */
  component: ComponentMapType | CustomRenderFn<T> | ((opt: RenderCallbackParams<T>) => Component);
  /** 表单组件属性 */
  componentProps?:
    | innerLabelComponentProps
    | {
        (opt: RenderCallbackParams<T>): innerLabelComponentProps;
        requestResult: innerLabelComponentProps['requestResult'];
      };
  // 搜索表单不开放组件插槽
  /** 表单组件slots，例如 a-input 的 suffix slot 可以写成：{ suffix: () => VNode } */
  componentSlots?:
    | ((renderCallbackParams: RenderCallbackParams<T>) => Recordable<CustomRenderFn<T>>)
    | Recordable<CustomRenderFn<T>>
    | ReturnType<CustomRenderFn>;
  // Required
  required?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  // 前缀
  suffix?: string | number | ((values: RenderCallbackParams<T>) => string | number);

  // Validation rules
  rules?: Rule[];
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;
  /** 组件加载状态 */
  loading?: boolean;

  // Reference formModelItem
  formItemProps?: Partial<FormItemProps>;

  /** 搜索表单项排序列配置 */
  colProps?: Partial<ColEx>;
  /** 筛选器列Class名称 */
  colClass?: string;
  /** 筛选器占用几列,默认1,最大3 */
  colNum?: 1 | 2 | 3;

  /** 搜索表单项排序,貌似没用到 */
  // order?: number;
  /** 默认值 */
  defaultValue?: any;
  /* 表单项是否折叠 */
  isAdvanced?: boolean;

  // Matching details components
  span?: number;
  /** 作用同v-show */
  vShow?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);
  /** 作用同v-if */
  vIf?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  // 渲染col内容需要外层包装form-item
  renderColContent?: CustomRenderFn<T>;

  // Custom slot, in from-item
  slot?: string;

  // 自定义槽，类似renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams<T>) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams<T>) => Rule[];
}
export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // color
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}
