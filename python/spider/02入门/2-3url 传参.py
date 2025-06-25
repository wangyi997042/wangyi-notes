
import requests
'''
https://www.baidu.com/s?
wd=%E6%98%A5%E8%8A%82
&rsv_spt=1
&rsv_iqid=0x98479a0200cce456
&issp=1&f=8&rsv_bp=1
&rsv_idx=2&ie=utf-8
&tn=baiduhome_pg
&rsv_dl=ib
&rsv_enter=1
&rsv_sug3=13
&rsv_sug1=3
&rsv_sug7=100

https://www.baidu.com/s?wd=%E6%98%A5%E8%8A%82
'''

# if __name__ == '__main__':
#     url = 'http://www.baidu.com/s'
#     word = input("输入内容：")
#     payload = {
#         'wd': f'{word}',
#     }
#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
#     }
#     response = requests.get(url, headers=headers, params=payload)
#     print("使用的User-Agent:", headers["User-Agent"])
#     print("响应状态码:", response.status_code)
#
#     str_bytes = response.content
#     str_data = str_bytes.decode('utf-8')
#     with open(f'{word}.html', 'w', encoding='utf-8') as f:
#         f.write(str_data)

'''
搜狗的案例
https://www.sogou.com/web?query=%E7%BE%8E%E9%A3%9F
https://www.sogou.com/web?query=%E7%BE%8E%E9%A3%9F&page=2 翻页
'''

if __name__ == '__main__':
    url = 'http://www.sogou.com/web'
    word = input("输入要搜索的内容：")
    page = input("第几页：")
    payload = {
        'query': f'{word}',
        page: page
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    }
    response = requests.get(url, headers=headers, params=payload)
    print("使用的User-Agent:", headers["User-Agent"])
    print("响应状态码:", response.status_code)

    str_bytes = response.content
    str_data = str_bytes.decode('utf-8')
    with open(f'{word}第{page}页.html', 'w', encoding='utf-8') as f:
        f.write(str_data)
    # print(response.content)  # 可根据需要打印内容