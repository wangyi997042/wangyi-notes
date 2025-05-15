我将详细总结 BOM 和 DOM 的 API、属性及示例。由于内容较多，我会分两部分回答。

## 第一部分：BOM（Browser Object Model）

### 1. **window 对象**
`window` 是全局对象，代表浏览器窗口。

#### 1.1 **属性**
- **`window.innerWidth`**：窗口内部宽度（不包括工具栏和滚动条）。
- **`window.innerHeight`**：窗口内部高度。
- **`window.outerWidth`**：窗口外部宽度（包括工具栏和滚动条）。
- **`window.outerHeight`**：窗口外部高度。
- **`window.screenX`**：窗口相对于屏幕的 X 坐标。
- **`window.screenY`**：窗口相对于屏幕的 Y 坐标。

#### 1.2 **方法**
- **`window.alert(message)`**：显示警告框。
  ```javascript
  window.alert('Hello World!');
  ```

- **`window.confirm(message)`**：显示确认框，返回布尔值。
  ```javascript
  const result = window.confirm('确定要删除吗？');
  if (result) {
    console.log('用户点击了确定');
  } else {
    console.log('用户点击了取消');
  }
  ```

- **`window.prompt(message, defaultText)`**：显示输入框，返回用户输入的值。
  ```javascript
  const name = window.prompt('请输入你的名字', '默认名字');
  console.log(name);
  ```

- **`window.open(url, name, features)`**：打开新窗口。
  ```javascript
  window.open('https://www.example.com', '_blank', 'width=500,height=500');
  ```

- **`window.close()`**：关闭当前窗口。
  ```javascript
  window.close();
  ```

- **`window.setTimeout(callback, delay)`**：延迟执行函数。
  ```javascript
  window.setTimeout(() => {
    console.log('2秒后执行');
  }, 2000);
  ```

- **`window.setInterval(callback, delay)`**：定时执行函数。
  ```javascript
  window.setInterval(() => {
    console.log('每2秒执行一次');
  }, 2000);
  ```

- **`window.clearTimeout(id)`**：清除延迟执行。
  ```javascript
  const id = window.setTimeout(() => {
    console.log('不会执行');
  }, 2000);
  window.clearTimeout(id);
  ```

- **`window.clearInterval(id)`**：清除定时执行。
  ```javascript
  const id = window.setInterval(() => {
    console.log('不会执行');
  }, 2000);
  window.clearInterval(id);
  ```

### 2. **navigator 对象**
`navigator` 提供浏览器信息。

#### 2.1 **属性**
- **`navigator.userAgent`**：浏览器标识。
  ```javascript
  console.log(navigator.userAgent);
  ```

- **`navigator.language`**：浏览器语言。
  ```javascript
  console.log(navigator.language);
  ```

- **`navigator.cookieEnabled`**：是否启用 Cookie。
  ```javascript
  console.log(navigator.cookieEnabled);
  ```

- **`navigator.onLine`**：是否在线。
  ```javascript
  console.log(navigator.onLine);
  ```

#### 2.2 **方法**
- **`navigator.geolocation.getCurrentPosition(success, error)`**：获取地理位置。
  ```javascript
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.error(error);
    }
  );
  ```

### 3. **location 对象**
`location` 提供当前 URL 信息。

#### 3.1 **属性**
- **`location.href`**：当前 URL。
  ```javascript
  console.log(location.href);
  ```

- **`location.protocol`**：协议（如 `http:`、`https:`）。
  ```javascript
  console.log(location.protocol);
  ```

- **`location.host`**：主机名和端口。
  ```javascript
  console.log(location.host);
  ```

- **`location.hostname`**：主机名。
  ```javascript
  console.log(location.hostname);
  ```

- **`location.port`**：端口。
  ```javascript
  console.log(location.port);
  ```

- **`location.pathname`**：路径。
  ```javascript
  console.log(location.pathname);
  ```

- **`location.search`**：查询字符串。
  ```javascript
  console.log(location.search);
  ```

