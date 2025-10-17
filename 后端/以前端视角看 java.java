
# - // * ：扩展对比（关联前端工具/框架，降低理解成本）
# - // TODO ：实践建议（前端转Java的入门练习方向）
# - // 补充：可在对应模块后直接添加自定义笔记/代码示例


// 一、Java 基础语法（类比JS/TS变量声明，强类型约束更严格）
// 解释：Java是强类型、静态类型语言，变量必须先声明类型再使用，类型不可动态修改（类似TS strict: true模式）
// 标准语法 + 完整示例：
public class BasicSyntaxDemo {
    public static void main(String[] args) {
        // 1. 基本类型（栈存储，类似JS原始值：number/boolean）
        int age = 25;          // 整数类型：范围-2³¹~2³¹-1（约21亿，超出用long）
        long bigNum = 10000000000L; // 长整数：末尾加L，范围更大
        double price = 19.99;  // 浮点数：存小数，精度高于JS Number（避免0.1+0.2≠0.3问题）
        boolean isActive = true; // 布尔：仅true/false，无JS“0即false”隐式转换
        char initial = 'J';    // 字符：单个Unicode（如'A'/'中'），必须用单引号（JS无此类型）
        byte smallInt = 127;   // 字节类型：范围-128~127，占内存小

        // 2. 引用类型（堆存储，类似JS引用值：数组/对象）
        String name = "Java";  // 字符串：不可变（JS字符串也不可变，一致）
        String emptyStr = new String(); // 空字符串（也可直接用""）
        List<String> skillList = new ArrayList<>(); // 集合：类似JS数组，需new创建
        Map<Integer, String> userMap = new HashMap<>(); // 键值对：类似JS对象

        // 输出（类比JS console.log）
        System.out.println("年龄：" + age);         // 结果：年龄：25
        System.out.println("技能列表初始大小：" + skillList.size()); // 结果：0
    }
}

// 参数说明（前端易混点对比）
// - 基本类型 vs 引用类型差异：
//   1. 赋值逻辑：基本类型传“值拷贝”（JS原始值一致）；引用类型传“地址拷贝”（JS引用值一致）
//   2. 默认值：基本类型有默认（int=0，boolean=false）；引用类型默认null（类似JS undefined）
// ? 疑问：Java String是引用类型，为什么String s1="a"; String s2="a"; s1==s2为true？
//   答：String有“常量池”优化，相同字面量会复用地址，new String("a")则会创建新对象（s1==new String("a")为false）

// ! 注意事项：
// 1. 变量声明必须带类型，无隐式类型（如JS let a=10; Java必须int a=10;）
// 2. 基本类型不能为null（如int a=null; 报错；引用类型可设null）
// TODO 实践：写一个类，声明5种基本类型+2种引用类型，打印各自值和默认值


// 二、控制结构（if-else/for/while，逻辑同JS，语法略不同）
// 解释：控制代码执行流程，语法比JS多“变量类型声明”，逻辑判断规则一致（如==判断值，===在Java中是==）
// 标准语法 + 示例：
public class ControlFlowDemo {
    public static void main(String[] args) {
        int score = 85;

        // 1. if-else（类比JS，条件括号必加，代码块{}建议加）
        if (score >= 90) {
            System.out.println("优秀");
        } else if (score >= 80) {
            System.out.println("良好");
        } else {
            System.out.println("及格");
        }
        // 结果：良好

        // 2. for循环（普通for + for-each）
        // 普通for（比JS多变量类型声明）
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " "); // 结果：0 1 2 3 4
        }
        // for-each（遍历集合/数组，类似JS for...of）
        List<String> fruits = Arrays.asList("苹果", "香蕉");
        for (String fruit : fruits) {
            System.out.println(fruit); // 结果：苹果 香蕉
        }

        // 3. while/do-while（逻辑同JS，do-while至少执行一次）
        int count = 0;
        while (count < 3) {
            count++;
        }
        System.out.println("count：" + count); // 结果：3
    }
}

// ? 前端对比：
// - Java for循环必须声明循环变量类型（如int i），JS可let i/var i
// - Java无JS的for...in（遍历对象键），用for-each遍历集合/数组
// ! 注意：if条件不能用非布尔值（如JS if(1)可行，Java if(1)报错，必须if(1>0)）
// TODO 实践：用for-each遍历Map（提示：先通过map.keySet()/map.entrySet()获取集合）


