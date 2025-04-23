import { request } from 'umi';
import { message } from 'antd';

function requestApi(url, params) {
  return request(url, params).then(({ result, content, reason }) => {
    if (result === 'success') {
      return Promise.resolve(content);
    }

    message.error(reason);

    return Promise.reject(reason);
  });
}

export default requestApi;
