export const text = (title: string, dataIndex: string, width = '120px') => {
  return {
    title,
    dataIndex,
    width,
    ellipsis: true,
    resizable: true,
  };
};
