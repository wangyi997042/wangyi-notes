
import requests

from lxml import etree

import pandas

if __name__ == '__main__':
  # url = 'https://juejin.cn/following'
  # url = 'https://www.macbl.com/article'
  url = 'https://www.qidian.com/all/'
  headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    # 'cookie': '_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227436208812568626723%2522%252C%2522user_unique_id%2522%253A%25227436208812568626723%2522%252C%2522timestamp%2522%253A1731377308373%257D; sid_guard=3de7685822438fc1ef6499537e7f0133%7C1732867559%7C31536000%7CSat%2C+29-Nov-2025+08%3A05%3A59+GMT; uid_tt=b5f48d2b0d19ae7b41d92b3bb122e298; uid_tt_ss=b5f48d2b0d19ae7b41d92b3bb122e298; sid_tt=3de7685822438fc1ef6499537e7f0133; sessionid=3de7685822438fc1ef6499537e7f0133; sessionid_ss=3de7685822438fc1ef6499537e7f0133; is_staff_user=false; sid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; ssid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; store-region=cn-hk; store-region-src=uid; passport_csrf_token=c71a450ab0b5fb193ea6f7ab904cfd4b; passport_csrf_token_default=c71a450ab0b5fb193ea6f7ab904cfd4b; s_v_web_id=verify_mba51s6p_PwDkkQLj_EZc5_4K9Q_80HI_7RGYoHBR1wJ8',
    'cookie':'newstatisticUUID=1734654438_972221583; _csrfToken=5JNUjw5KtjRGAdnyl21crmRJSFaxWFW0c9LQhShf; fu=1044365192; supportWebp=true; supportwebp=true; _gid=GA1.2.1423334767.1750757321; seo-jump-referrer=https%3A//www.google.com/; traffic_utm_referer=; Hm_lvt_f00f67093ce2f38f215010b699629083=1750757319,1750839097; Hm_lpvt_f00f67093ce2f38f215010b699629083=1750839097; HMACCOUNT=527C126AFD14FC83; _gat_gtag_UA_199934072_2=1; _ga_FZMMH98S83=GS2.1.s1750839097$o5$g0$t1750839097$j60$l0$h0; _ga=GA1.1.44803613.1734654444; _ga_PFYW0QLV3P=GS2.1.s1750839097$o5$g0$t1750839097$j60$l0$h0; w_tsfp=ltvuV0MF2utBvS0Q7Krhl0KvFzkncj04h0wpEaR0f5thQLErU5mA0Y55t8r2MX3X58xnvd7DsZoyJTLYCJI3dwMdQcyQJopC3QuZw4En3IwdV0ZnFpuPWAIaJ7IhvzYUKXhCNxS00jA8eIUd379yilkMsyN1zap3TO14fstJ019E6KDQmI5uDW3HlFWQRzaLbjcMcuqPr6g18L5a5Wvb5Vn/LA59CrxD10zD3H0YD34ltxi8Jr0JPRqqJpz8SqA=',
  }

  response = requests.get(url, headers=headers)

  res_data = response.content.decode("utf-8")
  # print(res_data)

  html = etree.HTML(res_data)
  #
  # print(type(html), html)
  #
  titles = html.xpath('//div[@class="book-mid-info"]/h2/a/text()')
  images = html.xpath('//div[@class="book-img-box"]/a/img/@src')
  detail_url = html.xpath('//div[@class="book-img-box"]/a/@href')

  # print(type(detail_url), detail_url)
  df = pandas.DataFrame()
  df['标题'] = titles
  df['图片'] = images
  df['详情地址'] = detail_url

  df.to_csv('起点网.csv', index=False, encoding='utf-8')