// 三、面向对象编程（OOP，类/对象/继承/多态，比JS更严格）
// 解释：Java“一切皆对象”（除基本类型），核心是封装、继承、多态，类比JS class但语法更规范
// 标准语法 + 示例：
// 1. 类与对象（类是模板，对象是实例，类似JS class）
class Person {
    // 成员变量（封装：用private限制访问，通过get/set暴露）
    private String name;
    private int age;

    // 构造方法（创建对象时调用，类似JS constructor）
    public Person(String name, int age) {
        this.name = name; // this指向当前对象
        this.age = age;
    }

    // 成员方法（行为）
    public void sayHello() {
        System.out.println("你好，我是" + name);
    }

    // get/set方法（封装必备，JS可直接访问属性，Java需显式写）
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

// 2. 继承（用extends，单继承，类似JS extends）
class Student extends Person {
    private String studentId;

    // 子类构造方法：必须先调用父类构造（用super）
    public Student(String name, int age, String studentId) {
        super(name, age); // 调用父类构造
        this.studentId = studentId;
    }

    // 重写（@Override标注，覆盖父类方法，多态基础）
    @Override
    public void sayHello() {
        System.out.println("你好，我是学生" + getName() + "，学号" + studentId);
    }
}

// 3. 多态（父类引用指向子类对象，调用重写方法）
public class OOPDemo {
    public static void main(String[] args) {
        // 创建对象（类似JS new Class()）
        Person person = new Person("张三", 20);
        Student student = new Student("李四", 18, "2024001");

        // 调用方法（多态体现）
        Person polyObj = new Student("王五", 19, "2024002");
        person.sayHello();    // 结果：你好，我是张三
        student.sayHello();   // 结果：你好，我是学生李四，学号2024001
        polyObj.sayHello();   // 结果：你好，我是学生王五，学号2024002（调用子类重写方法）
    }
}

// * 前端类比：
// - Java类的private成员变量必须用get/set访问，JS可直接obj.name（除非用#私有字段）
// - Java单继承（一个类只能extends一个父类），JS也单继承，但可通过Mixin实现多继承效果
// ! 注意：
// 1. 构造方法名必须和类名一致，无返回值（JS constructor名固定）
// 2. 重写方法时，参数列表、返回值类型必须和父类一致（JS无此严格约束）
// TODO 实践：写一个Animal类，再写Dog/Cat子类继承，重写sound()方法，体现多态


// 四、集合框架（List/Set/Map，类似JS数组/Set/对象，功能更丰富）
// 解释：存储多个元素的容器，解决数组固定长度问题，类比JS的数组、Set、对象，但方法更规范
// 标准语法 + 示例：
import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class CollectionDemo {
    public static void main(String[] args) {
        // 1. List（有序、可重复，类似JS数组）
        List<String> list = new ArrayList<>();
        list.add("Java");    // 添加元素（类似JS push）
        list.add("Python");
        list.add("Java");    // 允许重复
        System.out.println("List大小：" + list.size()); // 结果：3
        System.out.println("索引1元素：" + list.get(1)); // 结果：Python（类似JS [1]）
        list.remove(0);      // 删除索引0元素
        System.out.println("删除后List：" + list); // 结果：[Python, Java]

        // 2. Set（无序、唯一，类似JS Set）
        Set<String> set = new HashSet<>();
        set.add("Java");
        set.add("Python");
        set.add("Java");    // 重复元素会被忽略
        System.out.println("Set大小：" + set.size()); // 结果：2
        System.out.println("是否包含Python：" + set.contains("Python")); // 结果：true
        set.remove("Python");
        System.out.println("删除后Set：" + set); // 结果：[Java]

        // 3. Map（键值对、键唯一，类似JS对象/Map）
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "Java");  // 添加键值对（类似JS obj[1] = "Java"）
        map.put(2, "Python");
        map.put(1, "JavaScript"); // 重复键会覆盖值
        System.out.println("Map大小：" + map.size()); // 结果：2
        System.out.println("键1对应值：" + map.get(1)); // 结果：JavaScript（类似JS obj[1]）
        System.out.println("是否包含键2：" + map.containsKey(2)); // 结果：true
        map.remove(2);
        System.out.println("删除后Map：" + map); // 结果：{1=JavaScript}
    }
}

