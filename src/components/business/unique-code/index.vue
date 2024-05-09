<template>
  <div class="unique-code-img">
    <i class="iconfont icon-tiaoma icon-code"></i>
    <a-input
      ref="iptRef"
      v-model:value="state.uniqueCode"
      placeholder="扫描条码"
      class="unique-code-img-input"
      allow-clear
      @keypress="getPkgInfo"
      type="text"
    >
      <!--  -->
      <!--  -->
      <!-- :type="state.uniqueCodeType ? 'text' : 'password'" -->
      <!-- @input="inputFun" -->
      <!-- @input="inputFun" -->
    </a-input>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { selColor } from '@/utils/getColor';

  export default defineComponent({
    name: 'UniqueCode',
    emits: ['getInfo'],
    setup(_, context) {
      const state = reactive({
        uniqueCode: '',
        uniqueCodeType: false,
      });
      const getPkgInfo = async (e) => {
        if (e.which === 29 && (e.ctrlKey || e.code === 'AltLeft')) {
          state.uniqueCode = state.uniqueCode + String.fromCharCode(29);
        }
        if (e.which === 13) {
          if (!state.uniqueCode) {
            message.info('包码必填！');
            return;
          }
          state.uniqueCodeType = true;
          let pattern = new RegExp('[\u4E00-\u9FA5]+');
          if (pattern.test(state.uniqueCode)) {
            return message.warning('包码不能是中文，请切换输入法！');
          }
          if (state.uniqueCode) {
            context.emit('getInfo', state.uniqueCode);
          }
          if (state.uniqueCode.length > 16) {
            state.uniqueCode = '';
          }
          iptRef.value?.focus();
        }
      };

      const sColor = selColor;

      // 初始化加载
      onMounted(() => {
        iptRef?.value?.focus();
      });

      const iptRef = ref();
      return {
        state,
        getPkgInfo,
        iptRef,
        sColor,
        // inputFun,
      };
    },
  });
</script>
<style lang="less" scoped>
  .unique-code-img {
    display: inline-block;
    width: 300px;
    margin-right: 10px;
    height: 30px;
    box-sizing: border-box;
    background: url('@/assets/images/code.png');
    background-size: 100% 100%;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    // padding-left: 10px;
    cursor: pointer;
    position: relative;
    :deep(.ant-input-affix-wrapper:focus) {
      box-shadow: none;
    }

    .icon-code {
      width: 300px;
      height: 30px;
      display: inline-block;
      font-size: 26px;
      color: v-bind(sColor);
      opacity: 0.2;
      position: absolute;
      top: 1px;
    }
    .unique-code-img-input {
      position: absolute;
      background: transparent;
      border-color: v-bind(sColor);
      border-width: 1px;
      // border: 0;
      // line-height: 25px;
      left: 0;
      width: 100%;
      :deep(input.ant-input) {
        background: transparent !important;
      }
    }
  }
</style>
