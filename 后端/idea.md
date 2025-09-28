IntelliJ IDEA 使用指南

文件格式说明：本文档采用易读文本格式，结构为"标题 + 解释 + 标准语法 + 参数说明 + 示例 + 注意事项/扩展用法"。
阅读建议：配合 VS Code 插件 Better Comments 阅读，支持注释高亮。
内容特点：按照使用频率和重要性优化了内容顺序，补充了常见易混点、标准库进阶、反射与元编程等内容。

1. 基础操作

1.1 安装与配置

解释：
IntelliJ IDEA 是功能强大的 Java 集成开发环境，支持多种编程语言和框架。

标准安装步骤：
1. 访问官网下载 -> 运行安装程序 -> 选择安装位置 -> 完成安装
2. 首次启动配置 -> 选择 UI 主题 -> 安装插件 -> 配置 JDK

参数说明：
- Community Edition：免费版，适合学习和小型项目
- Ultimate Edition：付费版，提供更多企业级功能

示例：
# 下载地址
https://www.jetbrains.com/idea/download/

# JDK 配置路径
File > Project Structure > SDKs > + > 选择 JDK 安装目录

注意事项：
- ⚠️ 确保系统满足最低配置要求（4GB RAM，1.5GB 硬盘空间）
- 💡 学生可申请免费使用 Ultimate 版本

1.2 界面导航

解释：
了解 IDEA 界面布局，提高工作效率。

主要界面组件：
- 项目视图 (Project)：显示项目文件结构
- 编辑器 (Editor)：编写代码的主要区域
- 工具窗口 (Tool Windows)：提供各种辅助功能
- 导航栏 (Navigation Bar)：快速定位和切换文件
- 状态栏 (Status Bar)：显示项目和编辑器状态

快捷键：
显示/隐藏项目视图 - Windows/Linux: Alt + 1 | Mac: ⌘ + 1
显示/隐藏终端 - Windows/Linux: Alt + F12 | Mac: ⌥ + F12
切换全屏模式 - Windows/Linux: Ctrl + ⇧ + F12 | Mac: ⌘ + ⇧ + F12

示例：
# 自定义界面布局
View > Appearance > 选择所需工具窗口

扩展用法：
- 💡 可通过 View > Appearance > Enter Presentation Mode 进入演示模式
- 🔄 拖拽工具窗口可自定义布局

2. 项目管理

2.1 创建项目

解释：
在 IDEA 中创建新项目的步骤和选项。

标准语法：
File > New > Project... > 选择项目类型 > 配置项目参数 > Finish

参数说明：
- Project SDK：选择项目使用的 JDK 版本
- Build System：构建工具（Maven/Gradle/IntelliJ）
- Project name/location：项目名称和存储位置

示例：
# 创建 Spring Boot 项目
File > New > Project... > Spring Initializr > 
选择 SDK、语言、打包方式、Spring Boot 版本 >
选择依赖 > Finish

注意事项：
- ⚠️ 项目路径避免使用中文和特殊字符
- 💡 使用 Maven/Gradle 可更好地管理依赖

2.2 导入项目

解释：
将现有项目导入 IDEA 进行开发。

标准语法：
File > Open... > 选择项目目录 > OK

项目识别方式：
- 自动识别：IDEA 自动检测项目类型（Maven/Gradle）
- 手动配置：File > Project Structure > 配置项目结构

示例：
# 导入 Maven 项目
File > Open... > 选择包含 pom.xml 的目录 > OK > 
等待 Maven 导入完成

扩展用法：
- 💡 可通过 File > New > Project from Version Control 直接从 Git 仓库导入
- 🔄 使用 File > New > Project from Existing Sources 导入非标准项目

3. 代码编辑

3.1 智能编辑

解释：
IDEA 提供强大的代码编辑功能，包括自动补全、代码生成等。

常用功能：
- 代码补全：输入时自动提示类、方法、变量
- 代码生成：自动生成构造函数、getter/setter 等
- 实时错误检测：编写代码时实时检查语法错误
- 代码格式化：自动调整代码格式

快捷键：
基本补全 - Windows/Linux: Ctrl + Space | Mac: ⌃ + Space
智能补全 - Windows/Linux: Ctrl + ⇧ + Space | Mac: ⌃ + ⇧ + Space
生成代码 - Windows/Linux: Alt + Insert | Mac: ⌘ + N
格式化代码 - Windows/Linux: Ctrl + Alt + L | Mac: ⌘ + ⌥ + L
优化导入 - Windows/Linux: Ctrl + Alt + O | Mac: ⌃ + ⌥ + O

示例：
// 输入 sout 后按 Tab，自动生成
System.out.println();

// 输入 psvm 后按 Tab，自动生成
public static void main(String[] args) {
    
}

