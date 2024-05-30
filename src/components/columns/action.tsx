export const action = (title: string, render, width = '100px') => {
  return {
    title,
    dataIndex: 'action',
    width,
    ellipsis: true,
    resizable: true,

    customRender({ record }) {
      return render(record);
    },
  };
};
