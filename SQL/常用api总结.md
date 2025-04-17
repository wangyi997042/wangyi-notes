以下是 **SQL 常用 API 总结**，涵盖了数据查询、插入、更新、删除、表操作、聚合函数、连接查询等核心功能，帮助快速掌握 SQL 的使用技巧。

---

# SQL 常用 API 总结

---

## **1. 数据查询**

### **1.1 基本查询**
- **语法**: `SELECT 列名 FROM 表名 WHERE 条件;`
- **作用**: 查询表中的指定列数据。

#### **示例**
```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT id, name FROM users WHERE age > 18;
```

---

### **1.2 排序查询**
- **语法**: `ORDER BY 列名 [ASC|DESC];`
- **作用**: 对查询结果进行升序或降序排序。

#### **示例**
```sql
-- 按年龄升序排序
SELECT * FROM users ORDER BY age ASC;

-- 按年龄降序排序
SELECT * FROM users ORDER BY age DESC;
```

---

### **1.3 分页查询**
- **语法**: `LIMIT 偏移量, 行数;`
- **作用**: 分页获取数据。

#### **示例**
```sql
-- 获取第 2 页，每页 10 条数据
SELECT * FROM users LIMIT 10 OFFSET 10;
```

---

## **2. 数据插入**

### **2.1 插入单条数据**
- **语法**: `INSERT INTO 表名 (列名1, 列名2, ...) VALUES (值1, 值2, ...);`
- **作用**: 向表中插入一条数据。

#### **示例**
```sql
INSERT INTO users (name, age, email) VALUES ('John', 25, 'john@example.com');
```

---

### **2.2 插入多条数据**
- **语法**: `INSERT INTO 表名 (列名1, 列名2, ...) VALUES (值1, 值2, ...), (值3, 值4, ...);`
- **作用**: 向表中插入多条数据。

#### **示例**
```sql
INSERT INTO users (name, age, email) 
VALUES 
  ('Alice', 30, 'alice@example.com'),
  ('Bob', 22, 'bob@example.com');
```

---

## **3. 数据更新**

### **3.1 更新数据**
- **语法**: `UPDATE 表名 SET 列名1 = 值1, 列名2 = 值2 WHERE 条件;`
- **作用**: 更新表中的数据。

#### **示例**
```sql
-- 更新指定用户的年龄
UPDATE users SET age = 26 WHERE id = 1;

-- 更新多个字段
UPDATE users SET name = 'John Doe', email = 'john.doe@example.com' WHERE id = 1;
```

---

## **4. 数据删除**

### **4.1 删除数据**
- **语法**: `DELETE FROM 表名 WHERE 条件;`
- **作用**: 删除表中的数据。

#### **示例**
```sql
-- 删除指定用户
DELETE FROM users WHERE id = 1;

-- 删除所有用户
DELETE FROM users;
```

---

## **5. 表操作**

### **5.1 创建表**
- **语法**: `CREATE TABLE 表名 (列名 数据类型 [约束], ...);`
- **作用**: 创建一个新表。

#### **示例**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age INT,
  email VARCHAR(100)
);
```

---

### **5.2 修改表**
- **语法**: `ALTER TABLE 表名 操作;`
- **作用**: 修改表结构。

#### **示例**
```sql
-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(15);

-- 修改列类型
ALTER TABLE users MODIFY COLUMN age TINYINT;

-- 删除列
ALTER TABLE users DROP COLUMN phone;
```

---

### **5.3 删除表**
- **语法**: `DROP TABLE 表名;`
- **作用**: 删除表。

#### **示例**
```sql
DROP TABLE users;
```

---

## **6. 聚合函数**

### **6.1 常用聚合函数**
- **`COUNT`**: 统计行数。
- **`SUM`**: 计算总和。
- **`AVG`**: 计算平均值。
- **`MAX`**: 获取最大值。
- **`MIN`**: 获取最小值。

#### **示例**
```sql
-- 统计用户数量
SELECT COUNT(*) AS user_count FROM users;

-- 计算所有用户的年龄总和
SELECT SUM(age) AS total_age FROM users;

-- 获取最大年龄
SELECT MAX(age) AS max_age FROM users;
```

---

## **7. 连接查询**

### **7.1 内连接**
- **语法**: `SELECT * FROM 表1 INNER JOIN 表2 ON 表1.列名 = 表2.列名;`
- **作用**: 查询两个表中匹配的数据。

#### **示例**
```sql
SELECT users.name, orders.amount 
FROM users 
INNER JOIN orders 
ON users.id = orders.user_id;
```

---

### **7.2 左连接**
- **语法**: `SELECT * FROM 表1 LEFT JOIN 表2 ON 表1.列名 = 表2.列名;`
- **作用**: 查询左表的所有数据，以及右表中匹配的数据。

#### **示例**
```sql
SELECT users.name, orders.amount 
FROM users 
LEFT JOIN orders 
ON users.id = orders.user_id;
```

---

### **7.3 右连接**
- **语法**: `SELECT * FROM 表1 RIGHT JOIN 表2 ON 表1.列名 = 表2.列名;`
- **作用**: 查询右表的所有数据，以及左表中匹配的数据。

#### **示例**
```sql
SELECT users.name, orders.amount 
FROM users 
RIGHT JOIN orders 
ON users.id = orders.user_id;
```

---

## **8. 分组查询**

### **8.1 分组**
- **语法**: `GROUP BY 列名;`
- **作用**: 按指定列分组。

#### **示例**
```sql
-- 按年龄分组统计用户数量
SELECT age, COUNT(*) AS user_count 
FROM users 
GROUP BY age;
```

---

### **8.2 分组筛选**
- **语法**: `HAVING 条件;`
- **作用**: 对分组后的数据进行筛选。

#### **示例**
```sql
-- 统计每个年龄的用户数量，筛选用户数量大于 1 的分组
SELECT age, COUNT(*) AS user_count 
FROM users 
GROUP BY age 
HAVING user_count > 1;
```

---

## **9. 子查询**

### **9.1 基本子查询**
- **语法**: 子查询嵌套在 `SELECT`、`FROM` 或 `WHERE` 中。
- **作用**: 用于复杂查询。

#### **示例**
```sql
-- 查询年龄大于平均年龄的用户
SELECT * 
FROM users 
WHERE age > (SELECT AVG(age) FROM users);
```

---
