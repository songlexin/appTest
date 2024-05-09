<template>
  <a-tree
    v-model:checkedKeys="checkedKeys"
    class="menu-role-tree"
    checkable
    :selectable="false"
    :tree-data="props.listData"
    :field-names="fieldNames"
    default-expand-all
  >
    <template #title="{ dataRef }">
      <div v-if="dataRef.buttonCodes">
        {{ dataRef.cname }}
        <img
          src="./../../../assets/images/btns.png"
          style="width: 16px; height: 16px; margin-left: 8px; display: inline-block"
          :class="{ disabled: !dataRef.editBtn }"
          alt=""
          @click.stop="btnClick(dataRef)"
        />
      </div>
      <template v-else>{{ dataRef.cname }}</template>
    </template>
  </a-tree>
  <a-modal
    v-model:visible="visible"
    :wrap-class-name="'modal-box-small'"
    :title="'按钮权限'"
    ok-text="保存"
    cancel-text="取消"
    @ok="hideModal"
  >
    <a-form
      ref="formRef"
      :model="state.formState"
      name="basic"
      :label-col="{ style: { width: '120px' } }"
      autocomplete="off"
    >
      <a-form-item label="页面名称" name="cname">
        <a-input v-model:value="state.formState.cname" disabled />
      </a-form-item>
      <a-form-item label="按钮权限" name="programTypes">
        <a-checkbox-group v-model:value="state.formState.checkBtn">
          <a-checkbox v-for="item in state.btns" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
  import { watch, reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { saveRoleMenuBasic, saveRoleMenu, schemeBatchSave } from './../../../api/permission/role';
  // v-model:expandedKeys="expandedKeys"
  // const selectedKeys = ref<string[]>();
  const checkedKeys = ref<any[]>([]);

  const fieldNames = {
    children: 'childMenu',
    title: 'cname',
    key: 'code',
  };
  const emit = defineEmits<{
    (e: 'checkKey', num: Object): void;
    (e: 'refresh'): void;
  }>();
  watch(checkedKeys, () => {
    emit('checkKey', {
      projectCode: props.projectCode,
      checkedKeys: checkedKeys.value,
    });
  });
  const props = defineProps({
    listData: {
      type: Array,
      required: true,
    },
    checkedList: {
      type: Array,
      required: false,
      default: () => [],
    },
    roleCode: {
      type: String,
      required: false,
    },
    projectCode: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  });
  watch(
    () => props.checkedList,
    (val) => {
      checkedKeys.value = val;
    },
    {
      deep: true,
      immediate: true,
    },
  );

  const visible = ref<boolean>(false);
  const state = reactive({
    formState: {
      checkBtn: [],
      code: '',
      cname: '',
    },
    btns: [],
  });
  const btnClick = (row) => {
    if (!row.editBtn) {
      return;
    }
    if (checkedKeys.value.includes(row.code)) {
      visible.value = true;
      state.btns = row.buttonCodes.split(',');
      state.formState.checkBtn = row.checkedBtns?.split(',');
      state.formState.code = row.code;
      state.formState.cname = row.cname;
    } else {
      message.info('请先选中菜单！');
    }
  };

  const hideModal = async () => {
    const params = {
      addMenus: [
        {
          menuCode: state.formState.code,
          btnCodes: state.formState.checkBtn,
        },
      ],
      delMenus: [],
      roleCode: props.roleCode,
      projectCode: props.projectCode,
      schemeId: props.roleCode,
    };
    const obj = [params];
    let data = {} as any;
    if (props.type === 'basic-role') {
      data = await saveRoleMenuBasic(obj);
    } else if (props.type === 'role') {
      data = await saveRoleMenu(obj);
    } else if (props.type === 'scheme') {
      data = await schemeBatchSave(obj);
    }
    if (data.code == 0) {
      visible.value = false;
      message.success('保存成功');
      emit('refresh');
    } else {
      message.error('保存失败');
    }
  };
</script>
<style lang="less">
  .menu-role-tree {
    // flex: 1;
    // overflow: auto;
    .ant-tree-list-holder-inner {
      display: inherit !important;
      border: 1px solid #efefef;
      overflow: hidden;
    }
    .disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .menu-0 {
      width: 100%;
      // height: 56px;
      padding: 0;
      margin: 0;
      align-items: center;
      border-bottom: 1px solid #efefef;
      & > span {
        // background: #e6e6e6;
        height: 100%;
        margin: 0;
        padding: 0;
        line-height: 56px;
      }
      .ant-tree-checkbox {
        // margin-top: 20px;
        margin-right: 8px;
      }
      .ant-tree-node-content-wrapper {
        width: 120px;
      }
    }
    .menu-1 {
      float: left;
      // height: 56px;
      padding: 0;
      margin: 0;
      align-items: center;
      & > span {
        height: 100%;
        margin: 0;
        padding: 0;
        line-height: 56px;
      }
      .ant-tree-checkbox {
        // padding-top: 20px;
        margin-right: 8px;
      }
    }
    .menu-1 + .menu-0 {
      border-top: 1px solid #efefef;
    }
  }
</style>
