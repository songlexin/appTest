## 基本使用

| 属性             | 描述                      | example                                                      |
| ---------------- | ------------------------- | ------------------------------------------------------------ |
| showO            | 控制按钮显示（默认false） | recoderChangeBtn(翻页)、backBtn（返回按钮）、showTitlePrefixed（标题前面蓝色） |
| back             | 事件 点击返回             |                                                              |
| recordChange     | 点击翻页                  | prev和next 判断是前一条记录还是后一条                        |
| extra            | slot                      |                                                              |
| descriptionsList | 同之前                    | 字段映射    增加了h属性，支持jsx渲染，处理某些特殊自定义dom渲染 |
| detailInfo       | info数据                  |                                                              |



## 页面page

```tsx
<template>
  <div class="xc-page">
    <XcDetailDescription
      :descriptionsList="state.list"
      headerTitle="采购订单详情"
      :showO="showItem"
      @back="jumpBack"
      @recordChange="recordChange"
      :detailInfo="state.detailInfo"
    >
      <template #extra>
        <a-button type="primary">提交</a-button>
      </template>
    </XcDetailDescription>
  </div>
</template>
<script setup>
  import { reactive } from 'vue';
  import XcDetailDescription from '@/components/xc/xc-table/xc-detail-description/index.vue';
  import { detailHelper } from './detailHelper.tsx';
  const showItem = reactive({
    recoderChangeBtn: false,
    backBtn: false,
    showTitlePrefixed: true,
  });
  const state = reactive({
    list: [
      {
        title: '采购单号',
        value: 'field1',
        h: detailHelper.vnodeFun,
      },
      {
        title: '进院供应商',
        value: 'field2',
      },
      {
        title: '采购计划号',
        value: 'field3',
      },
      {
        title: '采购院区',
        value: 'field4',
      },
      {
        title: '收货地址',
        value: 'field5',
      },
      {
        title: '制单时间',
        value: 'field6',
      },
      {
        title: '采购数量',
        value: 'field7',
      },
      {
        title: '采购金额',
        value: 'field8',
      },
      {
        title: '赋码配送',
        value: 'field9',
      },
      {
        title: '备注',
        value: 'field10',
      },
    ],
    detailInfo: {
      field1: 'CGh00132022106120034',
      field2: '长沙会友机械也有幸公司',
      field3: 'BHI3232422343343',
      field4: '岳麓书院区',
      field5: '急诊楼下三层',
      field6: '制单时间',
      field7: '采购数量',
      field8: '1122,332,433',
      field9: '332323,3223,3223',
      field10: 'xxxxxxxxxx',
    },
  });
  const jumpBack = () => {
    alert('点击了返回');
  };
  const recordChange = (code) => {
    alert(`recoderChange:${code}`);
  };
</script>
<style lang="less" scoped></style>

```

##  格式化工具函数

```tsx
// 金额三位一个逗号
const formateMoney = (num: number): string => {
  return num.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
};

// 点击copy文本
const copyText = (e: MouseEvent) => {
  // @ts-ignore
  const sels = window.getSelection();
  // @ts-ignore
  sels.selectAllChildren(e.target);
  document.execCommand('copy');
  // @ts-ignore
  sels.removeAllRanges();
  alert('复制成功');
};

// 自定义渲染
const vnodeFun = (data: any) => (
  <>
    <span class="mr-5px">{data[Object.keys(data)[0]]} </span>
    <span class="mr-5px" style={{ color: 'red', background: '#ddd' }}>
      {' '}
      待确认{' '}
    </span>
    <span onClick={copyText} style={{ color: 'red', background: '#ddd' }}>
      {' '}
      copy粘贴{' '}
    </span>
  </>
);

export const detailHelper = {
  formateMoney,
  vnodeFun,
};

```

