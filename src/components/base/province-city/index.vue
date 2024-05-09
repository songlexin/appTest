<template>
  <a-cascader
    :value="state.list"
    :options="state.areaOptions"
    :field-names="state.areaFieldNames"
    :load-data="loadAreaList"
    change-on-select
    placeholder="请选择"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
  import { nextTick, reactive, onMounted, watch } from 'vue';
  import { getAreaList } from './../../../api/basic/common';
  const props = defineProps({
    addrCode: {
      type: String,
      required: false,
    },
  });
  watch(
    () => props,
    async () => {
      await nextTick();
      if (props.addrCode) {
        if (!state.areaOptions.length) {
          await queryAreaList('0');
        }
        state.list[0] = props.addrCode.substring(0, 2);
        state.list[1] = props.addrCode.substring(0, 4);
        await queryAreaList(state.list[0]);
        await queryAreaList(state.list[1]);
        state.list[2] = props.addrCode;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
  const state = reactive({
    list: [] as any[],
    areaOptions: [] as any[], //地区选项
    areaFieldNames: {
      label: 'cname',
      value: 'id',
      children: 'children',
    },
    prv: '',
    city: '',
    area: '',
    areatext: '',
  });
  // 根据选择框加载loadAreaList
  async function loadAreaList(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const res = await getAreaList(targetOption.id);
    targetOption.children = res.data;
    targetOption.children.forEach((item) => (item.isLeaf = item.id.length == 6));
  }

  // 加载区域下拉框
  async function queryAreaList(pid) {
    try {
      const areaId = pid == undefined || pid === '' ? '0' : pid;
      const { data } = await getAreaList(areaId);
      if (areaId === '0') {
        state.areaOptions = data;
        state.areaOptions.forEach((item) => (item.isLeaf = false));
      } else if (areaId.length == 2) {
        const target = state.areaOptions.find((item) => item.id === areaId);
        target.children = data;
        target.children.forEach((item) => (item.isLeaf = item.id.length == 6));
        state.prv = target.cname;
      } else if (areaId.length == 4) {
        const prov = state.areaOptions.find((item) => item.id === areaId.substring(0, 2));
        const target = prov.children.find((item) => item.id === areaId);
        target.children = data;
        state.city = target.cname;

        target.children.forEach((item) => (item.isLeaf = item.id.length == 6));
        const newarea = target.children.find((item) => props.addrCode == item.id);
        state.area = newarea.cname;
        await changeArea();
      }
    } catch (_) {}
  }
  const handleChange = async (e) => {
    state.list = e;

    emit('change', e);
  };
  const changeArea = () => {
    state.areatext = `${state.prv}${state.city}${state.area}`;
    emit('changeArea', state.areatext, state.prv, state.city, state.area);
  };

  const emit = defineEmits(['change', 'changeArea']);
  // 初始化加载
  onMounted(() => {
    queryAreaList('0');
  });
</script>
<style lang="less" scoped></style>
