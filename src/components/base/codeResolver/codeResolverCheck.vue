<template>
  <DraggableModal
    :visible="props.visible"
    width="50%"
    title="扫码枪识别功能检测"
    :footer="null"
    @cancel="closeModal"
    :wrap-class-name="'modal-select-box xc-static'"
  >
    <a-form class="static-form" layout="horizontal">
      <fieldset class="form-fieldset">
        <legend class="form-legend">请用扫码枪扫描该条码</legend>
        <div style="text-align: center">
          <div class="unique-barcode">
            <a-input
              type="text"
              ref="mbarcode"
              class="unique-code-input"
              v-model:value="state.barcode"
              @keypress="barcodeEnter"
              autosize
              placeholder="请用扫码枪扫描该条码"
            >
            </a-input>
          </div>
          <svg id="barcodeListCheck" style="width: 250px"></svg>
          <div id="erbarcode"></div>
          (01)06920665710028(10)aB)(21)T1
        </div>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="form-legend">扫码解析结果</legend>
        <a-form-item class="first-form-item" label="(01)DI:" name="(01)DI"
          >{{ state.checkInfo.di }}
          <span v-if="state.checkInfo.di">
            <CheckOutlined
              v-if="state.checkFlaginfo.diFlag"
              :style="{ color: 'var(--ant-success-color)' }"
            />
            <CloseOutlined v-else :style="{ color: 'var(--ant-error-color)' }" />
            <!-- <i class="iconfont icon_close icon-check-success"></i>
            <i  class="ant-icon-close icon-check-error"></i >-->
          </span>
        </a-form-item>
        <a-form-item label="(10)批号:"
          >{{ state.checkInfo.batchCode }}
          <span v-if="state.checkInfo.batchCode">
            <CheckOutlined
              v-if="state.checkFlaginfo.batchCodeFlag"
              :style="{ color: 'var(--ant-success-color)' }"
            />
            <span v-else>
              <CloseOutlined :style="{ color: 'var(--ant-error-color)' }" /><span>{{
                state.errorMsg
              }}</span></span
            >
            <!-- <i v-if="state.checkFlaginfo.batchCodeFlag"class="el-icon-check icon-check-success" ></i>
            <i v-else class="el-icon-close icon-check-error"><span>{{ state.errorMsg }}</span></i> -->
          </span>
        </a-form-item>
        <a-form-item label="(21)序号:"
          >{{ state.checkInfo.serialNo }}
          <span v-if="state.checkInfo.serialNo">
            <CheckOutlined
              v-if="state.checkFlaginfo.serialNoFlag"
              :style="{ color: 'var(--ant-success-color)' }"
            />
            <CloseOutlined v-else :style="{ color: 'var(--ant-error-color)' }" />
            <!-- <i v-if="state.checkFlaginfo.serialNoFlag" class="el-icon-check icon-check-success"></i>
            <i v-else class="el-icon-close icon-check-error"></i> -->
          </span>
        </a-form-item>
        <a-form-item label="识别特殊字符能力:">
          <span v-if="state.checkInfo.code">
            <CheckOutlined
              v-if="state.checkFlaginfo.specialCharacter"
              :style="{ color: 'var(--ant-success-color)' }"
            />
            <CloseOutlined v-else :style="{ color: 'var(--ant-error-color)' }" />
            <!-- <i v-if="state.checkFlaginfo.specialCharacter" class="el-icon-check icon-check-success"></i>
            <i v-else class="el-icon-close icon-check-error"></i> -->
          </span>
        </a-form-item>
      </fieldset>
    </a-form>
  </DraggableModal>
