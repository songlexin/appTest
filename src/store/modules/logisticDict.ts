import { defineStore } from 'pinia';
import { dictList, getDictionaryList } from '@/api/common';

interface Option {
  label: string;
  value: string;
}

export const useDictStore = defineStore({
  id: 'logisticDict',
  persist: true, // 持久化状态，页面刷新继续保持响应
  state: () => ({
    dict: {} as any,
  }),
  actions: {
    // 通过请求设定字典
    async setDict(key: string) {
      if (key) {
        const { code, data } = await dictList({ dictId: key });
        if (code == 0 && data?.length) {
          this.dict[key] = data.map((data: any) => {
            return {
              label: data.cname,
              value: data.val,
            };
          });
        }
      }
    },
    // 通过请求批量设置字典取值
    async batchSetDict(keys: any[]) {
      const requestKeys = keys.filter((key) => !(key in this.dict));
      if (requestKeys?.length) {
        const res = await getDictionaryList(requestKeys);
        if (res.code === 0 && res.data) {
          for (let p in res.data) {
            this.dict[p] = res.data[p].dictValueList.map((item: any) => {
              return {
                label: item.lable,
                value: item.val,
              };
            });
          }
        }
      }
    },
    // 获取字典项label
    getDictLabel(key: string, value: any): string {
      const options: Option[] = this.dict[key];
      let label = '';
      if (options?.length) {
        label = options.find((item) => item.value == value)?.label || '';
      }

      return label;
    },
    // 用在反显列表里面多选的数据
    getDictMultiLabel(key: string, values: string[], splitter = ','): string {
      const options: Option[] = this.dict[key];
      let labels: Option[] = [];
      let str = '';
      if (options?.length) {
        labels = options.filter((item) => values.includes(item.value));
        labels.forEach((item, index) => {
          str += item.label;
          if (index < labels.length - 1) {
            str += splitter;
          }
        });
      }

      return str;
    },
  },
});
