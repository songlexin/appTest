<template>
  <div class="unique-code-img">
    <i class="iconfont icon-tiaoma icon-code"></i>
    <a-input
      ref="iptRef"
      v-model:value="state.uniqueCode"
      placeholder="扫描条码"
      class="unique-code-img-input"
      allow-clear
      @press-enter="getPkgInfo"
      @input="inputFun"
      @keydown="keydownFun"
      :type="state.uniqueCodeType ? 'text' : 'password'"
    >
    </a-input>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, nextTick, ref, watch } from 'vue';
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
      watch(
        () => state.uniqueCode,
        (val) => {
          if (!val) {
            nextTick(() => {
              state.uniqueCodeType = false;
            });
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );
      const getPkgInfo = async () => {
        if (!state.uniqueCode) {
          message.info('包码必填！');
          return;
        }
        context.emit('getInfo', state.uniqueCode);
        state.uniqueCode = '';
      };
      let timer = null as any;
      const inputFun = () => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          state.uniqueCodeType = true;
        }, 100);
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
        inputFun,
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
    // background: url('./../../../assets/images/code.png');
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
