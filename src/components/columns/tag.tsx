import * as R from 'ramda';
import { Tag } from "ant-design-vue"
type Option=Record<any,['error'|'success'|'processing'|'warning'|'default',string?]>
export const tag = R.curry((title: string, dataIndex: string,opt:Option) => {
  return {
    title,
    dataIndex,
    width:'90px',
    ellipsis: true,
    resizable: true,
    customRender({text}) {
      return <Tag color={ opt?.[text]?.[0]}>{ opt?.[text]?.[1]||text}</Tag>
    },
  };
});
