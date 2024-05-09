import commonApi from '@/api/common';
export function useTypeSelectList() {
  const getList = async (name) => {
    const result = await commonApi.getRecTypeList({ name });
    if (result.code == 0) {
      return result.data;
    }
    return null;
  };
  const getListMap = async (name) => {
    const result = await commonApi.getStockLevelEnum({ name });
    if (result.code == 0) {
      return result.data;
    }
    return null;
  };
  const getDictList = async (name) => {
    const result = await commonApi.dictList({ dictId: name });
    if (result.code == 0) {
      return result.data;
    }
    return null;
  };
  const getListDictMap = async (name) => {
    const result = await commonApi.enumMap({ name });
    if (result.code == 0) {
      return result.data;
    }
    return null;
  };
  return { getList, getListMap, getDictList, getListDictMap };
}
