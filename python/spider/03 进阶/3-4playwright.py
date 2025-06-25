

# 本质上就是模拟浏览器


"""

'''
Playwright 爬虫自动化详细示例

本示例涵盖：
- 启动浏览器（无头/有头）
- 页面跳转与等待
- 元素选择与操作（点击、输入、获取文本/属性）
- 截图与 PDF 导出
- Cookie 操作
- 请求头设置
- 代理设置
- 拦截与过滤请求
- 多页面/多标签操作
- 异步用法
'''

from playwright.sync_api import sync_playwright

def sync_example():
    with sync_playwright() as p:
        # 启动浏览器（可选 headless=False 显示浏览器窗口）
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        # 设置 Cookie
        context.add_cookies([{
            "name": "testcookie",
            "value": "testvalue",
            "domain": ".baidu.com"
        }])

        # 新建页面
        page = context.new_page()

        # 设置请求头
        page.set_extra_http_headers({"User-Agent": "MySpider/1.0"})

        # 跳转页面并等待元素加载
        page.goto("https://www.baidu.com")
        page.wait_for_selector("input#kw")

        # 输入内容并点击搜索
        page.fill('input#kw', 'Playwright 爬虫')
        page.click('input#su')

        # 等待搜索结果出现
        page.wait_for_selector('div.result')

        # 获取所有搜索结果标题
        titles = page.locator('h3.t').all_text_contents()
        print("搜索结果标题：", titles)

        # 获取第一个结果的链接
        first_link = page.locator('h3.t > a').first.get_attribute('href')
        print("第一个结果链接：", first_link)

        # 截图
        page.screenshot(path="baidu_search.png")
        print("已保存截图 baidu_search.png")

        # 导出 PDF（部分网站可能不支持）
        # page.pdf(path="baidu_search.pdf")

        # 获取 Cookie
        cookies = context.cookies()
        print("当前 Cookie：", cookies)

        # 新标签页操作
        page2 = context.new_page()
        page2.goto("https://www.example.com")
        print("新标签页标题：", page2.title())
        page2.close()

        # 拦截请求（如屏蔽图片加载）
        def block_images(route, request):
            if request.resource_type == "image":
                route.abort()
            else:
                route.continue_()
        page.route("**/*", block_images)

        # 代理设置（需在 launch 时指定）
        # browser = p.chromium.launch(proxy={"server": "http://127.0.0.1:8080"})

        browser.close()

# 异步用法示例
import asyncio
from playwright.async_api import async_playwright

async def async_example():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://www.python.org")
        await page.wait_for_selector("a.button")
        btn_text = await page.inner_text("a.button")
        print("按钮文本：", btn_text)
        await browser.close()

if __name__ == '__main__':
    print("=== 同步示例 ===")
    sync_example()
    print("=== 异步示例 ===")
    asyncio.run(async_example())

"""

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # 可选 headless=False 显示浏览器
    page = browser.new_page()
    page.goto("https://www.baidu.com")
    print(page.title())
    print(page.content())
    browser.close()