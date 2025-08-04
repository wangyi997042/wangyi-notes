
'''
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # 可选 headless=False 显示浏览器
    # context = browser.new_context()
    page = browser.new_page()

    # page = context.new_page()

    page.goto("https://www.baidu.com")

    page.fill('input#kw', '北京')
    page.click('//input[@id="su"]')

    print(page.content())

    # browser.close()

'''


# 抓取电商数据
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # 可选 headless=False 显示浏览器
    page = browser.new_page()

    page.goto("https://www.suning.com/")

    # 输入搜索关键词
    page.fill('input#q', '手机')
    page.click('//input[@id="searchSubmit"]')

    # 等待页面加载完成
    page.wait_for_load_state('networkidle')

    # 获取搜索结果
    results = page.query_selector_all('.item.J_MouserOnverReq')

    for result in results:
        title = result.query_selector('.title').inner_text()
        price = result.query_selector('.price').inner_text()
        print(f'商品: {title}, 价格: {price}')

    # browser.close()