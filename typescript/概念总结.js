
// ! 1. 什么是 TypeScript？
// * TypeScript 是 JavaScript 的超集，增加了静态类型检查、现代语法特性和开发工具支持，最终会被编译为纯 JavaScript。
// ? 标准语法：无（为语言定义）
// 参数说明：无
// 示例：无
// TODO: TypeScript 代码需通过编译生成 JavaScript 才能在浏览器或 Node.js 中运行。

// ! 2.1 类型系统
// * TypeScript 的类型系统是其核心特性，提供多种类型来描述变量和函数的行为。
// ? 标准语法：let 变量名: 类型 = 值;
// 参数说明：
//   string：字符串
//   number：数字
//   boolean：布尔值
//   any：任意类型
//   unknown：未知类型（更安全的 any）
//   void：无返回值
//   never：永远不会发生的类型
// 示例：
let username = "Alice"; // string
let age = 25; // number
let isAdmin = true; // boolean
let anything = "可以是任意类型"; // any
let notSure = 42; // unknown
let nothing = undefined; // void
// TODO: 推荐优先使用具体类型，减少 any 的使用。

// ! 2.2 数组和元组
// * 数组用于存储相同类型的元素，元组用于存储固定数量和类型的元素。
// ? 标准语法：
//   let arr: 类型[] = [...];
//   let tuple: [类型1, 类型2] = [值1, 值2];
// 参数说明：
//   类型[]：元素类型
//   [类型1, 类型2]：元组各元素类型
// 示例：
let numbers = [1, 2, 3]; // number[]
let tuple = ["Alice", 25]; // [string, number]
// TODO: 元组适合用于参数固定的场景。

// ! 2.3 枚举
// * 枚举用于定义一组命名常量，提升代码可读性和维护性。
// ? 标准语法：enum 枚举名 { 成员1 = 值1, 成员2, ... }
// 参数说明：
//   枚举名：自定义名称
//   成员：常量名，可指定初始值
// 示例：
enum Color {
  Red = 1,
  Green,
  Blue,
}
let favoriteColor = Color.Green; // 2
// TODO: 枚举可用于状态、类型等场景。

// ! 2.4 对象类型
// * 对象类型用于定义对象的属性和类型。
// ? 标准语法：let obj: { 属性1: 类型1; 属性2: 类型2 } = { ... }
// 参数说明：
//   属性名：对象的属性
//   类型：属性的数据类型
// 示例：
let person = { name: "Alice", age: 25 };
// TODO: 可用接口 interface 进一步规范对象结构。

// ! 2.5 函数类型
// * TypeScript 为函数提供了强大的类型支持，包括参数类型、返回值类型、可选参数、默认参数和剩余参数。
// ? 标准语法：
//   function fn(参数: 类型, ...): 返回类型 { ... }
//   const fn: (参数: 类型, ...) => 返回类型 = ...
// 参数说明：
//   参数名: 类型
//   返回类型
// 示例：
function add(x, y) { return x + y; }
const multiply = (x, y) => x * y;
// 可选参数与默认参数：
function greet(name) { return `Hello, ${name || "Guest"}`; }
function greetWithDefault(name = "Guest") { return `Hello, ${name}`; }
// 剩余参数：
function sum(...numbers) { return numbers.reduce((acc, curr) => acc + curr, 0); }
// TODO: 参数和返回值类型建议都显式声明。

// ! 2.6 类和面向对象编程
// * TypeScript 支持类、继承、访问修饰符和抽象类，便于面向对象开发。
// ? 标准语法：
//   class 类名 { ... }
//   class 子类 extends 父类 { ... }
//   abstract class 抽象类 { ... }
// 参数说明：
//   public：外部可访问
//   private：仅类内部可访问
//   protected：类及子类可访问
// 示例：
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() { return `Hi, I'm ${this.name}`; }
}
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  study() { return `${this.name} is studying in grade ${this.grade}`; }
}
// 抽象类
class Shape {
  area() { throw new Error("Must be implemented"); }
}
class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
}
// TODO: 推荐用 public/private/protected 明确属性访问范围。

