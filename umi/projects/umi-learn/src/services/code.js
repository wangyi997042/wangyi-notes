import requestApi from '@/utils/request';

// 获取码表
export async function getCode() {
  return requestApi('/api/editor/product/code.json', {
    method: 'GET',
    server: 'oa',
  });
}