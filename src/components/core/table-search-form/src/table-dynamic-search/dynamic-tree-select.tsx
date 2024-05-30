/* eslint-disable vue/one-component-per-file */
/**
 * 支持联动下拉选择，下拉分页加载的，输入搜索的动态下拉控件
 */
import { TreeSelect } from 'ant-design-vue';
import { pick } from 'ramda';

import {
  defineComponent,
  nextTick,
  reactive,
  watchPostEffect,
  watchSyncEffect,
  type DefineComponent,
} from 'vue';
import { filterTree } from './filterTree';
import { debounce } from './throttle';
type Response = { total: number; data: any[] };
export type DynamicTreeSelectProps = {
  beforeChange:any,
  afterChange:any,
  value:any,
  field: {
    /*输入搜索字段，不输入就不支持输入搜索，注意这是后端搜索*/
    searchField?: string;
    /**展示字段 */
    labelField: string;
    /**选中值字段，可以多个，在record存储 */
    valueField: string | string[];
    /**子字段 */
    childrenField: string;
  };
  /**启用前端搜索，如果启动，searchField相关后端搜索就会失效 */
  enableFrontSearch?: boolean;
  api: (context: any, filter: Function) => Promise<any>;

  defaultSelectFirst?: boolean;
  defaultSelectChildrenFirst?: boolean;
  condition?: () => Record<string, any>;
  onChange?: any;
};

export const DynamicTreeSelect = defineComponent({
  props: [
    'field',
    'beforeChange',
    'afterChange',
    'value',
    'enableFrontSearch',
    'api',
    'defaultSelectFirst',
    'condition',
    'onChange',
    'defaultSelectChildrenFirst',
  ],
  setup(props: DynamicTreeSelectProps, ctx) {
    const state = reactive({
      record: null,
      total: 0,
      options: [] as { label: string; value: any; record: any; children: any }[],
      laoding: false,
      searchText: '',
      field: props?.field,
      isReady: false,
      async reload(searchText = '') {
        state.searchText = searchText;

        const res = await getOptions();
        if (!res.data?.length) {
          return
        }
        state.options = res.data;

        if (props.defaultSelectFirst && state.options?.[0]?.value) {
          ctx.emit('update:value', state.options[0].value);
        } else if (props.defaultSelectChildrenFirst && state.options?.[0]?.value) {
          ctx.emit('update:value', state.options?.[0].children?.[0]?.value);
          nextTick(() => {
            ctx.emit('update:first-children-select', state.options?.[0].children?.[0]?.value);
          });
        }
        nextTick(() => {
          ctx.emit('update:first-select', state.options?.[0]?.value);
        });

        state.isReady = true;
      },
    });

    watchSyncEffect(() => {
      props.onChange?.(ctx.attrs.value);
    });
    const onSearch = debounce(async (searchText: string) => {
      state.searchText = searchText;
      const res = await getOptions();
      state.options = res.data;
    }, 200);

    async function getOptions() {
      if (props.enableFrontSearch && state.options?.length) {
        return {
          data: state.options,
        };
      }
      state.laoding = true;
      const params: any = {};
      if (props?.field?.searchField && !props.enableFrontSearch) {
        params[props.field.searchField] = state.searchText;
      }
      if (props?.condition?.()) {
        params.queryObject = {
          ...params.queryObject,
          ...props?.condition?.(),
        };
      }
      const filterIt = filterTree(props.field.childrenField, (node) => {
        return node?.[props.field.labelField].includes(params?.[props.field.labelField]);
      });
      let res: Response = await props.api(params, filterIt);
      const defaultAfterRequest = (res: any): Response => {
        return {
          total: res.data?.length || 0,
          data: res.data,
        };
      };
      res = defaultAfterRequest(res);
      /**值字段，兼容多个值字段的情况 */
      const valueField =
        typeof props?.field?.valueField === 'string'
          ? [props?.field?.valueField]
          : props?.field?.valueField;

      function recursionTree(list, fieldName) {
        return (list || []).map((item: any) => {
          return {
            label: item[props?.field?.labelField],
            value: item?.[valueField?.[0]],
            record: pick<string[], any>(valueField, item),
            children: recursionTree(item?.[fieldName] || [], fieldName),
          };
        });
      }

      res.data = recursionTree(res.data, props.field.childrenField);

      state.total = res.total;
      state.laoding = false;
      return res;
    }
    const onChange = async (record: any) => {
      if (props?.beforeChange) {
        const canChange = await props.beforeChange(record)
        if (canChange) { 
          ctx.emit('update:value', record);
          nextTick(props.afterChange)
          return
        }
        ctx.emit('update:value', props.value);
        nextTick(props.afterChange)
        return 
      }
      ctx.emit('update:value', record);
      state.record = record
      return

    }
    watchPostEffect(() => {
      state.reload();
    });
    return () => (
      <TreeSelect
        treeDefaultExpandAll
        value={props.value}
        showSearch={props.enableFrontSearch || !!props.field.searchField}
        onChange={onChange}
        treeData={state.options}
        onSearch={onSearch}
        loading={state.laoding}
        allowClear
        treeNodeFilterProp={(() => {
          if (props.enableFrontSearch) {
            return 'label'; //在label中搜索
          } else {
            return undefined; //禁止前端搜索
          }
        })()}
      />
    );
  },
}) as DefineComponent<DynamicTreeSelectProps>;
