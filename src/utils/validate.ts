/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const checkPhoneNum = (phone) => {
  let patt = /^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/;
  return patt.test(phone);
};