- **`location.hash`**：锚点。
  ```javascript
  console.log(location.hash);
  ```

#### 3.2 **方法**
- **`location.reload()`**：刷新页面。
  ```javascript
  location.reload();
  ```

- **`location.assign(url)`**：跳转到新 URL。
  ```javascript
  location.assign('https://www.example.com');
  ```

- **`location.replace(url)`**：替换当前 URL（不保留历史记录）。
  ```javascript
  location.replace('https://www.example.com');
  ```

### 4. **history 对象**
`history` 提供浏览器历史记录。

#### 4.1 **属性**
- **`history.length`**：历史记录数量。
  ```javascript
  console.log(history.length);
  ```

#### 4.2 **方法**
- **`history.back()`**：返回上一页。
  ```javascript
  history.back();
  ```

- **`history.forward()`**：前进到下一页。
  ```javascript
  history.forward();
  ```

- **`history.go(n)`**：跳转到指定历史记录。
  ```javascript
  history.go(-1); // 返回上一页
  history.go(1);  // 前进到下一页
  ```

- **`history.pushState(state, title, url)`**：添加历史记录。
  ```javascript
  history.pushState({ page: 1 }, 'Page 1', '/page1');
  ```

- **`history.replaceState(state, title, url)`**：替换当前历史记录。
  ```javascript
  history.replaceState({ page: 2 }, 'Page 2', '/page2');
  ```

### 5. **screen 对象**
`screen` 提供屏幕信息。

#### 5.1 **属性**
- **`screen.width`**：屏幕宽度。
  ```javascript
  console.log(screen.width);
  ```

- **`screen.height`**：屏幕高度。
  ```javascript
  console.log(screen.height);
  ```

- **`screen.availWidth`**：可用屏幕宽度（不包括任务栏）。
  ```javascript
  console.log(screen.availWidth);
  ```

- **`screen.availHeight`**：可用屏幕高度（不包括任务栏）。
  ```javascript
  console.log(screen.availHeight);
  ```

- **`screen.colorDepth`**：颜色深度。
  ```javascript
  console.log(screen.colorDepth);
  ```

- **`screen.pixelDepth`**：像素深度。
  ```javascript
  console.log(screen.pixelDepth);
  ```

---

## 第二部分：DOM（Document Object Model）

### 1. **document 对象**
`document` 代表整个 HTML 文档。

#### 1.1 **属性**
- **`document.documentElement`**：根元素（`<html>`）。
  ```javascript
  console.log(document.documentElement);
  ```

- **`document.body`**：`<body>` 元素。
  ```javascript
  console.log(document.body);
  ```

- **`document.head`**：`<head>` 元素。
  ```javascript
  console.log(document.head);
  ```

- **`document.title`**：文档标题。
  ```javascript
  console.log(document.title);
  document.title = '新标题';
  ```

- **`document.URL`**：文档 URL。
  ```javascript
  console.log(document.URL);
  ```

- **`document.domain`**：文档域名。
  ```javascript
  console.log(document.domain);
  ```

- **`document.readyState`**：文档加载状态。
  ```javascript
  console.log(document.readyState);
  ```

#### 1.2 **方法**
- **`document.getElementById(id)`**：根据 ID 获取元素。
  ```javascript
  const element = document.getElementById('myId');
  ```

- **`document.getElementsByClassName(className)`**：根据类名获取元素集合。
  ```javascript
  const elements = document.getElementsByClassName('myClass');
  ```

- **`document.getElementsByTagName(tagName)`**：根据标签名获取元素集合。
  ```javascript
  const elements = document.getElementsByTagName('div');
  ```

- **`document.querySelector(selector)`**：根据 CSS 选择器获取第一个元素。
  ```javascript
  const element = document.querySelector('.myClass');
  ```

- **`document.querySelectorAll(selector)`**：根据 CSS 选择器获取元素集合。
  ```javascript
  const elements = document.querySelectorAll('.myClass');
  ```

