/**
 * 适应现场复杂情况转接文件URL
 * @param baseUrl 需要拼接的url
 * @returns {string} 拼接后的url
 * public下env的VUE_APP_BASE_API_FILE需要写 http://如果仅写一个单词会拼接 BASE_URL
 */

export function convertUrl(baseUrl: string): string {
  // @ts-ignore
  return (VUE_APP_BASE_API_FILE || import.meta.env.VUE_APP_BASE_API_FILE) + baseUrl;
}
