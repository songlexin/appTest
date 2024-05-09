<template>
  <div class="page-container">
    <div><img src="./../../../assets/images/xiaofulogo/loading.gif" alt="" /></div>
    <p class="content">努力加载中...</p>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .page-container {
    width: 100%;
    height: 100%;
    background-color: white;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 140px;
      img {
        width: 120px;
        height: 120px;
      }
    }
    .content {
      font-size: 14px;
      font-weight: 300;
      color: #666666;
      text-align: center;
      margin-top: 27px;
    }
  }
</style>