- **`document.createElement(tagName)`**：创建新元素。
  ```javascript
  const newElement = document.createElement('div');
  ```

- **`document.createTextNode(text)`**：创建文本节点。
  ```javascript
  const textNode = document.createTextNode('Hello World!');
  ```

- **`document.write(html)`**：写入 HTML。
  ```javascript
  document.write('<h1>Hello World!</h1>');
  ```

- **`document.open()`**：打开文档流。
  ```javascript
  document.open();
  ```

- **`document.close()`**：关闭文档流。
  ```javascript
  document.close();
  ```

### 2. **Element 对象**
`Element` 代表 HTML 元素。

#### 2.1 **属性**
- **`element.id`**：元素 ID。
  ```javascript
  console.log(element.id);
  element.id = 'newId';
  ```

- **`element.className`**：元素类名。
  ```javascript
  console.log(element.className);
  element.className = 'newClass';
  ```

- **`element.classList`**：元素类名列表（`DOMTokenList`）。
  ```javascript
  element.classList.add('newClass');
  element.classList.remove('oldClass');
  element.classList.toggle('active');
  element.classList.contains('active');
  ```

- **`element.innerHTML`**：元素内部 HTML。
  ```javascript
  console.log(element.innerHTML);
  element.innerHTML = '<span>新内容</span>';
  ```

- **`element.textContent`**：元素文本内容。
  ```javascript
  console.log(element.textContent);
  element.textContent = '新文本';
  ```

- **`element.style`**：元素样式。
  ```javascript
  element.style.color = 'red';
  element.style.backgroundColor = 'blue';
  ```

- **`element.attributes`**：元素属性集合。
  ```javascript
  console.log(element.attributes);
  ```

- **`element.dataset`**：自定义数据属性。
  ```javascript
  element.dataset.myData = 'value';
  console.log(element.dataset.myData);
  ```

#### 2.2 **方法**
- **`element.getAttribute(name)`**：获取属性值。
  ```javascript
  const value = element.getAttribute('data-id');
  ```

- **`element.setAttribute(name, value)`**：设置属性值。
  ```javascript
  element.setAttribute('data-id', '123');
  ```

- **`element.removeAttribute(name)`**：删除属性。
  ```javascript
  element.removeAttribute('data-id');
  ```

- **`element.hasAttribute(name)`**：检查属性是否存在。
  ```javascript
  const hasAttribute = element.hasAttribute('data-id');
  ```

- **`element.appendChild(node)`**：添加子节点。
  ```javascript
  const newElement = document.createElement('div');
  element.appendChild(newElement);
  ```

- **`element.removeChild(node)`**：删除子节点。
  ```javascript
  element.removeChild(childElement);
  ```

- **`element.replaceChild(newNode, oldNode)`**：替换子节点。
  ```javascript
  const newElement = document.createElement('div');
  element.replaceChild(newElement, oldElement);
  ```

- **`element.insertBefore(newNode, referenceNode)`**：在指定节点前插入新节点。
  ```javascript
  const newElement = document.createElement('div');
  element.insertBefore(newElement, referenceElement);
  ```

- **`element.cloneNode(deep)`**：克隆节点。
  ```javascript
  const clone = element.cloneNode(true); // 深拷贝
  ```

- **`element.matches(selector)`**：检查元素是否匹配选择器。
  ```javascript
  const isMatch = element.matches('.myClass');
  ```

- **`element.closest(selector)`**：查找最近的匹配选择器的祖先元素。
  ```javascript
  const ancestor = element.closest('.myClass');
  ```

### 3. **Node 对象**
`Node` 代表 DOM 树中的节点（元素、文本、注释等）。

#### 3.1 **属性**
- **`node.nodeType`**：节点类型。
  ```javascript
  console.log(node.nodeType); // 1: 元素, 3: 文本, 8: 注释
  ```

- **`node.nodeName`**：节点名称。
  ```javascript
  console.log(node.nodeName);
  ```

- **`node.nodeValue`**：节点值。
  ```javascript
  console.log(node.nodeValue);
  ```

