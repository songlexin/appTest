// import { type ColumnType } from 'ant-design-vue/es/table';
const _money = (opt?: any) => {
  return {
    
    width: opt?.width || '80px',
    align:"right",
    customRender({ text }) {
      return <div class="text-right ">{renderMoney(text)}</div>;
    },
    ellipsis: true,
    resizable: true,
    ...opt,

  };
};

export const renderMoney = (text) => {
  const result = (
    <span>
      {text
        ? parseFloat(text)
            ?.toFixed?.(2)
            ?.replace?.(/\B(?=(\d{3})+(?!\d))/g, ',')
        : '0.00'}
    </span>
  );
  return result;
};
export const money = Object.assign(_money, {
  renderMoney,
});
