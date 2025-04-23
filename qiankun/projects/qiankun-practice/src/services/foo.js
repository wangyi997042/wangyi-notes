
import requestApi from '@/utils/request';

export async function queryUserInfo() {
  return requestApi('/foo/users', {
    method: 'GET',
    server: 'oa',
  });
}
export async function queryBar() {
  return requestApi('/bar/users', {
    method: 'GET',
    server: 'oa',
  });
}