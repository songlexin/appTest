<template>
  <div class="bg-white rounded-3px mb-8px">
    <div class="card-container">
      <slot> </slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .card-container {
    padding: 16px;
    padding-bottom: 4px;
  }
</style>