// ? 前端对比：
// - Java List的get(index)对应JS arr[index]，但List无负索引（JS arr[-1]取最后一个，Java不行）
// - Java Map的键可以是任意类型（如int、String），JS对象键只能是字符串/Symbol（JS Map也支持任意键）
// ! 注意：
// 1. List遍历用for-each或for(int i=0; i<list.size(); i++)，Set遍历只能for-each（无序）
// 2. Map遍历需先获取键集（map.keySet()）或键值对集（map.entrySet()）
// TODO 实践：用Map存储3个用户（键：用户ID，值：用户名），遍历打印所有用户信息


// 五、异常处理（try-catch-finally，比JS更严格的错误处理）
// 解释：处理程序运行时的错误（如除零、空指针），分为受检异常（必须处理）和非受检异常（可选处理）
// 标准语法 + 示例：
import java.io.FileNotFoundException;
import java.io.FileReader;

public class ExceptionDemo {
    public static void main(String[] args) {
        // 1. 非受检异常（RuntimeException子类，如ArithmeticException）
        try {
            int result = 10 / 0; // 会抛出ArithmeticException
        } catch (ArithmeticException e) {
            // 捕获指定异常，处理错误（类似JS catch(e)）
            System.out.println("错误原因：" + e.getMessage()); // 结果：/ by zero
        } finally {
            // 无论是否异常，都会执行（用于释放资源，如关闭文件）
            System.out.println("非受检异常的finally执行");
        }

        // 2. 受检异常（必须处理，如FileNotFoundException，否则编译报错）
        FileReader reader = null;
        try {
            reader = new FileReader("test.txt"); // 可能找不到文件，抛出受检异常
        } catch (FileNotFoundException e) {
            System.out.println("受检异常：" + e.getMessage()); // 结果：test.txt (系统找不到指定的文件。)
        } finally {
            // 关闭流（释放资源，避免内存泄漏）
            try {
                if (reader != null) reader.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            System.out.println("受检异常的finally执行");
        }

        // 3. 主动抛出异常（用throw，类似JS throw new Error()）
        int age = -5;
        if (age < 0) {
            throw new IllegalArgumentException("年龄不能为负"); // 抛出非法参数异常
        }
    }
}

// * 前端对比：
// - Java受检异常必须处理（try-catch或throws声明），JS所有异常都是非受检（可选catch）
// - Java finally无论是否return都会执行，JS finally也一样（但JS少用受检异常概念）
// ! 注意：
// 1. 避免直接catch(Exception)（捕获所有异常，难以定位问题），应捕获具体异常类型
// 2. JDK7+可用try-with-resources自动关闭资源（如FileReader，无需手动finally关闭）
// TODO 实践：写一个方法，接收年龄参数，若<0则throw异常，调用时用try-catch处理


// 六、包与依赖管理（package/import，类似前端import/export，依赖用Maven/Gradle）
// 解释：用package组织代码（避免类名冲突），import导入其他包的类，依赖管理类似前端npm
// 标准语法 + 示例：
// 1. 包声明（必须在.java文件第一行，类似前端文件的模块路径）
package com.example.frontend2java;

// 2. 导入其他包的类（类似前端import，不导入则需写全类名）
import java.util.List; // 导入单个类
import java.util.*;    // 导入java.util包下所有类（不推荐，可能冲突）

// 3. Maven依赖管理（类似前端package.json，配置在pom.xml）
/* pom.xml核心配置：
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId> <!-- 项目组ID，类似前端包名 -->
    <artifactId>frontend2java</artifactId> <!-- 项目ID -->
    <version>1.0-SNAPSHOT</version> <!-- 版本号 -->

    <!-- 依赖列表（类似前端dependencies） -->
    <dependencies>
        <!-- 导入Spring Boot依赖（后端常用） -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.7.0</version> <!-- 依赖版本 -->
        </dependency>
    </dependencies>
</project>
*/

public class PackageDemo {
    public static void main(String[] args) {
        // 用导入的List类（无需写java.util.List）
        List<String> list = new ArrayList<>();
        // 若未导入java.util.ArrayList，需写全类名：
        // java.util.List<String> list = new java.util.ArrayList<>();
    }
}

// ? 前端对比：
// - Java package是物理路径（如com.example对应src/main/java/com/example文件夹），前端import是逻辑路径
// - Maven的pom.xml类似前端package.json，Maven install类似npm install（下载依赖到本地）
// ! 注意：
// 1. 包名全小写（如com.example，避免和类名大小写冲突）
// 2. 依赖版本需兼容（如Spring Boot 2.x和3.x不兼容，类似前端包版本冲突）
// TODO 实践：新建Maven项目，在pom.xml添加fastjson依赖（处理JSON），写代码解析JSON字符串


// 七、多线程与并发（Thread/Runnable，类似前端Web Worker，处理并行任务）
// 解释：Java支持多线程（同时执行多个任务），类似前端Web Worker，但语法更丰富，推荐用线程池管理
// 标准语法 + 示例：
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 1. 实现Runnable接口（推荐，避免Thread单继承限制）
class MyRunnable implements Runnable {
    private String taskName;

