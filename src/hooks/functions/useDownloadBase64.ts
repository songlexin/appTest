import { message } from 'ant-design-vue';
//base64文件下载下载
export const base64DownloadFile = (fileName, content) => {
  if (!isBase64(content)) {
    message.error(`当前文件不是base64编码，无法下载！`);
    throw new Error('当前文件不是base64编码，无法下载！');
    return;
  }
  const aLink = document.createElement('a');
  const blob = base64ToBlob(content); //new Blob([content]);

  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  aLink.click();
};
//base64图片预览
export const base64ImgPreview = (content) => {
  if (!isBase64(content)) {
    message.error(`当前图片不是base64编码，无法预览！`);
    throw new Error('当前图片不是base64编码，无法预览!');
    return;
  }
  //   const type = 'image/jpg';
  const conversions = base64ToBlob(content); // 调用base64转图片方法----vue写法
  // window.URL = window.URL || window.webkitURL; //blob对象转换为blob-url
  return window.URL.createObjectURL(conversions);
};
//base64转blob
const base64ToBlob = (code) => {
  const parts = code.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

const isBase64 = (str) => {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    const parts = str.split(';base64,');
    return window.btoa(window.atob(parts[1])) == parts[1];
  } catch (err) {
    return false;
  }
};
