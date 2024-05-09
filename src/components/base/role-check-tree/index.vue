<template>
  <div class="role-check-tree">
    <div v-if="props.code" class="search-box">
      <a-form layout="inline" autocomplete="off">
        <a-form-item v-if="menuData && menuData.length">
          <a-button type="primary" style="margin-right: 16px" @click="saveTree"> 保存 </a-button>
          <a-button @click="refresh">刷新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-if="menuData && menuData.length" class="all-menu">
      <div v-for="(sys, index) in menuData" :key="index" class="menu">
        <p class="roleManage-right-type"
          ><a-checkbox
            v-model:checked="sys.checkedBox"
            :indeterminate="sys.indeterminate"
            @change="changeAll(sys)"
          >
            {{ sys.cname }}
          </a-checkbox></p
        >
        <div>
          <xcTableNoData v-if="!sys.menu"></xcTableNoData>
          <template v-else>
            <check-tree
              :type="props.type"
              :list-data="sys.menu"
              :checked-list="sys.checked"
              :role-code="props.code"
              :project-code="sys.code"
              @check-key="handleCheckKey"
              @refresh="refresh"
            ></check-tree>
          </template>
        </div>
      </div>
    </div>

    <xcTableNoData v-else :nodataText="state.emptyText"></xcTableNoData>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { difference } from 'lodash-es';
  import { message } from 'ant-design-vue';
  import { saveRoleMenuBasic, saveRoleMenu, schemeBatchSave } from './../../../api/permission/role';
  import { checkTree } from './../../../components/base/check-tree';
  import { isArray } from './../../../utils/is';
  import { selColor } from './../../../utils/getColor';
  import xcTableNoData from '@/components/xc/xc-table/xc-table-noData/index.vue';

  const emit = defineEmits<{
    (e: 'refresh'): void;
  }>();
  const props = defineProps({
    list: {
      type: Array as PropType<any[]>,
      required: true,
    },
    code: {
      type: String,
      required: false,
    },
    emptyText: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  });
  const state = reactive({
    proCodeKeys: [] as any[],
    emptyText: props.emptyText || '暂无数据',
  });

  const menuData = computed({
    get() {
      // 过滤掉只有目录没有页面
      props.list.map((item) => {
        const menu = item.menu;
        if (menu && menu.length) {
          for (let i = 0; i < menu.length; i++) {
            const child = menu[i].childMenu;
            if (child && child.length) {
              item.menu[i].childMenu = child.filter(
                (n) => (n.menuType == 0 && n.childMenu && n.childMenu.length) || n.menuType == 1,
              );
            }
          }
          item.menu = menu.filter(
            (n) => (n.menuType == 0 && n.childMenu && n.childMenu.length) || n.menuType == 1,
          );
        }
        return item;
      });
      props.list.map((item) => {
        const menu = item.menu;
        if (menu && menu.checkedBox) {
          menu.checkedBox = true;
        }
        let checked = [];
        let allChild = [];
        if (menu && menu.length) {
          for (let i = 0; i < menu.length; i++) {
            menu[i].class = `menu-${menu[i].menuType}`;
            const child = menu[i].childMenu;
            menu[i].checkedList && (checked = checked.concat(menu[i].checkedList));
            child && (allChild = allChild.concat(child));
            if (!menu[i].checkedList) {
              menu.checkedBox = false;
            }
            if (menu.checkedBox) {
              menu.checkedBox = menu[i].checkedList.length === child.length ? true : false;
            }
            // if (!menu[i].checkedEditList || menu[i].checkedEditList?.length === 0) {
            //   menu[i].disabled = true;
            // } else {
            //   menu[i].disabled = false;
            // }
            if (child && child.length) {
              for (let j = 0; j < child.length; j++) {
                child[j].class = `menu-${child[j].menuType}`;
                const obj = menu[i].checkedList?.find((item) => item.menuCode === child[j].code);
                if (obj) {
                  child[j].checkedBtns = obj.buttonCodes;
                  child[j].editBtn = true;
                } else {
                  child[j].editBtn = false;
                }

                // const enableObj = menu[i].checkedEditList?.find(
                //   (item) => item.menuCode === child[j].code,
                // );
                // if (enableObj) {
                //   child[j].disableCheckbox = false;
                // } else {
                //   child[j].disableCheckbox = true;
                // }
                child[j].checkedList && (checked = checked.concat(child[j].checkedList));
                child[j].childMenu && (allChild = allChild.concat(child[j].childMenu));
                const subChild = child[j].childMenu;
                if (subChild && subChild.length) {
                  for (let z = 0; z < subChild.length; z++) {
                    subChild[z].class = `menu-${subChild[z].menuType}`;
                    const obj = child[j].checkedList?.find(
                      (item) => item.menuCode === subChild[z].code,
                    );
                    if (obj) {
                      subChild[z].checkedBtns = obj.buttonCodes;
                      subChild[z].editBtn = true;
                    } else {
                      subChild[z].editBtn = false;
                    }
                    const enableObj = child[j].checkedEditList?.find(
                      (item) => item.menuCode === subChild[z].code,
                    );
                    if (enableObj) {
                      subChild[z].disableCheckbox = false;
                    } else {
                      subChild[z].disableCheckbox = true;
                    }
                  }
                }
              }
            }
          }
        }
        // item.checkedObj = checked;
        const arr = [] as any[];
        checked.map((item: any) => {
          arr.push(item.menuCode);
        });
        item.checked = arr;
        item.beforeChecked = arr;

        const tempArr = [] as any[];
        allChild.map((item: any) => {
          item.menuType == 1 && tempArr.push(item.code);
        });
        item.allChildPage = tempArr;
        item.indeterminate = false;
        return item;
      });

      console.log('props.list', props.list);

      return props.list;
    },

    set() {},
  });
  const changeAll = (sys) => {
    if (sys.checkedBox) {
      sys.checked = sys.allChildPage;
    } else {
      sys.checked = [];
    }
  };
  const handleCheckKey = (keys) => {
    const res = state.proCodeKeys.find((item) => item.projectCode === keys.projectCode);
    if (res) {
      state.proCodeKeys.map((item) => {
        if (item.projectCode === keys.projectCode) {
          item.checkedKeys = keys.checkedKeys;
        }
      });
    } else {
      state.proCodeKeys.push(keys);
    }
    const obj = props.list.find((item) => item.code === keys.projectCode);
    // // 筛掉不是页面的code
    const keysCheck = [] as any[];
    isArray(keys.checkedKeys) &&
      keys.checkedKeys.map((sub) => {
        if (obj.allChildPage.includes(sub)) {
          keysCheck.push(sub);
        }
      });
    obj.checkedBox = keysCheck.length ? true : false;
    obj.indeterminate =
      keysCheck.length && obj.allChildPage.length != keysCheck.length ? true : false;
  };
  const saveTree = async () => {
    const info = [] as any[];
    props.list.map((item) => {
      for (let i = 0; i < state.proCodeKeys.length; i++) {
        if (state.proCodeKeys[i].projectCode === item.code) {
          const params = {
            addMenus: [] as any[],
            delMenus: [],
            projectCode: item.code,
          } as any;
          if (props.type === 'basic-role') {
            params.roleCode = props.code;
          } else if (props.type === 'role') {
            params.roleCode = props.code;
          } else if (props.type === 'scheme') {
            params.schemeId = props.code;
          }
          params.delMenus = difference(item.beforeChecked, state.proCodeKeys[i].checkedKeys);
          const addMenus = difference(state.proCodeKeys[i].checkedKeys, item.beforeChecked);
          for (let j = 0; j < addMenus.length; j++) {
            const obj = {
              menuCode: addMenus[j],
              btnCodes: null,
            };
            params.addMenus.push(obj);
          }
          info.push(params);
        }
      }
    });
    if (!info.length) {
      return;
    }
    let data = {} as any;
    if (props.type === 'basic-role') {
      data = await saveRoleMenuBasic(info);
    } else if (props.type === 'role') {
      data = await saveRoleMenu(info);
    } else if (props.type === 'scheme') {
      data = await schemeBatchSave(info);
    }
    if (data.code == 0) {
      emit('refresh');
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
  };
  const refresh = () => {
    emit('refresh');
  };
</script>
<style lang="less" scoped>
  .role-check-tree {
    padding: 15px 16px 24px;
    background: #fff;
    height: 100%;
    flex-direction: column;
    display: flex;
    overflow: auto;
    .roleManage-right-type {
      color: #333;
      font-size: 16px;
      margin-top: 24px;
      margin-bottom: 16px;
      .ant-divider {
        background-color: v-bind(selColor);
      }
    }
    .all-menu {
      flex: 1;
      overflow: auto;
    }
  }
</style>
