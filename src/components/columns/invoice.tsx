export const invoice = (title: string, dataIndex: string,) => {
  return {
    title,
    dataIndex,
    width:'200px',
    ellipsis: true,
    resizable: true,
  };
};
