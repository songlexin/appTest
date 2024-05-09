<template>
  <span v-if="state.prv.cname && state.city.cname && state.area.cname">{{
    `${state.prv.cname}${state.city.cname}${state.area.cname}`
  }}</span>
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
    prv: {} as any,
    city: {} as any,
    area: {} as any,
    loading: false,
  });
  // const loading = ref(false);
  // 加载区域
  async function queryAreaList(pid) {
    try {
      const areaId = pid == undefined || pid === '' ? '0' : pid;
      // emit('change', true);
      const { data } = await getAreaList(areaId);

      if (areaId === '0') {
        state.areaOptions = data;
        state.areaOptions.forEach((item) => (item.isLeaf = false));
      } else if (areaId.length == 2) {
        const target = state.areaOptions.find((item) => item.id === areaId);
        target.children = data;
        target.children.forEach((item) => (item.isLeaf = item.id.length == 6));

        state.prv = target;
      } else if (areaId.length == 4) {
        const prov = state.areaOptions.find((item) => item.id === areaId.substring(0, 2));
        const target = prov.children.find((item) => item.id === areaId);
        target.children = data;
        state.city = target;
        target.children.forEach((item) => (item.isLeaf = item.id.length == 6));
        const newarea = target.children.find((item) => props.addrCode == item.id);
        state.area = newarea;
      }
    } catch (_) {
    } finally {
      // loading.value = false;
      // emit('change', false);
    }
  }

  // const emit = defineEmits(['change']);
  // 初始化加载
  onMounted(() => {
    queryAreaList('0');
  });
</script>
<style lang="less" scoped></style>
