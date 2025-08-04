# OCR 识别图片验证码详细总结

---

## 一、什么是 OCR？

OCR（Optical Character Recognition，光学字符识别）是一种将图片中的文字内容自动识别并转换为可编辑文本的技术。常用于自动识别图片验证码、扫描件、截图等场景。

---

## 二、验证码 OCR 识别的完整流程

1. **获取验证码图片**  
   - 通过 requests、selenium、playwright 等方式下载验证码图片。
2. **图片预处理（可选但推荐）**  
   - 灰度化、二值化、去噪、缩放、裁剪等，提高识别准确率。
3. **OCR 识别**  
   - 使用 OCR 库（如 Tesseract、PaddleOCR、百度云 OCR 等）识别图片内容。
4. **结果处理**  
   - 对识别结果进行正则过滤、去除干扰字符、大小写转换等。

---

## 三、主流 OCR 库与平台

### 1. Tesseract（开源，支持多语言）

- Python 封装库：`pytesseract`
- 安装：
    ```bash
    pip install pytesseract pillow
    # 需先安装 tesseract-ocr，Mac 可用 brew install tesseract，Win 可下载 exe 安装包
    ```
- 基本用法：
    ```python
    from PIL import Image
    import pytesseract

    img = Image.open('captcha.png')
    text = pytesseract.image_to_string(img)
    print("识别结果：", text)
    ```
- 指定识别字符集（如只识别数字）：
    ```python
    text = pytesseract.image_to_string(img, config='--psm 7 -c tessedit_char_whitelist=0123456789')
    ```

### 2. PaddleOCR（国产，支持中英文，效果好）

- 安装：
    ```bash
    pip install paddleocr
    pip install paddlepaddle  # CPU 或 GPU 版本
    ```
- 基本用法：
    ```python
    from paddleocr import PaddleOCR

    ocr = PaddleOCR(use_angle_cls=True, lang="ch")
    result = ocr.ocr('captcha.png', cls=True)
    for line in result:
        print("识别结果：", line[1][0])
    ```

### 3. 百度云 OCR（需注册百度智能云账号）

- 支持高精度识别、验证码专用接口
- 需获取 API Key 和 Secret Key，使用官方 SDK 或 requests 调用
- 示例（通用文字识别）：
    ```python
    from aip import AipOcr

    APP_ID = '你的AppID'
    API_KEY = '你的ApiKey'
    SECRET_KEY = '你的SecretKey'
    client = AipOcr(APP_ID, API_KEY, SECRET_KEY)

    with open('captcha.jpg', 'rb') as f:
        image = f.read()
    result = client.basicGeneral(image)
    print(result)
    ```

### 4. 第三方打码平台（如超级鹰、云打码）

- 适合复杂验证码（扭曲、干扰线、点选、滑块等）
- 需注册账号、充值，调用平台 API 上传图片识别

---

## 四、图片验证码识别完整示例

### 1. requests + pytesseract + Pillow

```python
import requests
from PIL import Image
import pytesseract

# 1. 下载验证码图片
url = "https://example.com/captcha.jpg"
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
with open("captcha.jpg", "wb") as f:
    f.write(response.content)

# 2. 打开图片并预处理
img = Image.open("captcha.jpg").convert("L")  # 灰度化
img = img.point(lambda x: 0 if x < 140 else 255)  # 简单二值化

# 3. OCR 识别
text = pytesseract.image_to_string(img, config='--psm 7')
print("识别结果：", text.strip())
```

### 2. selenium 自动化获取验证码并识别

```python
from selenium import webdriver
from PIL import Image
import pytesseract
import time

driver = webdriver.Chrome()
driver.get("https://example.com/login")
# 等待验证码加载
time.sleep(2)
# 截图整个页面
driver.save_screenshot("full.png")
# 定位验证码图片元素
captcha = driver.find_element("id", "captcha_img")
location = captcha.location
size = captcha.size
left = location['x']
top = location['y']
right = left + size['width']
bottom = top + size['height']
# 裁剪验证码区域
img = Image.open("full.png").crop((left, top, right, bottom))
img.save("captcha.png")
# OCR 识别
text = pytesseract.image_to_string(img)
print("验证码内容：", text)
driver.quit()
```

### 3. PaddleOCR 识别验证码

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang="en")
result = ocr.ocr('captcha.png', cls=True)
for line in result:
    print("识别结果：", line[1][0])
```

---

## 五、图片预处理技巧

- **灰度化**：`img.convert("L")`
- **二值化**：`img.point(lambda x: 0 if x < threshold else 255)`
- **去噪**：可用 OpenCV、Pillow 等方法
- **缩放**：`img.resize((w, h))`
- **裁剪**：`img.crop((left, upper, right, lower))`
- **自定义滤波**：如中值滤波、模糊等

> 预处理可大幅提升验证码识别准确率，具体方法需根据验证码样式调整。

---

## 六、验证码识别常见问题与应对

- **识别不准？**  
  尝试图片预处理、调整 OCR 配置、换用更强的 OCR 引擎。
- **复杂验证码（如扭曲、干扰线、点阵）？**  
  可用深度学习模型（如 PaddleOCR），或考虑人工打码平台。
- **验证码有滑块、点选、拼图等交互？**  
  需用 selenium/playwright 自动化配合图像处理或第三方打码平台。
- **验证码识别慢？**  
  可用多线程/异步批量识别，或用更快的 OCR 引擎。

---

## 七、进阶与扩展

- 集成打码平台（如超级鹰、云打码等）处理复杂验证码
- 结合 selenium/playwright 自动化识别和提交验证码
- 自定义训练验证码识别模型（如 CNN、深度学习）
- 图像增强、分割、特征提取等高级预处理

---

## 八、参考资料

- [Tesseract 官方文档](https://github.com/tesseract-ocr/tesseract)
- [PaddleOCR 官方文档](https://github.com/PaddlePaddle/PaddleOCR)
- [百度云 OCR 文档](https://cloud.baidu.com/product/ocr/general)
- [超级鹰打码平台](http://www.chaojiying.com/)
- [云打码平台](http://www.yundama.com/)

---

**总结：**
- OCR 可自动识别大部分简单图片验证码，配合图片预处理效果更佳。
- 对于复杂验证码，建议结合深度学习或第三方打码平台。
- 实践中需根据验证码类型灵活选择方案，适当结合自动化工具与人工服务。