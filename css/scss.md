以下是 **SCSS 常用 API 总结**，涵盖了变量、嵌套规则、混合、继承、运算、函数、模块化、条件语句、循环等核心功能，帮助快速掌握 SCSS 的使用技巧。

---

# SCSS 常用 API 总结

---

## **1. 变量**

### **1.1 定义变量**
- **语法**: 使用 `$变量名: 值;` 定义变量。
- **作用**: 用于存储颜色、字体大小、间距等可复用的值。

#### **示例**
```scss
$primary-color: #3498db;
$font-size: 16px;

button {
  color: $primary-color;
  font-size: $font-size;
}
```

---

## **2. 嵌套规则**

### **2.1 基本嵌套**
- **语法**: 在选择器内部嵌套子选择器，表示层级关系。
- **作用**: 模拟 CSS 的层级结构，简化代码。

#### **示例**
```scss
.nav {
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      a {
        text-decoration: none;
        color: #333;
      }
    }
  }
}
```

---

## **3. 混合 (Mixins)**

### **3.1 定义和使用混合**
- **语法**: 使用 `@mixin` 定义混合，使用 `@include` 调用混合。
- **作用**: 用于复用样式代码。

#### **示例**
```scss
@mixin border-radius($radius) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

.box {
  @include border-radius(10px);
  background: #f0f0f0;
}
```

---

### **3.2 带默认值的混合**
- **语法**: 可以为混合的参数设置默认值。
- **作用**: 提高混合的灵活性。

#### **示例**
```scss
@mixin box-shadow($x: 0, $y: 0, $blur: 5px, $color: rgba(0, 0, 0, 0.5)) {
  box-shadow: $x $y $blur $color;
}

.card {
  @include box-shadow(2px, 2px, 10px, rgba(0, 0, 0, 0.3));
}
```

---

## **4. 继承**

### **4.1 使用 `@extend`**
- **语法**: 使用 `@extend` 继承其他选择器的样式。
- **作用**: 避免重复书写相同的样式。

#### **示例**
```scss
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
}

.primary-button {
  @extend .button;
  background: darkblue;
}
```

---

## **5. 运算**

### **5.1 支持数学运算**
- **语法**: 支持加法、减法、乘法、除法等运算。
- **作用**: 用于动态计算样式值。

#### **示例**
```scss
$base: 10px;

.container {
  width: $base * 10; // 100px
  padding: $base + 5px; // 15px
}
```

---

## **6. 函数**

### **6.1 内置函数**
- **作用**: SCSS 提供了许多内置函数，用于颜色处理、数学运算等。

#### **常用函数**
1. **颜色函数**:
   - `lighten(color, amount)`：使颜色变亮。
   - `darken(color, amount)`：使颜色变暗。
   - `rgba(color, alpha)`：设置颜色的不透明度。

2. **数学函数**:
   - `ceil(number)`：向上取整。
   - `floor(number)`：向下取整。
   - `round(number)`：四舍五入。

#### **示例**
```scss
$primary-color: #3498db;

.button {
  background: lighten($primary-color, 20%);
  border-color: darken($primary-color, 10%);
}
```

---

## **7. 模块化**

### **7.1 导入文件**
- **语法**: 使用 `@use` 或 `@import` 导入其他 SCSS 文件。
- **作用**: 用于模块化管理样式。

#### **示例**
```scss
// variables.scss
$font-size: 16px;

// main.scss
@use 'variables';

body {
  font-size: variables.$font-size;
}
```

---

## **8. 条件语句**

### **8.1 使用 `@if` 和 `@else`**
- **语法**: 使用条件语句动态生成样式。
- **作用**: 根据条件生成不同的样式。

#### **示例**
```scss
@mixin button($type) {
  @if $type == primary {
    background: blue;
    color: white;
  } @else if $type == secondary {
    background: gray;
    color: black;
  } @else {
    background: white;
    color: black;
  }
}

.btn-primary {
  @include button(primary);
}
.btn-secondary {
  @include button(secondary);
}
```

---

## **9. 循环**

### **9.1 使用 `@for` 循环**
- **语法**: 使用 `@for` 动态生成样式。
- **作用**: 避免重复书写相似的样式。

#### **示例**
```scss
@for $i from 1 through 5 {
  .col-#{$i} {
    width: 20% * $i;
  }
}
```

---

### **9.2 使用 `@each` 循环**
- **语法**: 使用 `@each` 遍历列表。
- **作用**: 动态生成样式。

#### **示例**
```scss
$colors: red, blue, green;

@each $color in $colors {
  .#{$color}-text {
    color: $color;
  }
}
```

---

## **10. 嵌套媒体查询**

### **10.1 嵌套媒体查询**
- **语法**: 在选择器内部嵌套媒体查询。
- **作用**: 简化媒体查询的书写。

#### **示例**
```scss
.container {
  width: 100%;
  @media (max-width: 768px) {
    width: 50%;
  }
}
```

---