</template>
<script lang="ts" setup>
  import { DraggableModal } from '@/components/core/draggable-modal';
  import jsbarcode from 'jsbarcode';
  import { watch, reactive, nextTick, ref } from 'vue';
  import barCoderApi from '@/api/codeResolver';
  import dayjs from 'dayjs';
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    visible: {
      type: Boolean,
      require: true,
    },
  });
  const emits = defineEmits(['update:visible']);

  const state = reactive({
    billId: '010692066571002810aB)\u001d21T1',
    barcode: '',
    checkInfo: {
      di: '',
      productDate: '',
      expdtEndDate: '',
      batchCode: '',
      serialNo: '',
      code: '',
    },
    checkFlaginfo: {
      diFlag: false,
      productDateFlag: false,
      expdtEndDateFlag: false,
      batchCodeFlag: false,
      serialNoFlag: false,
      specialCharacter: false,
    },
    caseExceptionFlag: false,
    errorMsg: '',
  });
  const mbarcode = ref();
  const barcodeEnter = (e) => {
    // state.barcode = e.target.value;
    if (e.which === 29 && (e.ctrlKey || e.code === 'AltLeft')) {
      state.barcode = state.barcode + String.fromCharCode(29);
    }
    if (e.which === 13) {
      barcodeResolve(state.barcode);
    }
  };
  const barcodeResolve = async () => {
    const param = { code: state.barcode, checkSpdCode: true, hosId: 'htest01' };
    const { code, data } = await barCoderApi.barCodeAnalyse(param);

    if (code == 0) {
      if (data) {
        state.checkInfo = data;
        state.checkInfo.productDate = dayjs(data.productDate).format('YYYY-MM-DD');
        state.checkInfo.expdtEndDate = dayjs(data.expdtEndDate).format('YYYY-MM-DD');
        if (state.checkInfo.di == '06920665710028') {
          state.checkFlaginfo.diFlag = true;
        } else {
          state.checkFlaginfo.diFlag = false;
        }
        if (dayjs(state.checkInfo.productDate).format('YYMMDD') == '210904') {
          state.checkFlaginfo.productDateFlag = true;
        } else {
          state.checkFlaginfo.productDateFlag = false;
        }
        if (dayjs(state.checkInfo.expdtEndDate).format('YYMMDD') == '250731') {
          state.checkFlaginfo.expdtEndDateFlag = true;
        } else {
          state.checkFlaginfo.expdtEndDateFlag = false;
        }
        if (state.checkInfo.batchCode == 'aB)') {
          state.checkFlaginfo.batchCodeFlag = true;
        } else {
          state.checkFlaginfo.batchCodeFlag = false;
        }
        if (state.checkInfo.serialNo == 'T1') {
          state.checkFlaginfo.serialNoFlag = true;
        } else {
          state.checkFlaginfo.serialNoFlag = false;
        }
        if (state.checkInfo.code.includes('\u001d')) {
          state.checkFlaginfo.specialCharacter = true;
        } else {
          state.checkFlaginfo.specialCharacter = false;
        }
        if (state.checkInfo && state.checkInfo.batchCode) {
          // let pattern = /[^\x00-\x80]/g;
          // if (pattern.test(state.checkInfo.batchCode)) {
          //   state.errorMsg = '请检查是否为英文输入法！';
          // } else {
          //   state.errorMsg = '';
          // }
        }
      }
    }
  };
  const resetValues = () => {
    state.barcode = '';
    state.checkInfo = {
      di: '',
      productDate: '',
      expdtEndDate: '',
      batchCode: '',
      serialNo: '',
      code: '',
    };

    state.checkFlaginfo = {
      diFlag: false,
      productDateFlag: false,
      expdtEndDateFlag: false,
      batchCodeFlag: false,
      serialNoFlag: false,
      specialCharacter: false,
    };
    state.caseExceptionFlag = false;
    state.errorMsg = '';
  };
  const closeModal = () => {
    emits('update:visible', false);
  };
  watch(
    () => props.visible,
    (val) => {
      if (val) {
        nextTick(() => {
          console.log(state);
          jsbarcode('#barcodeListCheck', state.billId, { height: 80, displayValue: false });
          mbarcode?.value?.focus();
        });
      } else {
        // 清除所有值
        resetValues();
      }
    },
  );
</script>
<style lang="less" scoped>
  .form-fieldset {
    border: 1px solid var(--ant-primary-color);
    padding: 0 16px 16px;
    .form-legend {
      display: table;
      width: initial;
      border-bottom: 0px;
      font-weight: bolder;
      color: var(--ant-primary-color);
      margin-left: 16px;
      margin-bottom: 16px;
    }
    .first-form-item {
      margin-top: -12px;
    }
    svg {
      display: inline-block;
    }
  }
</style>
