/* eslint-disable */
//如果热跟新失败 重启
const common = {
  '@font-size-base': '14px',
  '--xc-test': '400',
  '@text-color': '#323232',
  '--xc-N1-color': '#f7f8fa', // 背景色
  '--xc-N2-color': '#f2f3f5', // 背景色
  '--xc-N3-color': '#ebedf0', // 边框，线色
  '--xc-N4-color': '#dcdee0', // 边框，线色
  '--xc-N5-color': '#c8c9cc', // 提示文字、disabled
  '--xc-N6-color': '#969799', // 文字色 辅助 说明文字
  '--xc-N7-color': '#646566', //文字色 主文字色
  '--xc-N8-color': '#323232', //文字色
  '--xc-cm1-color': '#edfaf9', // 列表悬停色
  '--xc-cm2-color': '#d0eae8', // 列表选中色
  '--xc-cm3-color': '#98d7d2', // 未定
  '--xc-cm4-color': '#30b6aa', // 按钮悬停色
  '--xc-cm5-color': '#0f998d', // 主题色
  '--xc-cm6-color': '#28524f', //按钮 点击色
};
const colorList = [
  {
    title: '明青',
    key: 'cyan',
    value: '#0F998D',
    variables: {
      '@primary-color': '#0F998D',
      '@text-selection-bg': '#1890ff',
      '--xc-cm1-color': '#edfaf9', // 列表悬停色
      '--xc-cm2-color': '#d0eae8', // 列表选中色
      '--xc-cm3-color': '#98d7d2', // 未定
      '--xc-cm4-color': '#30b6aa', // 按钮悬停色
      '--xc-cm5-color': '#0f998d', // 主题色
      '--xc-cm6-color': '#28524f', //按钮 点击色
    },
  },
  {
    title: '拂晓蓝（默认）',
    key: 'daybreak',
    variables: {
      '@primary-color': 'rgb(24, 144, 255)',
      '--xc-test': '800',
    },
  },
  {
    title: '薄暮',
    key: 'dust',
    variables: {
      '@primary-color': 'rgb(245, 34, 45)',
    },
  },
  {
    title: '火山',
    key: 'volcano',
    variables: {
      '@primary-color': 'rgb(250, 84, 28)',
    },
  },
  {
    title: '日暮',
    key: 'sunset',
    variables: {
      '@primary-color': 'rgb(250, 173, 20)',
    },
  },
  {
    title: '极光绿',
    key: 'green',
    variables: {
      '@primary-color': 'rgb(82, 196, 26)',
    },
  },
  {
    title: '极客蓝',
    key: 'geekblue',
    variables: {
      '@primary-color': 'rgb(47, 84, 235)',
    },
  },
  {
    title: '酱紫',
    key: 'purple',
    variables: {
      '@primary-color': 'rgb(114, 46, 209)',
    },
  },
];
// 根据主题key 获取
const getThemeConfBykey = (themeKey) => {
  const retObj = colorList.find(
    (x) => x.key === themeKey || x.variables['@primary-color'] === themeKey,
  );
  if (!retObj) {
    return;
  }
  retObj.value = retObj.variables['@primary-color'];
  retObj.variables = {
    ...common,
    ...retObj.variables,
  };
  return retObj;
};
const defaultObject = getThemeConfBykey('cyan');
const getKeys = Object.keys(defaultObject.variables);
const themesKeys = colorList.map((x) => x.key);

const setThemeVar = (obj) => {
  Reflect.ownKeys(obj).forEach((key) => {
    if (key.startsWith('--')) {
      document.body.style.setProperty(key, obj[key]);
    }
  });
};
function setThemeColor(theme) {
  const themeObj = getThemeConfBykey(theme);
  const cssObj = Object.assign(
    {},
    themeObj?.variables || {
      '@primary-color': theme,
    },
  );
  setThemeVar(cssObj);
  window.less.modifyVars(cssObj).catch((error) => {
    console.error(`Failed to update theme`);
  });
}

// 纯粹的颜色配置  无css/less变量信息
const colorInfoList = colorList.map((x) => {
  const retb = {
    ...x,
    value: x.variables['@primary-color'],
    variables: {},
  };
  Reflect.deleteProperty(retb, 'variables');
  return retb;
});
//获取默认的颜色配置
const getDefaultColorSet = () => defaultObject.variables;

module.exports = {
  getKeys,
  setThemeColor,
  getThemeConfBykey,
  colorInfoList,
  getDefaultColorSet,
  themesKeys,
};
