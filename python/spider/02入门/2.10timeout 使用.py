import requests

url = "https://httpbin.org/delay/3"  # 该接口会延迟3秒返回

try:
    # 设置超时时间为2秒，若2秒未响应则抛出异常
    response = requests.get(url, timeout=2)
    print("请求成功，状态码：", response.status_code)
except requests.exceptions.Timeout:
    print("请求超时！")
except Exception as e:
    print("其他异常：", e)