// ! 2.7 泛型
// * 泛型为函数、类、接口提供灵活的类型支持，提升代码复用性和类型安全。
// ? 标准语法：function fn<T>(arg: T): T { ... }
// 参数说明：
//   <T>：类型参数，可自定义
// 示例：
function identity(arg) { return arg; }
class Box {
  constructor(content) { this.content = content; }
  getContent() { return this.content; }
}
// TODO: 泛型常用于集合、工具函数、数据结构等场景。

// ! 2.8 模块和命名空间
// * TypeScript 支持通过模块和命名空间组织代码，避免命名冲突。
// ? 标准语法：
//   // math.ts
//   export function add(x, y) { return x + y; }
//   // main.ts
//   import { add } from "./math";
//   命名空间：namespace 名 { ... }
// 参数说明：
//   export/import：模块导出与导入
//   namespace：命名空间关键字
// 示例：
/*
namespace Utils {
  export function log(message) { console.log(message); }
}
Utils.log("Hello, TypeScript!");
*/
// TODO: 推荐优先使用 ES6 模块，命名空间适合全局工具库。

// ! 2.9 装饰器
// * 装饰器是一种特殊语法，用于修改类或类成员的行为（需开启 experimentalDecorators）。
// ? 标准语法：@装饰器
// 参数说明：
//   target：被装饰的目标
//   propertyKey：属性名
// 示例：
function Log(target, propertyKey) {
  console.log(`${propertyKey} was accessed`);
}
class Example {
  method() { console.log("Method executed"); }
}
// TODO: 装饰器常用于依赖注入、日志、权限等场景。

// ! 3.1 类型守卫
// * 类型守卫用于在运行时判断变量类型，提升类型安全。
// ? 标准语法：function isType(val): val is Type { ... }
// 参数说明：
//   val：待判断的变量
//   Type：目标类型
// 示例：
function isString(value) { return typeof value === "string"; }
// TODO: 类型守卫常与联合类型、unknown 类型配合使用。

// ! 3.2 条件类型
// * 条件类型根据条件返回不同类型，提升类型表达能力。
// ? 标准语法：type 类型名<T> = T extends 条件 ? 类型1 : 类型2;
// 参数说明：
//   T：类型参数
//   条件：类型判断条件
// 示例：
/*
type IsString<T> = T extends string ? true : false;
*/
// TODO: 条件类型常用于类型工具库。

// ! 3.3 映射类型
// * 映射类型基于已有类型生成新类型，常用于类型变换。
// ? 标准语法：type 新类型<T> = { [P in keyof T]: T[P] }
// 参数说明：
//   T：原始类型
//   P：属性名
// 示例：
/*
type Readonly<T> = { readonly [P in keyof T]: T[P]; };
*/
// TODO: 常见内置映射类型有 Partial、Readonly、Pick、Record 等。

// ! 4. TypeScript 配置
// * 通过 tsconfig.json 文件配置 TypeScript 编译器行为。
// ? 标准语法：tsconfig.json 配置项
// 参数说明：
//   target：编译目标 JS 版本
//   module：模块系统
//   strict：严格模式
//   outDir：输出目录
//   sourceMap：是否生成源码映射
// 示例：
/*
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "sourceMap": true
  }
}
*/
// TODO: 推荐开启 strict 选项，提升类型安全。

// ! 5. TypeScript 的优势
// * 类型安全、工具支持、可维护性强，减少运行时错误，提升开发体验。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 配合 IDE 使用效果最佳。

// ! 6. TypeScript 的局限性
// * 学习曲线较高，需编译步骤，部分动态特性需额外处理。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 动态场景下类型推断有限，需手动声明类型。

// ! 总结
// * TypeScript 提供了强大的类型系统和现代开发体验，适合中大型项目和团队协作，推荐新项目优先采用。
// ? 标准语法：无
// 参数说明：无
// 示例：无
// TODO: 持续关注官方文档和社区最佳实践，提升 TypeScript 使用水平。