<template>
  <div ref="dynamicTableFullRef">
    <DynamicTable
      fullType="main"
      :scroll="{ y: maxHeight() }"
      :columns="columns"
      :data-source="state.tableData"
      :pagination="state.pagination"
      :row-key="(record) => record.id"
      @resize-column="handleResizeColumn"
      @change="handleTableChange"
      search
      :formProps="formProps"
      @search-table="searchList"
      :expanded-row-keys="state.defaultExpandedRowKeys"
      @expand="childDetail"
    >
      <template #tableTopRightAction>
        <a-button style="margin: 0 8px 0 0" type="primary" @click="doImport"> 导入 </a-button>
        <a-button style="margin: 0 8px 0 0" @click="doExport"> 导出 </a-button>
      </template>
      <!-- 子表 -->
      <template #expandedRowRender>
        <div style="height: 100%; width: 100%">
          <a-table
            style="overflow: hidden"
            :columns="columnsChild"
            :data-source="state.detailList"
            :pagination="false"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'index'">
                <div>{{ index + 1 }}</div>
              </template>
              <template v-if="column.dataIndex === 'accountKindName'">
                <div>{{ `${record.accountKindName}账期` }}</div>
              </template>
              <template v-if="column.dataIndex === 'accountPeriod'">
                <div>
                  <a-input
                    v-if="record.childEdit == true"
                    v-model:value="state.childTemp.accountPeriod"
                    :min="1"
                    size="mini"
                  ></a-input>
                  <template v-else>{{ record.accountPeriod }}</template>
                </div>
              </template>

              <template v-if="column.dataIndex === 'action'">
                <a-button
                  type="link"
                  @click="childConfirm(record)"
                  v-if="record.childEdit"
                  :loading="state.saveLoading"
                >
                  保存
                </a-button>
                <a-button type="link" @click="childCancel(record)" v-if="record.childEdit">
                  取消
                </a-button>
                <a-button type="link" @click="childEditClick(record)" v-if="!record.childEdit">
                  修改
                </a-button>
              </template>
            </template>
          </a-table>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'finishInitFlag'">
          <span v-if="record.finishInitFlag == 1">是</span>
          <span v-if="record.finishInitFlag == 0">否</span>
        </template>
        <template v-if="column?.dataIndex === 'receivableCustomerFlag'">
          <div>
            <a-select
              v-if="record.showEdit == true"
              style="width: 100%"
              v-model:value="state.temp.receivableCustomerFlag"
              :options="state.customerFlagList"
              allowClear
              :min="1"
              size="mini"
            ></a-select>
            <template v-else> {{ record.receivableCustomerFlag == 1 ? '是' : '否' }}</template>
          </div>
        </template>
        <template v-if="column?.dataIndex === 'creditLevel'">
          <div>
            <a-select
              v-if="record.showEdit == true"
              style="width: 100%"
              v-model:value="state.temp.creditLevel"
              :options="state.creditList"
              :fieldNames="{ label: 'lable', value: 'val' }"
              allowClear
              :min="1"
              size="mini"
            ></a-select>
            <template v-else>
              <span v-if="record.creditLevel == '01'">新增客户</span>
              <span v-if="record.creditLevel == '02'">战略客户</span>
              <span v-if="record.creditLevel == '03'">一般客户</span>
              <span v-if="record.creditLevel == '04'">关注客户</span>
              <span v-if="record.creditLevel == '05'">风险客户</span>
            </template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'creditLimit'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.creditLimit"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{
              record.creditLimit || record.creditLimit == '0'
                ? Number(record.creditLimit)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'volumeLimit'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.volumeLimit"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{
              record.volumeLimit || record.volumeLimit == '0'
                ? Number(record.volumeLimit)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'reagentTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.reagentTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.reagentTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'consumerGoodsTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.consumerGoodsTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.consumerGoodsTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'spdConsumerGoodsTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.spdConsumerGoodsTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.spdConsumerGoodsTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'deviceTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.deviceTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.deviceTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'maintainSrvFeeTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.maintainSrvFeeTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.maintainSrvFeeTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'techSrvFeeTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.techSrvFeeTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.techSrvFeeTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'purVolumeTerm'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.purVolumeTerm"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.purVolumeTerm }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'remark'">
          <div>
            <a-input
              v-if="record.showEdit == true"
              v-model:value="state.temp.remark"
              :min="1"
              size="mini"
            ></a-input>
            <template v-else>{{ record.remark }}</template>
          </div>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button
            type="link"
            @click="confirm(record)"
            v-if="record.showEdit"
            :loading="state.saveLoading"
          >
            保存
          </a-button>
          <a-button type="link" @click="cancel(record)" v-if="record.showEdit"> 取消 </a-button>
          <a-button type="link" @click="editClick(record)" v-if="!record.showEdit"> 修改 </a-button>
        </template>
      </template>
    </DynamicTable>
    <a-modal class="import" v-model:visible="state.showUpload" title="信用账期导入" centered>
      <div v-if="state.normalImport">
        <div class="import-header">
          <div class="import-tip">上传文件</div>
          <a-button
            type="text"
            style="color: var(--ant-primary-color); padding: 0"
            @click="downloadExcelTemp('客户信用账期管理导入.xlsx')"
          >
            模板下载
          </a-button>
        </div>
        <a-upload-dragger
          v-model:fileList="state.fileList"
          name="file"
          :maxCount="1"
          :before-upload="beforeUpload"
          @change="handleUploadChange"
        >
          <p class="import-log">
            <img src="./../../../../assets/images/import.png" alt="" />
          </p>
          <p class="ant-upload-text"
            ><span style="color: var(--ant-primary-color)">点击上传</span> 或拖拽文件到这里</p
          >
          <p class="ant-upload-hint">支持的文件类型：xlsx，不超过500Kb</p>
        </a-upload-dragger>
      </div>
      <div class="import-error" v-if="!state.normalImport">
        <p class="error-info"
          ><img
            style="display: inline-block"
            src="./../../../../assets/images/error.png"
            alt=""
          />导入失败</p
        >
        <p style="margin-bottom: 16px">xxxxxx原因,无法导入</p>
        <a-button @click="state.normalImport = true">重新导入</a-button>
      </div>
      <template #footer>
        <a-button @click="state.showUpload = false">取消</a-button>
        <a-button
          v-if="state.normalImport"
          type="primary"
          :loading="state.importLoading"
          @click="handleOk"
          >导入</a-button
        >
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
  export default {
    name: '/dateManage',
  };
