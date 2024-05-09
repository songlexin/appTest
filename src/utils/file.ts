// 获取文件类型
export function getFileType(fileName: string) {
  // 使用split分割文件名，并获取最后一部分
  const extension = fileName.split('.').pop() || '';

  // 转换为小写以进行不区分大小写的比较
  const lowerCaseExtension = extension.toLowerCase();

  switch (lowerCaseExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    case 'pdf':
      return 'pdf';
    case 'txt':
      return 'text';
    case 'xlsx':
      return 'excel';
    case 'doc':
    case 'docx':
      return 'word';
    default:
      return 'file';
  }
}
