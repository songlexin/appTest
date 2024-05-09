<template>
  <div class="footer-card">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .footer-card {
    height: 44px;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
    justify-content: end;
    align-items: center;
  }
</style>
