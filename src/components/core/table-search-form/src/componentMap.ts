/**
 * Component list, register here to setting it in the form
 */
import {
  AutoComplete,
  Cascader,
  // Radio,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Select,
  // Switch,
  TimePicker,
  Tree,
  TreeSelect,
} from 'ant-design-vue';
import * as TableDynamicSearch from './table-dynamic-search';

// const componentMap = {
//   Input,
//   InputGroup: Input.Group,
//   InputPassword: Input.Password,
//   InputSearch: Input.Search,
//   InputTextArea: Input.TextArea,
//   InputNumber,
//   AutoComplete,
//   Select,
//   TreeSelect,
//   Tree,
//   Switch,
//   RadioGroup: Radio.Group,
// Checkbox,
// CheckboxGroup: Checkbox.Group,
//   Cascader,
//   Slider,
//   Rate,
//   DatePicker,
//   MonthPicker: DatePicker.MonthPicker,
//   RangePicker: DatePicker.RangePicker,
//   WeekPicker: DatePicker.WeekPicker,
//   TimePicker,
//   Upload,
//   Divider,
// };
const innerLabelMap = {
  Input,
  // InputGroup: Input.Group,
  // InputPassword: Input.Password,
  // InputSearch: Input.Search,
  // InputTextArea: Input.TextArea,
  InputNumber,
  AutoComplete,
  Select,
  TreeSelect,
  Tree,
  Cascader,
  DatePicker,
  WeekPicker: DatePicker.WeekPicker,
  MonthPicker: DatePicker.MonthPicker,
  RangePicker: DatePicker.RangePicker,
  TimePicker,
  DynamicInput: TableDynamicSearch.DynamicInput,
  DynamicSelect: TableDynamicSearch.DynamicSelect,
  DynamicTreeSelect: TableDynamicSearch.DynamicTreeSelect,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
};

/* 需要为标签禁用point-events的组件 */
// const disablePointMap = {
//   Select,
//   TreeSelect,
//   Tree,
//   Cascader,
//   DatePicker,
//   MonthPicker: DatePicker.MonthPicker,
//   RangePicker: DatePicker.RangePicker,
//   WeekPicker: DatePicker.WeekPicker,
//   TimePicker,
// };

export type ComponentMapType = keyof typeof innerLabelMap;

export { innerLabelMap };