    public MyRunnable(String taskName) {
        this.taskName = taskName;
    }

    // 线程执行逻辑（类似Web Worker的message事件回调）
    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            System.out.println("任务" + taskName + "执行：" + i);
            try {
                Thread.sleep(500); // 线程休眠500ms（类似前端setTimeout）
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 2. 线程池（推荐，避免频繁创建线程浪费资源，类似前端线程池库）
public class ThreadDemo {
    public static void main(String[] args) {
        // 方式1：直接创建Thread（不推荐，单线程效率低）
        Thread thread1 = new Thread(new MyRunnable("A"));
        Thread thread2 = new Thread(new MyRunnable("B"));
        thread1.start(); // 启动线程（必须调用start()，不是run()）
        thread2.start();
        // 结果：任务A和任务B交替执行（多线程并行）

        // 方式2：线程池（固定3个线程，管理多个任务）
        ExecutorService pool = Executors.newFixedThreadPool(3);
        pool.submit(new MyRunnable("C")); // 提交任务到线程池
        pool.submit(new MyRunnable("D"));
        pool.submit(new MyRunnable("E"));
        pool.shutdown(); // 关闭线程池（所有任务执行完后关闭）
    }
}

// * 前端类比：
// - Java Thread类似前端Web Worker（独立线程，不阻塞主线程）
// - Java线程池类似前端的p-limit（限制并发数，避免过多线程/请求）
// ! 注意：
// 1. 启动线程必须用start()，直接调用run()会在主线程执行（不是多线程）
// 2. 多线程共享数据需注意线程安全（如用synchronized锁，避免数据混乱）
// TODO 实践：用线程池执行2个任务，一个打印1-5，一个打印A-E，观察并行效果


// 八、I/O 与网络编程（文件读写/网络通信，类似前端File API/fetch）
// 解释：处理文件读写（类似前端FileReader/FileWriter）和网络通信（类似前端fetch/WebSocket）
// 标准语法 + 示例：
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.Socket;
import java.io.OutputStream;

// 1. 文件读写（用try-with-resources自动关闭流，JDK7+特性）
public class IODemo {
    public static void main(String[] args) {
        // 写入文件（类似前端写文件到本地，需权限）
        String content = "前端转Java的I/O示例";
        // try-with-resources：括号内资源会自动关闭，无需finally
        try (FileWriter writer = new FileWriter("test.txt")) {
            writer.write(content); // 写入内容
            System.out.println("文件写入成功");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 读取文件（简化示例，完整需用FileReader）
        File file = new File("test.txt");
        System.out.println("文件是否存在：" + file.exists()); // 结果：true
        System.out.println("文件大小：" + file.length() + "字节");

        // 2. 简单网络通信（客户端Socket，类似前端fetch请求）
        try (Socket socket = new Socket("localhost", 8080); // 连接本地8080端口
            OutputStream os = socket.getOutputStream()) {
            String request = "Hello Server";
            os.write(request.getBytes()); // 发送数据到服务器
            System.out.println("数据发送成功");
        } catch (IOException e) {
            System.out.println("网络连接失败：" + e.getMessage());
        }
    }
}

// ? 前端对比：
// - Java FileWriter写文件需处理IOException（受检异常），前端写文件需用Blob+download属性
// - Java Socket类似前端WebSocket（长连接），但Socket是TCP基础通信，WebSocket基于HTTP
// ! 注意：
// 1. 文件路径：相对路径是项目根目录，绝对路径需写全（如"C:/test.txt"）
// 2. 网络编程需处理连接超时、断开等异常（类似前端fetch的catch）
// TODO 实践：写一个方法，读取本地txt文件内容，打印到控制台


// 九、Lambda 表达式与 Stream API（Java 8+，类似JS箭头函数+数组方法）
// 解释：简化代码（类似JS箭头函数），Stream API简化集合操作（类似JS数组map/filter/reduce）
// 标准语法 + 示例：
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LambdaStreamDemo {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // 1. Lambda表达式（类似JS箭头函数，(参数)->{逻辑}）
        // 示例：Runnable用Lambda简化（对比之前的MyRunnable类）
        Runnable runnable = () -> {
            System.out.println("Lambda简化Runnable");
        };
        new Thread(runnable).start(); // 结果：Lambda简化Runnable

        // 2. Stream API（类似JS数组方法，链式调用）
        // 示例1：过滤偶数（类似JS filter）
        List<Integer> evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0) // 过滤条件：n是偶数
                .collect(Collectors.toList()); // 收集结果到List
        System.out.println("偶数列表：" + evenNumbers); // 结果：[2, 4]

        // 示例2：平方+求和（类似JS map+reduce）
        int sumOfSquares = numbers.stream()
                .map(n -> n * n) // 每个元素平方（map）
                .reduce(0, Integer::sum); // 求和（reduce，初始值0）
        System.out.println("平方和：" + sumOfSquares); // 结果：1+4+9+16+25=55

        // 示例3：遍历（类似JS forEach）
        numbers.stream()
                .filter(n -> n > 2)
                .forEach(n -> System.out.print(n + " ")); // 结果：3 4 5
    }
}

// * 前端类比：
// - Java Lambda (n)->n%2==0 类似JS n=>n%2===0
// - Java Stream filter/map/reduce 类似JS arr.filter().map().reduce()
// ! 注意：
// 1. Lambda仅能简化函数式接口（只有一个抽象方法的接口，如Runnable、Comparator）
// 2. Stream是惰性求值（中间操作如filter/map不执行，终端操作如collect/forEach才执行）
// TODO 实践：用Stream处理字符串列表，过滤长度>3的字符串，转大写后收集到新List


// 十、注解与反射（元编程，类似前端装饰器，动态操作类/方法）
// 解释：注解（@XXX）是元数据（描述代码的数据），反射是运行时动态获取类信息、调用方法（类似前端Reflect）
// 标准语法 + 示例：
import java.lang.reflect.Method;

// 1. 常用注解（JDK自带+自定义）
// JDK自带注解：@Override（重写方法）、@Deprecated（方法过时）
class AnnotationDemo {
    // @Deprecated：标记方法过时，调用时会有警告
    @Deprecated
    public void oldMethod() {
        System.out.println("过时方法");
    }

