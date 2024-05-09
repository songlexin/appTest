/**
 * 通过文件路径直接下载文件并重命名
 * @param filePath 文件路径
 * @param fileName 文件名
 */
export const useFilePathDownload = (filePath: string, fileName: string) => {
  const x = new XMLHttpRequest();
  x.open('GET', filePath, true);
  x.responseType = 'blob';
  x.onload = function (_e) {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = fileName;
    a.click();
    a.remove();
  };
  x.send();
};
