<template>
  <a-tree
    :tree-data="list"
    :expanded-keys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="props.defaultSelectedKeys"
    @expand="onExpand"
    @select="onSelectNode"
  ></a-tree>
</template>
<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import { getSysOrgTree } from './../../../api/system/sysOrg';
  import { useUserStore } from './../../../store/modules/user';
  import type { TreeProps } from 'ant-design-vue';
  const props = defineProps({
    defaultSelectedKeys: {
      //非必要 默认选中科室
      type: Object,
      required: false,
    },
  });
  const emit = defineEmits(['select']);
  const userStore = useUserStore();
  // 获取科室数据
  async function getSysOrgTreeFun() {
    const params = { corpId: userStore.userInfo.corpId };
    const data = await getSysOrgTree(params);
    state.companyTreeList = data;
  }
  const list = computed<[]>({
    get() {
      return state.companyTreeList;
    },
    set() {},
  });
  const state = reactive({
    companyTreeList: [] as TreeProps['treeData'],
  });
  // 点击选中事件
  const onSelectNode = (selectedKeys) => {
    emit('select', selectedKeys);
  };
  getSysOrgTreeFun();
</script>