    // 自定义注解（简化示例）
    @interface MyAnnotation {
        String value(); // 注解属性
    }

    // 使用自定义注解
    @MyAnnotation("测试注解")
    public void testAnnotation() {
        System.out.println("带自定义注解的方法");
    }
}

// 2. 反射（动态操作类，类似前端Reflect）
public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        // 方式1：通过类名获取Class对象
        Class<?> clazz = AnnotationDemo.class;

        // 方式2：通过对象获取Class对象
        AnnotationDemo obj = new AnnotationDemo();
        Class<?> clazz2 = obj.getClass();

        // 动态创建对象（类似JS new Class()）
        Object newObj = clazz.newInstance();

        // 动态获取方法并调用（类似JS obj.method()）
        Method testMethod = clazz.getMethod("testAnnotation");
        testMethod.invoke(newObj); // 调用testAnnotation()，结果：带自定义注解的方法

        // 动态获取注解属性
        MyAnnotation annotation = testMethod.getAnnotation(MyAnnotation.class);
        System.out.println("注解属性值：" + annotation.value()); // 结果：测试注解
    }
}

// ? 前端对比：
// - Java注解类似前端装饰器（如React @decorator，描述/增强类/方法）
// - Java反射类似前端Reflect API（如Reflect.get(obj, "method")动态调用方法）
// ! 注意：
// 1. 反射性能较低，非必要不使用（如Spring框架用反射实现依赖注入，但已优化）
// 2. 访问私有方法/变量需用setAccessible(true)（突破封装，谨慎使用）
// TODO 实践：用反射获取Person类的private成员变量name，并修改其值


