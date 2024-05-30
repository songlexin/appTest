import * as R from 'ramda';
export const map = R.curry((fn, opt) => {
  return {
    ...opt,
    customRender(arg) {
      return opt.customRender({
        ...arg,
        text: fn(arg.record),
      });
    },
  };
});
