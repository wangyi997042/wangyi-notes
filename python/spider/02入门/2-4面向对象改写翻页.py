import requests

class SogouSpider:
    def __init__(self):
        self.url = 'http://www.sogou.com/web'
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        }

    def get_html(self, word, page):
        # Sogou 翻页参数为 'page'，第一页为1，第二页为2...
        payload = {
            'query': word,
            'page': page
        }
        response = requests.get(self.url, headers=self.headers, params=payload)
        print("使用的User-Agent:", self.headers["User-Agent"])
        print("响应状态码:", response.status_code)
        return response.content

    def save_html(self, word, page, content):
        filename = f'{word}第{page}页.html'
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"已保存为 {filename}")

    def run(self):
        word = input("输入要搜索的内容：")
        page = input("第几页：")
        html_bytes = self.get_html(word, page)
        html_str = html_bytes.decode('utf-8')
        self.save_html(word, page, html_str)

if __name__ == '__main__':
    spider = SogouSpider()
    spider.run()