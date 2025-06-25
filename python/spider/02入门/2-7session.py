import requests

# 创建 Session 对象，可以自动保持 Cookie 等信息
session = requests.Session()

# 设置通用 headers
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
})

# 第一次请求（如登录或获取 Cookie）
login_url = "https://httpbin.org/cookies/set/sessioncookie/123456"
session.get(login_url)

# 第二次请求，自动携带上一次的 Cookie
test_url = "https://httpbin.org/cookies"
response = session.get(test_url)

print("响应状态码:", response.status_code)
print("响应内容:", response.text)
print("当前 Session 的 Cookie:", session.cookies.get_dict())