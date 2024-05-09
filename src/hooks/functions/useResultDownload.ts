//导出
export const useDownloadExcel = async (params, callback, fileName) => {
  try {
    const res = await callback(params);
    const blob = new Blob([res], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8 ',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (_) {}
};
