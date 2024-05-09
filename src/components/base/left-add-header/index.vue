<template>
  <a-row class="header left-add-header">
    <div class="header-top-div" :class="divider ? 'divider-line' : ''" v-if="titleName">
      <span class="header-title" v-if="title">{{ title }}</span>
      <a-button v-if="titleName" type="link" @click="showModal">
        <plus-outlined />
        <span>{{ titleName }}</span>
      </a-button>
      <!-- <a-divider v-if="divider" style="margin: 13px 0 0" /> -->
    </div>
    <a-input
      v-if="search"
      @keyup.enter="loadTable"
      v-model:value="state.name"
      :placeholder="placeholderTxt"
      style="margin: 8px 0"
      allow-clear
    >
      <template #suffix>
        <search-outlined style="color: #cccccc" @click="loadTable" />
      </template>
    </a-input>
  </a-row>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    titleName: {
      type: String,
      required: false,
      default: '',
    },
    placeholderTxt: {
      type: String,
      required: false,
      default: '请输入',
    },
    divider: {
      type: Boolean,
      required: false,
      default: false,
    },
    search: {
      type: Boolean,
      required: false,
      default: true,
    },
  });
  const state = reactive({
    name: '',
  });
  const emit = defineEmits<{
    (e: 'loadTable', num: string): void;
    (e: 'showModal'): void;
  }>();
  const showModal = () => {
    emit('showModal');
    console.log(props);
  };
  const loadTable = () => {
    emit('loadTable', state.name);
  };
  const clearName = () => {
    state.name = '';
  };
  // 记得暴露
  defineExpose({
    clearName,
  });
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    :deep(.ant-input-affix-wrapper) {
      margin: 16px 0;
    }
  }

  .left-add-header {
    .header-top-div {
      height: 24px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    .divider-line {
      border-bottom: 1px solid #d9d9d9;
    }
    .header-title {
      font-size: 16px;
      line-height: 22px;
    }
    .ant-btn-link {
      padding-right: 0px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      padding: 0;
    }
  }
</style>
