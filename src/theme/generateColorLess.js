const setColor = require('./setColor');
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
const options = {
  antDir: path.join(__dirname, '../../node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, '../styles/theme'),
  varFile: path.join(__dirname, '../styles/theme/variables.less'),
  mainLessFile: path.join(__dirname, '../styles/theme/index.less'),
  themeVariables: [...setColor.getKeys],
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, '../../public/color.less'),
};
generateTheme(options)
  .then(() => {})
  .catch((_) => {});
