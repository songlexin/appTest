/* eslint-disable vue/one-component-per-file */
/**
 * 支持联动下拉选择，下拉分页加载的，输入搜索的动态下拉控件
 */

import {
  type DefineComponent,
  defineComponent,
  reactive,
  watch,
  watchSyncEffect,
  watchPostEffect,
} from 'vue';


import { pick, equals, type, pipe, values, join } from 'ramda';
import { clone } from 'lodash-es';
import { Select } from 'ant-design-vue';
import { debounce } from './throttle';

type Response = { total: number; data: any[] };
export type DynamicSelectProps = {
  field: {
    /*输入搜索字段，不输入就不支持输入搜索*/
    searchField?: string;
    /**展示字段 */
    labelField: string | string[];
    /**选中值字段 */
    valueField: string | string[];
  };
  api: (context: any) => Promise<any>;
  /**标识，同时也是字段名 */
  defaultSelectFirst?: boolean;
  disablePaging?: boolean;
  condition?: () => Record<string, any>;
  addonOptions?: any[];
  showAddonOptions?: boolean;
  onChange?: any;
};
export const DynamicSelect = defineComponent({
  props: [
    'editValue',
    'field',
    'api',
    'defaultSelectFirst',
    'disablePaging',
    'condition',
    'addonOptions',
    'showAddonOptions',
    'onChange',
  ],
  setup(props: DynamicSelectProps, ctx) {
    const state = reactive({
      id: null,
      options: [] as { label: string; value: any; record: any }[],
      laoding: false,
      searchText: '',
      field: props?.field,
      total: 0,
      paging: {
        pageNum: 1,
        pageSize: 10,
      },
      isReady: false,
      async reload(searchText = '') {
        state.searchText = searchText;
        state.paging.pageNum = 1;
        const res = await getOptions();
        state.options = res.data;
        ctx.emit('update:first-select', state.options[0]?.value);
        if (props.defaultSelectFirst && state.options?.[0]?.value) {
          ctx.emit('update:value', state.options[0]?.value);
        } else {
          ctx.emit('update:value', '');
        }
        state.isReady = true;
      },
    });
    watchSyncEffect(() => {
      if (state.options) {
        ctx.emit('changeOptions', clone(state.options));
      }
    });
    watchSyncEffect(() => {
      props.onChange?.(ctx.attrs.value);
    });

    const onPopupScroll = debounce(async (e) => {
      const DISTANCE = 20; // 如果距离底部这个像素则下一页
      const target = e.target as HTMLElement;
      if (target.scrollTop + target.offsetHeight + DISTANCE >= target.scrollHeight) {
        if (state.total > state.options.length) {
          state.paging.pageNum++;
          const res = await getOptions();
          state.options.push(...res.data);
        }
      }
    }, 200);

    const onSearch = debounce((text) => {
      state.searchText = text;
    }, 200);
    async function getOptions() {
      state.laoding = true;
      const params: any = {};
      if (props?.field?.searchField) {
        params[props.field.searchField] = state.searchText;
      }
      let res: Response;
      if (props.disablePaging) {
        res = await props.api({ ...params, ...props.condition?.() });
      } else {
        res = await props.api({
          pageNum: state.paging.pageNum,
          pageSize: state.paging.pageSize,
          queryObject: { ...params, ...props.condition?.() },
        });
      }
      
      const defaultAfterRequest = (res: any): Response => {
        if (props.disablePaging) {
          return {
            total: res.data.length,
            data: res.data,
          };
        }
        return {
          total: res.data.total,
          data: res.data.data,
        };
      };
      res = defaultAfterRequest(res);

      res.data = res.data
        .map((row) => {
          const valueField =
            typeof props?.field?.valueField === 'string'
              ? [props?.field?.valueField]
              : props?.field?.valueField;
          if (type(props?.field?.labelField) === 'Array') {
            return {
              label: pipe(pick(props?.field?.labelField as string[]), values, join('-'))(row),
              value: row?.[valueField?.[0]],
              record: pick(valueField, row),
              row,
            };
          }

          return {
            label: row[props?.field?.labelField as string],
            value: row?.[valueField?.[0]],
            record: pick<string[], any>(valueField, row),
            row,
          };
        })
        .concat(
          props.showAddonOptions
            ? (props?.addonOptions || []).map((item: any) => {
                return { ...item, isAddon: true };
              })
            : [],
        );
      state.total = res.total;
      state.laoding = false;
      return res;
    }
    watch(
      () => [props.showAddonOptions, props?.addonOptions],
      (newValue, oldValue) => {
        if (equals(newValue, oldValue)) {
          return;
        }
        if (props.showAddonOptions) {
          state.options = state.options
            .filter((item: any) => !item.isAddon)
            .concat(
              (props?.addonOptions || []).map((item: any) => {
                return { ...item, isAddon: true };
              }),
            );
        }
      },
    );
    watchPostEffect(() => {
      state.reload(state.searchText);
    });

    return () => {
      return (
        <Select
          filter-option={!props.field.searchField}
          show-search={!!props.field.searchField}
          options={state.options}
          onPopupScroll={onPopupScroll}
          onSearch={onSearch}
          loading={state.laoding}
          allow-clear
          not-found-content="无结果"
          default-active-first-option={false}
          v-slots={{
            option: (option) => {
              if (option.isAddon) {
                return <span style={{ display: 'none' }}></span>;
              }
              return (
                <span role="img" aria-label="val">
                  {option.icon}
                  {option.label}
                </span>
              );
            },
          }}
        />
      );
    };
  },
}) as DefineComponent<DynamicSelectProps>;
