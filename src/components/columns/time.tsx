import dayjs from 'dayjs';
import { type ColumnType } from 'ant-design-vue/es/table';
export const time = (opt: ColumnType, format = 'YYYY-MM-DD') => {
  return {
    ...opt,
    ellipsis: true,
    resizable: true,
    width:"110px",
    customRender({ text }) {
      if (dayjs(text).isValid()) {
        return dayjs(text).format(format);
      }
      return '-'
    },
  };
};
