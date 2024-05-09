<!--
  扫码解析组件
  系统自编码立即返回，自行处理如：普通唯一码，定数包码，手术包码
  UDI码传到后台解析后返回，返回信息包含：批号，效期，生产日期，序列号，spd产品ID，若props有传入的hosId则返回信息包含医院产品ID
  参数：
  hosId：医院ID，解析码后会取此参数对应的医院产品信息并返回
  goodsIds：若UDI码DI部分未与SPD系统产品对应，则弹出窗口绑定DI码，列表中产品来自传入的goodsIds
  示例：
  <codeResolver ref="codeResoler" :hosId="user.corpId" :goodsIds="goodsIds" @resolved="onBarcodeResolved" ></codeResolver>
-->
<template>
  <div class="unique-barcode">
    <a-input
      type="text"
      ref="mbarcode"
      class="unique-code-input"
      v-model:value="state.barcode"
      @keypress="barcodeEnter"
      autosize
      placeholder="请录入条形码"
    >
    </a-input>
    <a-button
      type="primary"
      ghost
      @click="showCode"
      :loading="state.barLoading"
      :disabled="state.barLoading"
      >扫码检测
    </a-button>
    <codeResolverCheck v-model:visible="state.codeVisible"></codeResolverCheck>
    <diCodeBind
      v-model:visible="state.bindVisible"
      :hosId="hosId"
      :purMode="purMode"
      ref="diCodeBindRef"
      @close="onBinderColse"
    ></diCodeBind>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import codeResolverCheck from './codeResolverCheck.vue';
  import diCodeBind from './diCodeBind.vue';
  import { BARCOD_RES_TYPE } from '@/enums/barCodeEnums';
  import barCoderApi from '@/api/codeResolver';
  import { message, Modal } from 'ant-design-vue';
  const mbarcode = ref();
  const props = defineProps({
    hosId: {
      type: String,
      required: false,
    },
    goodsIds: {
      type: Function,
      required: false,
    },
    collectorId: {
      type: String,
      required: false,
    },
    subProvId: {
      type: String,
      required: false,
    },
    purMode: {
      type: String,
      required: false,
    },
    prepGoods: {
      type: Boolean,
      required: false,
    },
    noBindDi: {
      type: Boolean,
      required: false,
    },
  });
  const state = reactive({
    codeVisible: false,
    barcode: '',
    bindVisible: false,
    barLoading: false,
  });
  const diCodeBindRef = ref();
  const barcodeEnter = (e) => {
    // state.barcode = e.target.value;
    if (e.which === 29 && (e.ctrlKey || e.code === 'AltLeft')) {
      state.barcode = state.barcode + String.fromCharCode(29);
    }
    if (e.which === 13) {
      barcodeResolve(state.barcode);
    }
  };
  const emits = defineEmits(['resolved']);
  const barcodeResolve = () => {
    if (state.barcode.indexOf('E') == 0) {
      //唯一码，由于采购入库根据配送单生成，自行处理
      emits('resolved', BARCOD_RES_TYPE.ZBM, state.barcode, state.barcode);
      inputSlt();
      return;
    } else if (state.barcode.indexOf('B') == 0) {
      emits('resolved', BARCOD_RES_TYPE.DSB, null, state.barcode);
      inputSlt();
      return;
    } else if (state.barcode.indexOf('A') == 0) {
      emits('resolved', BARCOD_RES_TYPE.SSB, null, state.barcode);
      inputSlt();
      return;
    } else {
      barcodeAnalyse(state.barcode);
    }
    return;
  };

  const inputSlt = () => {
    mbarcode.value?.focus();
    mbarcode.value?.select();
  };
  const barcodeAnalyse = async (barCode) => {
    try {
      state.barLoading = true;
      const param = {
        code: barCode,
        hosId: props.hosId,
        // hosId: 'h0008',
        prepGoods: props.prepGoods, //开启院外备货类产品,将优先从备货库存中匹配条码
      };
      if (!props.noTips) param.checkSpdCode = true;
      const { code, data } = await barCoderApi.codeAnalyse(param);
      if (code == 0) {
        let codeInfo = data;
        state.barcode = codeInfo.code;
        codeEmit(codeInfo);
      } else {
        message.error(`扫码解析异常:${data.msg}`);
        inputSlt();
      }
    } finally {
      state.barLoading = false;
    }
  };
  const codeEmit = (codeInfo) => {
    if (!codeInfo || !codeInfo.code) {
      message.error('无法识别的码！');
      inputSlt();
      return;
    }
    if (
      !codeInfo.lstGoods ||
      codeInfo.lstGoods.length == 0 ||
      codeInfo.lstGoods.filter((item) => !!item.goodsVo).length == 0
    ) {
      if (props.noBindDi) {
        message.error(`此码DI部分未绑定，请联系供应商维护商品DI:${codeInfo.di}`);
        inputSlt();
        return;
      }
      Modal.confirm({
        title: '此码DI部分未绑定，是否立即去绑定?',
        // okText: '确定',
        // okType: 'warning',
        // cancelText: '取消',
        onOk: async () => {
          let goodsIds = null;
          goodsIds = props.goodsIds?.();

          toBindDi(goodsIds, props.collectorId, props.subProvId, codeInfo);
        },
        onCancel() {},
      });
      return;
    } else if (!codeInfo.pi || (codeInfo.pi.startsWith('20') && codeInfo.pi.length == 4)) {
      //或者pi部分是以20开头的 长度是4 的校验码
      state.barcode = codeInfo.code;
      message.info('请扫描副码');
      return;
    }
    emits('resolved', BARCOD_RES_TYPE.GS1, codeInfo, state.barcode);
    state.barcode = '';
    inputSlt();
  };
  const toBindDi = (goodsIds, collectorId, subProvId, codeInfo) => {
    console.log(goodsIds, collectorId, subProvId, codeInfo);
    state.bindVisible = true;
    diCodeBindRef.value.show?.(goodsIds, collectorId, subProvId, codeInfo);
  };
  const onBinderColse = () => {
    state.bindVisible = false;
  };
  const showCode = () => {
    state.codeVisible = true;
  };
</script>
<style lang="less" scoped></style>