// 十一、接口与泛型（接口定义规范，泛型提升复用性，类似前端TS泛型）
// 解释：接口是方法规范（类似前端TS接口），泛型是“类型参数化”（类似TS泛型，避免类型强转）
// 标准语法 + 示例：
// 1. 接口（类似TS接口，只定义方法签名，无实现）
interface Animal {
    void sound(); // 抽象方法（无方法体，子类必须实现）
    default void eat() { // 默认方法（有方法体，子类可重写）
        System.out.println("动物进食");
    }
}

// 实现接口（类似TS class implements 接口）
class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("狗叫：汪汪");
    }
}

class Cat implements Animal {
    @Override
    public void sound() {
        System.out.println("猫叫：喵喵");
    }

    // 重写默认方法
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
}

// 2. 泛型（类似TS泛型，<T>表示类型参数）
// 泛型类：
class Box<T> {
    private T content; // T是类型参数，创建对象时指定具体类型

    public void setContent(T content) {
        this.content = content;
    }

    public T getContent() {
        return content;
    }
}

// 泛型方法：
class GenericMethod {
    public <T> void printContent(T content) {
        System.out.println("内容：" + content);
    }
}

// 测试接口与泛型
public class InterfaceGenericDemo {
    public static void main(String[] args) {
        // 接口测试
        Animal dog = new Dog();
        Animal cat = new Cat();
        dog.sound(); // 结果：狗叫：汪汪
        cat.eat();   // 结果：猫吃鱼

        // 泛型类测试（指定String类型）
        Box<String> stringBox = new Box<>();
        stringBox.setContent("泛型测试");
        System.out.println("Box内容：" + stringBox.getContent()); // 结果：泛型测试

        // 泛型方法测试（自动推断类型）
        GenericMethod gm = new GenericMethod();
        gm.printContent(123);    // 结果：内容：123（T=Integer）
        gm.printContent("abc");  // 结果：内容：abc（T=String）
    }
}

// * 前端类比：
// - Java接口类似TS接口（如interface Animal { sound(): void }），但Java接口可有默认方法
// - Java泛型<T>类似TS泛型<T>（如class Box<T> { content: T }），都是避免类型强转
// ! 注意：
// 1. 接口不能实例化（如new Animal()报错），只能通过实现类实例化
// 2. 泛型擦除：Java泛型在编译后会擦除类型（如Box<String>编译后是Box），TS泛型是编译时检查
// TODO 实践：写一个泛型List工具类，包含泛型方法addAll（将一个List的元素添加到另一个List）


// 十二、Spring 框架基础（后端主流框架，类似前端Vue/React，简化开发）
// 解释：Spring是Java后端核心框架，核心是IOC（依赖注入，类似Vue inject/provide）和AOP（面向切面），Spring Boot简化配置
// 标准语法 + 示例：
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 1. Spring Boot启动类（项目入口，类似前端main.js）
@SpringBootApplication // 自动配置、组件扫描注解（核心）
public class SpringDemoApplication {
    public static void main(String[] args) {
        // 启动Spring应用（类似前端new Vue({ el: '#app' })）
        SpringApplication.run(SpringDemoApplication.class, args);
    }
}

// 2. 组件（@Component，类似Vue组件，由Spring管理实例）
@Component // 标记为Spring组件，Spring会自动创建实例（IOC容器管理）
class UserService {
    // 业务方法
    public String getUserName(int userId) {
        if (userId == 1) {
            return "前端转Java用户";
        }
        return "未知用户";
    }
}

