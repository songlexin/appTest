/* form校验util*/
export const formatNum = (val: string, preVal: string) => {
  const reg = /^-?\d*(\.\d*)?$/;
  if ((!isNaN(+val) && reg.test(val)) || val === '' || val === '-') {
    return val;
  } else {
    return preVal;
  }
};