</script>
<script setup lang="ts">
  // import {
  //   getCreditExport,
  //   getCreditImport,
  //   getCreditList,
  //   getDictionaryList,
  //   updateChild,
  //   updateCredit,
  // } from '@/api/receivables/dateManage/index';
  import { useTable } from '@/components/core/dynamic-table';
  import {
    FormItemSchema,
    TableSearchFormInstance,
    TableSearchFormProps,
  } from '@/components/core/table-search-form';
  import { PAGE_OBJ } from '@/enums/paginationEnums';
  // import { useDownloadExcel } from '@/hooks/functions/useResultDownload';
  import { useFullscreen } from '@vueuse/core';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { cloneDeep } from 'lodash-es';
  import { onMounted, provide, reactive, ref } from 'vue';
  import { columns, columnsChild } from './columns';
  // defineOptions({
  //   name: 'dateManage',
  // });
  const dynamicTableFullRef = ref<HTMLElement>();
  const { toggle, isFullscreen } = useFullscreen(dynamicTableFullRef);
  provide('dynamicTableFullRefKeyMain', { toggle, isFullscreen });
  // 获取字典
  // const userStore = useUserStore();
  const [DynamicTable, dynamicTableInstance] = useTable();
  const state = reactive({
    searchFormRef: {} as TableSearchFormInstance,
    companyList: [] as any,
    customerFlagList: [
      {
        value: 1,
        label: '是',
      },
      {
        value: 0,
        label: '否',
      },
    ],
    tableData: [
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },

      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
      {
        custName: '2',
        receivableCustomerFlag: '2',
      },
    ],
    pagination: cloneDeep(PAGE_OBJ), // 分页参数
    showUpload: false,
    file: '',
    fileList: [],
    normalImport: true, //是否正常导入
    importLoading: false,
    saveLoading: false,
    creditList: [], //信用等级
    temp: {
      receivableCustomerFlag: '', //应收客户
      creditLevel: '', //备注信息
      creditLimit: '', //信用额度
      volumeLimit: '', //带量额度
      reagentTerm: '', //试剂账期
      consumerGoodsTerm: '', //耗材账期
      spdConsumerGoodsTerm: '', //SPD耗材账期
      deviceTerm: '', //设备账期
      maintainSrvFeeTerm: '', //维修服务费账期
      techSrvFeeTerm: '', //技术服务费账期
      purVolumeTerm: '', //采购带量账期
      remark: '', //备注
    },
    excelTempUrl: '/sfile/2024/aprms/data-template/', //模板下载路径前缀
    defaultExpandedRowKeys: [] as any[], //子表展开项
    detailList: [] as any,
    childTemp: {
      accountPeriod: '',
    },
  });

  const creditSchemas: FormItemSchema[] = [
    {
      field: 'custName',
      label: '客户',
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'receivableCustomerFlag',
      label: '应收客户',
      component: 'Select',
      componentProps: {
        options: state.customerFlagList,
      },
    },
    {
      field: 'createTimeList',
      label: '创建日期',
      component: 'RangePicker',
      componentProps: {},
    },
  ];
  const formProps: TableSearchFormProps = {
    schemas: creditSchemas,
    autoAdvancedLine: 1, // 超过1行自动折叠
    resetFunc: async () => {
      const formRef = (await dynamicTableInstance.getQueryFormRef()) as TableSearchFormInstance;
      formRef.setFormModel('custName', undefined);
      formRef.setFormModel('receivableCustomerFlag', undefined);
      formRef.setFormModel('createTimeList', undefined);
      formRef.formModel.companyCodes = state?.companyList[0]?.mgrCorpId;
      await searchReset();
    },
  };

  const maxHeight = () => {
    return `${document.documentElement.clientHeight - 304}px`;
  };
  // 拖拉表格列
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  //表格查询
  const searchList = () => {
    state.pagination.current = 1;
    queryList();
  };
  //表格查询方法
  const queryList = async () => {
    const formRef = (await dynamicTableInstance.getQueryFormRef()) as TableSearchFormInstance;
    try {
      const param = reactive({
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
        queryObject: {
          ...formRef.formModel,
        },
      });
      if (param?.queryObject?.createTimeList) {
        param.queryObject.createTimeStart = dayjs(param.queryObject.createTimeList[0]).format(
          'YYYY-MM-DD 00:00:00',
        );
        param.queryObject.createTimeEnd = dayjs(param.queryObject.createTimeList[1]).format(
          'YYYY-MM-DD 23:59:59',
        );
      }
      if (param?.queryObject?.companyCodes) {
        param.queryObject.companyCodes = [param.queryObject.companyCodes];
      }
      delete param?.queryObject?.createTimeList;
      // const { data, code } = await getCreditList(param);
      // if (code === 0) {
      //   state.tableData = data?.data;
      //   state.pagination.total = data.total;
      //   state.pagination.pageSize = data.pageSize;
      //   state.pagination.current = data.pageNum;
      //   if (state.tableData.length > 0) {
      //     childDetail(false, state.tableData[0]);
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  //表格查询重置searchReset
  const searchReset = () => {
    state.pagination.current = 1;
    queryList();
  };
  // 页码改变
  const handleTableChange = (pagination) => {
    state.pagination.current = pagination.current;
    state.pagination.pageSize = pagination.pageSize;
    if (state.pagination.pageSize != pagination.pageSize) {
      state.pagination.pageSize = pagination.pageSize;
      state.pagination.current = 1;
    } else {
      state.pagination.current = pagination.current;
    }
    queryList();
  };
  const childDetail = (expanded, record) => {
    state.defaultExpandedRowKeys = [];
    // 展开时查询子table
    if (expanded) {
      if (record) {
        state.defaultExpandedRowKeys.push(record.id);
        getExpandList(record);
      }
    }
  };
  const getExpandList = async (record) => {
    state.detailList = record.periodList;
    if (state.detailList && state.detailList.length > 0) {
      state.detailList.forEach((item) => {
        item.date = '天';
      });
    }
  };
  //导入
  const doImport = () => {
    state.showUpload = true;
    //清空之前的导入
    state.fileList = [];
    state.file = '';
  };
  const beforeUpload = (file) => {
    state.file = file;
    const type = file ? file.name.substring(file.name.lastIndexOf('.') + 1) : '';
    const isXlsx = type == 'xlsx';
    if (!isXlsx) {
      message.error('只支持xlsx格式!');
      return;
    }
    const isLt500k = file.size / 1024 < 500;
    if (!isLt500k) {
      message.error('文件大小不超过500k!');
      return;
    }
    return false;
  };
  const handleUploadChange = (file) => {
    if (file?.file?.status == 'error') {
      state.fileList = [];
    }
  };
  const handleOk = async () => {
    state.importLoading = true;
    let formData = new FormData();
    formData.append('file', state.file);
    try {
      // const res = await getCreditImport(formData);
      // if (res?.code == 0) {
      //   message.success('导入成功');
      //   state.importLoading = false;
      //   state.showUpload = false;
      //   searchList();
      // }
    } catch (error) {
      state.importLoading = false;
    }
  };
  //导出
  const doExport = async () => {
    const formRef = (await dynamicTableInstance.getQueryFormRef()) as TableSearchFormInstance;
    try {
      const param = reactive({
        pageNum: state.pagination.current,
        pageSize: state.pagination.pageSize,
        queryObject: {
          ...formRef.formModel,
        },
      });
      if (param?.queryObject?.createTimeList) {
        param.queryObject.createTimeStart = dayjs(param.queryObject.createTimeList[0]).format(
          'YYYY-MM-DD 00:00:00',
        );
        param.queryObject.createTimeEnd = dayjs(param.queryObject.createTimeList[1]).format(
          'YYYY-MM-DD 23:59:59',
        );
      }
      if (param?.queryObject?.companyCodes) {
        param.queryObject.companyCodes = [param.queryObject.companyCodes];
      }
      delete param?.queryObject?.createTimeList;
      const fileName = `客户信用账期${dayjs().format('YYYY-MM-DD')}.xlsx`;
      // useDownloadExcel(param, getCreditExport, fileName);
    } catch (error) {
      console.log(error);
    }
  };
  //模板下载
  const downloadExcelTemp = (fileName) => {
    window.open(state.excelTempUrl + fileName);
  };
  //行编辑
  const editClick = (record) => {
    state.temp.creditLevel = cloneDeep(record.creditLevel);
    state.temp.receivableCustomerFlag = cloneDeep(record.receivableCustomerFlag);
    state.temp.creditLimit = cloneDeep(record.creditLimit);
    state.temp.volumeLimit = cloneDeep(record.volumeLimit);
    state.temp.reagentTerm = cloneDeep(record.reagentTerm);
    state.temp.consumerGoodsTerm = cloneDeep(record.consumerGoodsTerm);
    state.temp.spdConsumerGoodsTerm = cloneDeep(record.spdConsumerGoodsTerm);
    state.temp.deviceTerm = cloneDeep(record.deviceTerm);
    state.temp.maintainSrvFeeTerm = cloneDeep(record.maintainSrvFeeTerm);
    state.temp.techSrvFeeTerm = cloneDeep(record.techSrvFeeTerm);
    state.temp.purVolumeTerm = cloneDeep(record.purVolumeTerm);
    state.temp.remark = cloneDeep(record.remark);
    for (let item of state.tableData) {
      if (record.id == item.id) {
        item.showEdit = true;
      } else {
        item.showEdit = false;
      }
    }
  };
  // 子表行编辑
  const childEditClick = (record) => {
    state.childTemp.accountPeriod = cloneDeep(record.accountPeriod);
    record.childEdit = !record.childEdit;
  };
  //  子表行保存
  const childConfirm = async (record) => {
    const params = {
      ...record,
    };
    params.accountPeriod = state.childTemp.accountPeriod;
    state.saveLoading = true;
    // const { code } = await updateChild(params);
    try {
      // if (code == 0) {
      //   message.success('修改成功');
      //   record.childEdit = !record.childEdit;
      //   state.saveLoading = false;
      //   queryList();
      // }
    } catch (error) {
      console.log(error);
      state.saveLoading = false;
    }
  };
  // 子表行取消
  const childCancel = (record) => {
    record.childEdit = !record.childEdit;
  };

  //行保存
  const confirm = async (record) => {
    state.saveLoading = true;
    const param = reactive({
      id: record.id,
      creditLevel: state.temp.creditLevel,
      receivableCustomerFlag: state.temp.receivableCustomerFlag,
      creditLimit: state.temp.creditLimit,
      volumeLimit: state.temp.volumeLimit,
      reagentTerm: state.temp.reagentTerm,
      consumerGoodsTerm: state.temp.consumerGoodsTerm,
      spdConsumerGoodsTerm: state.temp.spdConsumerGoodsTerm,
      deviceTerm: state.temp.deviceTerm,
      maintainSrvFeeTerm: state.temp.maintainSrvFeeTerm,
      techSrvFeeTerm: state.temp.techSrvFeeTerm,
      purVolumeTerm: state.temp.purVolumeTerm,
      remark: state.temp.remark,
    });
    try {
      // const { code } = await updateCredit(param);
      // if (code == 0) {
      //   message.success('修改成功');
      //   record.showEdit = false;
      //   state.saveLoading = false;
      //   queryList();
      // }
    } catch (error) {
      console.log(error);
      state.saveLoading = false;
    }
  };
  //行取消
  const cancel = (record) => {
    record.showEdit = false;
  };
  const getDictionary = async () => {
    const params = ['YS_CUST_CREDIT_LEVEL'];
    // const { data } = await getDictionaryList(params);
    // state.creditList = data['YS_CUST_CREDIT_LEVEL'].dictValueList;
    const formRef = dynamicTableInstance.getQueryFormRef() as TableSearchFormInstance;
    // formRef.formModel.companyCodes = state?.companyList[0]?.mgrCorpId;
    formRef.updateSchema({
      field: 'receivableCustomerFlag',
      componentProps: {
        options: state.customerFlagList,
      },
    });
    searchList();
  };
  //初始化页面字典和下拉数据
  const initDic = () => {
    // state.companyList.push(userStore?.userInfo);
    getDictionary();
  };
  onMounted(() => {
    initDic(); //初始化页面字典
  });
</script>

<style lang="less" scoped>
  .import-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .import-tip {
    border-left: 4px solid var(--ant-primary-color);
    padding-left: 8px;
    height: 14px;
    line-height: 14px;
  }
  .import-log {
    display: flex;
    justify-content: center;
    margin-bottom: 11px;
  }
  .import-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .error-info {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  :deep(.tool-bar) {
    margin-top: 0px !important;
  }
  :deep(.xc-header-table-search) {
    padding: 0px !important;
  }
  :deep(.ant-modal-body) {
    padding: 16px 16px 32px 16px !important;
  }
  .custom-modal :deep(.ant-modal-body) {
    padding: 16px;
    padding-bottom: 16px;
  }
  :deep(.ant-table .ant-table-container .ant-table-tbody) {
    overflow: auto;
  }

  // :deep(.ant-table ) {
  //     height:100%;
  //     // overflow-y: auto;
  //     overflow:hidden !important;
  //   }
  // :deep(.ant-table .ant-table-tbody) {
  //   height: 100%;
  //   overflow: hidden;
  // }
  // :deep(.ant-table-container) {
  //   width: 300px;
  // }
</style>