// 3. 依赖注入（@Autowired，类似Vue inject，自动注入依赖）
@Component
class UserController {
    // @Autowired：Spring自动将UserService实例注入到这里（无需new）
    @Autowired
    private UserService userService;

    // 接口方法（类似前端API接口）
    public void getUserInfo(int userId) {
        String userName = userService.getUserName(userId);
        System.out.println("用户ID：" + userId + "，用户名：" + userName);
    }
}

// 4. 常用注解说明：
// - @Component：通用组件（普通类）
// - @Service：业务层组件（如UserService）
// - @Controller：控制层组件（如UserController，处理请求）
// - @Repository：数据访问层组件（操作数据库，如UserDao）
// - @Autowired：依赖注入（自动装配）

// * 前端类比：
// - Spring IOC容器类似Vue的实例池（管理组件实例，无需手动new）
// - @Autowired类似Vue的inject（从父组件/全局注入依赖，无需手动传递）
// - Spring Boot自动配置类似Vue CLI（无需手动配置webpack，开箱即用）
// ! 注意：
// 1. @SpringBootApplication注解必须加在启动类上，否则Spring无法扫描组件
// 2. 依赖注入的类必须加@Component/@Service等注解（否则Spring无法管理）
// TODO 实践：创建Spring Boot项目，写一个UserService和UserController，用@Autowired注入，测试getUserInfo方法


// 十三、常用开发工具（类似前端VS Code/npm，提升开发效率）
// 解释：Java开发常用工具，类似前端的VS Code、npm、Git，需熟练掌握基础操作
// 工具列表 + 用途：
/*
1. IDE（集成开发环境）：
   - IntelliJ IDEA（推荐，类似前端VS Code，功能强大，支持Spring）
   - Eclipse（免费，老牌IDE，适合入门）
   操作：新建项目、运行/调试、代码补全（类似VS Code的IntelliSense）

2. JDK（Java开发工具包）：
   - 包含Java编译器（javac）、运行环境（java）
   配置：需设置JAVA_HOME环境变量（类似前端配置NODE_HOME）

3. 构建工具（类似前端npm/yarn）：
   - Maven：基于XML配置（pom.xml），管理依赖和构建
   - Gradle：基于Groovy/Kotlin配置，比Maven简洁，速度快
   操作：mvn clean package（打包项目）、mvn install（安装依赖）

4. 版本控制（同前端）：
   - Git：管理代码版本，配合GitHub/GitLab
   操作：git clone/commit/push/pull（同前端）

5. 其他工具：
   - Postman：测试API接口（类似前端用Postman测后端接口）
   - JRebel：热部署（修改代码无需重启项目，类似前端热更新）
   - Navicat：数据库管理（连接MySQL/Oracle，类似前端操作MongoDB）
*/

// ? 前端对比：
// - IDEA/Eclipse 类似 VS Code（前端），都是代码编辑+调试工具
// - Maven/Gradle 类似 npm/yarn（前端），都是依赖管理+项目构建工具
// ! 注意：
// 1. JDK版本需和项目兼容（如Spring Boot 3.x需JDK 17+，2.x需JDK 8/11）
// 2. Maven依赖冲突时，用mvn dependency:tree查看依赖树，排除冲突依赖
// TODO 实践：用IDEA新建Spring Boot项目，配置Maven依赖，运行项目并访问默认接口


// 十四、小结（前端转Java核心要点）
// 1. 语法差异：Java强类型+静态类型，需显式声明类型，比JS严格，类似TS strict模式
// 2. 核心思想：面向对象（类/继承/多态）是Java基础，前端需从“函数式”转向“对象式”思维
// 3. 工具链：熟悉IDEA、Maven、Spring Boot，类似前端熟悉VS Code、npm、Vue
// 4. 实践建议：
//    - 先掌握基础语法+集合框架（日常开发最常用）
//    - 再学Spring Boot（后端开发核心，快速上手项目）
//    - 多写Demo（如CRUD接口、文件处理、多线程任务），避免只看不学
// 5. 资源推荐：
//    - 文档：Oracle Java官方文档、Spring Boot官方文档
//    - 教程：Java核心技术（书籍）、尚硅谷Spring Boot教程
//    - 工具：LeetCode（练Java语法）、GitHub（看开源项目）