- **`node.parentNode`**：父节点。
  ```javascript
  console.log(node.parentNode);
  ```

- **`node.childNodes`**：子节点集合。
  ```javascript
  console.log(node.childNodes);
  ```

- **`node.firstChild`**：第一个子节点。
  ```javascript
  console.log(node.firstChild);
  ```

- **`node.lastChild`**：最后一个子节点。
  ```javascript
  console.log(node.lastChild);
  ```

- **`node.previousSibling`**：前一个兄弟节点。
  ```javascript
  console.log(node.previousSibling);
  ```

- **`node.nextSibling`**：后一个兄弟节点。
  ```javascript
  console.log(node.nextSibling);
  ```

#### 3.2 **方法**
- **`node.appendChild(newNode)`**：添加子节点。
  ```javascript
  node.appendChild(newNode);
  ```

- **`node.removeChild(childNode)`**：删除子节点。
  ```javascript
  node.removeChild(childNode);
  ```

- **`node.replaceChild(newNode, oldNode)`**：替换子节点。
  ```javascript
  node.replaceChild(newNode, oldNode);
  ```

- **`node.insertBefore(newNode, referenceNode)`**：在指定节点前插入新节点。
  ```javascript
  node.insertBefore(newNode, referenceNode);
  ```

- **`node.cloneNode(deep)`**：克隆节点。
  ```javascript
  const clone = node.cloneNode(true); // 深拷贝
  ```

- **`node.hasChildNodes()`**：检查是否有子节点。
  ```javascript
  const hasChildren = node.hasChildNodes();
  ```

### 4. **事件**
DOM 事件用于响应用户交互。

#### 4.1 **常见事件**
- **`click`**：点击事件。
  ```javascript
  element.addEventListener('click', function(event) {
    console.log('点击了元素');
  });
  ```

- **`mouseover`**：鼠标悬停事件。
  ```javascript
  element.addEventListener('mouseover', function(event) {
    console.log('鼠标悬停在元素上');
  });
  ```

- **`mouseout`**：鼠标离开事件。
  ```javascript
  element.addEventListener('mouseout', function(event) {
    console.log('鼠标离开元素');
  });
  ```

- **`keydown`**：键盘按下事件。
  ```javascript
  document.addEventListener('keydown', function(event) {
    console.log('按下了键盘');
  });
  ```

- **`keyup`**：键盘释放事件。
  ```javascript
  document.addEventListener('keyup', function(event) {
    console.log('释放了键盘');
  });
  ```

- **`load`**：页面加载完成事件。
  ```javascript
  window.addEventListener('load', function(event) {
    console.log('页面加载完成');
  });
  ```

- **`submit`**：表单提交事件。
  ```javascript
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交
    console.log('表单提交');
  });
  ```

#### 4.2 **事件对象**
事件处理函数会接收一个 `event` 对象，包含事件信息。

- **`event.target`**：触发事件的元素。
  ```javascript
  element.addEventListener('click', function(event) {
    console.log(event.target);
  });
  ```

- **`event.type`**：事件类型。
  ```javascript
  element.addEventListener('click', function(event) {
    console.log(event.type); // 'click'
  });
  ```

- **`event.preventDefault()`**：阻止默认行为。
  ```javascript
  element.addEventListener('click', function(event) {
    event.preventDefault();
  });
  ```

- **`event.stopPropagation()`**：阻止事件冒泡。
  ```javascript
  element.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  ```

#### 4.3 **事件委托**
通过父元素监听子元素事件，提高性能。

```javascript
const parent = document.getElementById('parent');
parent.addEventListener('click', function(event) {
  if (event.target.matches('.child')) {
    console.log('点击了子元素');
  }
});
```

---

## 总结
- **BOM** 提供浏览器窗口和浏览器本身的操作。
- **DOM** 提供网页内容的操作。
- 两者结合使用，可以实现丰富的网页交互和动态效果。

如果你有具体问题或想了解某个部分的详细用法，请告诉我！
