export function usePrice() {
  const getPrice = (price, num = 4) => {
    let result = '0';
    // if (price === 0) {
    //   return 0;
    // }
    if (price || price === 0) {
      result = Number(price).toFixed(num);
    }
    return result;
  };
  return { getPrice };
}