注意事项：
- 💡 可在 Settings > Editor > Live Templates 自定义代码模板
- 🔄 使用 Alt + Enter 查看智能建议和快速修复

3.2 代码导航

解释：
快速在代码中导航和查找内容。

常用导航功能：
- 查找类/文件/符号
- 跳转到定义/实现
- 查看方法层次结构
- 查找使用位置

快捷键：
查找类 - Windows/Linux: Ctrl + N | Mac: ⌘ + O
查找文件 - Windows/Linux: Ctrl + ⇧ + N | Mac: ⌘ + ⇧ + O
查找符号 - Windows/Linux: Ctrl + Alt + ⇧ + N | Mac: ⌘ + ⌥ + O
跳转到定义 - Windows/Linux: Ctrl + B | Mac: ⌘ + B
查找使用位置 - Windows/Linux: Alt + F7 | Mac: ⌥ + F7
最近文件 - Windows/Linux: Ctrl + E | Mac: ⌘ + E

示例：
# 查找类
按 Ctrl + N (Mac: ⌘ + O)，输入类名（支持驼峰缩写）

# 查找使用位置
将光标放在方法/变量上，按 Alt + F7 (Mac: ⌥ + F7)

扩展用法：
- 💡 使用 Ctrl + ⇧ + F (Mac: ⌘ + ⇧ + F) 全局搜索文本
- 🔄 使用 Ctrl + F12 (Mac: ⌘ + F12) 查看当前文件结构

4. 运行与调试

4.1 运行程序

解释：
在 IDEA 中运行 Java 程序的方法。

标准语法：
1. 右键点击类文件 > Run 'ClassName.main()'
2. 点击编辑器左侧的运行图标
3. 使用快捷键运行

运行配置参数：
- Main class：主类（包含 main 方法）
- VM options：JVM 参数
- Program arguments：程序参数
- Working directory：工作目录

快捷键：
运行程序 - Windows/Linux: ⇧ + F10 | Mac: ⌃ + R
运行上次配置 - Windows/Linux: Alt + ⇧ + F10 | Mac: ⌃ + ⌥ + R

示例：
// 在包含 main 方法的类中，点击左侧绿色三角形运行
public static void main(String[] args) {
    System.out.println("Hello, IDEA!");
}

注意事项：
- ⚠️ 确保项目已正确配置 JDK
- 💡 可通过 Run > Edit Configurations 自定义运行配置

4.2 调试程序

解释：
使用 IDEA 的调试功能分析和修复代码问题。

调试基本步骤：
1. 设置断点：点击代码行号左侧边缘
2. 启动调试：右键 > Debug 或使用快捷键
3. 使用调试工具控制程序执行
4. 查看变量值和调用栈

调试控制：
开始调试 - Windows/Linux: ⇧ + F9 | Mac: ⌃ + D - 启动调试会话
单步执行 - Windows/Linux: F8 | Mac: F8 - 执行当前行，不进入方法
步入方法 - Windows/Linux: F7 | Mac: F7 - 进入当前行调用的方法
步出方法 - Windows/Linux: ⇧ + F8 | Mac: ⇧ + F8 - 执行完当前方法并返回
运行到光标 - Windows/Linux: Alt + F9 | Mac: ⌥ + F9 - 执行到光标位置
评估表达式 - Windows/Linux: Alt + F8 | Mac: ⌥ + F8 - 计算表达式的值

示例：
// 在此行左侧点击设置断点
int result = calculate(a, b);
// 启动调试后，可查看 a, b 和 result 的值

扩展用法：
- 💡 使用条件断点：右键断点 > 设置条件表达式
- 🔄 使用监视窗口 (Watches) 跟踪特定变量

5. 版本控制

5.1 Git 集成

解释：
IDEA 提供完整的 Git 集成功能，无需离开 IDE 即可进行版本控制。

基本操作：
- 克隆仓库：VCS > Get from Version Control
- 提交更改：Commit (⌘ + K / Ctrl + K)
- 更新项目：Update Project (⌘ + T / Ctrl + T)
- 查看历史：Git > Show History
- 分支操作：Git > Branches

常用功能：
提交更改 - ⌘ + K (Mac) / Ctrl + K (Win)
更新项目 - ⌘ + T (Mac) / Ctrl + T (Win)
查看差异 - 选择文件，右键 > Git > Compare with...
解决冲突 - 冲突文件右键 > Git > Resolve Conflicts

示例：
# 创建新分支
Git > Branches > New Branch > 输入分支名 > Create

# 提交更改
⌘ + K (Mac) / Ctrl + K (Win) > 
输入提交信息 > 
选择要提交的文件 > 
Commit / Commit and Push

