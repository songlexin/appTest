import { toRaw } from 'vue';
import { Tag } from 'ant-design-vue';
import { useEventbus } from '@/hooks/useEventbus';
import { omit } from 'lodash-es';
import moment from 'moment';
import { reactive, onBeforeMount } from 'vue';
import { getDictValueByDictEname } from '@/api/basic/common';
import { useUserStore } from '@/store/modules/user';
import * as API from '@/api/qualifications/goodsOverview';

const userInfo = useUserStore().userInfo;
const eventBus = useEventbus();
// 组装list
const baseRender = (list, textfn) => {
  if (!list) {
    return <span></span>;
  }
  list = Array.isArray(list) ? list : [list];
  return <>{list.map((item) => textfn(item))}</>;
};
const validDay = (item) => {
  if (!item.expdtBeginDate) {
    return '';
  }
  return `${item?.expdtBeginDate?.split(' ')[0] || '-'} 至 ${
    item?.expdtEndDate?.split(' ')[0] || '-'
  }`;
};

// 基础button渲染
const getDictName = (id, dictArray) => {
  let dict = dictArray.find((o) => o.id == id);
  return dict?.name || '';
};
const validExpdtDate = (item) => {
  let expdtEndDate = moment(item.expdtEndDate);
  let now = moment();
  return item.isValiding === '1'
    ? 'long-valid'
    : expdtEndDate.isBefore(now)
    ? 'expired'
    : expdtEndDate.subtract(1, 'months').isBefore(now)
    ? 'expiring'
    : '';
};
const btnType = (expdtEndDate) => {
  if (moment(expdtEndDate).isBefore(moment())) {
    return 'warning';
  } else {
    return 'primary';
  }
};
const tagType = (index) => {
  let type = '';
  switch (index % 5) {
    case 0:
      break;
    case 1:
      type = 'success';
      break;
    case 2:
      type = 'info';
      break;
    case 3:
      type = 'warning';
      break;
    case 4:
      type = 'danger';
      break;
    default:
      break;
  }
  return type;
};

const tagTypeColor = (index) => {
  const ind = index % 5;
  return ['blue', 'green', 'cyan', 'orange', 'red'][ind];
};

export const useCertificateTools = (cb = () => {}) => {
  const state = reactive({
    certKinds: [], //注册证
    coCertKinds: [], // 公司证件类型
    hosList: [],
  });
  const getHosByPrvdAsync = async (isCache = true) => {
    if (isCache && state.hosList.length) {
      return state.hosList;
    }
    const params = {
      provId: userInfo.mgrCorpId,
    };
    const { data } = await API.getHosProvList(params);
    state.hosList = data;
    return data;
  };
  onBeforeMount(async () => {
    const { data } = await getDictValueByDictEname('ZCZLX');
    state.certKinds = data && data.map((item) => ({ id: item.val, name: item.ename }));
    const res = await getDictValueByDictEname('ZZLX');
    state.coCertKinds = res.data && res.data.map((item) => ({ id: item.val, name: item.ename }));
    await getHosByPrvdAsync();
    cb && cb();
  });
  const getHosList = () => {
    return state.hosList;
  };
  const getValidColor = (item) => {
    const expiredStr = validExpdtDate(item);
    const mapColor = {
      'long-valid': 'green',
      expired: '#EB0000',
      expiring: 'orange',
      default: 'blue',
    };
    return mapColor[expiredStr] || mapColor.default;
  };
  const buttonRender = (textfn, attr) => {
    return (item) => {
      // 绑定item
      const color = getValidColor(item);
      const resAttr = omit(attr, 'onClick');
      return (
        <>
          <Tag class="normal-class" color={color} {...resAttr} onClick={() => attr.onClick(item)}>
            {' '}
            {textfn(item)}{' '}
          </Tag>{' '}
          <br />
        </>
      );
    };
  };

  const goodsCertList = (list: [] | object) => {
    const attr = {
      onClick: (item) => {
        eventBus.customEmit('cert-preview-image', item);
      },
      type: 'primary',
    };
    const renderContent = (item) =>
      `${getCertKindName(item.certKind)} ${item.certKind ? ':' : ''}${item.certCode}(${validDay(
        item,
      )})`;
    const buttonTextFn = buttonRender(renderContent, attr); // 渲染button
    return baseRender(toRaw(list), buttonTextFn);
  };
  const commonCertList = (list: [] | object) => {
    const attr = {
      onClick: (item) => {
        eventBus.customEmit('cert-preview-image', { ...item });
      },
      type: 'primary',
    };
    const renderContent = (item) => `${item.certCode}(${validDay(item)})`;
    const buttonTextFn = buttonRender(renderContent, attr); // 渲染button
    return baseRender(toRaw(list), buttonTextFn);
  };
  const dateFormatter = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };
  const getCertKindName = (id) => {
    return getDictName(id, state.certKinds);
  };
  const getCoCertKindName = (id) => {
    return getDictName(id, state.coCertKinds);
  };

  return {
    tagType, // tag类型
    btnType, // 按钮类型
    dateFormatter, // 日期格式化
    getCertKindName, // 字典映射
    getCoCertKindName, // 字典映射
    goodsCertList, // render
    commonCertList, // render
    validExpdtDate,
    getHosList,
    getHosByPrvdAsync,
    tagTypeColor,
  };
};
