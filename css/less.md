以下是 **LESS 常用 API 总结**，涵盖了变量、嵌套规则、混合、继承、运算、函数等核心功能，帮助快速掌握 LESS 的使用技巧。

---

# LESS 常用 API 总结

---

## **1. 变量**

### **1.1 定义变量**
- **语法**: 使用 `@变量名: 值;` 定义变量。
- **作用**: 用于存储颜色、字体大小、间距等可复用的值。

#### **示例**
```less
@primary-color: #3498db;
@font-size: 16px;

button {
  color: @primary-color;
  font-size: @font-size;
}
```

---

## **2. 嵌套规则**

### **2.1 基本嵌套**
- **语法**: 在选择器内部嵌套子选择器，表示层级关系。
- **作用**: 模拟 CSS 的层级结构，简化代码。

#### **示例**
```less
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
- **语法**: 定义一个混合后，可以在其他选择器中直接调用。
- **作用**: 用于复用样式代码。

#### **示例**
```less
.border-radius(@radius) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

.box {
  .border-radius(10px);
  background: #f0f0f0;
}
```

---

### **3.2 带默认值的混合**
- **语法**: 可以为混合的参数设置默认值。
- **作用**: 提高混合的灵活性。

#### **示例**
```less
.box-shadow(@x: 0, @y: 0, @blur: 5px, @color: rgba(0, 0, 0, 0.5)) {
  box-shadow: @x @y @blur @color;
}

.card {
  .box-shadow(2px, 2px, 10px, rgba(0, 0, 0, 0.3));
}
```

---

## **4. 继承**

### **4.1 使用 `&` 符号**
- **语法**: 使用 `&` 表示当前选择器。
- **作用**: 用于继承父选择器的上下文。

#### **示例**
```less
.button {
  color: white;
  background: blue;
  &:hover {
    background: darkblue;
  }
}
```

---

## **5. 运算**

### **5.1 支持数学运算**
- **语法**: 支持加法、减法、乘法、除法等运算。
- **作用**: 用于动态计算样式值。

#### **示例**
```less
@base: 10px;

.container {
  width: @base * 10; // 100px
  padding: @base + 5px; // 15px
}
```

---

## **6. 函数**

### **6.1 内置函数**
- **作用**: LESS 提供了许多内置函数，用于颜色处理、数学运算等。

#### **常用函数**
1. **颜色函数**:
   - `lighten(color, amount)`：使颜色变亮。
   - `darken(color, amount)`：使颜色变暗。
   - `fadein(color, amount)`：增加颜色的不透明度。
   - `fadeout(color, amount)`：减少颜色的不透明度。

2. **数学函数**:
   - `ceil(number)`：向上取整。
   - `floor(number)`：向下取整。
   - `round(number)`：四舍五入。

#### **示例**
```less
@primary-color: #3498db;

.button {
  background: lighten(@primary-color, 20%);
  border-color: darken(@primary-color, 10%);
}
```

---

## **7. 导入 (Import)**

### **7.1 导入文件**
- **语法**: 使用 `@import` 导入其他 LESS 文件。
- **作用**: 用于模块化管理样式。

#### **示例**
```less
@import "variables.less";
@import "mixins.less";

body {
  font-family: @font-family;
}
```

---

## **8. 条件语句**

### **8.1 使用 `when` 关键字**
- **语法**: 使用 `when` 定义条件语句。
- **作用**: 根据条件动态生成样式。

#### **示例**
```less
.button(@type) when (@type = primary) {
  background: blue;
  color: white;
}
.button(@type) when (@type = secondary) {
  background: gray;
  color: black;
}

.btn-primary {
  .button(primary);
}
.btn-secondary {
  .button(secondary);
}
```

---

## **9. 循环**

### **9.1 使用 `each` 循环**
- **语法**: 使用 `each` 遍历列表。
- **作用**: 动态生成样式。

#### **示例**
```less
@colors: red, blue, green;

.each(@colors, {
  .@{value} {
    color: @value;
  }
});
```

---

## **10. 嵌套媒体查询**

### **10.1 嵌套媒体查询**
- **语法**: 在选择器内部嵌套媒体查询。
- **作用**: 简化媒体查询的书写。

#### **示例**
```less
.container {
  width: 100%;
  @media (max-width: 768px) {
    width: 50%;
  }
}
```

---
