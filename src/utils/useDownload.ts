import { showFailToast } from 'vant';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

/* 使用示例
 ** const host = `http://${window.location.host}`; // 应对生产或测试环境
 ** useDownload(host + url, '附件'); // url为文件地址
 */
export const useDownload = (href: string, fileName: string) => {
  const xhr = new XMLHttpRequest();
  xhr.open('get', href, true);
  xhr.responseType = 'blob'; // 返回类型blob  blob 存储着大量的二进制数据
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('token', userStore.token); // 添加toke下载文件
  xhr.setRequestHeader('X-APP-CODE', import.meta.env.VITE_APP_CODE);

  xhr.onerror = function (err) {
    console.log('XHR error');
    console.log(err);
    showFailToast(`导出失败！`);
  };
  xhr.onload = function () {
    if (this.status === 200) {
      const blob = this.response;
      // 若返回的是json类型
      if (xhr.getResponseHeader('Content-Type') == 'application/json;charset=utf-8') {
        const readerBlob: any = new FileReader();
        readerBlob.readAsText(blob, 'utf-8');
        readerBlob.onload = function () {
          const res = JSON.parse(readerBlob.result);
          showFailToast(res.msg);
        };
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
        reader.onload = function (e: any) {
          const a = document.createElement('a'); // 转换完成，创建一个a标签用于下载
          a.download = fileName;
          a.target = '_blank';
          a.href = String(e.target?.result) || '';
          document.body.appendChild(a); // 修复firefox中无法触发click
          a.click();
          document.body.removeChild(a); //释放之前创建的URL对象
          window.URL.revokeObjectURL(href);
        };
      }
    }
  };
  xhr.send(); // 发送ajax请求
};
