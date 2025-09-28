
// ! 1.1 基本查询
// * 查询表中的指定列数据。
// ? 标准语法：SELECT 列名 FROM 表名 [WHERE 条件];
//   列名：要查询的字段名，可以用 * 表示全部字段
//   表名：要查询的数据表名称
//   条件：可选，筛选数据的条件
// 示例：
// SELECT * FROM users;
// SELECT id, name FROM users WHERE age > 18;
// TODO: WHERE 可省略，省略时查询所有数据

// ! 1.2 排序查询
// * 对查询结果进行升序或降序排序。
// ? 标准语法：SELECT ... FROM ... ORDER BY 列名 [ASC|DESC];
//   列名：排序字段
//   ASC：升序（默认）
//   DESC：降序
// 示例：
// SELECT * FROM users ORDER BY age ASC;
// SELECT * FROM users ORDER BY age DESC;
// TODO: 可按多个字段排序，如 ORDER BY age ASC, name DESC

// ! 1.3 分页查询
// * 分页获取数据。
// ? 标准语法：SELECT ... FROM ... LIMIT 行数 OFFSET 偏移量;
//   LIMIT：返回的最大行数
//   OFFSET：跳过的行数
// 示例：
// SELECT * FROM users LIMIT 10 OFFSET 10;
// TODO: MySQL 也支持 LIMIT 偏移量, 行数 写法

// ! 1.4 去重查询
// * 查询结果去重，返回唯一值。
// ? 标准语法：SELECT DISTINCT 列名 FROM 表名;
//   DISTINCT：去重关键字
// 示例：
// SELECT DISTINCT age FROM users;
// TODO: 可用于多列去重，如 SELECT DISTINCT name, age FROM users;

// ! 2.1 插入单条数据
// * 向表中插入一条数据。
// ? 标准语法：INSERT INTO 表名 (列1, 列2, ...) VALUES (值1, 值2, ...);
//   表名：目标表
//   列1, 列2：要插入的字段
//   值1, 值2：对应的值
// 示例：
// INSERT INTO users (name, age, email) VALUES ('John', 25, 'john@example.com');
// TODO: 字段顺序需与值顺序一致

// ! 2.2 插入多条数据
// * 向表中插入多条数据。
// ? 标准语法：INSERT INTO 表名 (列1, ...) VALUES (值1, ...), (值2, ...);
//   表名、列名、值同上
// 示例：
// INSERT INTO users (name, age, email) VALUES ('Alice', 30, 'alice@example.com'), ('Bob', 22, 'bob@example.com');
// TODO: 批量插入可提升性能

// ! 3.1 更新数据
// * 更新表中的数据。
// ? 标准语法：UPDATE 表名 SET 列名1 = 新值1, ... WHERE 条件;
//   SET：要更新的字段及新值
//   WHERE：筛选要更新的行
// 示例：
// UPDATE users SET age = 26 WHERE id = 1;
// UPDATE users SET name = 'John Doe', email = 'john.doe@example.com' WHERE id = 1;
// TODO: WHERE 必写，否则会更新全表

// ! 4.1 删除数据
// * 删除表中的数据。
// ? 标准语法：DELETE FROM 表名 WHERE 条件;
//   表名：目标表
//   WHERE：筛选要删除的行
// 示例：
// DELETE FROM users WHERE id = 1;
// DELETE FROM users;
// TODO: 省略 WHERE 会删除全表数据，慎用

// ! 5.1 创建表
// * 创建一个新表。
// ? 标准语法：CREATE TABLE 表名 (列名 数据类型 [约束], ...);
//   列名：字段名
//   数据类型：如 INT, VARCHAR(50), DATE 等
//   约束：如 PRIMARY KEY, NOT NULL, AUTO_INCREMENT
// 示例：
// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   age INT,
//   email VARCHAR(100)
// );
// TODO: 字段类型和约束需根据实际需求设计

// ! 5.2 修改表结构
// * 修改表结构。
// ? 标准语法：ALTER TABLE 表名 操作;
//   操作：如 ADD COLUMN, MODIFY COLUMN, DROP COLUMN
// 示例：
// ALTER TABLE users ADD COLUMN phone VARCHAR(15);
// ALTER TABLE users MODIFY COLUMN age TINYINT;
// ALTER TABLE users DROP COLUMN phone;
// TODO: 结构变更需谨慎，生产环境建议备份

// ! 5.3 删除表
// * 删除表。
// ? 标准语法：DROP TABLE 表名;
//   表名：要删除的表
// 示例：
// DROP TABLE users;
// TODO: 删除表不可恢复，操作前请确认

// ! 6.1 常用聚合函数
// * 统计、求和、平均、最大、最小等汇总操作。
// ? 标准语法：SELECT 聚合函数(列名) FROM 表名;
//   COUNT：计数
//   SUM：求和
//   AVG：平均
//   MAX：最大
//   MIN：最小
// 示例：
// SELECT COUNT(*) AS user_count FROM users;
// SELECT SUM(age) AS total_age FROM users;
// SELECT MAX(age) AS max_age FROM users;
// TODO: 可与 GROUP BY 联合使用

// ! 7.1 内连接
// * 查询两个表中匹配的数据。
// ? 标准语法：SELECT ... FROM 表1 INNER JOIN 表2 ON 表1.列 = 表2.列;
//   INNER JOIN：只返回两个表都存在的匹配行
// 示例：
// SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
// TODO: 只返回有匹配关系的数据

// ! 7.2 左连接
// * 查询左表的所有数据，以及右表中匹配的数据。
// ? 标准语法：SELECT ... FROM 表1 LEFT JOIN 表2 ON 表1.列 = 表2.列;
//   LEFT JOIN：左表全部+右表匹配
// 示例：
// SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;
// TODO: 右表无匹配时结果为 NULL

// ! 7.3 右连接
// * 查询右表的所有数据，以及左表中匹配的数据。
// ? 标准语法：SELECT ... FROM 表1 RIGHT JOIN 表2 ON 表1.列 = 表2.列;
//   RIGHT JOIN：右表全部+左表匹配
// 示例：
// SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;
// TODO: 左表无匹配时结果为 NULL

// ! 8.1 分组
// * 按指定列分组，常与聚合函数结合。
// ? 标准语法：SELECT 列, 聚合函数 FROM 表名 GROUP BY 列;
//   GROUP BY：分组字段
// 示例：
// SELECT age, COUNT(*) AS user_count FROM users GROUP BY age;
// TODO: SELECT 的非聚合字段必须出现在 GROUP BY 中

// ! 8.2 分组筛选
// * 对分组后的数据进行筛选。
// ? 标准语法：... GROUP BY ... HAVING 条件;
//   HAVING：对分组结果筛选
// 示例：
// SELECT age, COUNT(*) AS user_count FROM users GROUP BY age HAVING user_count > 1;
// TODO: HAVING 用于聚合后的筛选，不能用 WHERE 替代

// ! 9.1 子查询
// * 在查询中嵌套另一个查询，用于复杂筛选。
// ? 标准语法：SELECT ... FROM ... WHERE 列名 OP (SELECT ...);
//   OP：比较运算符，如 >, <, =, IN, EXISTS 等
// 示例：
// SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);
// TODO: 子查询可用于 SELECT、FROM、WHERE 等多种位置，注意性能影响