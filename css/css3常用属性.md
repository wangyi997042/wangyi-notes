以下是对 **CSS3 常用属性总结** 的进一步扩展，增加了更详细的描述和更丰富的示例代码，涵盖更多的核心功能和高级用法。

---

# CSS3 常用属性总结（扩展版）

---

## **1. 布局相关**

### **1.1 Flexbox 布局**
- **定义**: 弹性盒子布局，用于创建灵活的响应式布局。
- **常用属性**:
  - **容器属性**:
    - `display: flex;`：启用 Flex 布局。
    - `flex-direction`：设置主轴方向（如 `row`、`column`）。
    - `justify-content`：设置主轴对齐方式（如 `center`、`space-between`）。
    - `align-items`：设置交叉轴对齐方式（如 `center`、`stretch`）。
    - `flex-wrap`：设置是否换行（如 `nowrap`、`wrap`）。
    - `align-content`：多行内容的对齐方式（如 `space-around`、`stretch`）。
  - **子项属性**:
    - `flex`：设置子项的弹性比例。
    - `align-self`：设置单个子项的对齐方式。
    - `order`：设置子项的排列顺序。

#### **示例**
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  flex: 1;
  order: 2; /* 改变子项的排列顺序 */
}
```

---

### **1.2 Grid 布局**
- **定义**: 网格布局，用于创建二维布局。
- **常用属性**:
  - **容器属性**:
    - `display: grid;`：启用 Grid 布局。
    - `grid-template-columns`：定义列数和宽度。
    - `grid-template-rows`：定义行数和高度。
    - `gap`：设置网格间距。
    - `grid-auto-rows`：设置自动生成的行的高度。
    - `grid-auto-columns`：设置自动生成的列的宽度。
  - **子项属性**:
    - `grid-column`：设置子项跨列范围。
    - `grid-row`：设置子项跨行范围。
    - `grid-area`：设置子项所在的网格区域。

#### **示例**
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 10px;
}
.item {
  grid-column: span 2; /* 跨两列 */
  grid-row: span 1;    /* 跨一行 */
}
```

---

## **2. 动画与过渡**

### **2.1 过渡 (Transition)**
- **定义**: 用于在属性变化时添加动画效果。
- **常用属性**:
  - `transition`：简写属性，设置过渡效果。
  - `transition-property`：指定过渡的属性。
  - `transition-duration`：设置过渡的持续时间。
  - `transition-timing-function`：设置过渡的缓动函数。
  - `transition-delay`：设置过渡的延迟时间。

#### **示例**
```css
.button {
  background-color: blue;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease;
}
.button:hover {
  background-color: red;
  transform: scale(1.2);
}
```

---

### **2.2 动画 (Animation)**
- **定义**: 用于定义复杂的动画效果。
- **常用属性**:
  - `animation`：简写属性，设置动画效果。
  - `animation-name`：指定动画名称。
  - `animation-duration`：设置动画持续时间。
  - `animation-timing-function`：设置动画缓动函数。
  - `animation-delay`：设置动画延迟时间。
  - `animation-iteration-count`：设置动画循环次数。
  - `animation-direction`：设置动画方向（如 `normal`、`reverse`）。
  - `animation-fill-mode`：设置动画结束后的状态（如 `forwards`、`backwards`）。

#### **示例**
```css
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
.box {
  animation: bounce 1s infinite ease-in-out;
}
```

---

## **3. 变换 (Transform)**

### **3.1 常用属性**
- `transform`：简写属性，用于设置变换效果。
- **常见变换函数**:
  - `translate(x, y)`：平移。
  - `rotate(angle)`：旋转。
  - `scale(x, y)`：缩放。
  - `skew(x-angle, y-angle)`：倾斜。
  - `matrix(a, b, c, d, e, f)`：矩阵变换。

#### **示例**
```css
.box {
  transform: translate(50px, 50px) rotate(45deg) scale(1.5);
}
```

---

## **4. 背景 (Background)**

### **4.1 常用属性**
- `background-color`：设置背景颜色。
- `background-image`：设置背景图片。
- `background-size`：设置背景图片大小（如 `cover`、`contain`）。
- `background-position`：设置背景图片位置。
- `background-repeat`：设置背景图片是否重复。
- `background-attachment`：设置背景图片是否固定（如 `fixed`、`scroll`）。

#### **示例**
```css
.container {
  background-color: #f0f0f0;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
```

---

## **5. 边框与圆角**

### **5.1 边框 (Border)**
- **常用属性**:
  - `border`：简写属性，设置边框宽度、样式和颜色。
  - `border-width`：设置边框宽度。
  - `border-style`：设置边框样式（如 `solid`、`dashed`）。
  - `border-color`：设置边框颜色。

#### **示例**
```css
.box {
  border: 2px dashed #000;
}
```

---

### **5.2 圆角 (Border-Radius)**
- **定义**: 用于设置元素的圆角。
- **常用属性**:
  - `border-radius`：设置圆角半径。
  - 支持百分比或具体数值。

#### **示例**
```css
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
}
```

---

## **6. 阴影 (Box-Shadow & Text-Shadow)**

### **6.1 盒子阴影 (Box-Shadow)**
- **定义**: 用于为元素添加阴影。
- **常用属性**:
  - `box-shadow: h-offset v-offset blur-radius spread-radius color;`

#### **示例**
```css
.box {
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
}
```

---

### **6.2 文本阴影 (Text-Shadow)**
- **定义**: 用于为文本添加阴影。
- **常用属性**:
  - `text-shadow: h-offset v-offset blur-radius color;`

#### **示例**
```css
.text {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
```

---

## **7. 渐变 (Gradient)**

### **7.1 线性渐变 (Linear Gradient)**
- **定义**: 创建从一个颜色到另一个颜色的线性渐变。
- **常用属性**:
  - `background: linear-gradient(direction, color1, color2, ...);`

#### **示例**
```css
.box {
  background: linear-gradient(to right, red, blue);
}
```

---

### **7.2 径向渐变 (Radial Gradient)**
- **定义**: 创建从中心向外扩展的渐变。
- **常用属性**:
  - `background: radial-gradient(shape, color1, color2, ...);`

#### **示例**
```css
.circle {
  background: radial-gradient(circle, red, blue);
}
```

---