注意事项：
- ⚠️ 首次使用需在 Settings > Version Control > Git 配置 Git 路径
- 💡 使用 .gitignore 文件排除不需要版本控制的文件

5.2 本地历史

解释：
即使不使用版本控制系统，IDEA 也会自动保存文件的本地历史记录。

使用方法：
右键文件或目录 > Local History > Show History

功能：
- 查看文件历史版本
- 比较不同版本的差异
- 恢复到之前的版本

示例：
# 恢复误删文件
右键父目录 > Local History > Show History > 
找到文件存在的版本 > Revert

注意事项：
- ⚠️ 本地历史有时间限制，不能替代正式的版本控制
- 💡 可在 Settings > Appearance & Behavior > System Settings > Synchronization 调整历史保留设置

6. 高级功能

6.1 重构

解释：
重构是改进代码结构而不改变其行为的过程，IDEA 提供强大的重构工具。

常用重构：
- 重命名：变量、方法、类等
- 提取方法：将代码片段提取为独立方法
- 提取变量/常量：将表达式提取为变量/常量
- 移动类：将类移动到其他包
- 更改方法签名：修改方法参数、返回类型

快捷键：
重命名 - Windows/Linux: ⇧ + F6 | Mac: ⇧ + F6
提取方法 - Windows/Linux: Ctrl + Alt + M | Mac: ⌘ + ⌥ + M
提取变量 - Windows/Linux: Ctrl + Alt + V | Mac: ⌘ + ⌥ + V
提取常量 - Windows/Linux: Ctrl + Alt + C | Mac: ⌘ + ⌥ + C
提取参数 - Windows/Linux: Ctrl + Alt + P | Mac: ⌘ + ⌥ + P

示例：
// 选中以下代码，按 Ctrl + Alt + M (Mac: ⌘ + ⌥ + M) 提取方法
int sum = 0;
for (int i = 0; i < array.length; i++) {
    sum += array[i];
}
return sum;

注意事项：
- ⚠️ 重构前确保代码已保存并通过编译
- 💡 使用 Preview 功能预览重构结果

6.2 代码检查与优化

解释：
IDEA 提供代码检查工具，帮助发现和修复潜在问题。

主要功能：
- 代码检查：发现潜在错误和改进点
- 代码清理：自动修复常见问题
- 依赖分析：检查和优化项目依赖
- 死代码检测：找出未使用的代码

使用方法：
代码检查 - Code > Inspect Code
代码清理 - Code > Cleanup Code
依赖分析 - 右键 pom.xml > Diagrams > Show Dependencies
查找重复 - Code > Locate Duplicates

示例：
# 运行代码检查
Code > Inspect Code > 选择检查范围 > OK > 
查看结果并修复问题

扩展用法：
- 💡 可在 Settings > Editor > Inspections 自定义检查规则
- 🔄 使用 Alt + Enter 快速修复单个问题

6.3 插件扩展

解释：
通过安装插件扩展 IDEA 功能。

常用插件类别：
- 语言支持：增加对其他编程语言的支持
- 工具集成：与外部工具集成
- UI 增强：改进界面和用户体验
- 代码质量：提供额外的代码分析工具

安装方法：
File > Settings > Plugins > 
Marketplace（搜索插件）或 
Install from Disk（本地安装）

推荐插件：
Key Promoter X - 提示快捷键，帮助学习
Rainbow Brackets - 彩色括号，提高代码可读性
SonarLint - 实时代码质量检查
Lombok - 减少样板代码
GitToolBox - 增强 Git 集成功能

注意事项：
- ⚠️ 安装过多插件可能影响 IDE 性能
- 💡 定期更新插件以获取最新功能和修复

7. 性能优化

7.1 内存设置

解释：
调整 IDEA 内存设置以提高性能。

配置方法：
Help > Edit Custom VM Options

常用参数：
-Xms1024m    # 初始堆大小
-Xmx2048m    # 最大堆大小
-XX:ReservedCodeCacheSize=512m  # 代码缓存大小

示例：
# 为大型项目推荐的设置
-Xms1024m
-Xmx4096m
-XX:ReservedCodeCacheSize=1024m
-XX:+UseG1GC

注意事项：
- ⚠️ 设置过大可能导致系统其他应用内存不足
- 💡 根据系统可用内存调整，通常最大堆大小不超过物理内存的 1/2

7.2 缓存与索引

解释：
IDEA 使用缓存和索引提高性能，有时需要手动管理。

常用操作：
- 清理系统缓存：File > Invalidate Caches
- 重建项目索引：右键项目 > Maven > Reimport
- 排除大型目录：右键目录 > Mark Directory as > Excluded

何时使用：
- 项目行为异常时
- 更新/安装插件后
- 切换大型分支后
- IDE 性能下降时

