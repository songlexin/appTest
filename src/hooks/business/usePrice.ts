export function usePrice() {
  const getPrice = (price, num = 4) => {
    let result = '';
    if (price) {
      result = Number(price).toFixed(num);
    }
    return result;
  };
  return { getPrice };
}
