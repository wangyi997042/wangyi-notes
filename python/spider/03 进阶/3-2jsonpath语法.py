
import requests
import pandas

import jsonpath as jsonp

if __name__ == '__main__':
  url = 'https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7436208812568626723&spider=0'

  headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    "cookie": "_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227436208812568626723%2522%252C%2522user_unique_id%2522%253A%25227436208812568626723%2522%252C%2522timestamp%2522%253A1731377308373%257D; sid_guard=3de7685822438fc1ef6499537e7f0133%7C1732867559%7C31536000%7CSat%2C+29-Nov-2025+08%3A05%3A59+GMT; uid_tt=b5f48d2b0d19ae7b41d92b3bb122e298; uid_tt_ss=b5f48d2b0d19ae7b41d92b3bb122e298; sid_tt=3de7685822438fc1ef6499537e7f0133; sessionid=3de7685822438fc1ef6499537e7f0133; sessionid_ss=3de7685822438fc1ef6499537e7f0133; is_staff_user=false; sid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; ssid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; store-region=cn-hk; store-region-src=uid; csrf_session_id=38418265aa52d9839ceda21eed9abb23; passport_csrf_token=c71a450ab0b5fb193ea6f7ab904cfd4b; passport_csrf_token_default=c71a450ab0b5fb193ea6f7ab904cfd4b"
  }
  data = {
    "id_type":2,
    "client_type":2608,
    "sort_type":300,
    "cursor":"eyJ2IjoiNzUxOTQ1NDM2MzgyNTIwOTM4MyIsImkiOjIwfQ==",
    "limit":20
  }

  response = requests.post(url, headers=headers, data=data)

  # json_data = response.text
  #
  # py_data = json.loads(json_data)
  py_data = response.json()

  res = jsonp.jsonpath(py_data, '$.data[*].item_info.article_info')
  # print(res)

  title_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.article_info.title')
  content_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.article_info.brief_content')
  img_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.author_user_info.avatar_large')

  df = pandas.DataFrame()
  df['标题'] = title_list
  df['内容'] = content_list
  df['图片'] = img_list

  df.to_csv('掘金最新.csv',index=False, encoding='utf-8')