示例：
# 清理缓存并重启
File > Invalidate Caches > 
选择要清理的缓存类型 > 
Invalidate and Restart

扩展用法：
- 💡 使用 File > Power Save Mode 在不需要代码补全时节省资源
- 🔄 定期重启 IDE 释放内存

8. 常见问题与解决

8.1 编译错误

解释：
常见编译错误及解决方法。

常见问题：
- 找不到符号：类、方法或变量不存在
- 不兼容的类型：类型转换错误
- 未解析的依赖：缺少或冲突的依赖
- 编码问题：文件编码不一致

解决方法：
找不到符号 - 检查导入语句，确保依赖已添加
不兼容类型 - 检查类型转换，使用正确的类型
未解析依赖 - 刷新 Maven/Gradle，检查仓库配置
编码问题 - File > Settings > Editor > File Encodings 设置统一编码

示例：
# 解决 Maven 依赖问题
右键项目 > Maven > Reload Project

注意事项：
- ⚠️ 编译错误通常在编辑器中以红色波浪线标记
- 💡 使用 Alt + Enter 查看快速修复建议

8.2 性能问题

解释：
IDEA 性能下降的常见原因和解决方法。

常见原因：
- 项目过大：文件过多或代码量大
- 内存不足：配置的内存上限过低
- 插件过多：安装了过多或资源密集型插件
- 索引损坏：项目索引出现问题

解决方法：
项目过大 - 排除不需要索引的目录，拆分项目
内存不足 - 增加 -Xmx 参数值，关闭不需要的项目
插件过多 - 禁用不常用插件，特别是第三方插件
索引损坏 - File > Invalidate Caches 重建索引

示例：
# 排除大型目录
右键目录 > Mark Directory as > Excluded

扩展用法：
- 💡 使用 Help > Diagnostic Tools > Activity Monitor 分析性能瓶颈
- 🔄 定期更新 IDEA 到最新版本获取性能改进

---

快捷键速查表

编辑：
基本补全 - Windows/Linux: Ctrl + Space | Mac: ⌃ + Space
智能补全 - Windows/Linux: Ctrl + ⇧ + Space | Mac: ⌃ + ⇧ + Space
格式化代码 - Windows/Linux: Ctrl + Alt + L | Mac: ⌘ + ⌥ + L
注释/取消注释 - Windows/Linux: Ctrl + / | Mac: ⌘ + /
多行注释 - Windows/Linux: Ctrl + ⇧ + / | Mac: ⌘ + ⌥ + /
复制行 - Windows/Linux: Ctrl + D | Mac: ⌘ + D
删除行 - Windows/Linux: Ctrl + Y | Mac: ⌘ + ⌫

导航：
查找类 - Windows/Linux: Ctrl + N | Mac: ⌘ + O
查找文件 - Windows/Linux: Ctrl + ⇧ + N | Mac: ⌘ + ⇧ + O
查找符号 - Windows/Linux: Ctrl + Alt + ⇧ + N | Mac: ⌘ + ⌥ + O
跳转到行 - Windows/Linux: Ctrl + G | Mac: ⌘ + L
最近文件 - Windows/Linux: Ctrl + E | Mac: ⌘ + E
跳转到定义 - Windows/Linux: Ctrl + B | Mac: ⌘ + B

运行/调试：
运行程序 - Windows/Linux: ⇧ + F10 | Mac: ⌃ + R
调试程序 - Windows/Linux: ⇧ + F9 | Mac: ⌃ + D
单步执行 - Windows/Linux: F8 | Mac: F8
步入方法 - Windows/Linux: F7 | Mac: F7
步出方法 - Windows/Linux: ⇧ + F8 | Mac: ⇧ + F8

重构：
重命名 - Windows/Linux: ⇧ + F6 | Mac: ⇧ + F6
提取方法 - Windows/Linux: Ctrl + Alt + M | Mac: ⌘ + ⌥ + M
提取变量 - Windows/Linux: Ctrl + Alt + V | Mac: ⌘ + ⌥ + V
提取常量 - Windows/Linux: Ctrl + Alt + C | Mac: ⌘ + ⌥ + C

版本控制：
提交更改 - Windows/Linux: Ctrl + K | Mac: ⌘ + K
更新项目 - Windows/Linux: Ctrl + T | Mac: ⌘ + T
查看历史 - Windows/Linux: Alt + ⇧ + C | Mac: ⌥ + ⇧ + C

其他：
设置 - Windows/Linux: Ctrl + Alt + S | Mac: ⌘ + ,
项目结构 - Windows/Linux: Ctrl + Alt + ⇧ + S | Mac: ⌘ + ;
查找操作 - Windows/Linux: Ctrl + ⇧ + A | Mac: ⌘ + ⇧ + A
