<template>
  <div class="bg-white flex flex-col rounded-3px xc-content pl-12px pr-12px">
    <div class="h-48px color-title w-full flex flex-row items-center">
      <slot name="title"> </slot>
    </div>
    <div class="pt-16px pb-16px">
      <slot> </slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<style lang="less" scoped>
  .color-title {
    color: var(--xc-N8-color);
    font-size: 16px;
    line-height: 16px;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 600;
  }
  .title-prefix-line {
    margin-left: 10px;
    position: relative;
  }
  .title-prefix-line::before {
    content: '';
    position: absolute;
    height: 20px;
    top: -1px;
    left: -8px;
    border-right: 3px solid var(--ant-primary-color);
    display: block;
  }
</style>
