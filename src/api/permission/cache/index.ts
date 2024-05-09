import { request } from './../../../utils/request';

// 缓存监控
export function getStatistics(data) {
  return request({
    url: `/${data.meta}/cacheMonitor/getStatistics`,
    method: 'post',
    data,
  });
}

//缓存监控-查询cache对应的keys
export function getCacheKeys(data: any) {
  return request({
    url: `/${data.meta}/cacheMonitor/getCacheKeys`,
    method: 'post',
    data,
  });
}

//缓存监控-一键清除所有key
export function clearAll(data: any) {
  return request({
    url: `/${data.meta}/cacheMonitor/clearAll`,
    method: 'post',
    data,
  });
}
//缓存监控-清单个key
export function evict(data) {
  return request({
    url: `/${data.meta}/cacheMonitor/evict`,
    method: 'post',
    data,
  });
}
//缓存监控-查询cacher的key对应value
export function getKeyValue(data) {
  return request({
    url: `/${data.meta}/cacheMonitor/getKeyValue`,
    method: 'post',
    data,
  });
}
