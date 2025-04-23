以下是高级 Java 开发者必须掌握的基础知识总结，包含详细内容和具体代码示例：

---

# 高级 Java 开发基础知识总结

## 1. **Java 核心基础**
### 1.1 面向对象编程（OOP）
- **三大特性**：
  - **封装**：通过访问修饰符（`private`、`protected`、`public`）隐藏实现细节。
  - **继承**：通过 `extends` 关键字实现代码复用。
  - **多态**：通过方法重写（`@Override`）实现动态绑定。

#### 示例代码
```java
// 封装
public class Person {
    private String name; // 私有字段
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

// 继承与多态
class Animal {
    public void sound() { System.out.println("Animal makes a sound"); }
}
class Dog extends Animal {
    @Override
    public void sound() { System.out.println("Dog barks"); }
}
public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog(); // 多态
        animal.sound(); // 输出：Dog barks
    }
}
```

---

### 1.2 集合框架
- **核心接口**：`List`、`Set`、`Map`。
- **常用实现类**：
  - `ArrayList`：动态数组。
  - `HashSet`：无序集合，元素唯一。
  - `HashMap`：键值对存储，键唯一。

#### 示例代码
```java
import java.util.*;

public class CollectionExample {
    public static void main(String[] args) {
        // List 示例
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Python");
        System.out.println(list); // 输出：[Java, Python]

        // Set 示例
        Set<String> set = new HashSet<>();
        set.add("Java");
        set.add("Java"); // 重复元素不会添加
        System.out.println(set); // 输出：[Java]

        // Map 示例
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "Java");
        map.put(2, "Python");
        System.out.println(map.get(1)); // 输出：Java
    }
}
```

---

### 1.3 多线程与并发
- **线程创建**：
  - 继承 `Thread` 类。
  - 实现 `Runnable` 接口。
  - 使用 `Callable` 和 `Future`。

#### 示例代码
```java
// 实现 Runnable 接口
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start(); // 启动线程
    }
}
```

- **线程池**：
  使用 `ExecutorService` 管理线程。

#### 示例代码
```java
import java.util.concurrent.*;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.submit(() -> System.out.println("Task 1"));
        executor.submit(() -> System.out.println("Task 2"));
        executor.shutdown();
    }
}
```

---

### 1.4 Java 内存模型（JMM）
- **内存区域**：
  - 堆：存储对象实例。
  - 栈：存储方法调用和局部变量。
  - 方法区：存储类元信息。

- **关键字**：
  - `volatile`：保证变量的可见性。
  - `synchronized`：保证线程安全。

#### 示例代码
```java
class Counter {
    private volatile int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}
```

---

## 2. **Java I/O 和网络编程**
### 2.1 文件操作
- **传统 I/O**：使用 `File` 类和流操作文件。
- **NIO**：高效的非阻塞 I/O。

#### 示例代码
```java
import java.io.*;

public class FileExample {
    public static void main(String[] args) throws IOException {
        // 写入文件
        FileWriter writer = new FileWriter("example.txt");
        writer.write("Hello, Java!");
        writer.close();

        // 读取文件
        BufferedReader reader = new BufferedReader(new FileReader("example.txt"));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
        reader.close();
    }
}
```

---

### 2.2 网络编程
- 使用 `Socket` 和 `ServerSocket` 实现简单的网络通信。

#### 示例代码
```java
// 服务端
import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);
        Socket socket = serverSocket.accept();
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        System.out.println("Received: " + in.readLine());
        serverSocket.close();
    }
}

// 客户端
import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 8080);
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        out.println("Hello, Server!");
        socket.close();
    }
}
```

---

## 3. **Java 8+ 新特性**
### 3.1 Lambda 表达式
- 简化匿名类的使用。

#### 示例代码
```java
import java.util.*;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Java", "Python", "C++");
        list.forEach(item -> System.out.println(item));
    }
}
```

---

### 3.2 Stream API
- 用于集合的函数式操作。

#### 示例代码
```java
import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> squares = numbers.stream()
                                       .map(n -> n * n)
                                       .collect(Collectors.toList());
        System.out.println(squares); // 输出：[1, 4, 9, 16, 25]
    }
}
```

---

### 3.3 Optional 类
- 避免 `NullPointerException`。

#### 示例代码
```java
import java.util.Optional;

public class OptionalExample {
    public static void main(String[] args) {
        Optional<String> optional = Optional.ofNullable(null);
        System.out.println(optional.orElse("Default Value")); // 输出：Default Value
    }
}
```

---

## 4. **基础框架**
### 4.1 Spring IOC 示例
```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringExample {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        MyBean myBean = context.getBean(MyBean.class);
        myBean.sayHello();
    }
}

class MyBean {
    public void sayHello() {
        System.out.println("Hello, Spring!");
    }
}
```

---
